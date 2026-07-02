<template>
  <div class="bg-[#f5f5f2] p-4" :style="`height: ${props.height}; --color-accent: ${difficultyAccent}; --color-accent-hover: ${difficultyAccent};`">
  <div class="flex overflow-hidden rounded-2xl shadow-sm border border-black/6" style="height:100%">

    <!-- LEFT PANEL -->
    <div class="flex flex-col bg-white shrink-0" style="width: 45%">

      <!-- Tab bar -->
      <div class="flex border-b border-gray-100 px-4 pt-3 gap-0.5 shrink-0">
        <button
          v-for="tab in (props.embedded ? leftTabs.filter(t => t.id === 'problem') : leftTabs)"
          :key="tab.id"
          class="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px"
          :class="[
            activeLeftTab === tab.id
              ? 'text-text border-black'
              : 'text-text-muted border-transparent',
            tab.locked ? 'opacity-40 cursor-not-allowed' : 'hover:text-text cursor-pointer',
          ]"
          @click="!tab.locked && (activeLeftTab = tab.id)"
          :title="tab.locked ? 'Solve the problem first' : ''"
        >
          {{ tab.label }}
          <svg v-if="tab.locked" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
      </div>

      <!-- Left content -->
      <div class="flex-1 overflow-y-auto">

        <!-- Problem -->
        <div v-if="activeLeftTab === 'problem'" class="p-6 flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2.5">
              <span
                class="text-[11px] font-mono px-1.5 py-0.5 rounded border"
                :class="{
                  'text-green-600 border-green-600': problem.difficulty === 'easy',
                  'text-orange-600 border-orange-600': problem.difficulty === 'medium',
                  'text-red-600 border-red-600': problem.difficulty === 'hard',
                }"
              >{{ problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1) }}</span>
            </div>
            <h2 class="text-2xl font-semibold text-text tracking-tight">{{ problem.title }}</h2>
          </div>

          <div class="problem-description text-sm text-text-dim leading-relaxed" v-html="problem.description" />

          <div class="flex flex-col gap-2.5">
            <div v-for="(ex, i) in examples" :key="i" class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <p class="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-0.5">Example {{ i + 1 }}</p>
              <p class="font-mono text-[12.5px]"><span class="text-text-muted">Input: </span><span class="text-text">{{ ex.input }}</span></p>
              <p class="font-mono text-[12.5px]"><span class="text-text-muted">Output: </span><span class="text-text">{{ ex.output }}</span></p>
              <p v-if="ex.explanation" class="text-[12px] text-text-muted">{{ ex.explanation }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Constraints</p>
            <ul class="flex flex-col gap-1.5">
              <li v-for="c in constraints" :key="c" class="flex items-start gap-2.5">
                <span class="mt-[7px] w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                <code class="font-mono text-[12.5px] text-text-dim">{{ c }}</code>
              </li>
            </ul>
          </div>
        </div>

        <!-- Comments -->
        <div v-else-if="activeLeftTab === 'comments'" class="p-6">
          <p class="text-sm text-text-muted italic">No comments yet.</p>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="w-px bg-gray-200 shrink-0" />

    <!-- RIGHT PANEL -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <PhasedLearningPanel
        :clues="problem?.clues ?? []"
        :brute-seed-messages="bruteSeedMessages"
        :optimize-seed-messages="optimizeSeedMessages"
        :brute-hint="problem?.bruteHint"
        :optimize-hint="problem?.optimizeHint"
        :brute-phase-complete="brutePhaseComplete"
        :optimize-phase-complete="optimizePhaseComplete"
        :on-send-message="onSendMessage"
        @reveal-highlight="onRevealHighlight"
        @advance-phase="onAdvancePhase"
      >
        <template #attack>
          <div class="flex-1 flex flex-col overflow-hidden" style="background:#1a1a1a">

            <!-- CodeEditor fills all space above bottom bar -->
            <div class="relative flex-1 min-h-0 overflow-hidden">
              <CodeEditor v-model="codeContent" />
              <button
                class="absolute top-2.5 right-3 flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium transition-all z-10"
                style="color:rgba(255,255,255,0.25);background:transparent"
                onmouseover="this.style.color='rgba(255,255,255,0.6)';this.style.background='rgba(255,255,255,0.07)'"
                onmouseout="this.style.color='rgba(255,255,255,0.25)';this.style.background='transparent'"
                @click="resetCode"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                Reset
              </button>
            </div>

            <!-- Console panel — slides up from bottom -->
            <div
              class="shrink-0 overflow-hidden transition-all duration-300 border-t border-white/[0.07] flex flex-col"
              :style="consoleOpen ? 'height:240px' : 'height:0'"
              style="background:#1a1a1a"
            >
              <!-- Console tab bar -->
              <div class="flex items-center shrink-0 px-3 border-b border-white/[0.07]" style="height:38px">
                <button
                  class="flex items-center gap-1.5 px-2.5 py-1.5 text-[12.5px] font-medium transition-colors rounded"
                  :style="consoleTab === 'testcase' ? 'color:#e5e5e5' : 'color:rgba(255,255,255,0.35)'"
                  @click="consoleTab = 'testcase'"
                >
                  Test Case
                </button>
                <div class="w-px h-3.5 mx-1 bg-white/10" />
                <button
                  class="flex items-center gap-1.5 px-2.5 py-1.5 text-[12.5px] font-medium transition-colors rounded"
                  :style="consoleTab === 'output' ? 'color:#e5e5e5' : 'color:rgba(255,255,255,0.35)'"
                  @click="consoleTab = 'output'"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                  Output
                </button>
              </div>

              <!-- Test Case panel -->
              <div v-if="consoleTab === 'testcase'" class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
                <!-- Case tabs -->
                <div class="flex items-center gap-1">
                  <button
                    v-for="(c, i) in RUN_TEST_CASES"
                    :key="i"
                    class="px-3 py-1 rounded text-[12.5px] font-medium transition-all"
                    :style="selectedCase === i
                      ? 'background:rgba(255,255,255,0.12);color:#e5e5e5'
                      : 'color:rgba(255,255,255,0.4);'"
                    @click="selectedCase = i"
                  >Case {{ i + 1 }}</button>
                </div>
                <!-- Input display -->
                <div class="flex flex-col gap-2.5">
                  <template v-if="RUN_TEST_CASES[selectedCase]">
                    <div v-for="(arg, pi) in RUN_TEST_CASES[selectedCase].args" :key="pi">
                      <p class="text-[12px] mb-1" style="color:rgba(255,255,255,0.45)">arg{{ pi + 1 }} =</p>
                      <div
                        class="rounded-md px-3 py-2 text-[13px] font-mono border"
                        style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.8);border-color:rgba(255,255,255,0.1)"
                      >{{ JSON.stringify(arg) }}</div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Output panel -->
              <div v-else class="flex-1 overflow-y-auto">
                <TestResults v-if="hasRun && testResults.length" :results="testResults" />
                <div v-else-if="runError" class="p-4">
                  <div class="rounded-lg px-3 py-2.5 text-[12px] font-mono leading-relaxed whitespace-pre-wrap"
                    style="background:rgba(248,113,113,0.08);color:#f87171;border-left:2px solid rgba(248,113,113,0.4)">{{ runError }}</div>
                </div>
                <div v-else class="flex items-center justify-center h-full">
                  <p class="text-[12px] italic" style="color:rgba(255,255,255,0.2)">Run your code to see output.</p>
                </div>
              </div>
            </div>

            <!-- Bottom bar -->
            <div class="flex items-center justify-between px-4 py-2.5 shrink-0 border-t border-white/[0.07]" style="background:#1a1a1a">
              <!-- Console toggle -->
              <button
                class="flex items-center gap-1.5 text-[13px] font-medium transition-colors px-1"
                :style="consoleOpen ? 'color:rgba(255,255,255,0.7)' : 'color:rgba(255,255,255,0.35)'"
                @click="consoleOpen = !consoleOpen"
              >
                Console
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                  :style="consoleOpen ? 'transform:rotate(180deg)' : ''"
                  style="transition:transform 0.2s"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <!-- Run + Submit -->
              <div class="flex items-center gap-2">
                <button
                  class="text-[13px] font-medium px-4 py-1.5 rounded-md transition-all disabled:opacity-40"
                  style="color:rgba(255,255,255,0.5);background:rgba(255,255,255,0.06)"
                  :disabled="runLoading || isSubmitting"
                  @click="runCode"
                >
                  {{ runLoading ? 'Running…' : 'Run' }}
                </button>
                <button
                  class="text-[13px] font-semibold px-4 py-1.5 rounded-md transition-all disabled:opacity-40"
                  style="background:#2cbb5d;color:#fff"
                  :disabled="runLoading || isSubmitting"
                  @click="submitCode"
                >
                  {{ isSubmitting ? 'Submitting…' : 'Submit' }}
                </button>
              </div>
            </div>

          </div>
        </template>
      </PhasedLearningPanel>
    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps({
  height:    { type: String,  default: 'calc(100vh - 4rem)' },
  embedded:  { type: Boolean, default: false },
  problemId: { type: String,  default: '' },
})
import CodeEditor from '@/components/sandbox/CodeEditor.vue'
import TestResults from '@/components/sandbox/TestResults.vue'
import PhasedLearningPanel from '@/components/PhasedLearningPanel.vue'
import { usePyodide } from '@/composables/usePyodide'
import { PROBLEMS } from '@/data/problems'

