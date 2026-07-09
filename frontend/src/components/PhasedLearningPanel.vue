<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { ClueCard, StruggleContent } from '@/data/problems'
import StrugglePanel from '@/components/StrugglePanel.vue'

export interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

// ─── Props & Emits ─────────────────────────────────────────────────────────

interface DissectProgress {
  clues: Array<{ id: string; status: string; attempts: number; selectedOption: number | null }>
}

interface StruggleProgress {
  state: Record<string, any>
  completed: boolean
  completedAt: string | null
  updatedAt: string | null
}

interface PhaseCompletion {
  dissect: boolean
  struggle: boolean
  attack: boolean
}

const props = withDefaults(defineProps<{
  clues: ClueCard[]
  struggle?: StruggleContent
  problemId?: string
  dissectProgress?: DissectProgress | null
  struggleProgress?: StruggleProgress | null
  phaseCompletion?: PhaseCompletion
}>(), {
  problemId: '',
  dissectProgress: null,
  struggleProgress: null,
  phaseCompletion: () => ({ dissect: false, struggle: false, attack: false }),
})

const emit = defineEmits<{
  'reveal-highlight': [clueId: string]
  'advance-phase': [payload: { phase: number; data: unknown }]
  'reset-problem': []
}>()

// ─── Phase Navigation ───────────────────────────────────────────────────────

const PHASE_NAMES = ['Dissect', 'Struggle & Optimize', 'Attack'] as const

const completedPhases = reactive(new Set<number>(
  ([props.phaseCompletion.dissect, props.phaseCompletion.struggle, props.phaseCompletion.attack] as const)
    .map((done, i) => (done ? i : -1))
    .filter(i => i >= 0)
))

const activePhase = ref(
  !props.phaseCompletion.dissect ? 0 : !props.phaseCompletion.struggle ? 1 : 2
)

function tabStatus(i: number): 'done' | 'unlocked' {
  return completedPhases.has(i) ? 'done' : 'unlocked'
}

function clickTab(i: number) {
  activePhase.value = i
}

function advancePhase(data: unknown) {
  completedPhases.add(activePhase.value)
  emit('advance-phase', { phase: activePhase.value, data })
  activePhase.value++
}

// ─── Clue Decoder (Phase 0) ────────────────────────────────────────────────

interface ClueState {
  status: 'locked' | 'active' | 'solved'
  selectedOption: number | null
  lastWrongOption: number | null
  attempts: number
  feedbackVisible: boolean
  feedbackCorrect: boolean
  flashError: boolean
  revealClicked: boolean
}

const clueStates = reactive<ClueState[]>(
  props.clues.map((clue, i) => {
    const saved = props.dissectProgress?.clues?.find(c => c.id === clue.id)
    if (saved) {
      return {
        status: saved.status as ClueState['status'],
        selectedOption: saved.selectedOption ?? null,
        lastWrongOption: null,
        attempts: saved.attempts ?? 0,
        feedbackVisible: false,
        feedbackCorrect: saved.status === 'solved',
        flashError: false,
        revealClicked: false,
      }
    }
    return {
      status: i === 0 ? 'active' : 'locked',
      selectedOption: null,
      lastWrongOption: null,
      attempts: 0,
      feedbackVisible: false,
      feedbackCorrect: false,
      flashError: false,
      revealClicked: false,
    }
  })
)

const solvedCount = computed(() => clueStates.filter(s => s.status === 'solved').length)
const allCluesSolved = computed(() => solvedCount.value === props.clues.length)

function selectOption(ci: number, oi: number) {
  const s = clueStates[ci]
  if (s.status !== 'active' || s.flashError) return
  s.selectedOption = s.selectedOption === oi ? null : oi
}

