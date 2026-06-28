<template>
  <div class="bg-[#f5f5f2] p-4" :style="`height: ${props.height}`">
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
              <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Problem 1</span>
              <span class="text-[11px] font-medium text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">Easy</span>
            </div>
            <h2 class="text-2xl font-semibold text-text tracking-tight">Two Sum</h2>
          </div>

          <div class="flex flex-col gap-3 text-sm text-text-dim leading-relaxed">
            <p>Given an array of integers <code class="bg-[#f5f5f2] px-1.5 py-0.5 rounded font-mono text-[12px] text-text">nums</code> and an integer <code class="bg-[#f5f5f2] px-1.5 py-0.5 rounded font-mono text-[12px] text-text">target</code>, return <em>indices of the two numbers such that they add up to</em> <code class="bg-[#f5f5f2] px-1.5 py-0.5 rounded font-mono text-[12px] text-text">target</code>.</p>
            <p>You may assume that each input would have <strong class="text-text font-semibold">exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.</p>
          </div>

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

      <!-- Tab bar -->
      <div class="flex bg-white border-b border-gray-100 px-4 pt-3 gap-0.5 shrink-0">
        <button
          v-for="tab in rightTabs"
          :key="tab.id"
          class="flex items-center gap-1.5 px-3 py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px"
          :class="[
            activeRightTab === tab.id
              ? 'text-text border-black'
              : 'text-text-muted border-transparent',
            unlockedTabs.includes(tab.id)
              ? 'hover:text-text cursor-pointer'
              : 'opacity-35 cursor-not-allowed',
          ]"
          @click="unlockedTabs.includes(tab.id) && (activeRightTab = tab.id)"
          :title="!unlockedTabs.includes(tab.id) ? 'Complete the previous step first' : ''"
        >
          {{ tab.label }}
          <svg v-if="!unlockedTabs.includes(tab.id)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
      </div>

      <!-- Right content -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Chat tabs: Dissect / Brute Force / Optimize -->
        <template v-if="activeRightTab !== 'attack'">
          <!-- Messages -->
          <div class="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
            <div
              v-for="(msg, i) in chatMessages[activeRightTab]"
              :key="i"
              class="flex"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed"
                :class="msg.role === 'user'
                  ? 'bg-black text-white rounded-2xl rounded-br-sm'
                  : 'bg-white text-text-dim shadow-sm rounded-2xl rounded-bl-sm border border-gray-100'"
              >
                {{ msg.text }}
              </div>
            </div>
          </div>

          <!-- Next tab prompt -->
          <div class="border-t border-gray-100 bg-white px-5 py-3 shrink-0 flex items-center justify-between">
            <span class="text-[12px] text-text-muted">
              <template v-if="activeRightTab === 'dissect'">Ready? Move on to Brute Force.</template>
              <template v-else-if="activeRightTab === 'brute'">Got it working? Head to Optimize.</template>
              <template v-else-if="activeRightTab === 'optimize'">Now code it up in Attack.</template>
              <template v-else>You're done.</template>
            </span>
            <button
              class="flex items-center gap-1.5 text-[12.5px] font-semibold text-text hover:opacity-70 transition-opacity"
              @click="advanceTab"
            >
              Next
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </button>
          </div>
        </template>

        <!-- Attack tab -->
        <template v-else>
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
                <!-- Input fields -->
                <div class="flex flex-col gap-2.5">
                  <div v-for="(param, pi) in PARAM_NAMES" :key="pi">
                    <p class="text-[12px] mb-1" style="color:rgba(255,255,255,0.45)">{{ param }} =</p>
                    <div
                      class="rounded-md px-3 py-2 text-[13px] font-mono border"
                      style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.8);border-color:rgba(255,255,255,0.1)"
                    >{{ JSON.stringify(RUN_TEST_CASES[selectedCase].args[pi]) }}</div>
                  </div>
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

      </div>
    </div>

  </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps({
  height:   { type: String,  default: 'calc(100vh - 4rem)' },
  embedded: { type: Boolean, default: false },
})
import CodeEditor from '@/components/sandbox/CodeEditor.vue'
import TestResults from '@/components/sandbox/TestResults.vue'
import { usePyodide } from '@/composables/usePyodide'

const activeLeftTab  = ref('problem')
const activeRightTab = ref('dissect')
const unlockedTabs   = ref(['dissect', 'brute', 'optimize', 'attack'])
const BLANK = `def two_sum(nums, target):\n    pass`

const DEMO_CODE = `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i`

const codeContent    = ref(props.embedded ? DEMO_CODE : BLANK)
const hasRun         = ref(false)
const runLoading     = ref(false)
const runError       = ref(null)
const consoleOpen    = ref(false)
const consoleTab     = ref('testcase')
const selectedCase   = ref(0)

const PARAM_NAMES = ['nums', 'target']

const { runTests } = usePyodide()

const leftTabs = [
  { id: 'problem',  label: 'Problem',  locked: false },
  { id: 'solution', label: 'Solution', locked: false },
  { id: 'comments', label: 'Comments', locked: false },
]

const rightTabs = [
  { id: 'dissect',  label: 'Dissect'     },
  { id: 'brute',    label: 'Brute Force' },
  { id: 'optimize', label: 'Optimize'    },
  { id: 'attack',   label: 'Attack'      },
]

const examples = [
  { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]',  explanation: 'nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].' },
  { input: 'nums = [3,2,4], target = 6',     output: '[1,2]',  explanation: null },
  { input: 'nums = [3,3], target = 6',       output: '[0,1]',  explanation: null },
]

const constraints = [
  '2 <= nums.length <= 10⁴',
  '-10⁹ <= nums[i] <= 10⁹',
  '-10⁹ <= target <= 10⁹',
  'Only one valid answer exists.',
]