const TWO_SUM_FALLBACK = PROBLEMS.find(p => p.id === 'two-sum')

const problem = computed(() =>
  (props.problemId ? PROBLEMS.find(p => p.id === props.problemId) : null)
  ?? TWO_SUM_FALLBACK
)

const difficultyAccent = computed(() => {
  const d = problem.value?.difficulty
  if (d === 'easy') return '#16a34a'
  if (d === 'medium') return '#ea580c'
  if (d === 'hard') return '#dc2626'
  return '#6366f1'
})

const activeLeftTab = ref('problem')

const DEMO_CODE = `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i`

const codeContent  = ref(props.embedded ? DEMO_CODE : (problem.value?.starterCode ?? ''))
const hasRun       = ref(false)
const runLoading   = ref(false)
const runError     = ref(null)
const consoleOpen  = ref(false)
const consoleTab   = ref('testcase')
const selectedCase = ref(0)

const { runTests } = usePyodide()

const leftTabs = [
  { id: 'problem',  label: 'Problem',  locked: false },
  { id: 'solution', label: 'Solution', locked: false },
  { id: 'comments', label: 'Comments', locked: false },
]

const examples    = computed(() => problem.value?.examples    ?? [])
const constraints = computed(() => problem.value?.constraints ?? [])

// ── Phased learning panel ──────────────────────────────────────────────────

