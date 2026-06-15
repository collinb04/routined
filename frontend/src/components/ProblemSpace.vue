<template>
  <div class="flex overflow-hidden bg-[#f5f5f2]" style="height: calc(100vh - 4rem)">

    <!-- LEFT PANEL -->
    <div class="flex flex-col bg-white shrink-0" style="width: 45%">

      <!-- Tab bar -->
      <div class="flex border-b border-gray-100 px-4 pt-3 gap-0.5 shrink-0">
        <button
          v-for="tab in leftTabs"
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
          <div class="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3" ref="chatScrollEl">
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

          <!-- Input -->
          <div class="border-t border-gray-200 bg-white px-4 py-3 flex gap-2 items-end shrink-0">
            <textarea
              v-model="chatInput"
              rows="1"
              placeholder="Reply..."
              class="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-black/10 bg-[#f5f5f2]"
              @keydown.enter.exact.prevent="sendMessage"
            />
            <button
              class="bg-black text-white rounded-xl p-2.5 hover:opacity-85 transition-opacity shrink-0"
              @click="sendMessage"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
              </svg>
            </button>
          </div>
        </template>

        <!-- Attack tab -->
        <template v-else>
          <div class="flex-1 flex flex-col overflow-hidden">

            <!-- Code editor -->
            <div class="flex-1 flex flex-col bg-[#1a1a1a] overflow-hidden" style="min-height: 0">
              <div class="flex items-center px-5 py-2.5 border-b border-white/10 shrink-0">
                <span class="text-[11px] font-mono text-gray-500">solution.py</span>
                <span class="ml-auto text-[10px] font-semibold uppercase tracking-widest text-gray-600">Python</span>
              </div>
              <textarea
                v-model="codeContent"
                class="flex-1 w-full bg-transparent text-[#d4d4d4] font-mono text-[13px] leading-relaxed p-5 resize-none focus:outline-none"
                placeholder="# Write your solution here..."
                spellcheck="false"
              />
            </div>

            <!-- Run code bar -->
            <div class="bg-[#141414] border-t border-white/10 px-5 py-3 flex items-center gap-4 shrink-0">
              <button
                class="flex items-center gap-2 bg-white text-black text-[13px] font-semibold px-4 py-2 rounded-lg hover:opacity-85 transition-opacity"
                @click="runCode"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Run Code
              </button>
              <span v-if="hasRun" class="text-[12px] text-gray-500">
                {{ testResults.filter(t => t.passed).length }} / {{ testResults.length }} tests passed
              </span>
            </div>

            <!-- Test results -->
            <div class="bg-[#111111] border-t border-white/10 shrink-0 overflow-y-auto" style="height: 176px">
              <div class="px-5 py-2.5 border-b border-white/10 shrink-0">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Test Results</span>
              </div>
              <div v-if="!hasRun" class="flex items-center justify-center h-24">
                <p class="text-xs text-gray-700 italic">Run your code to see results.</p>
              </div>
              <div v-else class="flex flex-col divide-y divide-white/5">
                <div v-for="(test, i) in testResults" :key="i" class="flex items-center gap-3 px-5 py-3">
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="test.passed ? 'bg-green-400' : 'bg-red-400'" />
                  <span class="font-mono text-[11.5px] text-gray-400">{{ test.label }}</span>
                  <span class="ml-auto text-[11px] font-semibold shrink-0" :class="test.passed ? 'text-green-400' : 'text-red-500'">
                    {{ test.passed ? 'PASS' : 'FAIL' }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </template>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const activeLeftTab  = ref('problem')
const activeRightTab = ref('dissect')
const unlockedTabs   = ref(['dissect'])
const level          = ref('beginner')
const chatInput      = ref('')
const codeContent    = ref('')
const hasRun         = ref(false)
const chatScrollEl   = ref(null)

const leftTabs = [
  { id: 'problem',  label: 'Problem',  locked: false },
  { id: 'solution', label: 'Solution', locked: true  },
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

const chatMessages = reactive({
  dissect:  [{ role: 'ai', text: "Let's dissect this problem. Before writing any code — what are the inputs and outputs of this function? Walk me through what you notice." }],
  brute:    [{ role: 'ai', text: "Good. Now let's think brute force — what's the most straightforward solution, even if it's slow?" }],
  optimize: [{ role: 'ai', text: "You've got a working solution. Now let's push it. What's the bottleneck, and what data structure might help you eliminate it?" }],
})

const aiReplies = {
  dissect: [
    "Good observation. What constraints stand out to you? Are there any edge cases baked into the problem statement?",
    "Exactly. Now — if you had to describe the problem in one sentence to someone who's never seen it, what would you say?",
    "You're building the right mental model. What's the simplest brute-force approach you could take from here?",
  ],
  brute: [
    "Walk me through the steps. What happens at each iteration of your approach?",
    "Good. What's the time complexity of checking every pair? Think about nested loops.",
    "Right — O(n²). That's valid but slow. What information are you recalculating on every pass that you could store instead?",
  ],
  optimize: [
    "What data structure gives you O(1) lookup? How could you use that here?",
    "Exactly. What do you store in the hash map, and what do you look up at each step?",
    "You've got it. Now implement it in the Attack tab.",
  ],
}

const replyCursors = reactive({ dissect: 0, brute: 0, optimize: 0 })

const testResults = reactive([
  { label: 'nums = [2,7,11,15], target = 9  →  expected [0,1]', passed: false },
  { label: 'nums = [3,2,4], target = 6      →  expected [1,2]', passed: false },
  { label: 'nums = [3,3], target = 6        →  expected [0,1]', passed: false },
])

async function sendMessage() {
  const text = chatInput.value.trim()
  if (!text) return

  const tab = activeRightTab.value
  chatMessages[tab].push({ role: 'user', text })
  chatInput.value = ''

  await nextTick()
  scrollChat()

  const replies = aiReplies[tab] ?? []
  const reply = replies[replyCursors[tab] % replies.length] ?? "Keep going — what's your next thought?"
  replyCursors[tab]++

  chatMessages[tab].push({ role: 'ai', text: reply })

  await nextTick()
  scrollChat()
}

function scrollChat() {
  if (chatScrollEl.value) chatScrollEl.value.scrollTop = chatScrollEl.value.scrollHeight
}

function runCode() {
  hasRun.value = true
  testResults[0].passed = true
  testResults[1].passed = false
  testResults[2].passed = false
}
</script>
