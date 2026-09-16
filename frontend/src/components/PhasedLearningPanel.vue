<script setup lang="ts">
import { ref, reactive, computed, nextTick, onBeforeUnmount } from 'vue'
import type { ClueCard, StruggleContent } from '@/data/problems'
import type { ProblemContext } from '@/stores/struggleTutor'
import StruggleTutorHub from '@/components/StruggleTutorHub.vue'

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
  problemContext?: ProblemContext
  dissectProgress?: DissectProgress | null
  struggleProgress?: StruggleProgress | null
  phaseCompletion?: PhaseCompletion
  hasSolution?: boolean
  embedded?: boolean
}>(), {
  problemId: '',
  dissectProgress: null,
  struggleProgress: null,
  phaseCompletion: () => ({ dissect: false, struggle: false, attack: false }),
  hasSolution: false,
  embedded: false,
})

const emit = defineEmits<{
  'reveal-highlight': [clueId: string]
  'advance-phase': [payload: { phase: number; data: unknown }]
  'reset-problem': []
  'reveal-solution': []
}>()

// ─── Phase Navigation ───────────────────────────────────────────────────────

const PHASE_NAMES = ['Dissect', 'Struggle & Optimize', 'Attack'] as const

// Struggle & Optimize is a free-use tutor, not a graded step — it never
// contributes a "done" state, and doesn't gate Attack. Only Dissect and
// Attack have real completion.
const completedPhases = reactive(new Set<number>(
  ([props.phaseCompletion.dissect, false, props.phaseCompletion.attack] as const)
    .map((done, i) => (done ? i : -1))
    .filter(i => i >= 0)
))

const activePhase = ref(
  !props.phaseCompletion.dissect ? 0 : props.phaseCompletion.attack ? 2 : 1
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
  wrongOption: number | null
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
        wrongOption: null,
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
      wrongOption: null,
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
  s.wrongOption = null
}

async function persistDissect(completed = false) {
  if (!props.problemId || props.embedded) return
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
    s.wrongOption = s.selectedOption
    s.flashError = true
    s.feedbackCorrect = false
    s.feedbackVisible = true
    setTimeout(() => { s.flashError = false; s.selectedOption = null }, 600)
  }
  persistDissect()
}

// Duration must match the flash timeout in ProblemSpace.vue's
// onRevealHighlight, so the button re-enables exactly when the highlight fades.
const REVEAL_FLASH_MS = 5000

