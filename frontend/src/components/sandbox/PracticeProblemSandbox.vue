<script setup lang="ts">
import { ref } from 'vue'
import CodeEditor from './CodeEditor.vue'
import TestResults from './TestResults.vue'
import SolutionCodeBlock from './SolutionCodeBlock.vue'
import { usePyodide } from '@/composables/usePyodide'
import type { TestResult } from '@/composables/usePyodide'
import type { Problem } from '@/data/problems'

const props = defineProps<{ problem: Problem | null }>()

const consoleOpen = ref(false)
const sandboxCode = ref(props.problem ? props.problem.starterCode : '# Write Python here...')
const sandboxOutput = ref<string | null>(null)
const sandboxLoading = ref(false)
const testResults = ref<TestResult[]>([])
const expanded = ref(false)
const solutionConfirmOpen = ref(false)
const explanationOpen = ref(false)

const { runPython, runTests } = usePyodide()

function resetSandbox() {
  sandboxCode.value = props.problem ? props.problem.starterCode : '# Write Python here...'
  testResults.value = []
  sandboxOutput.value = null
  consoleOpen.value = false
}

async function runSandbox() {
  sandboxLoading.value = true
  sandboxOutput.value = null
  testResults.value = []
  consoleOpen.value = true
  try {
    if (props.problem) {
      testResults.value = await runTests(
        sandboxCode.value,
        props.problem.functionName,
        props.problem.testCases,
        props.problem.runnerSetup,
      )
    } else {
      sandboxOutput.value = await runPython(sandboxCode.value)
    }
  } catch (e: any) {
    const msg = e.message ?? String(e)
    sandboxOutput.value = msg.includes('timed out')
      ? `Error: Execution timed out after 5s.\nCheck for infinite loops or very slow code.`
      : `Error: ${msg}`
  } finally {
    sandboxLoading.value = false
  }
}

function confirmRevealSolution() {
  if (!props.problem?.solutionCode) return
  sandboxCode.value = props.problem.solutionCode
  solutionConfirmOpen.value = false
  explanationOpen.value = true
}
</script>

