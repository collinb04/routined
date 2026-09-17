<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStruggleStore } from '@/stores/struggle'
import { STRATEGY_MAP, COMPLEXITY_CLASSES } from '@/data/strategies'
import type { StruggleContent } from '@/data/problems'

const props = defineProps<{
  struggle: StruggleContent
  problemId: string
  savedState?: Record<string, any> | null
}>()

const emit = defineEmits<{ complete: [] }>()

const store = useStruggleStore()

// ── Init ─────────────────────────────────────────────────────────────────────

store.init(props.problemId, props.struggle, props.savedState)

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Derives a lightweight note on how the learner's step order compares to the
// reference plan for their chosen strategy — passed to the tutor as optional
// context, not used to grade the ordering itself.
function stepOrderNoteFor(strategyId: string, submitted: string[]): string | null {
  const canonical = props.struggle.options.find(o => o.strategyId === strategyId)?.planSteps
  if (!canonical || canonical.length !== submitted.length) return null
  if (canonical.every((step, i) => step === submitted[i])) return null

  for (let i = 0; i < canonical.length - 1; i++) {
    const [a, b] = [canonical[i], canonical[i + 1]]
    if (submitted.indexOf(b) < submitted.indexOf(a)) {
      return `The learner ordered "${b}" before "${a}" — the reverse of the plan's logical sequence.`
    }
  }
  return "The learner's step order differs from the reference plan, though no directly dependent steps were reversed."
}

// ── Commit / Revise form ──────────────────────────────────────────────────────

const strategyOptions = computed(() =>
  props.struggle.options
    .map(o => ({ option: o, strategy: STRATEGY_MAP.get(o.strategyId) }))
    .filter(x => x.strategy != null)
    .map(x => ({ option: x.option, strategy: x.strategy! }))
)

const orderedSteps = ref<string[]>([])
const prevStrategyId = ref('')

watch(
  () => store.strategyId,
  (newId) => {
    if (newId === prevStrategyId.value) return
    prevStrategyId.value = newId
    const opt = props.struggle.options.find(o => o.strategyId === newId)
    orderedSteps.value = opt ? shuffle(opt.planSteps) : []
  },
)

// ── Drag-to-reorder ─────────────────────────────────────────────────────────

const dragIndex = ref<number | null>(null)

function onStepDragStart(i: number) {
  dragIndex.value = i
}

// `target` picks which ref to mutate — Vue auto-unwraps refs referenced
// directly in templates, so the ref itself can't be passed in as an argument.
function onStepDragOver(target: 'commit' | 'revise', i: number) {
  if (dragIndex.value === null || dragIndex.value === i) return
  const list = target === 'commit' ? orderedSteps : reviseSteps
  const arr = [...list.value]
  const [moved] = arr.splice(dragIndex.value, 1)
  arr.splice(i, 0, moved)
  list.value = arr
  dragIndex.value = i
}

function onStepDragEnd() {
  dragIndex.value = null
}

const canCommit = computed(() =>
  !!store.strategyId && !!store.timeComplexity && !!store.spaceComplexity
)

const committing = ref(false)
const commitError = ref('')

async function handleCommit() {
  committing.value = true
  commitError.value = ''
  store.planSteps = orderedSteps.value
  store.stepOrderNote = stepOrderNoteFor(store.strategyId, orderedSteps.value)
  try {
    await store.submitCommit()
    // Kick off the conversation with a synthetic opener so the chat starts with a bot message
    store.step = 'chat'
    await store.sendMessage(`I want to approach this with ${store.strategyId}.`)
    scrollToBottom()
  } catch (e: any) {
    commitError.value = 'Could not reach the server — make sure the backend is running.'
    store.step = 'commit'
  } finally {
    committing.value = false
  }
}

// ── Chat ──────────────────────────────────────────────────────────────────────

const chatInput = ref('')
const chatScrollEl = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
  props.struggle.options.find(o => o.strategyId === store.strategyId) ?? null
)

const committedLabel = computed(() => {
  const s = STRATEGY_MAP.get(store.strategyId)
  return s ? `${s.name} · ${store.timeComplexity} time · ${store.spaceComplexity} space` : ''
})

async function scrollToBottom() {
  await nextTick()
  if (chatScrollEl.value) chatScrollEl.value.scrollTop = chatScrollEl.value.scrollHeight
}

watch(() => store.messages.length, scrollToBottom)