const bruteSeedMessages    = computed(() => [
  { role: 'bot', text: problem.value?.bruteSeedMessage ?? "Good. Now let's think brute force — what's the most straightforward solution, even if it's slow?" }
])
const optimizeSeedMessages = computed(() => [
  { role: 'bot', text: problem.value?.optimizeSeedMessage ?? "You've got a working solution. Now let's push it. What's the bottleneck, and what data structure might help you eliminate it?" }
])

const brutePhaseComplete   = ref(false)
const optimizePhaseComplete = ref(false)

async function onSendMessage(text, phase) {
  await new Promise(r => setTimeout(r, 750))
  return phase === 'brute'
    ? "That's a start. What's the time complexity, and can we do better?"
    : "Right direction. What data structure gives you O(1) lookup so you can drop the inner loop?"
}

function onRevealHighlight(clueId) {
  // TODO: highlight matching span in left panel once problem descriptions include data-clue-id spans
  console.log('reveal-highlight', clueId)
}

function onAdvancePhase({ phase, data }) {
  console.log('advance-phase', phase, data)
}

// ── Code execution (Attack tab) ────────────────────────────────────────────

const testResults = ref([])

const RUN_TEST_CASES    = computed(() => (problem.value?.testCases ?? []).slice(0, 2))
const SUBMIT_TEST_CASES = computed(() => problem.value?.testCases ?? [])

const isSubmitting = ref(false)

function fireConfetti() {
  const burst = (opts) => confetti({ particleCount: 60, spread: 70, ticks: 200, gravity: 1.1, scalar: 0.9, ...opts })
  burst({ origin: { x: 0.3, y: 0.6 }, angle: 60 })
  setTimeout(() => burst({ origin: { x: 0.7, y: 0.6 }, angle: 120 }), 120)
}

async function execute(cases) {
  runError.value = null
  testResults.value = []
  consoleOpen.value = true
  consoleTab.value = 'output'
  try {
    testResults.value = await runTests(codeContent.value, problem.value?.functionName ?? 'two_sum', cases)
    hasRun.value = true
  } catch (e) {
    const msg = e.message ?? String(e)
    runError.value = msg.includes('timed out')
      ? 'Error: Execution timed out after 5s.\nCheck for infinite loops or very slow code.'
      : `Error: ${msg}`
    hasRun.value = true
  }
}

async function runCode() {
  runLoading.value = true
  await execute(RUN_TEST_CASES.value)
  runLoading.value = false
}

async function submitCode() {
  isSubmitting.value = true
  await execute(SUBMIT_TEST_CASES.value)
  if (testResults.value.length && testResults.value.every(t => t.passed)) fireConfetti()
  isSubmitting.value = false
}

function resetCode() {
  codeContent.value = problem.value?.starterCode ?? ''
  testResults.value = []
  runError.value = null
  hasRun.value = false
  consoleOpen.value = false
  consoleTab.value = 'testcase'
  selectedCase.value = 0
}
</script>

<style scoped>
.problem-description :deep(p) {
  margin-bottom: 0.65rem;
}
.problem-description :deep(p:last-child) {
  margin-bottom: 0;
}
.problem-description :deep(code) {
  background: #f0f0ee;
  border-radius: 4px;
  padding: 1px 5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  color: #1a1a1a;
}
.problem-description :deep(strong) {
  color: #1a1a1a;
  font-weight: 600;
}
.problem-description :deep(em) {
  font-style: italic;
}
</style>