const DEMO_MESSAGES = {
  dissect: [
    { role: 'ai',   text: "Let's dissect this problem. Before writing any code — what are the inputs and outputs of this function? Walk me through what you notice." },
    { role: 'user', text: "I just iterate through the array with a hash map — store each number's index and check for the complement." },
    { role: 'ai',   text: "Hold on — we're not at solutions yet. Let's make sure you actually understand the problem first. What are the inputs to this function?" },
    { role: 'user', text: "An array of integers and a target number." },
    { role: 'ai',   text: "And the output?" },
    { role: 'user', text: "The indices of the two numbers that add up to the target." },
    { role: 'ai',   text: "Good. The problem guarantees exactly one solution — what does that mean for edge cases you don't have to handle?" },
    { role: 'user', text: "I don't need to worry about no solution existing or multiple valid pairs." },
    { role: 'ai',   text: "Exactly. And can you use the same element twice?" },
    { role: 'user', text: "No — two distinct indices." },
    { role: 'ai',   text: "Perfect. Now you actually understand the problem. Head to Brute Force." },
  ],
  brute: [
    { role: 'ai',   text: "Good. Now let's think brute force — what's the most straightforward solution, even if it's slow?" },
    { role: 'user', text: "Just use a hash map and look up the complement in one pass." },
    { role: 'ai',   text: "That's actually the optimal solution — let's save it. For brute force, pretend you've never heard of a hash map. What's the most literal reading of the problem?" },
    { role: 'user', text: "Check every possible pair of numbers and see if they sum to the target." },
    { role: 'ai',   text: "Exactly. How would you do that in code?" },
    { role: 'user', text: "Two nested loops. For every i, check every j after it to see if nums[i] + nums[j] equals target." },
    { role: 'ai',   text: "Right. What's the time complexity?" },
    { role: 'user', text: "O(n²) — every pair is a constant operation, and there are about n²/2 pairs." },
    { role: 'ai',   text: "Good. This works but it's slow. What exactly are you recalculating on every inner iteration that you could store instead? Head to Optimize." },
  ],
  optimize: [
    { role: 'ai',   text: "You've got a working solution. Now let's push it. What's the bottleneck in the brute force?" },
    { role: 'user', text: "The inner loop — for each element I'm scanning the rest of the array to find its complement." },
    { role: 'ai',   text: "Right. What data structure gives you O(1) lookup instead of O(n) search?" },
    { role: 'user', text: "A hash map." },
    { role: 'ai',   text: "Good. So what do you store in the map, and what do you look up at each step?" },
    { role: 'user', text: "I store each number mapped to its index. At each element, I check if target minus nums[i] is already in the map." },
    { role: 'ai',   text: "That's it. One pass, O(n) time, O(n) space. If the complement is in the map, you're done — return its index and i. Go implement it in the Attack tab." },
  ],
}

const FRESH_MESSAGES = {
  dissect:  [{ role: 'ai', text: "Let's dissect this problem. Before writing any code — what are the inputs and outputs of this function? Walk me through what you notice." }],
  brute:    [{ role: 'ai', text: "Good. Now let's think brute force — what's the most straightforward solution, even if it's slow?" }],
  optimize: [{ role: 'ai', text: "You've got a working solution. Now let's push it. What's the bottleneck, and what data structure might help you eliminate it?" }],
}

const chatMessages = reactive(
  props.embedded
    ? { dissect: [...DEMO_MESSAGES.dissect], brute: [...DEMO_MESSAGES.brute], optimize: [...DEMO_MESSAGES.optimize] }
    : { dissect: [...FRESH_MESSAGES.dissect], brute: [...FRESH_MESSAGES.brute], optimize: [...FRESH_MESSAGES.optimize] }
)

const testResults = ref([])

const TAB_ORDER = ['dissect', 'brute', 'optimize', 'attack']

function advanceTab() {
  const idx = TAB_ORDER.indexOf(activeRightTab.value)
  if (idx < TAB_ORDER.length - 1) activeRightTab.value = TAB_ORDER[idx + 1]
}

const RUN_TEST_CASES = [
  { label: 'nums=[2,7,11,15], target=9', args: [[2,7,11,15], 9], expected: [0,1] },
  { label: 'nums=[3,2,4], target=6',     args: [[3,2,4], 6],     expected: [1,2] },
]

const SUBMIT_TEST_CASES = [
  { label: 'nums=[2,7,11,15], target=9',   args: [[2,7,11,15], 9],   expected: [0,1] },
  { label: 'nums=[3,2,4], target=6',       args: [[3,2,4], 6],       expected: [1,2] },
  { label: 'nums=[3,3], target=6',         args: [[3,3], 6],         expected: [0,1] },
  { label: 'Answer at end of array',       args: [[1,2,3,4,5,6], 11], expected: [4,5] },
  { label: 'Negative numbers',             args: [[-3,4,3,90], 0],   expected: [0,2] },
  { label: 'Two element array',            args: [[1,9], 10],         expected: [0,1] },
  { label: 'Large values',                 args: [[1000000000, 999999999], 1999999999], expected: [0,1] },
]

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
    testResults.value = await runTests(codeContent.value, 'two_sum', cases)
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
  await execute(RUN_TEST_CASES)
  runLoading.value = false
}

async function submitCode() {
  isSubmitting.value = true
  await execute(SUBMIT_TEST_CASES)
  if (testResults.value.length && testResults.value.every(t => t.passed)) fireConfetti()
  isSubmitting.value = false
}

function resetCode() {
  codeContent.value = BLANK
  testResults.value = []
  runError.value = null
  hasRun.value = false
  consoleOpen.value = false
  consoleTab.value = 'testcase'
  selectedCase.value = 0
}
</script>
