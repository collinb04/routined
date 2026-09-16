<template>
  <div class="bg-[#f5f5f2] p-4 flex flex-col gap-3" :style="`height: ${props.height}; --color-accent: ${difficultyAccent}; --color-accent-hover: ${difficultyAccent};`">
  <div class="flex overflow-hidden rounded-2xl shadow-sm border border-black/6 flex-1 min-h-0" data-problem-space-bounds>

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
      <div ref="leftContentEl" class="flex-1 overflow-y-auto">

        <!-- Problem -->
        <div v-if="activeLeftTab === 'problem'" class="pt-3 px-6 pb-6 flex flex-col gap-5">
          <div class="flex items-center gap-2.5">
            <h2 class="text-2xl font-semibold text-text tracking-tight">{{ problem.title }}</h2>
            <span
              class="text-[11px] font-mono px-1.5 py-0.5 rounded border shrink-0"
              :class="{
                'text-green-600 border-green-600': problem.difficulty === 'easy',
                'text-orange-600 border-orange-600': problem.difficulty === 'medium',
                'text-red-600 border-red-600': problem.difficulty === 'hard',
              }"
            >{{ problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1) }}</span>
          </div>

          <div class="problem-description text-sm text-text-dim leading-relaxed" v-html="highlightedDescription" />

          <div class="flex flex-col gap-2.5">
            <div v-for="(ex, i) in examples" :key="i" class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted mb-0.5">Example {{ i + 1 }}</p>
              <p class="font-mono text-[12.5px]"><span class="text-text-muted">Input: </span><span class="text-text">{{ ex.input }}</span></p>
              <p class="font-mono text-[12.5px]"><span class="text-text-muted">Output: </span><span class="text-text">{{ ex.output }}</span></p>
              <p v-if="ex.explanation" class="text-[12px] text-text-muted">{{ ex.explanation }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Constraints</p>
            <ul class="flex flex-col gap-1.5">
              <li v-for="c in constraints" :key="c" :data-clue-id="constraintClueIds[c]" class="flex items-start gap-2.5">
                <span class="mt-[7px] w-1 h-1 rounded-lg bg-gray-300 shrink-0" />
                <code class="font-mono text-[12.5px] text-text-dim">{{ c }}</code>
              </li>
            </ul>
          </div>

          <div v-if="problem?.bruteHint || problem?.optimizeHint || problem?.optimizeComplexity" class="flex flex-col gap-2">
            <p class="text-[10px] font-medium font-mono uppercase tracking-widest  text-text-muted">Hints</p>
            <div class="flex flex-col gap-2">
              <div v-if="problem.bruteHint" ref="bruteHintEl" class="border border-border rounded-xl overflow-hidden">
                <button
                  class="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[13px] font-medium text-text-dim hover:bg-[#f5f5f2] transition-colors"
                  @click="toggleHint('brute')"
                >
                  Brute force hint
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 text-text-muted transition-transform duration-200"
                    :class="hintsRevealed.brute ? 'rotate-180' : ''">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div v-if="hintsRevealed.brute" class="px-4 pb-3 pt-2.5 border-t border-border text-[13px] text-text-dim leading-relaxed">
                  {{ problem.bruteHint }}
                </div>
              </div>
              <div v-if="problem.optimizeHint || problem.optimizeComplexity" ref="optimizeHintEl" class="border border-border rounded-xl overflow-hidden">
                <button
                  class="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-[13px] font-medium text-text-dim hover:bg-[#f5f5f2] transition-colors"
                  @click="toggleHint('optimize')"
                >
                  Recommended Complexity
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 text-text-muted transition-transform duration-200"
                    :class="hintsRevealed.optimize ? 'rotate-180' : ''">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div v-if="hintsRevealed.optimize" class="px-4 pb-3 pt-2.5 border-t border-border">
                  <div v-if="problem.optimizeComplexity" class="flex flex-col gap-1.5">
                    <div class="flex items-baseline gap-2">
                      <span class="font-mono text-[12px] text-text-muted">Time Complexity:</span>
                      <span class="text-[13px] font-semibold text-text">{{ problem.optimizeComplexity.time }}</span>
                    </div>
                    <div class="flex items-baseline gap-2">
                      <span class="font-mono text-[12px] text-text-muted">Space Complexity:</span>
                      <span class="text-[13px] font-semibold text-text">{{ problem.optimizeComplexity.space }}</span>
                    </div>
                  </div>
                  <div v-else class="text-[13px] text-text-dim leading-relaxed">{{ problem.optimizeHint }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Solution -->
        <div v-else-if="activeLeftTab === 'solution'" class="pt-3 px-6 pb-6 flex flex-col gap-5">
          <div v-if="!problem?.solution && !problem?.solutionCode" class="text-sm text-text-muted italic py-8 text-center">
            Solution content isn't written for this problem yet.
          </div>
          <template v-else-if="!problem.solution">
            <div v-if="problem.solutionComplexity" class="flex flex-wrap gap-x-4 gap-y-1">
              <span class="text-[12px] font-mono"><span class="text-text-muted">Time: </span><span class="text-text font-medium">{{ problem.solutionComplexity.time }}</span></span>
              <span class="text-[12px] font-mono"><span class="text-text-muted">Space: </span><span class="text-text font-medium">{{ problem.solutionComplexity.space }}</span></span>
            </div>
            <div v-if="problem.solutionCaveat" class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Caveat</p>
              <p class="text-[13px] text-text-dim leading-relaxed" v-html="problem.solutionCaveat" />
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Implementation — Python</p>
              <SolutionCodeBlock :code="problem.solutionCode" />
            </div>
            <div v-if="problem.solutionExplanation" class="flex flex-col gap-2">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Explanation</p>
              <p class="text-[13px] text-text-dim leading-relaxed" v-html="problem.solutionExplanation" />
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-1">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Pattern</p>
              <p class="text-[15px] font-semibold text-text leading-snug">{{ problem.solution.patternName }}</p>
            </div>

            <div class="flex flex-col gap-2.5">
              <div v-for="(a, ai) in problem.solution.approaches" :key="a.approachName" class="border border-border rounded-xl overflow-hidden">
                <button
                  class="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-[#f5f5f2] transition-colors"
                  @click="solutionApproachOpen[ai] = !solutionApproachOpen[ai]"
                >
                  <span class="flex flex-col gap-0.5">
                    <span class="text-[13px] font-semibold text-text">{{ a.approachName }}</span>
                    <span class="text-[12px] text-text-muted">{{ a.oneLineIdea }}</span>
                  </span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 text-text-muted transition-transform duration-200"
                    :class="solutionApproachOpen[ai] ? 'rotate-180' : ''">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div v-if="solutionApproachOpen[ai]" class="px-4 pb-4 pt-1 border-t border-border flex flex-col gap-3">
                  <ol class="flex flex-col gap-1.5">
                    <li v-for="s in a.subgoals" :key="s.label" class="text-[12.5px] text-text-dim leading-relaxed">
                      <span class="font-semibold text-text">{{ s.label }}:</span> {{ s.explanation }}
                    </li>
                  </ol>
                  <SolutionCodeBlock :code="a.code" />
                  <div class="flex flex-wrap gap-x-4 gap-y-1">
                    <span class="text-[12px] font-mono"><span class="text-text-muted">Time: </span><span class="text-text font-medium">{{ a.timeComplexity }}</span></span>
                    <span class="text-[12px] font-mono"><span class="text-text-muted">Space: </span><span class="text-text font-medium">{{ a.spaceComplexity }}</span></span>
                  </div>
                  <p class="text-[12px] text-text-muted leading-relaxed italic">{{ a.whenYouWouldActuallyUseThis }}</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Comparison</p>
              <div class="overflow-x-auto rounded-xl border border-border">
                <table class="w-full text-[12px]">
                  <thead>
                    <tr class="bg-[#f5f5f2] text-text-muted">
                      <th class="text-left font-medium px-3 py-2">Approach</th>
                      <th class="text-left font-medium px-3 py-2">Time</th>
                      <th class="text-left font-medium px-3 py-2">Space</th>
                      <th class="text-left font-medium px-3 py-2">What unlocks the speedup</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in problem.solution.comparisonTable" :key="row.approach" class="border-t border-border">
                      <td class="px-3 py-2 font-medium text-text whitespace-nowrap">{{ row.approach }}</td>
                      <td class="px-3 py-2 font-mono text-text-dim whitespace-nowrap">{{ row.time }}</td>
                      <td class="px-3 py-2 font-mono text-text-dim whitespace-nowrap">{{ row.space }}</td>
                      <td class="px-3 py-2 text-text-dim">{{ row.structuralUnlock }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Where this pattern reappears</p>
              <p class="text-[13px] text-text-dim leading-relaxed">{{ problem.solution.transferNote }}</p>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Test yourself</p>
              <ul class="flex flex-col gap-2">
                <li v-for="(q, qi) in problem.solution.retrievalCheck" :key="qi" class="flex items-start gap-2.5 text-[13px] text-text-dim leading-relaxed">
                  <span class="mt-0.5 text-text-muted font-mono text-[11px] shrink-0">{{ qi + 1 }}.</span>
                  <span>{{ q }}</span>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <!-- Learning -->
        <div v-else-if="activeLeftTab === 'learning'" class="pt-3 px-6 pb-6 flex flex-col gap-5">
          <div v-if="!learningCluster" class="text-sm text-text-muted italic py-8 text-center">
            No topic map available for this problem yet.
          </div>
          <template v-else>
            <div class="flex flex-col gap-1.5">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Topic</p>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="`background:${learningCluster.color}`" />
                <span class="text-[15px] font-semibold text-text">{{ learningCluster.label }}</span>
              </div>
              <p class="text-[13px] text-text-dim leading-relaxed">{{ learningCluster.primitiveExplainer }}</p>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Where this sits</p>
              <div class="flex flex-wrap items-center gap-1.5">
                <template v-for="c in priorConcepts" :key="c.id">
                  <button
                    class="text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-border text-text-muted hover:text-text hover:border-black/30 transition-colors"
                    @click="goToSection(c.id)"
                  >{{ c.label }}</button>
                  <span class="text-text-muted text-[12px]">→</span>
                </template>

                <span
                  class="text-[11.5px] font-semibold px-2.5 py-1 rounded-full border"
                  :style="`background:${learningCluster.color}1a; border-color:${learningCluster.color}; color:${learningCluster.color};`"
                >{{ currentConcept?.label }}</span>

                <template v-for="c in laterConcepts" :key="c.id">
                  <span class="text-text-muted text-[12px]">→</span>
                  <button
                    class="text-[11.5px] font-medium px-2.5 py-1 rounded-full border border-border text-text-muted hover:text-text hover:border-black/30 transition-colors"
                    @click="goToSection(c.id)"
                  >{{ c.label }}</button>
                </template>
              </div>
            </div>

            <div class="flex flex-col gap-2.5">
              <p class="text-[10px] font-mono font-light uppercase tracking-widest text-text-muted">Connections to other topics</p>
              <button
                v-for="conn in clusterConnections"
                :key="`${conn.direction}-${conn.otherId}`"
                class="text-left bg-[#f5f5f2] rounded-xl p-3.5 flex flex-col gap-1 hover:bg-[#eeeeea] transition-colors"
                @click="goToCluster(conn.otherId)"
              >
                <span class="flex items-center gap-1.5 text-[11.5px] font-semibold" :style="`color:${clusterById(conn.otherId)?.color}`">
                  <span class="w-2 h-2 rounded-full shrink-0" :style="`background:${clusterById(conn.otherId)?.color}`" />
                  {{ connectionLabel(conn) }}
                </span>
                <span class="text-[12px] text-text-muted leading-relaxed">{{ transferHookText(conn.edge.from, conn.edge.to) || `Shared idea: ${conn.edge.shared}` }}</span>
              </button>
              <p v-if="!clusterConnections.length" class="text-[12px] text-text-muted italic">
                This topic doesn't have a documented cross-topic transfer yet — it stands on its own.
              </p>
            </div>

            <button
              class="self-start text-[12.5px] font-medium text-text underline decoration-black/20 underline-offset-4 hover:decoration-black/50 transition-colors"
              @click="goToSection(currentConcept?.id)"
            >Read the full write-up in Learn →</button>
          </template>
        </div>

      </div>
    </div>

    <!-- Divider -->
    <div class="w-px bg-gray-200 shrink-0" />

    <!-- RIGHT PANEL -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <div v-if="!progressLoaded" class="flex-1 flex items-center justify-center text-sm text-text-muted">
        Loading your progress…
      </div>
      <PhasedLearningPanel
        v-else
        :clues="problem?.clues ?? []"
        :struggle="problem?.struggle"
        :problem-id="problem?.id ?? ''"
        :problem-context="{ description: problem?.description, examples: problem?.examples, constraints: problem?.constraints }"
        :dissect-progress="progress?.dissect?.state ?? null"
        :struggle-progress="progress?.struggle ?? null"
        :phase-completion="phaseCompletion"
        :has-solution="!!problem?.solutionCode"
        :embedded="props.embedded"
        @reveal-highlight="onRevealHighlight"
        @advance-phase="onAdvancePhase"
        @reset-problem="resetCode"
        @reveal-solution="revealSolution"
      >
        <template #attack>
          <div class="flex-1 flex flex-col overflow-hidden" style="background:#1a1a1a">

            <!-- CodeEditor fills all space above bottom bar -->
            <div class="flex-1 min-h-0 overflow-hidden">
              <CodeEditor v-model="codeContent" />
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
                  <button
                    v-for="(custom, ci) in customCases"
                    :key="'custom-' + custom.id"
                    class="px-3 py-1 rounded text-[12.5px] font-medium transition-all"
                    :style="selectedCase === (RUN_TEST_CASES.length + ci)
                      ? 'background:rgba(255,255,255,0.12);color:#e5e5e5'
                      : 'color:rgba(255,255,255,0.4);'"
                    @click="selectedCase = RUN_TEST_CASES.length + ci"
                  >Custom {{ ci + 1 }}</button>
                  <button
                    class="px-2 py-1 rounded text-[13px] font-medium transition-all"
                    style="color:rgba(255,255,255,0.35)"
                    title="Add a custom test case"
                    @click="addCustomCase"
                  >+</button>
                </div>
                <!-- Input display -->
                <div class="flex flex-col gap-2.5">
                  <template v-if="selectedCustomCase">
                    <div v-for="(_, pi) in selectedCustomCase.argsText" :key="pi">
                      <p class="text-[12px] mb-1" style="color:rgba(255,255,255,0.45)">arg{{ pi + 1 }} =</p>
                      <textarea
                        v-model="selectedCustomCase.argsText[pi]"
                        rows="1"
                        placeholder="e.g. [1, 2, 3, 1]"
                        class="w-full resize-none rounded-md px-3 py-2 text-[13px] font-mono border outline-none"
                        style="background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.8);border-color:rgba(255,255,255,0.1)"
                      />
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <button
                        class="text-[12px] font-medium px-3 py-1.5 rounded-md transition-all disabled:opacity-40"
                        style="color:rgba(255,255,255,0.6);background:rgba(255,255,255,0.08)"
                        :disabled="!pyodideReady || selectedCustomCase.running"
                        @click="runCustomCase(selectedCustomCase)"
                      >{{ selectedCustomCase.running ? 'Running…' : 'Run this case' }}</button>
                      <button
                        class="text-[12px] px-2 py-1.5 rounded-md transition-colors"
                        style="color:rgba(255,255,255,0.3)"
                        @click="removeCustomCase(selectedCustomCase)"
                      >Remove</button>
                    </div>
                    <div
                      v-if="selectedCustomCase.output != null"
                      class="rounded-md px-3 py-2 text-[12.5px] font-mono whitespace-pre-wrap"
                      style="background:rgba(74,222,128,0.08);color:#4ade80;border-left:2px solid rgba(74,222,128,0.4)"
                    >→ {{ selectedCustomCase.output }}</div>
                    <div
                      v-if="selectedCustomCase.error"
                      class="rounded-md px-3 py-2 text-[12px] font-mono whitespace-pre-wrap"
                      style="background:rgba(248,113,113,0.08);color:#f87171;border-left:2px solid rgba(248,113,113,0.4)"
                    >{{ selectedCustomCase.error }}</div>
                  </template>
                  <template v-else-if="RUN_TEST_CASES[selectedCase]">
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
                  :disabled="!pyodideReady || runLoading || isSubmitting"
                  @click="runCode"
                >
                  {{ pyodideLoading ? 'Preparing Python…' : runLoading ? 'Running…' : 'Run' }}
                </button>
                <button
                  class="text-[13px] font-semibold px-4 py-1.5 rounded-md transition-all disabled:opacity-40"
                  style="background:#2cbb5d;color:#fff"
                  :disabled="!pyodideReady || runLoading || isSubmitting"
                  @click="submitCode"
                >
                  {{ pyodideLoading ? 'Preparing Python…' : isSubmitting ? 'Submitting…' : 'Submit' }}
                </button>
              </div>
            </div>

          </div>
        </template>
      </PhasedLearningPanel>
    </div>

  </div>

  <!-- Prev / Randomize / Next -->
  <div v-if="!props.embedded" class="flex items-center justify-center gap-3 shrink-0">
    <button
      v-if="prevProblem"
      class="inline-flex items-center gap-1.5 text-sm font-medium text-black px-4 py-2 rounded-lg bg-white border border-black shadow-[0_4px_0_0_#000] transition-all duration-100 hover:shadow-[0_2px_0_0_#000] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
      @click="goToPrev"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Prev
    </button>

    <button
      class="inline-flex items-center gap-1.5 text-sm font-medium text-black px-4 py-2 rounded-lg bg-white border border-black/20 shadow-sm transition-all hover:border-black/40 hover:-translate-y-px active:translate-y-0"
      @click="goToRandom"
    >
      Randomize
    </button>

    <button
      v-if="nextProblem"
      class="inline-flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-lg bg-black border border-black shadow-[0_4px_0_0_#fff,0_4px_0_1px_#000] transition-all duration-100 hover:shadow-[0_2px_0_0_#fff,0_2px_0_1px_#000] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
      @click="goToNext"
    >
      Next
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import confetti from 'canvas-confetti'

const props = defineProps({
  height:    { type: String,  default: 'calc(100vh - 4rem)' },
  embedded:  { type: Boolean, default: false },
  problemId: { type: String,  default: '' },
})
import CodeEditor from '@/components/sandbox/CodeEditor.vue'
import TestResults from '@/components/sandbox/TestResults.vue'
import SolutionCodeBlock from '@/components/sandbox/SolutionCodeBlock.vue'
import PhasedLearningPanel from '@/components/PhasedLearningPanel.vue'
import { usePyodide } from '@/composables/usePyodide'
import { PROBLEMS } from '@/data/problems'
import { CLUSTERS, CLUSTER_EDGES, clusterForSection } from '@/data/clusters'

const TWO_SUM_FALLBACK = PROBLEMS.find(p => p.id === 'two-sum')

const problem = computed(() =>
  (props.problemId ? PROBLEMS.find(p => p.id === props.problemId) : null)
  ?? TWO_SUM_FALLBACK
)

const router = useRouter()

const currentProblemIndex = computed(() => PROBLEMS.findIndex(p => p.id === problem.value?.id))
const prevProblem = computed(() =>
  currentProblemIndex.value > 0 ? PROBLEMS[currentProblemIndex.value - 1] : null
)
const nextProblem = computed(() =>
  currentProblemIndex.value >= 0 && currentProblemIndex.value < PROBLEMS.length - 1
    ? PROBLEMS[currentProblemIndex.value + 1]
    : null
)

function goToPrev() {
  if (prevProblem.value) router.push(`/session/${prevProblem.value.id}`)
}

function goToNext() {
  if (nextProblem.value) router.push(`/session/${nextProblem.value.id}`)
}

function goToRandom() {
  const others = PROBLEMS.filter(p => p.id !== problem.value?.id)
  const pick = others[Math.floor(Math.random() * others.length)]
  if (pick) router.push(`/session/${pick.id}`)
}

// ── Learning tab: where this problem's concept sits in the topic map ───────

const learningCluster = computed(() =>
  problem.value ? clusterForSection(problem.value.conceptId) : null
)

const conceptIndexInCluster = computed(() => {
  if (!learningCluster.value) return -1
  return learningCluster.value.concepts.findIndex(c => c.id === problem.value.conceptId)
})

const currentConcept = computed(() =>
  conceptIndexInCluster.value >= 0 ? learningCluster.value.concepts[conceptIndexInCluster.value] : null
)

const priorConcepts = computed(() =>
  conceptIndexInCluster.value > 0 ? learningCluster.value.concepts.slice(0, conceptIndexInCluster.value) : []
)

const laterConcepts = computed(() =>
  conceptIndexInCluster.value >= 0 ? learningCluster.value.concepts.slice(conceptIndexInCluster.value + 1) : []
)

const clusterConnections = computed(() => {
  if (!learningCluster.value) return []
  const id = learningCluster.value.id
  return CLUSTER_EDGES
    .filter(e => e.from === id || e.to === id)
    .map(e => ({ edge: e, direction: e.to === id ? 'in' : 'out', otherId: e.to === id ? e.from : e.to }))
})

function clusterById(id) {
  return CLUSTERS.find(c => c.id === id)
}

function transferHookText(fromClusterId, toClusterId) {
  const hook = clusterById(fromClusterId)?.transferHooks?.find(h => h.targetId === toClusterId)
  return hook?.text ?? null
}

function connectionLabel(conn) {
  const otherLabel = clusterById(conn.otherId)?.label ?? conn.otherId
  const thisLabel = learningCluster.value?.label ?? ''
  const isTransfer = conn.edge.type === 'transfer'
  if (conn.direction === 'in') {
    return isTransfer ? `${otherLabel} carries over into ${thisLabel}` : `${otherLabel} is a prerequisite for ${thisLabel}`
  }
  return isTransfer ? `${thisLabel} carries over into ${otherLabel}` : `${thisLabel} is a prerequisite for ${otherLabel}`
}

function goToSection(conceptId) {
  if (conceptId) router.push({ path: '/learn', query: { section: conceptId } })
}

function goToCluster(clusterId) {
  if (clusterId) router.push({ path: '/learn', query: { cluster: clusterId } })
}

const difficultyAccent = computed(() => {
  const d = problem.value?.difficulty
  if (d === 'easy') return '#16a34a'
  if (d === 'medium') return '#ea580c'
  if (d === 'hard') return '#dc2626'
  return '#6366f1'
})

const activeLeftTab = ref('problem')
const leftContentEl = ref(null)
const solutionApproachOpen = ref({ 0: true })

// ── Attack local cache (localStorage-first, DB is the durable backup) ──────

function attackCacheKey(problemId) {
  return `routined:${problemId}:attack`
}

function loadAttackCache(problemId) {
  try {
    const raw = localStorage.getItem(attackCacheKey(problemId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveAttackCache(problemId, data) {
  try {
    localStorage.setItem(attackCacheKey(problemId), JSON.stringify(data))
  } catch {
    // best-effort — localStorage may be unavailable (private mode, quota, etc.)
  }
}

function clearAttackCache(problemId) {
  try {
    localStorage.removeItem(attackCacheKey(problemId))
  } catch {
    // best-effort
  }
}

const attackCache = props.embedded ? null : loadAttackCache(problem.value?.id ?? '')

const codeContent  = ref(attackCache?.code ?? problem.value?.starterCode ?? '')
const hasRun       = ref(!!(attackCache?.lastRun?.results?.length || attackCache?.lastRun?.error))
const runLoading   = ref(false)
const runError     = ref(attackCache?.lastRun?.error ?? null)
const consoleOpen  = ref(false)
const consoleTab   = ref('testcase')
const selectedCase = ref(0)

const { runTests, runPython, isReady: pyodideReady, isLoading: pyodideLoading } = usePyodide()

const leftTabs = [
  { id: 'problem',  label: 'Question', locked: false },
  { id: 'solution', label: 'Solution', locked: false },
  { id: 'learning', label: 'Learning', locked: false },
]

const examples    = computed(() => problem.value?.examples    ?? [])
const constraints = computed(() => problem.value?.constraints ?? [])
const hintsRevealed = ref({ brute: false, optimize: false })
const bruteHintEl = ref(null)
const optimizeHintEl = ref(null)

function toggleHint(kind) {
  hintsRevealed.value[kind] = !hintsRevealed.value[kind]
  if (!hintsRevealed.value[kind]) return

  nextTick(() => {
    const container = leftContentEl.value
    const el = kind === 'brute' ? bruteHintEl.value : optimizeHintEl.value
    if (!container || !el) return
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const overflowBottom = elRect.bottom - containerRect.bottom
    if (overflowBottom > 0) {
      container.scrollBy({ top: overflowBottom + 12, behavior: 'smooth' })
    }
  })
}

// ── Phased learning panel ──────────────────────────────────────────────────

// Wraps each description-targeting clue's highlight text in a
// data-clue-id span so "Show in problem" has something to scroll to and
// flash. Clues without `highlight.text` wrap the whole description block.
function withClueHighlights(html, clues) {
  if (!html) return html
  let result = html
  for (const clue of clues) {
    if (clue.highlight?.location !== 'description') continue
    const target = clue.highlight.text
    if (target) {
      const idx = result.indexOf(target)
      if (idx === -1) continue
      result = result.slice(0, idx)
        + `<span data-clue-id="${clue.id}">${target}</span>`
        + result.slice(idx + target.length)
    } else {
      result = `<span data-clue-id="${clue.id}">${result}</span>`
    }
  }
  return result
}

const highlightedDescription = computed(() =>
  withClueHighlights(problem.value?.description ?? '', problem.value?.clues ?? [])
)

const constraintClueIds = computed(() => {
  const map = {}
  for (const clue of problem.value?.clues ?? []) {
    if (clue.highlight?.location === 'constraint' && clue.highlight.text) {
      map[clue.highlight.text] = clue.id
    }
  }
  return map
})

function onRevealHighlight(clueId) {
  activeLeftTab.value = 'problem'
  nextTick(() => {
    const container = leftContentEl.value
    const el = container?.querySelector(`[data-clue-id="${clueId}"]`)
    if (!el || !container) return

    // Scroll only this inner panel, not the page — scrollIntoView would
    // walk up through every scrollable ancestor, including the document.
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const delta = (elRect.top - containerRect.top) - (containerRect.height / 2) + (elRect.height / 2)
    container.scrollBy({ top: delta, behavior: 'smooth' })

    // Duration must match REVEAL_FLASH_MS in PhasedLearningPanel.vue's
    // revealHighlight, so the "Show in problem" button re-enables exactly
    // when this flash fades.
    el.classList.add('clue-highlight-flash')
    setTimeout(() => el.classList.remove('clue-highlight-flash'), 5000)
  })
}

function onAdvancePhase({ phase, data }) {
  // TODO: hook up phase-transition side effects as they're needed
}

// ── Progress persistence (Dissect + Struggle live server-side only; Attack
//    also gets an instant localStorage-first cache — see below) ───────────

const progress = ref(null)
const progressLoaded = ref(false)

const phaseCompletion = computed(() => ({
  dissect: progress.value?.dissect?.completed ?? false,
  struggle: progress.value?.struggle?.completed ?? false,
  attack: progress.value?.attack?.completed ?? false,
}))

function reconcileAttackProgress(problemId, attack) {
  if (!attack?.state) return
  const local = loadAttackCache(problemId)
  const serverNewer = attack.updatedAt &&
    (!local?.savedAt || new Date(attack.updatedAt).getTime() > local.savedAt)
  if (!serverNewer) return

  if (attack.state.code != null) codeContent.value = attack.state.code
  if (attack.state.lastRun) {
    testResults.value = attack.state.lastRun.results ?? []
    runError.value = attack.state.lastRun.error ?? null
    hasRun.value = !!(testResults.value.length || runError.value)
  }
  saveAttackCache(problemId, {
    code: codeContent.value,
    lastRun: attack.state.lastRun ?? null,
    savedAt: Date.now(),
  })
}

async function fetchProgress() {
  const id = problem.value?.id
  if (!id || props.embedded) {
    progressLoaded.value = true
    return
  }
  try {
    const res = await fetch(`/api/problems/${id}/progress`, { credentials: 'include' })
    if (res.ok) {
      progress.value = await res.json()
      reconcileAttackProgress(id, progress.value.attack)
    }
  } catch {
    // best-effort — treat as no saved progress (also covers a defensive 401)
  } finally {
    progressLoaded.value = true
  }
}

onMounted(fetchProgress)

// ── Code execution (Attack tab) ────────────────────────────────────────────

const testResults = ref(attackCache?.lastRun?.results ?? [])

const RUN_TEST_CASES    = computed(() => (problem.value?.testCases ?? []).slice(0, 2))
const SUBMIT_TEST_CASES = computed(() => problem.value?.testCases ?? [])

// ── Custom test cases (console) ─────────────────────────────────────────────
// User-added cases with no known "expected" value — run standalone via
// runPython (raw stdout) rather than through the graded runTests pass/fail
// pipeline used by the official test cases above.

let nextCustomCaseId = 1
const customCases = ref([])

const selectedCustomCase = computed(() => {
  const idx = selectedCase.value - RUN_TEST_CASES.value.length
  return idx >= 0 ? customCases.value[idx] ?? null : null
})

function addCustomCase() {
  const argCount = problem.value?.testCases?.[0]?.args?.length ?? 1
  customCases.value.push({
    id: nextCustomCaseId++,
    argsText: Array.from({ length: argCount }, () => ''),
    output: null,
    error: null,
    running: false,
  })
  selectedCase.value = RUN_TEST_CASES.value.length + customCases.value.length - 1
}

function removeCustomCase(custom) {
  const idx = customCases.value.indexOf(custom)
  if (idx === -1) return
  customCases.value.splice(idx, 1)
  const maxIdx = RUN_TEST_CASES.value.length + customCases.value.length - 1
  if (selectedCase.value > maxIdx) selectedCase.value = Math.max(0, maxIdx)
}

async function runCustomCase(custom) {
  custom.running = true
  custom.output = null
  custom.error = null
  try {
    const args = custom.argsText.map(t => JSON.parse(t))
    const fn = problem.value?.functionName ?? ''
    const setup = problem.value?.runnerSetup ?? ''
    const snippet = `${codeContent.value}

${setup}

import json as __json
__result = ${fn}(*__json.loads(${JSON.stringify(JSON.stringify(args))}))
print(__json.dumps(__result, default=str))`
    const out = await runPython(snippet)
    custom.output = out.trim()
  } catch (e) {
    custom.error = e.message ?? String(e)
  } finally {
    custom.running = false
  }
}

const isSubmitting = ref(false)

function fireConfetti() {
  const burst = (opts) => confetti({ particleCount: 60, spread: 70, ticks: 200, gravity: 1.1, scalar: 0.9, ...opts })
  burst({ origin: { x: 0.3, y: 0.6 }, angle: 60 })
  setTimeout(() => burst({ origin: { x: 0.7, y: 0.6 }, angle: 120 }), 120)
}

async function persistAttack(extra = {}) {
  const id = problem.value?.id
  if (!id || props.embedded) return
  try {
    await fetch(`/api/problems/${id}/attack/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        code: codeContent.value,
        lastRun: { results: testResults.value, error: runError.value },
        ...extra,
      }),
    })
  } catch {
    // best-effort — localStorage already has the latest copy regardless
  }
}

async function execute(cases) {
  runError.value = null
  testResults.value = []
  consoleOpen.value = true
  consoleTab.value = 'output'
  try {
    testResults.value = await runTests(codeContent.value, problem.value?.functionName ?? 'two_sum', cases, problem.value?.runnerSetup)
    hasRun.value = true
  } catch (e) {
    const msg = e.message ?? String(e)
    runError.value = msg.includes('timed out')
      ? 'Error: Execution timed out after 5s.\nCheck for infinite loops or very slow code.'
      : `Error: ${msg}`
    hasRun.value = true
  }

  const id = problem.value?.id
  if (id && !props.embedded) {
    saveAttackCache(id, {
      code: codeContent.value,
      lastRun: { results: testResults.value, error: runError.value },
      savedAt: Date.now(),
    })
    await persistAttack()
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
  if (testResults.value.length && testResults.value.every(t => t.passed)) {
    fireConfetti()
    await persistAttack({ completed: true })
  }
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

  const id = problem.value?.id
  if (id && !props.embedded) {
    clearAttackCache(id)
    persistAttack()
  }
}

function revealSolution() {
  if (!problem.value?.solutionCode) return
  codeContent.value = problem.value.solutionCode
  activeLeftTab.value = 'solution'
}

// Debounced local save (instant, network-independent) + a longer-debounced
// background sync to the DB, so plain typing never waits on either.
let localSaveTimer = null
let dbSyncTimer = null

watch(codeContent, (val) => {
  const id = problem.value?.id
  if (!id || props.embedded) return

  clearTimeout(localSaveTimer)
  localSaveTimer = setTimeout(() => {
    saveAttackCache(id, {
      code: val,
      lastRun: { results: testResults.value, error: runError.value },
      savedAt: Date.now(),
    })
  }, 400)

  clearTimeout(dbSyncTimer)
  dbSyncTimer = setTimeout(() => { persistAttack() }, 2000)
})
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

:deep(.clue-highlight-flash) {
  animation: clue-highlight-pulse 5s ease-out;
  border-radius: 4px;
}
@keyframes clue-highlight-pulse {
  0%   { background-color: rgba(250, 204, 21, 0.55); }
  100% { background-color: transparent; }
}
</style>