<template>
  <div
    v-if="problem"
    class="flex flex-col gap-4 relative"
    :style="expanded ? 'left:50%;transform:translateX(-50%);width:min(72rem, calc(100vw - 17rem));transition:width 0.25s ease' : ''"
  >

    <!-- Problem info card (white) -->
    <div class="rounded-xl bg-white px-6 py-5 flex flex-col gap-5 shadow-sm">
      <!-- Title + difficulty -->
      <div class="flex items-center gap-3">
        <span class="text-2xl font-semibold text-text">{{ problem.title }}</span>
        <span
          class="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shrink-0"
          :style="problem.difficulty === 'easy'
            ? 'background:#dcfce7;color:#16a34a'
            : problem.difficulty === 'medium'
              ? 'background:#fef9c3;color:#ca8a04'
              : 'background:#fee2e2;color:#dc2626'"
        >{{ problem.difficulty }}</span>
      </div>
      <!-- Description -->
      <p class="text-[14px] leading-relaxed text-text-dim" v-html="problem.description" />
      <!-- Examples -->
      <div v-if="problem.examples?.length" class="flex flex-col gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-text-muted">Examples</span>
        <div
          v-for="(ex, i) in problem.examples"
          :key="i"
          class="rounded-lg px-4 py-3 flex flex-col gap-1.5 text-[12.5px] font-mono bg-gray-50 border border-gray-100"
        >
          <div><span class="text-text-muted">Input: </span><span class="text-text">{{ ex.input }}</span></div>
          <div><span class="text-text-muted">Output: </span><span class="text-text">{{ ex.output }}</span></div>
          <div v-if="ex.explanation" class="font-sans text-[12px] text-text-muted mt-0.5">{{ ex.explanation }}</div>
        </div>
      </div>
      <!-- Constraints -->
      <div v-if="problem.constraints.length" class="flex flex-col gap-1.5">
        <span class="text-xs font-semibold uppercase tracking-wider text-text-muted">Constraints</span>
        <ul class="flex flex-col gap-1">
          <li v-for="c in problem.constraints" :key="c" class="text-[13px] text-text-dim font-mono">{{ c }}</li>
        </ul>
      </div>
    </div>

    <!-- Dark editor card -->
    <div class="rounded-xl overflow-hidden flex flex-col relative" style="background:#1e1e1e;box-shadow:0 4px 24px rgba(0,0,0,0.18)">
      <!-- Title bar: Solution (left) + Expand / Reset (right) -->
      <div class="flex items-center justify-between px-4 py-2.5 shrink-0" style="border-bottom:1px solid rgba(255,255,255,0.06);background:#252526">
        <button
          v-if="problem.solutionCode"
          @click="solutionConfirmOpen = true"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded transition-all text-[11px]"
          style="color:rgba(255,255,255,0.3)"
          title="Reveal the reference solution"
          onmouseover="this.style.color='rgba(255,255,255,0.65)';this.style.background='rgba(255,255,255,0.07)'"
          onmouseout="this.style.color='rgba(255,255,255,0.3)';this.style.background='transparent'"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          Solution
        </button>
        <div v-else />

        <div class="flex items-center gap-1">
          <button
            class="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded transition-all text-[11px]"
            style="color:rgba(255,255,255,0.3)"
            :title="expanded ? 'Collapse' : 'Expand'"
            onmouseover="this.style.color='rgba(255,255,255,0.65)';this.style.background='rgba(255,255,255,0.07)'"
            onmouseout="this.style.color='rgba(255,255,255,0.3)';this.style.background='transparent'"
            @click="expanded = !expanded"
          >
            <svg v-if="!expanded" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6H3M21 15h-6v6M21 3l-7 7M3 21l7-7"/></svg>
            {{ expanded ? 'Collapse' : 'Expand' }}
          </button>
          <button
            @click="resetSandbox"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded transition-all text-[11px]"
            style="color:rgba(255,255,255,0.3)"
            title="Reset to starter code"
            onmouseover="this.style.color='rgba(255,255,255,0.65)';this.style.background='rgba(255,255,255,0.07)'"
            onmouseout="this.style.color='rgba(255,255,255,0.3)';this.style.background='transparent'"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Reset
          </button>
        </div>
      </div>
      <!-- Editor fills remaining height -->
      <div class="flex-1 min-h-0">
        <CodeEditor v-model="sandboxCode" />
      </div>
      <!-- Bottom bar -->
      <div class="flex items-center justify-between px-4 py-2.5 shrink-0" style="border-top:1px solid rgba(255,255,255,0.06);background:#252526">
        <!-- Console toggle -->
        <button
          class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
          :style="consoleOpen
            ? 'background:rgba(255,255,255,0.12);color:#d4d4d4'
            : 'background:transparent;color:rgba(255,255,255,0.4)'"
          @click="consoleOpen = !consoleOpen"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
          <span class="text-[12px] font-medium">Test Results</span>
          <span
            v-if="testResults.length"
            class="text-[10px] font-bold px-1.5 py-0.5 rounded"
            :style="testResults.every(r => r.passed)
              ? 'background:rgba(74,222,128,0.15);color:#4ade80'
              : 'background:rgba(248,113,113,0.15);color:#f87171'"
          >{{ testResults.filter(r => r.passed).length }}/{{ testResults.length }}</span>
        </button>
        <button
          @click="runSandbox"
          :disabled="sandboxLoading"
          class="flex items-center gap-2 text-[13px] font-semibold px-5 py-2 rounded-md transition-all disabled:opacity-40"
          style="background:#16a34a;color:#fff;box-shadow:0 1px 8px rgba(22,163,74,0.35)"
        >
          <svg v-if="!sandboxLoading" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          {{ sandboxLoading ? 'Running…' : 'Run' }}
        </button>
      </div>

      <!-- Solution reveal — confirm popup, scoped to the editor card only -->
      <div
        v-if="solutionConfirmOpen"
        class="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
        @click.self="solutionConfirmOpen = false"
      >
        <div class="bg-white rounded-xl shadow-lg w-64 p-3.5 flex flex-col gap-2.5">
          <div class="flex items-center justify-between">
            <span class="text-[12px] font-semibold text-text">Reveal solution?</span>
            <button class="text-text-muted hover:text-text transition-colors" @click="solutionConfirmOpen = false">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-[12px] text-text-dim leading-relaxed">
            This overwrites your code in the editor. Reset can bring back the starter code, but not your attempt.
          </p>
          <div class="flex items-center justify-end gap-1.5">
            <button class="text-[12px] font-medium px-3 py-1 rounded-lg text-text-muted hover:text-text transition-colors" @click="solutionConfirmOpen = false">Cancel</button>
            <button class="text-[12px] font-semibold px-3 py-1 rounded-lg bg-accent text-white" @click="confirmRevealSolution">Reveal</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Test results — now a full-width block below the editor -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="consoleOpen" class="rounded-xl overflow-hidden flex flex-col max-h-96" style="background:#1e1e1e;box-shadow:0 4px 24px rgba(0,0,0,0.18)">
        <!-- Console header -->
        <div class="px-4 py-3 flex items-center justify-between shrink-0" style="background:#252526;border-bottom:1px solid rgba(255,255,255,0.06)">
          <div class="flex items-center gap-2.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:rgba(255,255,255,0.4)">
              <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
            <span class="text-[12px] font-semibold" style="color:rgba(255,255,255,0.6)">Test Results</span>
          </div>
          <button
            @click="consoleOpen = false"
            class="w-6 h-6 flex items-center justify-center rounded transition-all"
            style="color:rgba(255,255,255,0.3)"
            onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.color='rgba(255,255,255,0.7)'"
            onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,0.3)'"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <!-- Console content -->
        <div class="flex-1 overflow-y-auto">
          <!-- Test results (normal run) -->
          <TestResults v-if="testResults.length" :results="testResults" />
          <!-- Error or stdout output -->
          <div v-else-if="sandboxOutput" class="p-4 flex flex-col gap-2">
            <div
              class="rounded-lg px-3 py-2.5 text-[12px] font-mono leading-relaxed whitespace-pre-wrap"
              :style="sandboxOutput.startsWith('Error:')
                ? 'background:rgba(248,113,113,0.08);color:#f87171;border-left:2px solid rgba(248,113,113,0.4)'
                : 'background:rgba(255,255,255,0.04);color:#4ade80'"
            >{{ sandboxOutput }}</div>
          </div>
          <!-- Empty state -->
          <div v-else class="flex flex-col items-center justify-center gap-3 py-12 px-6">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(255,255,255,0.05)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:rgba(255,255,255,0.2)">
                <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
            </div>
            <div class="text-center">
              <p class="text-[12px] font-medium" style="color:rgba(255,255,255,0.25)">No output yet</p>
              <p class="text-[11px] mt-1" style="color:rgba(255,255,255,0.15)">Run your code to see results</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Solution & Explanation — collapsed by default -->
    <div v-if="problem.solutionCode" class="rounded-xl overflow-hidden" style="background:#1e1e1e;box-shadow:0 4px 24px rgba(0,0,0,0.18)">
      <button
        class="w-full flex items-center justify-between gap-3 px-4 py-3 text-[13px] font-medium transition-colors"
        style="color:rgba(255,255,255,0.7)"
        @click="explanationOpen = !explanationOpen"
      >
        Solution & Explanation
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="shrink-0 transition-transform duration-200" :class="explanationOpen ? 'rotate-180' : ''">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <div v-if="explanationOpen" class="px-4 pb-4 pt-1 flex flex-col gap-4" style="border-top:1px solid rgba(255,255,255,0.06)">

        <!-- Time / Space complexity -->
        <div v-if="problem.solutionComplexity" class="flex flex-col gap-1.5 pt-3">
          <div class="flex items-baseline gap-2">
            <span class="font-mono text-[12px]" style="color:rgba(255,255,255,0.4)">Time Complexity:</span>
            <span class="text-[13px] font-semibold" style="color:#d4d4d4">{{ problem.solutionComplexity.time }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="font-mono text-[12px]" style="color:rgba(255,255,255,0.4)">Space Complexity:</span>
            <span class="text-[13px] font-semibold" style="color:#d4d4d4">{{ problem.solutionComplexity.space }}</span>
          </div>
        </div>

        <!-- Caveat (optional) -->
        <div v-if="problem.solutionCaveat" class="text-[12px] leading-relaxed px-3 py-2 rounded-lg" style="background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.5);border-left:2px solid rgba(255,255,255,0.15)">
          <span class="font-semibold" style="color:rgba(255,255,255,0.65)">Caveat: </span>{{ problem.solutionCaveat }}
        </div>

        <!-- Implementation -->
        <div class="flex flex-col gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest" style="color:rgba(255,255,255,0.3)">Implementation — Python</span>
          <SolutionCodeBlock :code="problem.solutionCode" />
        </div>

        <!-- Explanation -->
        <div v-if="problem.solutionExplanation" class="flex flex-col gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest" style="color:rgba(255,255,255,0.3)">Explanation</span>
          <div class="text-[13px] leading-relaxed" style="color:rgba(255,255,255,0.6)" v-html="problem.solutionExplanation" />
        </div>

      </div>
    </div>

  </div>
</template>