async function sendChatMessage(text?: string) {
  const msg = (text ?? chatInput.value).trim()
  if (!msg || store.chatLoading) return
  chatInput.value = ''
  try {
    await store.sendMessage(msg)
    scrollToBottom()
  } catch {
    // error already reflected in store
  }
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

// ── Revise ────────────────────────────────────────────────────────────────────

const reviseSteps = ref<string[]>([])

// Hydration: the strategyId watcher above only fires on a *change*, so it
// never runs when strategyId is seeded from saved state at setup time (it's
// set once, synchronously, not "changed"). Seed the ordered lists directly
// from the restored plan order instead of re-shuffling.
if (store.step === 'chat' || store.step === 'revise') {
  prevStrategyId.value = store.strategyId
  orderedSteps.value = [...store.planSteps]
  reviseSteps.value = [...store.planSteps]
}

function enterRevise() {
  const opt = props.struggle.options.find(o => o.strategyId === store.strategyId)
  reviseSteps.value = opt ? shuffle(opt.planSteps) : []
  store.step = 'revise'
}

const canEvaluate = computed(() =>
  !!store.strategyId &&
  !!store.timeComplexity &&
  !!store.spaceComplexity &&
  store.insightText.trim().length > 20
)

const evaluateError = ref('')

async function handleEvaluate() {
  evaluateError.value = ''
  store.planSteps = reviseSteps.value
  store.stepOrderNote = stepOrderNoteFor(store.strategyId, reviseSteps.value)
  try {
    await store.submitCommit()
    const result = await store.evaluateInsight()
    if (result.pass) {
      emit('complete')
    }
  } catch (e: any) {
    evaluateError.value = e.message || 'Evaluation failed'
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-white">

    <!-- ── Commit ─────────────────────────────────────────────────────────── -->
    <template v-if="store.step === 'commit'">
      <div class="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <span class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Commit to a Strategy</span>
        <span class="text-[12px] text-text-muted">pick, predict, order</span>
      </div>

      <div class="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-5">

        <!-- Strategy select -->
        <div class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Strategy</label>
          <select
            v-model="store.strategyId"
            class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
          >
            <option value="" disabled>Choose an approach…</option>
            <option
              v-for="{ option, strategy } in strategyOptions"
              :key="option.strategyId"
              :value="option.strategyId"
            >{{ strategy.name }}</option>
          </select>
          <p v-if="store.strategyId && STRATEGY_MAP.get(store.strategyId)" class="text-[12.5px] text-text-muted leading-relaxed px-1">
            {{ STRATEGY_MAP.get(store.strategyId)!.description.split('.')[0] }}.
          </p>
        </div>

        <!-- Complexity -->
        <div class="flex gap-3">
          <div class="flex-1 flex flex-col gap-2">
            <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Time</label>
            <select
              v-model="store.timeComplexity"
              class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
            >
              <option value="" disabled>Pick…</option>
              <option v-for="c in COMPLEXITY_CLASSES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Space</label>
            <select
              v-model="store.spaceComplexity"
              class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
            >
              <option value="" disabled>Pick…</option>
              <option v-for="c in COMPLEXITY_CLASSES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <!-- Plan ordering -->
        <div v-if="orderedSteps.length > 0" class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Order the Plan Steps</label>
          <p class="text-[12px] text-text-muted -mt-1">Drag to arrange in execution order.</p>
          <div class="flex flex-col gap-1.5 mt-1">
            <div
              v-for="(step, i) in orderedSteps"
              :key="step"
              draggable="true"
              class="flex items-center gap-2.5 bg-surface border border-border rounded-xl px-3.5 py-2.5 cursor-grab active:cursor-grabbing transition-opacity"
              :class="dragIndex === i ? 'opacity-40' : ''"
              @dragstart="onStepDragStart(i)"
              @dragover.prevent="onStepDragOver('commit', i)"
              @dragend="onStepDragEnd"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="shrink-0 text-text-muted">
                <circle cx="8" cy="6" r="1.4"/><circle cx="8" cy="12" r="1.4"/><circle cx="8" cy="18" r="1.4"/>
                <circle cx="16" cy="6" r="1.4"/><circle cx="16" cy="12" r="1.4"/><circle cx="16" cy="18" r="1.4"/>
              </svg>
              <span class="text-[11px] font-mono text-text-muted w-4 shrink-0 text-center">{{ i + 1 }}</span>
              <span class="flex-1 text-[13px] text-text-dim leading-snug">{{ step }}</span>
            </div>
          </div>
        </div>

        <p v-if="commitError" class="text-[12.5px] text-red-500 px-1">{{ commitError }}</p>

        <!-- Your read on this problem (optional) -->
        <div class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Your Read on This Problem <span class="normal-case font-normal">(optional)</span></label>
          <p class="text-[12px] text-text-muted -mt-1">Summarize what the clues tell you — this gets passed to the tutor as extra context, not graded.</p>
          <textarea
            v-model="store.synthesisText"
            class="resize-none text-sm text-text-dim leading-relaxed bg-surface rounded-xl p-3 border border-border focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Structure, constraints, and what approach might work…"
            rows="2"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="shrink-0 border-t border-gray-100 px-5 py-3 flex justify-end">
        <button
          class="flex items-center gap-1.5 text-[13px] font-semibold transition-opacity px-4 py-2 rounded-lg bg-accent text-white disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!canCommit || committing"
          @click="handleCommit"
        >
          {{ committing ? 'Committing…' : 'Commit to this approach' }}
          <svg v-if="!committing" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    </template>

    <!-- ── Chat ───────────────────────────────────────────────────────────── -->
    <template v-else-if="store.step === 'chat'">

      <!-- Pinned hypothesis -->
      <div class="shrink-0 px-4 py-2.5 border-b border-gray-100 bg-surface flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-accent shrink-0">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
        <span class="text-[12px] font-medium text-text-dim truncate">{{ committedLabel }}</span>
        <button
          class="ml-auto text-[11px] font-semibold text-accent hover:opacity-70 transition-opacity shrink-0"
          @click="enterRevise"
        >Revise →</button>
      </div>

      <!-- Messages -->
      <div ref="chatScrollEl" class="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f5f5f2]">
        <div
          v-for="(msg, i) in store.messages"
          :key="i"
          class="flex items-end gap-2"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            v-if="msg.role === 'assistant'"
            class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"
          ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5c-3.3 0-5.8 2.2-5.8 5.5v4.3c0 1 .4 1.9 1.1 2.6l1 1v2.1c0 1.1.9 2 2 2h3.4c1.1 0 2-.9 2-2v-2.1l1-1c.7-.7 1.1-1.6 1.1-2.6V8c0-3.3-2.5-5.5-5.8-5.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.2 9.5h11.6M9.3 14.6h5.4M9 15.3v3.4M15 15.3v3.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="9.3" cy="10.7" r="1.1" fill="#ef4444"/><circle cx="14.7" cy="10.7" r="1.1" fill="#ef4444"/></svg></div>
          <div
            class="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
            :class="msg.role === 'user'
              ? 'bg-black text-white rounded-2xl rounded-br-sm'
              : 'bg-white text-text-dim shadow-sm rounded-2xl rounded-bl-sm border border-gray-100'"
          >{{ msg.content }}</div>
          <div
            v-if="msg.role === 'user'"
            class="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mb-0.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-text-muted">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
        <!-- Typing indicator -->
        <div v-if="store.chatLoading" class="flex items-end gap-2 justify-start">
          <div class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5c-3.3 0-5.8 2.2-5.8 5.5v4.3c0 1 .4 1.9 1.1 2.6l1 1v2.1c0 1.1.9 2 2 2h3.4c1.1 0 2-.9 2-2v-2.1l1-1c.7-.7 1.1-1.6 1.1-2.6V8c0-3.3-2.5-5.5-5.8-5.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.2 9.5h11.6M9.3 14.6h5.4M9 15.3v3.4M15 15.3v3.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="9.3" cy="10.7" r="1.1" fill="#ef4444"/><circle cx="14.7" cy="10.7" r="1.1" fill="#ef4444"/></svg></div>
          <div class="px-4 py-3 bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
            <div class="flex gap-1 items-center">
              <span class="typing-dot" style="animation-delay: 0ms" />
              <span class="typing-dot" style="animation-delay: 150ms" />
              <span class="typing-dot" style="animation-delay: 300ms" />
            </div>
          </div>
        </div>
      </div>

      <!-- Seed chips -->
      <div
        v-if="selectedOption && selectedOption.socraticSeeds.length > 0 && store.messages.length <= 2"
        class="shrink-0 px-4 pb-2 pt-1 bg-[#f5f5f2] flex flex-wrap gap-1.5"
      >
        <button
          v-for="seed in selectedOption.socraticSeeds"
          :key="seed"
          class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-text-dim hover:border-accent/40 hover:text-accent transition-colors"
          :disabled="store.chatLoading"
          @click="sendChatMessage(seed)"
        >{{ seed }}</button>
      </div>

      <!-- Input -->
      <div class="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
        <div class="flex items-end gap-2 bg-surface rounded-xl border border-border px-3 py-2">
          <textarea
            v-model="chatInput"
            class="flex-1 resize-none text-sm text-text-dim bg-transparent outline-none leading-relaxed"
            style="max-height: 120px; min-height: 20px"
            placeholder="Type your answer…"
            rows="1"
            @input="autoResize"
            @keydown.enter.exact.prevent="sendChatMessage()"
          />
          <button
            class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="!chatInput.trim() || store.chatLoading"
            @click="sendChatMessage()"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M12 19V5m-7 7 7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </template>

    <!-- ── Revise ──────────────────────────────────────────────────────────── -->
    <template v-else>
      <div class="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <span class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Revise Your Commitment</span>
        <button class="text-[11px] text-accent hover:opacity-70" @click="store.step = 'chat'">← Back to chat</button>
      </div>

      <div class="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-5">

        <!-- Strategy -->
        <div class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Strategy</label>
          <select
            v-model="store.strategyId"
            class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
          >
            <option
              v-for="{ option, strategy } in strategyOptions"
              :key="option.strategyId"
              :value="option.strategyId"
            >{{ strategy.name }}</option>
          </select>
        </div>

        <!-- Complexity -->
        <div class="flex gap-3">
          <div class="flex-1 flex flex-col gap-2">
            <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Time</label>
            <select
              v-model="store.timeComplexity"
              class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
            >
              <option v-for="c in COMPLEXITY_CLASSES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Space</label>
            <select
              v-model="store.spaceComplexity"
              class="w-full px-3 py-2.5 text-sm text-text-dim bg-surface border border-border rounded-xl appearance-none focus:outline-none focus:border-accent/60"
            >
              <option v-for="c in COMPLEXITY_CLASSES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <!-- Plan ordering -->
        <div v-if="reviseSteps.length > 0" class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Order the Plan Steps</label>
          <p class="text-[12px] text-text-muted -mt-1">Drag to arrange in execution order.</p>
          <div class="flex flex-col gap-1.5 mt-1">
            <div
              v-for="(s, i) in reviseSteps"
              :key="s"
              draggable="true"
              class="flex items-center gap-2.5 bg-surface border border-border rounded-xl px-3.5 py-2.5 cursor-grab active:cursor-grabbing transition-opacity"
              :class="dragIndex === i ? 'opacity-40' : ''"
              @dragstart="onStepDragStart(i)"
              @dragover.prevent="onStepDragOver('revise', i)"
              @dragend="onStepDragEnd"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="shrink-0 text-text-muted">
                <circle cx="8" cy="6" r="1.4"/><circle cx="8" cy="12" r="1.4"/><circle cx="8" cy="18" r="1.4"/>
                <circle cx="16" cy="6" r="1.4"/><circle cx="16" cy="12" r="1.4"/><circle cx="16" cy="18" r="1.4"/>
              </svg>
              <span class="text-[11px] font-mono text-text-muted w-4 shrink-0 text-center">{{ i + 1 }}</span>
              <span class="flex-1 text-[13px] text-text-dim leading-snug">{{ s }}</span>
            </div>
          </div>
        </div>

        <!-- Insight textarea -->
        <div class="flex flex-col gap-2">
          <label class="text-[11px] font-mono font-light uppercase tracking-widest text-text-muted">Key Insight</label>
          <p class="text-[12px] text-text-muted -mt-1">In your own words — what structural property of this problem makes the optimal approach work?</p>
          <textarea
            v-model="store.insightText"
            class="resize-none text-sm text-text-dim bg-surface border border-border rounded-xl px-3.5 py-3 focus:outline-none focus:border-accent/60 leading-relaxed"
            rows="4"
            placeholder="The key insight is…"
          />
        </div>

        <!-- Evaluation feedback -->
        <div
          v-if="store.insightResult && !store.insightResult.pass"
          class="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex flex-col gap-1"
        >
          <p class="text-[12.5px] font-medium text-amber-700">{{ store.insightResult.feedback }}</p>
          <p class="text-[12px] text-amber-600">
            {{ store.insightResult.attemptsRemaining }} attempt{{ store.insightResult.attemptsRemaining === 1 ? '' : 's' }} remaining
          </p>
        </div>

        <p v-if="evaluateError" class="text-[12.5px] text-red-500 px-1">{{ evaluateError }}</p>
      </div>

      <!-- Footer -->
      <div class="shrink-0 border-t border-gray-100 px-5 py-3 flex justify-end">
        <button
          class="flex items-center gap-1.5 text-[13px] font-semibold transition-opacity px-4 py-2 rounded-lg bg-accent text-white disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!canEvaluate || store.evaluating"
          @click="handleEvaluate"
        >
          {{ store.evaluating ? 'Evaluating…' : 'Submit and continue' }}
          <svg v-if="!store.evaluating" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
        </button>
      </div>
    </template>

  </div>
</template>

<style scoped>
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