async function persistDissect(completed = false) {
  if (!props.problemId) return
  try {
    await fetch(`/api/problems/${props.problemId}/dissect/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        clues: props.clues.map((c, i) => ({
          id: c.id,
          status: clueStates[i].status,
          attempts: clueStates[i].attempts,
          selectedOption: clueStates[i].selectedOption,
        })),
        completed,
      }),
    })
  } catch {
    // best-effort — nothing actionable client-side if this fails
  }
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
    s.lastWrongOption = s.selectedOption
    s.flashError = true
    s.feedbackCorrect = false
    s.feedbackVisible = true
    setTimeout(() => { s.flashError = false; s.selectedOption = null }, 600)
  }
  persistDissect()
}

function revealHighlight(clueId: string, ci: number) {
  clueStates[ci].revealClicked = true
  emit('reveal-highlight', clueId)
}

const canContinueDissect = computed(() => allCluesSolved.value)

function continueDissect() {
  if (!canContinueDissect.value) return
  advancePhase({
    clueResults: props.clues.map((c, i) => ({
      id: c.id,
      solved: clueStates[i].status === 'solved',
      attempts: clueStates[i].attempts,
    })),
  })
  persistDissect(true)
}

// ─── Struggle & Optimize (Phase 1) ─────────────────────────────────────────

function onStruggleComplete() {
  advancePhase({ struggle: true })
}

// ─── Utility bar: bug report + reset ───────────────────────────────────────

const bugReportOpen = ref(false)
const bugReportText = ref('')
const bugReportSubmitting = ref(false)
const bugReportSent = ref(false)

async function submitBugReport() {
  if (!bugReportText.value.trim() || !props.problemId) return
  bugReportSubmitting.value = true
  try {
    await fetch(`/api/problems/${props.problemId}/bug-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        phase: PHASE_NAMES[activePhase.value],
        description: bugReportText.value.trim(),
      }),
    })
  } catch {
    // best-effort — nothing actionable client-side if this fails
  } finally {
    bugReportSubmitting.value = false
    bugReportSent.value = true
    bugReportText.value = ''
    setTimeout(() => {
      bugReportOpen.value = false
      bugReportSent.value = false
    }, 1200)
  }
}