function revealHighlight(clueId: string, ci: number) {
  clueStates[ci].revealClicked = true
  emit('reveal-highlight', clueId)
  setTimeout(() => { clueStates[ci].revealClicked = false }, REVEAL_FLASH_MS)
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

// ─── Utility bar: bug report + reset ───────────────────────────────────────

const bugReportOpen = ref(false)
const bugReportText = ref('')
const bugReportSubmitting = ref(false)
const bugReportSent = ref(false)

async function submitBugReport() {
  if (!bugReportText.value.trim() || !props.problemId) return
  bugReportSubmitting.value = true
  try {
    if (!props.embedded) {
      await fetch(`/api/problems/${props.problemId}/bug-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          phase: PHASE_NAMES[activePhase.value],
          description: bugReportText.value.trim(),
        }),
      })
    }
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
    s.wrongOption = null
    s.attempts = 0
    s.feedbackVisible = false
    s.feedbackCorrect = false
    s.flashError = false
    s.revealClicked = false
  })

  if (props.problemId && !props.embedded) {
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

const solutionConfirmOpen = ref(false)

function confirmRevealSolution() {
  solutionConfirmOpen.value = false
  emit('reveal-solution')
}

// ─── Struggle & Optimize: floating panel ───────────────────────────────────
// Lets the tutor stay on screen (draggable/resizable, overlaid on the Attack
// editor) instead of forcing a tab switch away from the code every time it's
// needed. Positioned `fixed` and teleported to <body> so it can move and
// resize freely without being clipped by this panel's own (or ProblemSpace's)
// overflow-hidden ancestors — but movement is clamped to the bounds of the
// ProblemSpace card itself (the `[data-problem-space-bounds]` ancestor
// wrapping both the Question and Attack panels), not the whole browser window.

const FLOAT_MIN_WIDTH = 300
const FLOAT_MIN_HEIGHT = 280

const struggleFloating = ref(false)
const panelRootEl = ref<HTMLElement | null>(null)
const floatCardEl = ref<HTMLElement | null>(null)
const floatPos = reactive({ x: 16, y: 80 })
const floatSize = reactive({ width: 400, height: 480 })
let floatPlaced = false

const floatStyle = computed(() =>
  `position:fixed; left:${floatPos.x}px; top:${floatPos.y}px; width:${floatSize.width}px; height:${floatSize.height}px; z-index:40;`
)

function getBoundsRect(): DOMRect | null {
  const container = panelRootEl.value?.closest('[data-problem-space-bounds]') as HTMLElement | null
  return (container ?? panelRootEl.value)?.getBoundingClientRect() ?? null
}

function popOutStruggle() {
  struggleFloating.value = true
  activePhase.value = 2
  if (!floatPlaced) {
    floatPlaced = true
    nextTick(() => {
      const bounds = getBoundsRect()
      if (!bounds) return
      floatSize.width = Math.min(floatSize.width, Math.max(FLOAT_MIN_WIDTH, bounds.width - 32))
      floatSize.height = Math.min(floatSize.height, Math.max(FLOAT_MIN_HEIGHT, bounds.height - 32))
      floatPos.x = Math.max(bounds.left + 16, bounds.right - floatSize.width - 16)
      floatPos.y = bounds.top + 64
    })
  }
}

function dockStruggle() {
  struggleFloating.value = false
  activePhase.value = 1
}

let dragOffset: { mouseX: number; mouseY: number; startX: number; startY: number } | null = null

function startDrag(e: PointerEvent) {
  dragOffset = { mouseX: e.clientX, mouseY: e.clientY, startX: floatPos.x, startY: floatPos.y }
  window.addEventListener('pointermove', onDrag)
  window.addEventListener('pointerup', stopDrag)
}

function onDrag(e: PointerEvent) {
  if (!dragOffset) return
  const bounds = getBoundsRect()
  if (!bounds) return
  const rawX = dragOffset.startX + (e.clientX - dragOffset.mouseX)
  const rawY = dragOffset.startY + (e.clientY - dragOffset.mouseY)
  floatPos.x = Math.min(Math.max(bounds.left, rawX), Math.max(bounds.left, bounds.right - floatSize.width))
  floatPos.y = Math.min(Math.max(bounds.top, rawY), Math.max(bounds.top, bounds.bottom - floatSize.height))
}

function stopDrag() {
  dragOffset = null
  window.removeEventListener('pointermove', onDrag)
  window.removeEventListener('pointerup', stopDrag)
}

let resizeStart: { mouseX: number; mouseY: number; startW: number; startH: number } | null = null

function startResize(e: PointerEvent) {
  e.stopPropagation()
  resizeStart = { mouseX: e.clientX, mouseY: e.clientY, startW: floatSize.width, startH: floatSize.height }
  window.addEventListener('pointermove', onResize)
  window.addEventListener('pointerup', stopResize)
}

function onResize(e: PointerEvent) {
  if (!resizeStart) return
  const bounds = getBoundsRect()
  if (!bounds) return
  const maxW = bounds.right - floatPos.x
  const maxH = bounds.bottom - floatPos.y
  const rawW = resizeStart.startW + (e.clientX - resizeStart.mouseX)
  const rawH = resizeStart.startH + (e.clientY - resizeStart.mouseY)
  floatSize.width = Math.min(Math.max(FLOAT_MIN_WIDTH, rawW), maxW)
  floatSize.height = Math.min(Math.max(FLOAT_MIN_HEIGHT, rawH), maxH)
}

function stopResize() {
  resizeStart = null
  window.removeEventListener('pointermove', onResize)
  window.removeEventListener('pointerup', stopResize)
}

onBeforeUnmount(() => {
  stopDrag()
  stopResize()
})
</script>

<template>
  <div class="phased-panel relative flex flex-col h-full bg-white" ref="panelRootEl">

    <!-- ── Phase Nav ──────────────────────────────────────────────────────── -->
    <div class="flex items-center justify-between border-b border-gray-100 pl-4 pr-3 pt-3 shrink-0">
      <div class="flex gap-0.5">
        <template v-for="(name, i) in PHASE_NAMES" :key="i">
          <button
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
          <div v-if="i === 1" class="relative group self-center -ml-1 mr-1.5">
            <button
              class="flex items-center justify-center w-6 h-6 rounded-md transition-colors cursor-pointer"
              :class="struggleFloating ? 'text-accent bg-accent/10' : 'text-text-muted hover:text-text hover:bg-black/5'"
              @click.stop="struggleFloating ? dockStruggle() : popOutStruggle()"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><rect x="12" y="13" width="8" height="6" rx="1" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-2.5 py-1.5 pointer-events-none z-20">
              {{ struggleFloating ? 'Dock back into tab' : 'Pop out as floating panel' }}
            </div>
          </div>
        </template>
      </div>

      <div class="flex items-center gap-1.5 mb-2.5 shrink-0">
        <div class="relative group">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text hover:bg-black/5 transition-colors cursor-pointer"
            @click="bugReportOpen = true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="8" y="6" width="8" height="12" rx="4"/><path d="M8 10H4m16 0h-4M8 15H5m14 0h-3M12 6V4m-3 2 1-2m5 2-1-2"/>
            </svg>
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-2.5 py-1.5 pointer-events-none z-20">
            Report a bug
          </div>
        </div>

        <div v-if="hasSolution" class="relative group">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text hover:bg-black/5 transition-colors cursor-pointer"
            @click="solutionConfirmOpen = true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-2.5 py-1.5 pointer-events-none z-20">
            Solution
          </div>
        </div>

        <span class="w-px h-3 bg-gray-200 mx-0.5" />

        <div class="relative group">
          <button
            class="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-red-500 hover:bg-black/5 transition-colors cursor-pointer"
            @click="resetProblem"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/>
            </svg>
          </button>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:block whitespace-nowrap bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-2.5 py-1.5 pointer-events-none z-20">
            Reset problem
          </div>
        </div>
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

    <!-- ── Reveal solution modal ─────────────────────────────────────────── -->
    <div
      v-if="solutionConfirmOpen"
      class="absolute inset-0 z-20 flex items-center justify-center bg-black/30"
      @click.self="solutionConfirmOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-lg w-90 p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-[13px] font-semibold text-text">Reveal solution?</span>
          <button class="text-text-muted hover:text-text transition-colors cursor-pointer" @click="solutionConfirmOpen = false">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p class="text-sm text-text-dim leading-relaxed">
          This overwrites whatever you've written in the Attack editor with the reference solution, and opens the Solution tab. Your attempt won't be saved.
        </p>
        <div class="flex items-center justify-end gap-2">
          <button class="text-[13px] font-medium px-4 py-1.5 rounded-lg text-text-muted hover:text-text transition-colors cursor-pointer" @click="solutionConfirmOpen = false">Cancel</button>
          <button class="text-[13px] font-semibold px-4 py-1.5 rounded-lg bg-accent text-white cursor-pointer" @click="confirmRevealSolution">Reveal solution</button>
        </div>
      </div>
    </div>

    <!-- ── Content ────────────────────────────────────────────────────────── -->
    <div class="flex-1 min-h-0 flex flex-col overflow-hidden">

      <!-- ── Phase 0: Dissect ─────────────────────────────────────────── -->
      <template v-if="activePhase === 0">

        <div class="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div class="flex items-center justify-between px-5 py-3 shrink-0 border-b border-gray-100">
            <span class="relative flex items-center gap-1.5 group">
              <span class="text-[11px] font-mono font-light uppercase text-text-muted">Clue Decoder</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="text-text-muted/70 group-hover:text-text-muted cursor-pointer shrink-0"
              >
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <div
                class="pointer-events-none absolute left-0 top-full z-10 mt-2 w-64 rounded-lg bg-gray-900 px-3 py-2 text-[12px] font-normal normal-case leading-relaxed text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
              >Before writing code, experts read for clues — constraints and phrasing that narrow down the right approach. Train that instinct here.</div>
            </span>
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
              <div class="grid grid-cols-2 gap-2 mb-3 pl-8">
                <button
                  v-for="(opt, oi) in clue.options"
                  :key="oi"
                  class="px-3 py-2 rounded-lg text-[12.5px] font-medium border transition-all text-center leading-snug"
                  :class="
                    clueStates[ci].status === 'solved'
                      ? clueStates[ci].selectedOption === oi
                        ? 'bg-green text-white border-green cursor-default'
                        : 'bg-surface border-border text-text-muted opacity-40 cursor-default'
                      : clueStates[ci].selectedOption === oi
                        ? clueStates[ci].flashError
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-gray-900 text-white border-gray-900'
                        : clueStates[ci].wrongOption === oi
                          ? 'bg-surface border-red-500 text-text-dim hover:border-red-500 cursor-pointer'
                          : 'bg-surface border-border text-text-dim hover:border-gray-300 cursor-pointer'
                  "
                  :disabled="clueStates[ci].status === 'solved'"
                  @click="selectOption(ci, oi)"
                >{{ opt.label }}</button>
              </div>

              <div
                v-if="clueStates[ci].feedbackVisible"
                class="flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 mb-3 ml-8 text-[13px] leading-relaxed"
                :class="clueStates[ci].feedbackCorrect ? 'bg-green text-white' : 'bg-amber-500 text-white'"
              >
                <span>{{
                  clueStates[ci].feedbackCorrect
                    ? clue.correctFeedback
                    : (clueStates[ci].lastWrongOption !== null && clue.options[clueStates[ci].lastWrongOption!].feedback)
                      ? clue.options[clueStates[ci].lastWrongOption!].feedback
                      : clue.wrongFeedback[Math.min(clueStates[ci].attempts - 1, clue.wrongFeedback.length - 1)]
                }}</span>
                <button
                  v-if="clueStates[ci].feedbackCorrect && clue.highlight"
                  class="shrink-0 text-[12px] font-semibold px-3 py-1 rounded-lg whitespace-nowrap transition-opacity"
                  :class="clueStates[ci].revealClicked
                    ? 'bg-white/20 text-white opacity-60 cursor-not-allowed'
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

      <!-- ── Phase 1: Struggle & Optimize (free-use tutor) ────────────── -->
      <template v-else-if="activePhase === 1">
        <div v-if="struggleFloating" class="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8 bg-[#f5f5f2]">
          <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
              <rect x="3" y="3" width="18" height="18" rx="2"/><rect x="12" y="13" width="8" height="6" rx="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <div>
            <p class="text-[15px] font-semibold text-text mb-1">Struggle & Optimize is floating</p>
            <p class="text-sm text-text-muted mb-3">Drag it anywhere over the Attack editor, or dock it back here.</p>
            <button class="text-[13px] font-semibold text-accent hover:opacity-70 cursor-pointer" @click="dockStruggle">Dock it back</button>
          </div>
        </div>
        <StruggleTutorHub
          v-else
          :struggle="struggle"
          :problem-id="problemId"
          :problem-context="problemContext"
          :saved-state="struggleProgress?.state ?? null"
          :embedded="embedded"
          class="flex-1 min-h-0"
        />
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

    <!-- ── Floating Struggle & Optimize panel ────────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="struggleFloating"
        ref="floatCardEl"
        class="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200"
        :style="floatStyle"
      >
        <div class="flex-1 min-h-0 flex flex-col overflow-hidden rounded-2xl">
          <div
            class="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-100 shrink-0 cursor-move select-none bg-gray-50"
            @pointerdown="startDrag"
          >
            <span class="flex items-center gap-1.5 text-[12.5px] font-semibold text-text">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="text-text-muted">
                <circle cx="9" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/>
                <circle cx="15" cy="6" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="15" cy="18" r="1.3"/>
              </svg>
              Struggle & Optimize
            </span>
            <button
              class="flex items-center justify-center w-6 h-6 rounded-md text-text-muted hover:text-text hover:bg-black/5 transition-colors cursor-pointer"
              title="Dock back into tab"
              @click="dockStruggle"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/>
              </svg>
            </button>
          </div>
          <StruggleTutorHub
            :struggle="struggle"
            :problem-id="problemId"
            :problem-context="problemContext"
            :saved-state="struggleProgress?.state ?? null"
            :embedded="embedded"
            class="flex-1 min-h-0 overflow-y-auto"
          />
        </div>
        <div
          class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          style="touch-action:none"
          @pointerdown="startResize"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" class="absolute bottom-0.5 right-0.5 text-gray-300 pointer-events-none" fill="currentColor">
            <circle cx="8" cy="2" r="1"/><circle cx="8" cy="5" r="1"/><circle cx="8" cy="8" r="1"/>
            <circle cx="5" cy="5" r="1"/><circle cx="5" cy="8" r="1"/><circle cx="2" cy="8" r="1"/>
          </svg>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.phased-panel {
  --accent-color: var(--color-accent, #4a7cf7);
  --success-color: var(--color-green, #16a34a);
}
</style>
