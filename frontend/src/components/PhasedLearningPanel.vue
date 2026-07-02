<script setup lang="ts">
import { ref, reactive, computed, nextTick, watch } from 'vue'
import type { ClueCard } from '@/data/problems'

export interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

// ─── Props & Emits ─────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  clues: ClueCard[]
  bruteSeedMessages: ChatMessage[]
  optimizeSeedMessages: ChatMessage[]
  bruteHint?: string
  optimizeHint?: string
  brutePhaseComplete: boolean
  optimizePhaseComplete: boolean
  onSendMessage: (text: string, phase: 'brute' | 'optimize') => Promise<string>
}>(), {
  bruteHint: 'Describe the naive solution and its cost',
  optimizeHint: 'Name the pattern and derive the optimization',
})

const emit = defineEmits<{
  'reveal-highlight': [clueId: string]
  'advance-phase': [payload: { phase: number; data: unknown }]
}>()

// ─── Phase Navigation ───────────────────────────────────────────────────────

const PHASE_NAMES = ['Dissect', 'Brute Force', 'Optimize', 'Attack'] as const

const activePhase = ref(0)
const highestUnlocked = ref(0)
const completedPhases = reactive(new Set<number>())

function tabStatus(i: number): 'locked' | 'done' | 'unlocked' {
  if (completedPhases.has(i)) return 'done'
  if (i > highestUnlocked.value) return 'locked'
  return 'unlocked'
}

function clickTab(i: number) {
  if (tabStatus(i) === 'locked') return
  activePhase.value = i
}

function advancePhase(data: unknown) {
  completedPhases.add(activePhase.value)
  highestUnlocked.value = Math.max(highestUnlocked.value, activePhase.value + 1)
  emit('advance-phase', { phase: activePhase.value, data })
  activePhase.value++
}

// ─── Clue Decoder (Phase 0) ────────────────────────────────────────────────

interface ClueState {
  status: 'locked' | 'active' | 'solved'
  selectedOption: number | null
  attempts: number
  feedbackVisible: boolean
  feedbackCorrect: boolean
  flashError: boolean
  revealClicked: boolean
}

const clueStates = reactive<ClueState[]>(
  props.clues.map((_, i) => ({
    status: i === 0 ? 'active' : 'locked',
    selectedOption: null,
    attempts: 0,
    feedbackVisible: false,
    feedbackCorrect: false,
    flashError: false,
    revealClicked: false,
  }))
)

const solvedCount = computed(() => clueStates.filter(s => s.status === 'solved').length)
const allCluesSolved = computed(() => solvedCount.value === props.clues.length)

function selectOption(ci: number, oi: number) {
  const s = clueStates[ci]
  if (s.status !== 'active' || s.flashError) return
  s.selectedOption = s.selectedOption === oi ? null : oi
}

function submitClue(ci: number) {
  const s = clueStates[ci]
  if (s.selectedOption === null || s.status !== 'active') return
  const correct = props.clues[ci].options[s.selectedOption].isCorrect
  if (correct) {
    s.status = 'solved'
    s.feedbackCorrect = true
    s.feedbackVisible = true
    if (ci + 1 < clueStates.length) clueStates[ci + 1].status = 'active'
  } else {
    s.attempts++
    s.flashError = true
    s.feedbackCorrect = false
    s.feedbackVisible = true
    setTimeout(() => { s.flashError = false; s.selectedOption = null }, 600)
  }
}

function revealHighlight(clueId: string, ci: number) {
  clueStates[ci].revealClicked = true
  emit('reveal-highlight', clueId)
}

const synthesisText = ref('')
const canContinueDissect = computed(
  () => allCluesSolved.value && synthesisText.value.trim().length > 15
)

function continueDissect() {
  if (!canContinueDissect.value) return
  advancePhase({
    clueResults: props.clues.map((c, i) => ({
      id: c.id,
      solved: clueStates[i].status === 'solved',
      attempts: clueStates[i].attempts,
    })),
    synthesisText: synthesisText.value,
  })
}

// ─── Chat (Phases 1 & 2) ───────────────────────────────────────────────────

type ChatPhaseKey = 'brute' | 'optimize'