async function resetProblem() {
  if (!confirm('Reset all progress on this problem? This cannot be undone.')) return

  activePhase.value = 0
  completedPhases.clear()
  clueStates.forEach((s, i) => {
    s.status = i === 0 ? 'active' : 'locked'
    s.selectedOption = null
    s.lastWrongOption = null
    s.attempts = 0
    s.feedbackVisible = false
    s.feedbackCorrect = false
    s.flashError = false
    s.revealClicked = false
  })

  if (props.problemId) {
    try {
      await fetch(`/api/problems/${props.problemId}/struggle/reset`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // best-effort — local state is already reset regardless
    }
  }

  emit('reset-problem')
}
</script>

<template>
  <div class="phased-panel relative flex flex-col h-full bg-white">

    <!-- ── Phase Nav ──────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between border-b border-gray-100 pl-4 pr-3 pt-3 shrink-0">
      <div class="flex gap-0.5">
        <button
          v-for="(name, i) in PHASE_NAMES"
          :key="i"
          class="flex items-center gap-1 px-3 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px"
          :class="[
            i === activePhase ? 'border-accent' : 'border-transparent',
            tabStatus(i) === 'done'
              ? 'text-green cursor-pointer'
              : i === activePhase
                ? 'text-text cursor-pointer'
                : 'text-text-muted hover:text-text cursor-pointer',
          ]"
          @click="clickTab(i)"
        >
          <span class="text-[11px] font-medium shrink-0 mt-0.5 w-4 text-center" :class="tabStatus(i) === 'done' ? 'text-green' : 'text-text-muted'">
            <svg v-if="tabStatus(i) === 'done'" width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline">
              <polyline points="2 6 5 9 10 3"/>
            </svg>
            <span v-else>{{ i + 1 }}</span>
          </span>
          {{ name }}
        </button>
      </div>

      <div class="flex items-center gap-3 mb-2.5 shrink-0">
        <button
          class="flex items-center gap-1 text-[11.5px] font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
          @click="bugReportOpen = true"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="8" y="6" width="8" height="12" rx="4"/><path d="M8 10H4m16 0h-4M8 15H5m14 0h-3M12 6V4m-3 2 1-2m5 2-1-2"/>
          </svg>
          Report a bug
        </button>
        <span class="w-px h-3 bg-gray-200" />
        <button
          class="flex items-center gap-1 text-[11.5px] font-medium text-text-muted hover:text-red-500 transition-colors cursor-pointer"
          @click="resetProblem"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/>
          </svg>
          Reset problem
        </button>
      </div>
    </div>

    <!-- ── Bug report modal ───────────────────────────────────────────────── -->
    <div
      v-if="bugReportOpen"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
      @click.self="bugReportOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-lg w-90 p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-[13px] font-semibold text-text">Report a bug</span>
          <button class="text-text-muted hover:text-text transition-colors cursor-pointer" @click="bugReportOpen = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <textarea
          v-model="bugReportText"
          rows="4"
          placeholder="What went wrong?"
          class="resize-none text-sm text-text-dim leading-relaxed bg-surface rounded-xl p-3 border border-border focus:outline-none focus:border-accent/50 transition-colors"
        />
        <div class="flex items-center justify-between">
          <span v-if="bugReportSent" class="text-[12px] text-green">Thanks — logged for the team.</span>
          <span v-else />
          <button
            class="flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-lg bg-accent text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="!bugReportText.trim() || bugReportSubmitting"
            @click="submitBugReport"
          >{{ bugReportSubmitting ? 'Sending…' : 'Send' }}</button>
        </div>
      </div>
    </div>

    <!-- ── Content ────────────────────────────────────────────────────────── -->
    <div class="flex-1 min-h-0 flex flex-col overflow-hidden">

      <!-- ── Phase 0: Dissect ─────────────────────────────────────────── -->
      <template v-if="activePhase === 0">

        <div class="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div class="flex items-center justify-between px-5 py-3 shrink-0 border-b border-gray-100">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Clue Decoder</span>
            <span class="text-[12px] text-text-muted">submit each clue to advance</span>
          </div>

          <div
            v-for="(clue, ci) in clues"
            :key="clue.id"
            class="flex flex-col px-5 py-4 border-b border-gray-100 transition-opacity"
            :class="clueStates[ci].status === 'locked' ? 'opacity-35' : ''"
          >
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
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-gray-900 text-white border-gray-900'
                        : 'bg-surface border-border text-text-dim hover:border-gray-300 cursor-pointer'
                  "
                  :disabled="clueStates[ci].status === 'solved'"
                  @click="selectOption(ci, oi)"
                >{{ opt.label }}</button>
              </div>

              <div
                v-if="clueStates[ci].feedbackVisible"
                class="flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 mb-3 ml-8 text-[13px] leading-relaxed"
                :class="clueStates[ci].feedbackCorrect ? 'bg-green-bg text-green' : 'bg-amber-50 text-amber-700'"
              >
                <span>{{
                  clueStates[ci].feedbackCorrect
                    ? clue.correctFeedback
                    : (clueStates[ci].lastWrongOption !== null && clue.options[clueStates[ci].lastWrongOption!].feedback)
                      ? clue.options[clueStates[ci].lastWrongOption!].feedback
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

        <!-- Continue footer -->
        <div
          class="shrink-0 border-t border-gray-100 px-5 py-4 flex items-center justify-between transition-opacity"
          :class="allCluesSolved ? '' : 'pointer-events-none opacity-50'"
        >
          <span class="text-[12px] text-text-muted">{{ solvedCount }} of {{ clues.length }} clues decoded</span>
          <button
            class="flex items-center gap-1.5 text-[13px] font-semibold transition-opacity"
            :class="canContinueDissect ? 'text-text hover:opacity-70 cursor-pointer' : 'text-text-muted opacity-40 cursor-not-allowed'"
            :disabled="!canContinueDissect"
            @click="continueDissect"
          >
            Continue to Struggle
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </button>
        </div>

      </template>

      <!-- ── Phase 1: Struggle & Optimize ─────────────────────────────── -->
      <template v-else-if="activePhase === 1">
        <StrugglePanel
          v-if="struggle && problemId"
          :struggle="struggle"
          :problem-id="problemId"
          :saved-state="struggleProgress?.state ?? null"
          class="flex-1 min-h-0"
          @complete="onStruggleComplete"
        />
        <div
          v-else
          class="flex-1 flex items-center justify-center text-sm text-text-muted italic bg-[#f5f5f2]"
        >
          No struggle content for this problem yet.
        </div>
      </template>

      <!-- ── Phase 2: Attack ──────────────────────────────────────────── -->
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
}
</style>