const chatMessages = reactive<Record<ChatPhaseKey, ChatMessage[]>>({
  brute: props.bruteSeedMessages.map(m => ({ ...m })),
  optimize: props.optimizeSeedMessages.map(m => ({ ...m })),
})

const chatPhase = computed<ChatPhaseKey>(() =>
  activePhase.value === 1 ? 'brute' : 'optimize'
)

const chatInput = ref('')
const chatLoading = ref(false)
const chatScrollEl = ref<HTMLElement | null>(null)
const chatTextareaEl = ref<HTMLTextAreaElement | null>(null)

async function scrollToBottom() {
  await nextTick()
  if (chatScrollEl.value) chatScrollEl.value.scrollTop = chatScrollEl.value.scrollHeight
}

async function sendMessage() {
  const text = chatInput.value.trim()
  if (!text || chatLoading.value) return
  const phase = chatPhase.value
  chatMessages[phase].push({ role: 'user', text })
  chatInput.value = ''
  if (chatTextareaEl.value) chatTextareaEl.value.style.height = 'auto'
  chatLoading.value = true
  await scrollToBottom()
  try {
    const reply = await props.onSendMessage(text, phase)
    chatMessages[phase].push({ role: 'bot', text: reply })
  } catch {
    chatMessages[phase].push({ role: 'bot', text: 'Something went wrong. Try again.' })
  } finally {
    chatLoading.value = false
    await scrollToBottom()
  }
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

const currentPhaseComplete = computed(() =>
  activePhase.value === 1 ? props.brutePhaseComplete : props.optimizePhaseComplete
)

function continueChat() {
  if (!currentPhaseComplete.value) return
  advancePhase({ messages: [...chatMessages[chatPhase.value]] })
}

watch(activePhase, () => nextTick(() => scrollToBottom()))
</script>

<template>
  <div class="phased-panel flex flex-col h-full bg-white">

    <!-- ── Phase Nav ──────────────────────────────────────────────────────── -->
    <div class="flex border-b border-gray-100 px-4 pt-3 gap-0.5 shrink-0">
      <button
        v-for="(name, i) in PHASE_NAMES"
        :key="i"
        class="flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px"
        :class="[
          i === activePhase ? 'border-accent' : 'border-transparent',
          tabStatus(i) === 'locked'
            ? 'text-text-muted opacity-35 cursor-not-allowed'
            : tabStatus(i) === 'done'
              ? 'text-green cursor-pointer'
              : i === activePhase
                ? 'text-text cursor-pointer'
                : 'text-text-muted hover:text-text cursor-pointer',
        ]"
        @click="clickTab(i)"
        :title="tabStatus(i) === 'locked' ? 'Complete the previous step first' : ''"
      >
        <span class="text-[11px] font-medium shrink-0" :class="tabStatus(i) === 'done' ? 'text-green' : 'text-text-muted'">
          <svg v-if="tabStatus(i) === 'done'" width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline">
            <polyline points="2 6 5 9 10 3"/>
          </svg>
          <span v-else>{{ i + 1 }}</span>
        </span>
        {{ name }}
      </button>
    </div>

    <!-- ── Content ────────────────────────────────────────────────────────── -->
    <div class="flex-1 min-h-0 flex flex-col overflow-hidden">

      <!-- ── Phase 0: Dissect / Clue Decoder ──────────────────────────── -->
      <template v-if="activePhase === 0">

        <!-- Clue list -->
        <div class="flex-1 min-h-0 overflow-y-auto flex flex-col">

          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-3 shrink-0 border-b border-gray-100">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Clue Decoder</span>
            <span class="text-[12px] text-text-muted">submit each clue to advance</span>
          </div>

          <!-- Clue items -->
          <div
            v-for="(clue, ci) in clues"
            :key="clue.id"
            class="flex flex-col px-5 py-4 border-b border-gray-100 transition-opacity"
            :class="clueStates[ci].status === 'locked' ? 'opacity-35' : ''"
          >
            <!-- Question row -->
            <div class="flex items-start gap-3 mb-3">
              <span class="text-[11px] font-medium shrink-0 mt-0.5 w-4 text-center" :class="clueStates[ci].status === 'solved' ? 'text-green' : 'text-text-muted'">
                <svg v-if="clueStates[ci].status === 'solved'" width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline">
                  <polyline points="2 6 5 9 10 3"/>
                </svg>
                <span v-else>{{ ci + 1 }}</span>
              </span>
              <p
                class="text-[13.5px] leading-relaxed"
                :class="clueStates[ci].status === 'solved' ? 'text-text-muted' : 'font-medium text-text'"
              >{{ clue.question }}</p>
            </div>

            <template v-if="clueStates[ci].status !== 'locked'">
              <!-- Option pills -->
              <div class="flex flex-wrap gap-2 mb-3 pl-8">
                <button
                  v-for="(opt, oi) in clue.options"
                  :key="oi"
                  class="px-3 py-1 rounded-full text-[12.5px] font-medium border transition-all"
                  :class="
                    clueStates[ci].status === 'solved'
                      ? clueStates[ci].selectedOption === oi
                        ? 'bg-green-bg text-green border-green/20 cursor-default'
                        : 'bg-surface border-border text-text-muted opacity-40 cursor-default'
                      : clueStates[ci].selectedOption === oi
                        ? clueStates[ci].flashError
                          ? 'bg-red-50 text-red-500 border-red-200'
                          : 'bg-gray-900 text-white border-gray-900'
                        : 'bg-surface border-border text-text-dim hover:border-gray-300 cursor-pointer'
                  "
                  :disabled="clueStates[ci].status === 'solved'"
                  @click="selectOption(ci, oi)"
                >{{ opt.label }}</button>
              </div>

              <!-- Feedback -->
              <div
                v-if="clueStates[ci].feedbackVisible"
                class="flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 mb-3 ml-8 text-[13px] leading-relaxed"
                :class="clueStates[ci].feedbackCorrect ? 'bg-green-bg text-green' : 'bg-amber-50 text-amber-700'"
              >
                <span>{{
                  clueStates[ci].feedbackCorrect
                    ? clue.correctFeedback
                    : clue.wrongFeedback[Math.min(clueStates[ci].attempts - 1, clue.wrongFeedback.length - 1)]
                }}</span>
                <button
                  v-if="clueStates[ci].feedbackCorrect"
                  class="shrink-0 text-[12px] font-semibold px-3 py-1 rounded-lg whitespace-nowrap transition-opacity"
                  :class="clueStates[ci].revealClicked
                    ? 'bg-green/10 text-green opacity-50 cursor-not-allowed'
                    : 'bg-white/70 text-green hover:bg-white cursor-pointer'"
                  :disabled="clueStates[ci].revealClicked"
                  @click="revealHighlight(clue.id, ci)"
                >{{ clueStates[ci].revealClicked ? 'Shown ✓' : 'Show in problem' }}</button>
              </div>

              <!-- Submit -->
              <div v-if="clueStates[ci].status === 'active'" class="flex justify-end">
                <button
                  class="px-4 py-1.5 rounded-lg text-[13px] font-medium border transition-all"
                  :class="clueStates[ci].selectedOption !== null
                    ? 'border-border text-text hover:bg-surface cursor-pointer'
                    : 'border-transparent text-text-muted cursor-not-allowed'"
                  :disabled="clueStates[ci].selectedOption === null"
                  @click="submitClue(ci)"
                >Submit</button>
              </div>
            </template>
          </div>
        </div>

        <!-- Synthesis footer -->
        <div
          class="shrink-0 border-t border-gray-100 px-5 py-4 flex flex-col gap-3 transition-opacity"
          :class="allCluesSolved ? '' : 'pointer-events-none opacity-50'"
          style="min-height: 130px"
        >
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-semibold uppercase tracking-widest" :class="allCluesSolved ? 'text-accent' : 'text-text-muted'">
              Your read on this problem
            </span>
            <span v-if="!allCluesSolved" class="text-[12px] text-text-muted">complete all clues first</span>
          </div>
          <textarea
            v-model="synthesisText"
            :disabled="!allCluesSolved"
            class="flex-1 resize-none text-sm text-text-dim leading-relaxed bg-surface rounded-xl p-3 border border-border focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Summarize what the clues tell you — structure, constraints, and what approach might work."
            rows="2"
          />
          <div class="flex items-center justify-between">
            <span class="text-[12px] text-text-muted">{{ solvedCount }} of {{ clues.length }} clues decoded</span>
            <button
              class="flex items-center gap-1.5 text-[13px] font-semibold transition-opacity"
              :class="canContinueDissect ? 'text-text hover:opacity-70 cursor-pointer' : 'text-text-muted opacity-40 cursor-not-allowed'"
              :disabled="!canContinueDissect"
              @click="continueDissect"
            >
              Continue to brute force
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

      </template>

      <!-- ── Phases 1 & 2: Chat ────────────────────────────────────────── -->
      <template v-else-if="activePhase === 1 || activePhase === 2">

        <!-- Messages -->
        <div ref="chatScrollEl" class="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-3 bg-[#f5f5f2]">
          <div
            v-for="(msg, mi) in chatMessages[chatPhase]"
            :key="mi"
            class="flex items-end gap-2"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              v-if="msg.role === 'bot'"
              class="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"
            >R</div>

            <div
              class="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-black text-white rounded-2xl rounded-br-sm'
                : 'bg-white text-text-dim shadow-sm rounded-2xl rounded-bl-sm border border-gray-100'"
            >{{ msg.text }}</div>

            <div
              v-if="msg.role === 'user'"
              class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mb-0.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-text-muted">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="chatLoading" class="flex items-end gap-2 justify-start">
            <div class="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5">R</div>
            <div class="px-4 py-3 bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
              <div class="flex gap-1 items-center">
                <span class="typing-dot" style="animation-delay: 0ms" />
                <span class="typing-dot" style="animation-delay: 150ms" />
                <span class="typing-dot" style="animation-delay: 300ms" />
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
          <div class="flex items-end gap-2 bg-surface rounded-xl border border-border px-3 py-2">
            <textarea
              ref="chatTextareaEl"
              v-model="chatInput"
              class="flex-1 resize-none text-sm text-text-dim bg-transparent outline-none leading-relaxed"
              style="max-height: 120px; min-height: 20px"
              placeholder="Type your answer…"
              rows="1"
              @input="autoResize"
              @keydown.enter.exact.prevent="sendMessage"
            />
            <button
              class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="!chatInput.trim() || chatLoading"
              @click="sendMessage"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M12 19V5m-7 7 7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="shrink-0 border-t border-gray-100 bg-white px-5 py-3 flex items-center justify-between">
          <span class="text-[12px] text-text-muted">
            {{ activePhase === 1 ? bruteHint : optimizeHint }}
          </span>
          <button
            class="flex items-center gap-1.5 text-[13px] font-semibold transition-opacity"
            :class="currentPhaseComplete ? 'text-text hover:opacity-70 cursor-pointer' : 'text-text-muted opacity-40 cursor-not-allowed'"
            :disabled="!currentPhaseComplete"
            @click="continueChat"
          >
            {{ activePhase === 1 ? 'Continue to Optimize' : 'Continue to Attack' }}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </button>
        </div>

      </template>

      <!-- ── Phase 3: Attack ───────────────────────────────────────────── -->
      <template v-else>
        <slot name="attack">
          <div class="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8 bg-[#f5f5f2]">
            <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="text-accent">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <div>
              <p class="text-[15px] font-semibold text-text mb-1">Time to code it up</p>
              <p class="text-sm text-text-muted">Slot the Attack editor in via <code class="text-[12px] bg-surface px-1.5 py-0.5 rounded border border-border">&lt;template #attack&gt;</code>.</p>
            </div>
          </div>
        </slot>
      </template>

    </div>
  </div>
</template>

<style scoped>
.phased-panel {
  --accent-color: var(--color-accent, #4a7cf7);
  --success-color: var(--color-green, #16a34a);
  --danger-color: #ef4444;
}

.typing-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--color-text-muted, #6b7280);
  opacity: 0.4;
  animation: typing-bounce 1.2s infinite ease-in-out;
}

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 0.8; }
}
</style>
