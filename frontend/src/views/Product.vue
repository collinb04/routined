<template>
  <div class="flex overflow-hidden" style="height: calc(100vh - 4rem); background: #111215">

    <!-- Sidebar -->
    <aside
      class="flex flex-col transition-all duration-300 shrink-0 overflow-hidden border-r"
      style="border-color: rgba(255,255,255,0.07); background: #0d0f11"
      :class="sidebarOpen ? 'w-56' : 'w-0'"
    >
      <div class="w-56 flex items-center justify-between px-4 pt-6 pb-3">
        <span class="text-[10px] font-semibold uppercase tracking-widest" style="color:rgba(255,255,255,0.3)">Topics</span>
        <button class="p-1 rounded-md transition-colors" style="color:rgba(255,255,255,0.3)" @click="sidebarOpen = false">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav class="w-56 flex-1 overflow-y-auto pb-6 px-2">
        <button
          v-for="(topic, i) in topics"
          :key="topic.id"
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-0.5 flex items-center gap-2"
          :style="selectedTopic?.id === topic.id
            ? 'border-color:#a0a0a0; color:#c8c8c8; background:linear-gradient(110deg, rgba(140,140,140,0.1) 0%, rgba(220,220,220,0.14) 40%, rgba(255,255,255,0.09) 55%, rgba(160,160,160,0.10) 100%)'
            : isTopicComplete(topic)
              ? 'border-color:#c8a832; color:#d4af37; background:transparent; box-shadow: 0 0 0 1px #7a6200, 0 0 0 1.5px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,223,0,0.1)'
              : 'border-color:transparent; color:rgba(255,255,255,0.4)'"
          @click="selectedTopic = topic"
        >
          <span class="text-[10px] tabular-nums shrink-0" style="color:rgba(255,255,255,0.2)">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="flex-1 truncate">{{ topic.label }}</span>
          <span
            v-if="isTopicComplete(topic)"
            class="text-[8px] font-bold uppercase tracking-widest shrink-0"
            style="color:#d4af37; opacity:0.85"
          >Mastered</span>
        </button>
      </nav>
    </aside>

    <!-- Main -->
    <main ref="mainEl" class="flex-1 overflow-y-auto relative" style="background: #111215">

      <!-- Top bar -->
      <div class="flex items-center gap-3 px-6 pt-5 pb-2">
        <button
          class="p-1.5 -ml-1.5 rounded-md transition-colors"
          style="color:rgba(255,255,255,0.35)"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18"/>
          </svg>
        </button>
      </div>

      <!-- Empty state -->
      <div v-if="!selectedTopic" class="flex flex-col items-center justify-center gap-5 px-5 py-32">
        <div class="w-14 h-14 rounded-2xl border flex items-center justify-center" style="background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:rgba(255,255,255,0.25)">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </div>
        <div class="text-center flex flex-col gap-1">
          <p class="font-semibold" style="color:rgba(255,255,255,0.75)">Select a topic</p>
          <p class="text-sm" style="color:rgba(255,255,255,0.35)">Choose a topic from the sidebar to start practicing.</p>
        </div>
      </div>

      <!-- Topic view -->
      <div v-else class="max-w-2xl mx-auto px-6 pb-28">

        <!-- Header -->
        <div class="pt-2 pb-7 flex flex-col gap-3">
          <span class="text-[10px] font-semibold uppercase tracking-widest" style="color:rgba(255,255,255,0.3)">
            {{ String(topics.indexOf(selectedTopic) + 1).padStart(2, '0') }} — {{ selectedTopic.label }}
          </span>
          <h1 class="text-3xl font-semibold tracking-tight" style="color:#f5f5f2; line-height:1.2">
            {{ selectedTopic.subtitle }}
          </h1>

          <!-- Progress -->
          <div class="flex items-center gap-3 mt-0.5">
            <div class="flex-1 h-0.75 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.07)">
              <div
                class="h-full rounded-full transition-all duration-500" style="background:#d4af37"
                :style="{ width: progressPct + '%' }"
              />
            </div>
            <span class="text-[12px] tabular-nums shrink-0" style="color:rgba(255,255,255,0.3)">
              {{ doneCount }} / {{ selectedTopic.problems.length }}
            </span>
          </div>
        </div>

        <!-- Problem list -->
        <div class="rounded-xl overflow-hidden" style="border: 1px solid rgba(255,255,255,0.07)">

          <!-- Column headers -->
          <div class="flex items-center px-4 py-3 border-b" style="border-color:rgba(255,255,255,0.07)">
            <div class="w-9 shrink-0" />
            <div class="flex-1 text-[10px] font-semibold uppercase tracking-widest" style="color:rgba(255,255,255,0.28)">Problem</div>
            <div class="text-[10px] font-semibold uppercase tracking-widest w-24 text-right" style="color:rgba(255,255,255,0.28)">Difficulty</div>
          </div>

          <!-- Rows -->
          <div
            v-for="problem in selectedTopic.problems"
            :key="problem.id"
            class="flex items-center px-4 py-3.5 cursor-pointer border-b last:border-0 transition-colors relative"
            :style="problem.done
              ? 'background:rgba(212,175,55,0.04); border-color:rgba(255,255,255,0.04)'
              : 'border-color:rgba(255,255,255,0.04)'"
            @click="handleProblemClick(problem)"
          >
            <!-- Green left accent for completed -->
            <div
              v-if="problem.done"
              class="absolute left-0 top-0 bottom-0 w-0.75"
              style="background:#d4af37"
            />

            <!-- Checkbox -->
            <div class="w-9 shrink-0 flex items-center">
              <button
                class="w-4.5 h-4.5 rounded-sm border-2 flex items-center justify-center transition-all shrink-0"
                :style="problem.done
                  ? 'background:#d4af37; border-color:#d4af37'
                  : 'background:transparent; border-color:rgba(255,255,255,0.2)'"
                @click.stop="toggleDone(selectedTopic, problem)"
              >
                <svg v-if="problem.done" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>

            <!-- Problem name -->
            <div class="flex-1 text-[14px] font-medium" style="color:#f5f5f2">
              {{ problem.name }}
            </div>

            <!-- Difficulty -->
            <div class="w-24 text-right">
              <span
                class="text-[13px] font-medium"
                :style="{
                  color: problem.difficulty === 'Easy' ? '#22c55e'
                       : problem.difficulty === 'Medium' ? '#f97316'
                       : '#ef4444'
                }"
              >
                {{ problem.difficulty }}
              </span>
            </div>

          </div>
        </div>
      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import confetti from 'canvas-confetti'

const router = useRouter()
const sidebarOpen = ref(true)
const selectedTopic = ref(null)
const mainEl = ref(null)

const doneCount = computed(() => selectedTopic.value?.problems.filter(p => p.done).length ?? 0)
const progressPct = computed(() => {
  if (!selectedTopic.value) return 0
  return Math.round((doneCount.value / selectedTopic.value.problems.length) * 100)
})

function isTopicComplete(topic) {
  return topic.problems.length > 0 && topic.problems.every(p => p.done)
}

function fireGoldConfetti() {
  const colors = ['#d4af37', '#f0c040', '#ffd700', '#c8a000', '#b8960a']
  const burst = (opts) => confetti({ particleCount: 80, spread: 70, ticks: 220, gravity: 1.1, scalar: 0.95, colors, ...opts })
  burst({ origin: { x: 0.3, y: 0.6 }, angle: 60 })
  setTimeout(() => burst({ origin: { x: 0.7, y: 0.6 }, angle: 120 }), 150)
  setTimeout(() => burst({ origin: { x: 0.5, y: 0.5 }, angle: 90, particleCount: 50 }), 300)
}

function toggleDone(topic, problem) {
  problem.done = !problem.done
  if (problem.done && isTopicComplete(topic)) fireGoldConfetti()
}

function scrollDown() {
  mainEl.value?.scrollBy({ top: 300, behavior: 'smooth' })
}

const SESSION_IDS = {
  // ── Original 31 platform sessions ──────────────────────────────────────────
  'Contains Duplicate':                              'contains-duplicate',
  'Valid Palindrome':                                'valid-palindrome',
  'Two Sum II':                                      'two-sum-ii',
  'Maximum Average Subarray I':                      'max-average-subarray',
  'Valid Parentheses':                               'valid-parentheses',
  'Next Greater Element I':                          'next-greater-element',
  'Binary Search':                                   'binary-search',
  'Koko Eating Bananas':                             'koko-eating-bananas',
  'Two Sum':                                         'two-sum',
  'Remove Linked List Elements':                     'remove-linked-list-elements',
  'Linked List Cycle':                               'linked-list-cycle',
  'Reverse Linked List':                             'reverse-linked-list',
  'Maximum Depth of Binary Tree':                    'max-depth-tree',
  'Binary Tree Level Order Traversal':               'level-order-traversal',
  'Subsets':                                         'subsets',
  'Assign Cookies':                                  'assign-cookies',
  'Find if Path Exists in Graph':                    'find-path-in-graph',
  'Course Schedule':                                 'course-schedule',
  'Kth Largest Element in a Stream':                 'kth-largest-stream',
  'Top K Frequent Elements':                         'top-k-frequent',
  'Climbing Stairs':                                 'climbing-stairs',
  'Unique Paths':                                    'unique-paths',
  'Partition Equal Subset Sum':                      'partition-equal-subset',
  'Fibonacci Number':                                'fibonacci-number',
  'Meeting Rooms':                                   'meeting-rooms',
  // ── Arrays ──────────────────────────────────────────────────────────────────
  'Maximum Subarray':                                'maximum-subarray',
  'Subarray Sum Equals K':                           'subarray-sum-equals-k',
  'Sort Colors':                                     'sort-colors',
  'Majority Element':                                'majority-element',
  'First Missing Positive':                          'first-missing-positive',
  'Best Time to Buy and Sell Stock II':              'best-time-buy-sell-stock-ii',
  'Rotate Array':                                    'rotate-array',
  'Find All Duplicates in an Array':                 'find-all-duplicates-in-array',
  'Find All Numbers Disappeared in an Array':        'find-all-numbers-disappeared',
  'Move Zeroes':                                     'move-zeroes',
  'Number of Subarrays with Bounded Maximum':        'number-of-subarrays-bounded-max',
  'Check If Array Pairs Are Divisible by k':         'check-if-array-pairs-divisible-by-k',
  // ── Two Pointers ─────────────────────────────────────────────────────────────
  '3Sum Closest':                                    '3sum-closest',
  '4Sum':                                            '4sum',
  'Next Permutation':                                'next-permutation',
  'Squares of a Sorted Array':                       'squares-sorted-array',
  'Sort Array By Parity':                            'sort-array-by-parity',
  'Max Number of K-Sum Pairs':                       'max-k-sum-pairs',
  'Minimum Length of String After Deleting Similar Ends': 'minimum-length-after-deleting',
  // ── Sliding Window ───────────────────────────────────────────────────────────
  'Max Consecutive Ones III':                        'max-consecutive-ones-iii',
  'Minimum Size Subarray Sum':                       'minimum-size-subarray-sum',
  'Fruit Into Baskets':                              'fruit-into-baskets',
  'Count Number of Nice Subarrays':                  'count-number-nice-subarrays',
  'Grumpy Bookstore Owner':                          'grumpy-bookstore-owner',
  'Substring with Concatenation of All Words':       'substring-concatenation-all-words',
  // ── Stack ────────────────────────────────────────────────────────────────────
  'Decode String':                                   'decode-string',
  'Basic Calculator II':                             'basic-calculator-ii',
  'Simplify Path':                                   'simplify-path',
  'Score of Parentheses':                            'score-of-parentheses',
  'Asteroid Collision':                              'asteroid-collision',
  'Basic Calculator':                                'basic-calculator',
  // ── Binary Search ────────────────────────────────────────────────────────────
  'Find Minimum in Rotated Sorted Array II':         'find-min-rotated-sorted-array-ii',
  'Capacity to Ship Packages Within D Days':         'capacity-ship-packages',
  'Find K Closest Elements':                         'find-k-closest-elements',
  'Split Array Largest Sum':                         'split-array-largest-sum',
  'Search in Rotated Sorted Array II':               'search-rotated-sorted-array-ii',
  'Minimum Speed to Arrive on Time':                 'minimum-speed-arrive-on-time',
  // ── Linked List ──────────────────────────────────────────────────────────────
  'Palindrome Linked List':                          'palindrome-linked-list',
  'Middle of the Linked List':                       'middle-of-linked-list',
  'Flatten a Multilevel Doubly Linked List':         'flatten-multilevel-doubly-linked-list',
  'Sort List':                                       'sort-list',
  // ── Trees ────────────────────────────────────────────────────────────────────
  'Path Sum':                                        'path-sum',
  'Path Sum II':                                     'path-sum-ii',
  'Symmetric Tree':                                  'symmetric-tree',
  'Flatten Binary Tree to Linked List':              'flatten-binary-tree-to-linked-list',
  'Populating Next Right Pointers in Each Node':     'populating-next-right-pointers',
  'Sum Root to Leaf Numbers':                        'sum-root-to-leaf-numbers',
  'Binary Tree Zigzag Level Order Traversal':        'binary-tree-zigzag-level-order',
  'Convert Sorted Array to Binary Search Tree':      'convert-sorted-array-to-bst',
  'Delete Node in a BST':                            'delete-node-in-bst',
  'Binary Search Tree Iterator':                     'binary-search-tree-iterator',
  'Trim a Binary Search Tree':                       'trim-binary-search-tree',
  'Recover Binary Search Tree':                      'recover-binary-search-tree',
  'Lowest Common Ancestor of a Binary Tree':         'lowest-common-ancestor-binary-tree',
  'Count Complete Tree Nodes':                       'count-complete-tree-nodes',
  'All Nodes Distance K in Binary Tree':             'all-nodes-distance-k',
  'Vertical Order Traversal of a Binary Tree':       'vertical-order-traversal',
  'House Robber III':                                'house-robber-iii',
  // ── Heap ─────────────────────────────────────────────────────────────────────
  'Smallest Range Covering Elements from K Lists':   'smallest-range-k-lists',
  'IPO':                                             'ipo',
  'Reorganize String':                               'reorganize-string',
  'Maximum Frequency Stack':                         'maximum-frequency-stack',
  'K Pairs with Smallest Sums':                      'k-pairs-smallest-sums',
  'Minimum Cost to Connect Sticks':                  'minimum-cost-connect-sticks',
  // ── Backtracking ─────────────────────────────────────────────────────────────
  'Combination Sum III':                             'combination-sum-iii',
  'N-Queens II':                                     'n-queens-ii',
  'Sudoku Solver':                                   'sudoku-solver',
  'Word Break II':                                   'word-break-ii',
  'Restore IP Addresses':                            'restore-ip-addresses',
  'Combinations':                                    'combinations',
  // ── Graphs ───────────────────────────────────────────────────────────────────
  'Open the Lock':                                   'open-the-lock',
  '01 Matrix':                                       '01-matrix',
  'Shortest Path in Binary Matrix':                  'shortest-path-binary-matrix',
  'All Paths From Source to Target':                 'all-paths-source-to-target',
  'Find Eventual Safe States':                       'find-eventual-safe-states',
  'Minimum Genetic Mutation':                        'minimum-genetic-mutation',
  'Is Graph Bipartite?':                             'is-graph-bipartite',
  'Number of Provinces':                             'number-of-provinces',
  'Evaluate Division':                               'evaluate-division',
  'Accounts Merge':                                  'accounts-merge',
  'Keys and Rooms':                                  'keys-and-rooms',
  'Detonate the Maximum Bombs':                      'detonate-maximum-bombs',
  'Number of Operations to Make Network Connected':  'number-operations-make-network-connected',
  'Minimum Height Trees':                            'minimum-height-trees',
  'Snakes and Ladders':                              'snakes-and-ladders',
  'Maximum Total Importance of Roads':               'maximum-total-importance-roads',
  // ── 1D Dynamic Programming ───────────────────────────────────────────────────
  'Delete and Earn':                                 'delete-and-earn',
  'Minimum Cost for Tickets':                        'minimum-cost-for-tickets',
  'Domino and Tromino Tiling':                       'domino-tromino-tiling',
  'Perfect Squares':                                 'perfect-squares',
  'Integer Break':                                   'integer-break',
  'N-th Tribonacci Number':                          'nth-tribonacci-number',
  'Jump Game III':                                   'jump-game-iii',
  'Arithmetic Slices':                               'arithmetic-slices',
  'Count Number of Teams':                           'count-number-of-teams',
  'Maximum Length of Repeated Subarray':             'maximum-length-repeated-subarray',
  'Number of Longest Increasing Subsequence':        'number-longest-increasing-subsequence',
  // ── Tries ────────────────────────────────────────────────────────────────────
  'Implement Trie (Prefix Tree)':                    'implement-trie',
  'Design Add and Search Words Data Structure':      'design-add-search-words',
  'Word Search II':                                  'word-search-ii',
  'Replace Words':                                   'replace-words',
  'Longest Word in Dictionary':                      'longest-word-in-dictionary',
  // ── Intervals ────────────────────────────────────────────────────────────────
  'Merge Intervals':                                 'merge-intervals',
  'Insert Interval':                                 'insert-interval',
  'Non-Overlapping Intervals':                       'non-overlapping-intervals',
  'Meeting Rooms II':                                'meeting-rooms-ii',
  'Minimum Number of Arrows to Burst Balloons':      'minimum-arrows-burst-balloons',
  'My Calendar I':                                   'my-calendar-i',
  'Interval List Intersections':                     'interval-list-intersections',
  // ── Greedy ───────────────────────────────────────────────────────────────────
  'Jump Game':                                       'jump-game',
  'Jump Game II':                                    'jump-game-ii',
  'Gas Station':                                     'gas-station',
  'Hand of Straights':                               'hand-of-straights',
  'Merge Triplets to Form Target Triplet':           'merge-triplets-form-target',
  'Partition Labels':                                'partition-labels',
  'Valid Parenthesis String':                        'valid-parenthesis-string',
  'Candy':                                           'candy',
  'Boats to Save People':                            'boats-to-save-people',
  'Lemonade Change':                                 'lemonade-change',
  // ── Advanced Graphs ──────────────────────────────────────────────────────────
  'Reconstruct Itinerary':                           'reconstruct-itinerary',
  'Min Cost to Connect All Points':                  'min-cost-connect-all-points',
  'Network Delay Time':                              'network-delay-time',
  'Swim in Rising Water':                            'swim-in-rising-water',
  'Cheapest Flights Within K Stops':                 'cheapest-flights-k-stops',
  'Find the City With the Smallest Number of Neighbors': 'find-city-smallest-neighbors',
  'Path with Maximum Probability':                   'path-with-max-probability',
  'Critical Connections in a Network':               'critical-connections-network',
  // ── 2D Dynamic Programming ───────────────────────────────────────────────────
  'Best Time to Buy and Sell Stock III':             'best-time-buy-sell-stock-iii',
  'Best Time to Buy and Sell Stock IV':              'best-time-buy-sell-stock-iv',
  'Frog Jump':                                       'frog-jump',
  'Minimum Number of Taps to Open to Water a Garden': 'minimum-taps-open-water-garden',
  'Unique Paths II':                                 'unique-paths-ii',
  'Longest Common Subsequence':                      'longest-common-subsequence',
  'Best Time to Buy and Sell Stock with Cooldown':   'best-time-buy-sell-stock-cooldown',
  'Coin Change II':                                  'coin-change-ii',
  'Target Sum':                                      'target-sum',
  'Interleaving String':                             'interleaving-string',
  'Longest Increasing Path in a Matrix':             'longest-increasing-path-matrix',
  'Distinct Subsequences':                           'distinct-subsequences',
  'Edit Distance':                                   'edit-distance',
  'Burst Balloons':                                  'burst-balloons',
  'Regular Expression Matching':                     'regular-expression-matching',
  'Stone Game':                                      'stone-game',
  // ── Bit Manipulation ─────────────────────────────────────────────────────────
  'Single Number':                                   'single-number',
  'Number of 1 Bits':                                'number-of-1-bits',
  'Counting Bits':                                   'counting-bits',
  'Reverse Bits':                                    'reverse-bits',
  'Missing Number':                                  'missing-number',
  'Sum of Two Integers':                             'sum-of-two-integers',
  'Reverse Integer':                                 'reverse-integer',
  'Single Number II':                                'single-number-ii',
  // ── Math & Geometry ──────────────────────────────────────────────────────────
  'Rotate Image':                                    'rotate-image',
  'Spiral Matrix':                                   'spiral-matrix',
  'Set Matrix Zeroes':                               'set-matrix-zeroes',
  'Happy Number':                                    'happy-number',
  'Plus One':                                        'plus-one',
  'Pow(x, n)':                                       'power-x-n',
  'Multiply Strings':                                'multiply-strings',
  'Detect Squares':                                  'detect-squares',
  'Integer to Roman':                                'integer-to-roman',
  'Roman to Integer':                                'roman-to-integer',
  'Count Primes':                                    'count-primes',
  // ── Monotonic Stack ──────────────────────────────────────────────────────────
  'Next Greater Element II':                         'next-greater-element-ii',
  'Online Stock Span':                               'online-stock-span',
  'Sum of Subarray Minimums':                        'sum-of-subarray-minimums',
  '132 Pattern':                                     '132-pattern',
  'Remove Duplicate Letters':                        'remove-duplicate-letters',
  'Remove K Digits':                                 'remove-k-digits',
  'Minimum Cost Tree From Leaf Values':              'minimum-cost-tree-leaf-values',
  'Maximum Width Ramp':                              'maximum-width-ramp',
  // ── String Manipulation ──────────────────────────────────────────────────────
  'Valid Palindrome II':                             'valid-palindrome-ii',
  'Longest Palindromic Subsequence':                 'longest-palindromic-subsequence',
  'Reverse Words in a String':                       'reverse-words-in-string',
  'String to Integer (atoi)':                        'string-to-integer-atoi',
  'Count and Say':                                   'count-and-say',
  'Encode and Decode Strings':                       'encode-decode-strings',
  'ZigZag Conversion':                               'zigzag-conversion',
  'Text Justification':                              'text-justification',
  'Is Subsequence':                                  'is-subsequence',
  'Find the Index of the First Occurrence in a String': 'find-first-occurrence-string',
  'Minimum Add to Make Parentheses Valid':           'minimum-add-make-parentheses-valid',
  'Longest Common Prefix':                           'longest-common-prefix',
  // ── Sorting ──────────────────────────────────────────────────────────────────
  'Sort an Array':                                   'sort-an-array',
  'Merge Sorted Array':                              'merge-sorted-array',
  'H-Index':                                         'h-index',
  'Largest Number':                                  'largest-number',
  'Wiggle Sort II':                                  'wiggle-sort-ii',
  'Maximum Gap':                                     'maximum-gap',
  // ── Prefix Sum ───────────────────────────────────────────────────────────────
  'Running Sum of 1d Array':                         'running-sum-1d-array',
  'Range Sum Query - Immutable':                     'range-sum-query-immutable',
  'Contiguous Array':                                'contiguous-array',
  'Find Pivot Index':                                'find-pivot-index',
  'Maximum Subarray Sum with One Deletion':          'maximum-subarray-sum-one-deletion',
  'Count of Range Sum':                              'count-of-range-sum',
  'Continuous Subarray Sum':                         'continuous-subarray-sum',
  'Maximum Sum of 3 Non-Overlapping Subarrays':      'maximum-sum-3-non-overlapping',
  'Max Sum of Rectangle No Larger Than K':           'max-sum-rectangle-no-larger-k',

  // ── Classic NeetCode problems (now on platform) ───────────────────────────
  'Valid Anagram':                                   'valid-anagram',
  'Group Anagrams':                                  'group-anagrams',
  'Product of Array Except Self':                    'product-of-array-except-self',
  'Valid Sudoku':                                    'valid-sudoku',
  'Longest Consecutive Sequence':                    'longest-consecutive-sequence',
  '3Sum':                                            '3sum',
  'Container With Most Water':                       'container-with-most-water',
  'Trapping Rain Water':                             'trapping-rain-water',
  'Best Time to Buy and Sell Stock':                 'best-time-to-buy-and-sell-stock',
  'Longest Substring Without Repeating Chars':       'longest-substring-without-repeating-chars',
  'Longest Repeating Character Replacement':         'longest-repeating-character-replacement',
  'Permutation in String':                           'permutation-in-string',
  'Minimum Window Substring':                        'minimum-window-substring',
  'Sliding Window Maximum':                          'sliding-window-maximum',
  'Min Stack':                                       'min-stack',
  'Evaluate Reverse Polish Notation':                'evaluate-reverse-polish-notation',
  'Generate Parentheses':                            'generate-parentheses',
  'Daily Temperatures':                              'daily-temperatures',
  'Car Fleet':                                       'car-fleet',
  'Largest Rectangle in Histogram':                  'largest-rectangle-in-histogram',
  'Search a 2D Matrix':                              'search-a-2d-matrix',
  'Find Minimum in Rotated Sorted Array':            'find-minimum-in-rotated-sorted-array',
  'Search in Rotated Sorted Array':                  'search-in-rotated-sorted-array',
  'Time Based Key-Value Store':                      'time-based-key-value-store',
  'Median of Two Sorted Arrays':                     'median-of-two-sorted-arrays',
  'Merge Two Sorted Lists':                          'merge-two-sorted-lists',
  'Reorder List':                                    'reorder-list',
  'Remove Nth Node From End of List':                'remove-nth-node-from-end',
  'Copy List with Random Pointer':                   'copy-list-with-random-pointer',
  'Add Two Numbers':                                 'add-two-numbers',
  'Find the Duplicate Number':                       'find-the-duplicate-number',
  'LRU Cache':                                       'lru-cache',
  'Merge K Sorted Lists':                            'merge-k-sorted-lists',
  'Reverse Nodes in K-Group':                        'reverse-nodes-in-k-group',
  'Invert Binary Tree':                              'invert-binary-tree',
  'Diameter of Binary Tree':                         'diameter-of-binary-tree',
  'Balanced Binary Tree':                            'balanced-binary-tree',
  'Same Tree':                                       'same-tree',
  'Subtree of Another Tree':                         'subtree-of-another-tree',
  'Lowest Common Ancestor of a BST':                 'lowest-common-ancestor-of-bst',
  'Binary Tree Right Side View':                     'binary-tree-right-side-view',
  'Count Good Nodes in Binary Tree':                 'count-good-nodes-in-binary-tree',
  'Validate Binary Search Tree':                     'validate-binary-search-tree',
  'Kth Smallest Element in a BST':                   'kth-smallest-element-in-bst',
  'Construct Tree from Preorder and Inorder':        'construct-tree-from-preorder-inorder',
  'Binary Tree Maximum Path Sum':                    'binary-tree-maximum-path-sum',
  'Serialize and Deserialize Binary Tree':           'serialize-and-deserialize-binary-tree',
  'Last Stone Weight':                               'last-stone-weight',
  'K Closest Points to Origin':                      'k-closest-points-to-origin',
  'Kth Largest Element in an Array':                 'kth-largest-element-in-array',
  'Task Scheduler':                                  'task-scheduler',
  'Design Twitter':                                  'design-twitter',
  'Find Median from Data Stream':                    'find-median-from-data-stream',
  'Combination Sum':                                 'combination-sum',
  'Permutations':                                    'permutations',
  'Subsets II':                                      'subsets-ii',
  'Combination Sum II':                              'combination-sum-ii',
  'Word Search':                                     'word-search',
  'Palindrome Partitioning':                         'palindrome-partitioning',
  'Letter Combinations of Phone':                    'letter-combinations-of-phone',
  'N-Queens':                                        'n-queens',
  'Number of Islands':                               'number-of-islands',
  'Clone Graph':                                     'clone-graph',
  'Max Area of Island':                              'max-area-of-island',
  'Pacific Atlantic Water Flow':                     'pacific-atlantic-water-flow',
  'Surrounded Regions':                              'surrounded-regions',
  'Rotting Oranges':                                 'rotting-oranges',
  'Walls and Gates':                                 'walls-and-gates',
  'Course Schedule II':                              'course-schedule-ii',
  'Redundant Connection':                            'redundant-connection',
  'Number of Connected Components':                  'number-of-connected-components',
  'Graph Valid Tree':                                'graph-valid-tree',
  'Word Ladder':                                     'word-ladder',
  'Min Cost Climbing Stairs':                        'min-cost-climbing-stairs',
  'House Robber':                                    'house-robber',
  'House Robber II':                                 'house-robber-ii',
  'Longest Palindromic Substring':                   'longest-palindromic-substring',
  'Palindromic Substrings':                          'palindromic-substrings',
  'Decode Ways':                                     'decode-ways',
  'Coin Change':                                     'coin-change',
  'Maximum Product Subarray':                        'maximum-product-subarray',
  'Word Break':                                      'word-break',
  'Longest Increasing Subsequence':                  'longest-increasing-subsequence',
}

function handleProblemClick(problem) {
  const sessionId = SESSION_IDS[problem.name]
  if (sessionId) {
    router.push(`/session/${sessionId}`)
  } else if (problem.url) {
    window.open(problem.url, '_blank', 'noopener,noreferrer')
  }
}

const topics = reactive([
  {
    id: 'arrays-hashing',
    label: 'Arrays & Hashing',
    subtitle: 'Build your foundation',
    problems: [
      { id: 1,  name: 'Contains Duplicate',               difficulty: 'Easy',   url: 'https://leetcode.com/problems/contains-duplicate/',               done: false },
      { id: 2,  name: 'Valid Anagram',                     difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-anagram/',                     done: false },
      { id: 3,  name: 'Two Sum',                           difficulty: 'Easy',   url: 'https://leetcode.com/problems/two-sum/',                           done: false },
      { id: 4,  name: 'Group Anagrams',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/',                    done: false },
      { id: 5,  name: 'Top K Frequent Elements',           difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/',           done: false },
      { id: 6,  name: 'Product of Array Except Self',      difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/',      done: false },
      { id: 7,  name: 'Valid Sudoku',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/valid-sudoku/',                      done: false },
      { id: 8,   name: 'Longest Consecutive Sequence',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/', done: false },
      { id: 195, name: 'Maximum Subarray',                                   difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/', done: false },
      { id: 196, name: 'Subarray Sum Equals K',                              difficulty: 'Medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', done: false },
      { id: 197, name: 'Sort Colors',                                        difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-colors/', done: false },
      { id: 198, name: 'Majority Element',                                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/majority-element/', done: false },
      { id: 199, name: 'First Missing Positive',                             difficulty: 'Hard',   url: 'https://leetcode.com/problems/first-missing-positive/', done: false },
      { id: 200, name: 'Best Time to Buy and Sell Stock II',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', done: false },
      { id: 201, name: 'Rotate Array',                                       difficulty: 'Medium', url: 'https://leetcode.com/problems/rotate-array/', done: false },
      { id: 202, name: 'Find All Duplicates in an Array',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/', done: false },
      { id: 203, name: '3Sum Closest',                                       difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum-closest/', done: false },
      { id: 204, name: '4Sum',                                               difficulty: 'Medium', url: 'https://leetcode.com/problems/4sum/', done: false },
      { id: 205, name: "Pascal's Triangle",                                  difficulty: 'Easy',   url: 'https://leetcode.com/problems/pascals-triangle/', done: false },
      { id: 206, name: 'Next Permutation',                                   difficulty: 'Medium', url: 'https://leetcode.com/problems/next-permutation/', done: false },
      { id: 207, name: 'Find All Numbers Disappeared in an Array',           difficulty: 'Easy',   url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', done: false },
      { id: 281, name: 'Continuous Subarray Sum',                            difficulty: 'Medium', url: 'https://leetcode.com/problems/continuous-subarray-sum/', done: false },
      { id: 282, name: 'Check If Array Pairs Are Divisible by k',            difficulty: 'Medium', url: 'https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/', done: false },
      { id: 283, name: 'Number of Subarrays with Bounded Maximum',           difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/', done: false },
      { id: 284, name: 'Maximum Sum of 3 Non-Overlapping Subarrays',         difficulty: 'Hard',   url: 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/', done: false },
      { id: 285, name: 'Max Sum of Rectangle No Larger Than K',              difficulty: 'Hard',   url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/', done: false },
    ],
  },
  {
    id: 'two-pointers',
    label: 'Two Pointers',
    subtitle: 'Move efficiently through data',
    problems: [
      { id: 9,  name: 'Valid Palindrome',                  difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-palindrome/',                  done: false },
      { id: 10, name: 'Two Sum II',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',  done: false },
      { id: 11, name: '3Sum',                              difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/',                              done: false },
      { id: 12, name: 'Container With Most Water',         difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/',         done: false },
      { id: 13,  name: 'Trapping Rain Water',                               difficulty: 'Hard',   url: 'https://leetcode.com/problems/trapping-rain-water/', done: false },
      { id: 208, name: 'Move Zeroes',                                        difficulty: 'Easy',   url: 'https://leetcode.com/problems/move-zeroes/', done: false },
      { id: 209, name: 'Squares of a Sorted Array',                          difficulty: 'Easy',   url: 'https://leetcode.com/problems/squares-of-a-sorted-array/', done: false },
      { id: 210, name: 'Sort Array By Parity',                               difficulty: 'Easy',   url: 'https://leetcode.com/problems/sort-array-by-parity/', done: false },
      { id: 211, name: 'Max Number of K-Sum Pairs',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/max-number-of-k-sum-pairs/', done: false },
      { id: 212, name: 'Minimum Length of String After Deleting Similar Ends', difficulty: 'Medium', url: 'https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/', done: false },
    ],
  },
  {
    id: 'sliding-window',
    label: 'Sliding Window',
    subtitle: 'Track ranges, not restarts',
    problems: [
      { id: 14, name: 'Best Time to Buy and Sell Stock',           difficulty: 'Easy',   url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',          done: false },
      { id: 15, name: 'Longest Substring Without Repeating Chars', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', done: false },
      { id: 16, name: 'Longest Repeating Character Replacement',   difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/',  done: false },
      { id: 17, name: 'Permutation in String',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/',                    done: false },
      { id: 18, name: 'Minimum Window Substring',                  difficulty: 'Hard',   url: 'https://leetcode.com/problems/minimum-window-substring/',                 done: false },
      { id: 19,  name: 'Sliding Window Maximum',                            difficulty: 'Hard',   url: 'https://leetcode.com/problems/sliding-window-maximum/', done: false },
      { id: 213, name: 'Max Consecutive Ones III',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/', done: false },
      { id: 214, name: 'Minimum Size Subarray Sum',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/', done: false },
      { id: 215, name: 'Fruit Into Baskets',                                difficulty: 'Medium', url: 'https://leetcode.com/problems/fruit-into-baskets/', done: false },
      { id: 216, name: 'Count Number of Nice Subarrays',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/', done: false },
      { id: 217, name: 'Grumpy Bookstore Owner',                            difficulty: 'Medium', url: 'https://leetcode.com/problems/grumpy-bookstore-owner/', done: false },
      { id: 218, name: 'Substring with Concatenation of All Words',         difficulty: 'Hard',   url: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', done: false },
    ],
  },
  {
    id: 'stack',
    label: 'Stack',
    subtitle: 'Last in, first out',
    problems: [
      { id: 20, name: 'Valid Parentheses',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-parentheses/',                   done: false },
      { id: 21, name: 'Min Stack',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/min-stack/',                           done: false },
      { id: 22, name: 'Evaluate Reverse Polish Notation',    difficulty: 'Medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',    done: false },
      { id: 23, name: 'Generate Parentheses',                difficulty: 'Medium', url: 'https://leetcode.com/problems/generate-parentheses/',                done: false },
      { id: 24, name: 'Daily Temperatures',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/',                  done: false },
      { id: 25, name: 'Car Fleet',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/car-fleet/',                           done: false },
      { id: 26,  name: 'Largest Rectangle in Histogram',                   difficulty: 'Hard',   url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', done: false },
      { id: 219, name: 'Decode String',                                     difficulty: 'Medium', url: 'https://leetcode.com/problems/decode-string/', done: false },
      { id: 220, name: 'Basic Calculator II',                               difficulty: 'Medium', url: 'https://leetcode.com/problems/basic-calculator-ii/', done: false },
      { id: 221, name: 'Simplify Path',                                     difficulty: 'Medium', url: 'https://leetcode.com/problems/simplify-path/', done: false },
      { id: 222, name: 'Score of Parentheses',                              difficulty: 'Medium', url: 'https://leetcode.com/problems/score-of-parentheses/', done: false },
      { id: 223, name: 'Asteroid Collision',                                difficulty: 'Medium', url: 'https://leetcode.com/problems/asteroid-collision/', done: false },
      { id: 224, name: 'Basic Calculator',                                  difficulty: 'Hard',   url: 'https://leetcode.com/problems/basic-calculator/', done: false },
    ],
  },
  {
    id: 'binary-search',
    label: 'Binary Search',
    subtitle: 'Eliminate half with every guess',
    problems: [
      { id: 27, name: 'Binary Search',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/binary-search/',                         done: false },
      { id: 28, name: 'Search a 2D Matrix',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/search-a-2d-matrix/',                    done: false },
      { id: 29, name: 'Koko Eating Bananas',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/',                   done: false },
      { id: 30, name: 'Find Minimum in Rotated Sorted Array',  difficulty: 'Medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',  done: false },
      { id: 31, name: 'Search in Rotated Sorted Array',        difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',        done: false },
      { id: 32, name: 'Time Based Key-Value Store',            difficulty: 'Medium', url: 'https://leetcode.com/problems/time-based-key-value-store/',            done: false },
      { id: 33,  name: 'Median of Two Sorted Arrays',                      difficulty: 'Hard',   url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', done: false },
      { id: 225, name: 'Find Minimum in Rotated Sorted Array II',           difficulty: 'Hard',   url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/', done: false },
      { id: 226, name: 'Capacity to Ship Packages Within D Days',           difficulty: 'Medium', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', done: false },
      { id: 227, name: 'Find K Closest Elements',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/find-k-closest-elements/', done: false },
      { id: 228, name: 'Split Array Largest Sum',                           difficulty: 'Hard',   url: 'https://leetcode.com/problems/split-array-largest-sum/', done: false },
      { id: 229, name: 'Search in Rotated Sorted Array II',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', done: false },
      { id: 230, name: 'Minimum Speed to Arrive on Time',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/minimum-speed-to-arrive-on-time/', done: false },
    ],
  },
  {
    id: 'linked-list',
    label: 'Linked List',
    subtitle: 'Follow the chain',
    problems: [
      { id: 34, name: 'Reverse Linked List',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/reverse-linked-list/',                   done: false },
      { id: 35, name: 'Merge Two Sorted Lists',                difficulty: 'Easy',   url: 'https://leetcode.com/problems/merge-two-sorted-lists/',                done: false },
      { id: 36, name: 'Linked List Cycle',                     difficulty: 'Easy',   url: 'https://leetcode.com/problems/linked-list-cycle/',                     done: false },
      { id: 37, name: 'Reorder List',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/',                          done: false },
      { id: 38, name: 'Remove Nth Node From End of List',      difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',      done: false },
      { id: 39, name: 'Copy List with Random Pointer',         difficulty: 'Medium', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',         done: false },
      { id: 40, name: 'Add Two Numbers',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/add-two-numbers/',                       done: false },
      { id: 41, name: 'Find the Duplicate Number',             difficulty: 'Medium', url: 'https://leetcode.com/problems/find-the-duplicate-number/',             done: false },
      { id: 42, name: 'LRU Cache',                             difficulty: 'Medium', url: 'https://leetcode.com/problems/lru-cache/',                             done: false },
      { id: 43, name: 'Merge K Sorted Lists',                  difficulty: 'Hard',   url: 'https://leetcode.com/problems/merge-k-sorted-lists/',                  done: false },
      { id: 44,  name: 'Reverse Nodes in K-Group',                          difficulty: 'Hard',   url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', done: false },
      { id: 231, name: 'Remove Linked List Elements',                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/remove-linked-list-elements/', done: false },
      { id: 232, name: 'Palindrome Linked List',                            difficulty: 'Easy',   url: 'https://leetcode.com/problems/palindrome-linked-list/', done: false },
      { id: 233, name: 'Middle of the Linked List',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/middle-of-the-linked-list/', done: false },
      { id: 234, name: 'Flatten a Multilevel Doubly Linked List',           difficulty: 'Medium', url: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', done: false },
      { id: 235, name: 'Sort List',                                         difficulty: 'Medium', url: 'https://leetcode.com/problems/sort-list/', done: false },
    ],
  },
  {
    id: 'trees',
    label: 'Trees',
    subtitle: 'Traverse and conquer',
    problems: [
      { id: 45, name: 'Invert Binary Tree',                              difficulty: 'Easy',   url: 'https://leetcode.com/problems/invert-binary-tree/',                                     done: false },
      { id: 46, name: 'Maximum Depth of Binary Tree',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',                           done: false },
      { id: 47, name: 'Diameter of Binary Tree',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/diameter-of-binary-tree/',                                done: false },
      { id: 48, name: 'Balanced Binary Tree',                            difficulty: 'Easy',   url: 'https://leetcode.com/problems/balanced-binary-tree/',                                   done: false },
      { id: 49, name: 'Same Tree',                                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/same-tree/',                                              done: false },
      { id: 50, name: 'Subtree of Another Tree',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/subtree-of-another-tree/',                                done: false },
      { id: 51, name: 'Lowest Common Ancestor of a BST',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',         done: false },
      { id: 52, name: 'Binary Tree Level Order Traversal',               difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',                      done: false },
      { id: 53, name: 'Binary Tree Right Side View',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-right-side-view/',                            done: false },
      { id: 54, name: 'Count Good Nodes in Binary Tree',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',                        done: false },
      { id: 55, name: 'Validate Binary Search Tree',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/',                            done: false },
      { id: 56, name: 'Kth Smallest Element in a BST',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',                          done: false },
      { id: 57, name: 'Construct Tree from Preorder and Inorder',        difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', done: false },
      { id: 58, name: 'Binary Tree Maximum Path Sum',                    difficulty: 'Hard',   url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',                           done: false },
      { id: 59,  name: 'Serialize and Deserialize Binary Tree',           difficulty: 'Hard',   url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', done: false },
      { id: 236, name: 'Path Sum',                                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/path-sum/', done: false },
      { id: 237, name: 'Path Sum II',                                      difficulty: 'Medium', url: 'https://leetcode.com/problems/path-sum-ii/', done: false },
      { id: 238, name: 'Symmetric Tree',                                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/symmetric-tree/', done: false },
      { id: 239, name: 'Flatten Binary Tree to Linked List',               difficulty: 'Medium', url: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', done: false },
      { id: 240, name: 'Populating Next Right Pointers in Each Node',      difficulty: 'Medium', url: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', done: false },
      { id: 241, name: 'Sum Root to Leaf Numbers',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', done: false },
      { id: 242, name: 'Binary Tree Zigzag Level Order Traversal',         difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', done: false },
      { id: 243, name: 'Convert Sorted Array to Binary Search Tree',       difficulty: 'Easy',   url: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', done: false },
      { id: 244, name: 'Delete Node in a BST',                             difficulty: 'Medium', url: 'https://leetcode.com/problems/delete-node-in-a-bst/', done: false },
      { id: 245, name: 'Binary Search Tree Iterator',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-search-tree-iterator/', done: false },
      { id: 246, name: 'Trim a Binary Search Tree',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/trim-a-binary-search-tree/', done: false },
      { id: 247, name: 'Recover Binary Search Tree',                       difficulty: 'Hard',   url: 'https://leetcode.com/problems/recover-binary-search-tree/', done: false },
      { id: 291, name: 'Lowest Common Ancestor of a Binary Tree',          difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', done: false },
      { id: 292, name: 'Count Complete Tree Nodes',                        difficulty: 'Easy',   url: 'https://leetcode.com/problems/count-complete-tree-nodes/', done: false },
      { id: 293, name: 'All Nodes Distance K in Binary Tree',              difficulty: 'Medium', url: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', done: false },
      { id: 294, name: 'House Robber III',                                 difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-iii/', done: false },
      { id: 295, name: 'Vertical Order Traversal of a Binary Tree',        difficulty: 'Hard',   url: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/', done: false },
    ],
  },
  {
    id: 'heap',
    label: 'Heap / Priority Queue',
    subtitle: 'Always find the extreme',
    problems: [
      { id: 60, name: 'Kth Largest Element in a Stream',     difficulty: 'Easy',   url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',     done: false },
      { id: 61, name: 'Last Stone Weight',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/last-stone-weight/',                   done: false },
      { id: 62, name: 'K Closest Points to Origin',          difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/',          done: false },
      { id: 63, name: 'Kth Largest Element in an Array',     difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',     done: false },
      { id: 64, name: 'Task Scheduler',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/',                      done: false },
      { id: 65, name: 'Design Twitter',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/design-twitter/',                      done: false },
      { id: 66,  name: 'Find Median from Data Stream',                     difficulty: 'Hard',   url: 'https://leetcode.com/problems/find-median-from-data-stream/', done: false },
      { id: 248, name: 'Smallest Range Covering Elements from K Lists',    difficulty: 'Hard',   url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', done: false },
      { id: 249, name: 'IPO',                                              difficulty: 'Hard',   url: 'https://leetcode.com/problems/ipo/', done: false },
      { id: 250, name: 'Reorganize String',                                difficulty: 'Medium', url: 'https://leetcode.com/problems/reorganize-string/', done: false },
      { id: 251, name: 'Maximum Frequency Stack',                          difficulty: 'Hard',   url: 'https://leetcode.com/problems/maximum-frequency-stack/', done: false },
      { id: 252, name: 'K Pairs with Smallest Sums',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/', done: false },
      { id: 253, name: 'Minimum Cost to Connect Sticks',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/', done: false },
    ],
  },
  {
    id: 'backtracking',
    label: 'Backtracking',
    subtitle: 'Try every path',
    problems: [
      { id: 67, name: 'Subsets',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/',                     done: false },
      { id: 68, name: 'Combination Sum',              difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/',              done: false },
      { id: 69, name: 'Permutations',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/',                 done: false },
      { id: 70, name: 'Subsets II',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets-ii/',                   done: false },
      { id: 71, name: 'Combination Sum II',           difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-ii/',           done: false },
      { id: 72, name: 'Word Search',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/',                  done: false },
      { id: 73, name: 'Palindrome Partitioning',      difficulty: 'Medium', url: 'https://leetcode.com/problems/palindrome-partitioning/',      done: false },
      { id: 74, name: 'Letter Combinations of Phone', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', done: false },
      { id: 75,  name: 'N-Queens',                                         difficulty: 'Hard',   url: 'https://leetcode.com/problems/n-queens/', done: false },
      { id: 254, name: 'Combination Sum III',                              difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-iii/', done: false },
      { id: 255, name: 'N-Queens II',                                      difficulty: 'Hard',   url: 'https://leetcode.com/problems/n-queens-ii/', done: false },
      { id: 256, name: 'Sudoku Solver',                                    difficulty: 'Hard',   url: 'https://leetcode.com/problems/sudoku-solver/', done: false },
      { id: 257, name: 'Word Break II',                                    difficulty: 'Hard',   url: 'https://leetcode.com/problems/word-break-ii/', done: false },
      { id: 258, name: 'Restore IP Addresses',                             difficulty: 'Medium', url: 'https://leetcode.com/problems/restore-ip-addresses/', done: false },
      { id: 259, name: 'Combinations',                                     difficulty: 'Medium', url: 'https://leetcode.com/problems/combinations/', done: false },
    ],
  },
  {
    id: 'graphs',
    label: 'Graphs',
    subtitle: 'Navigate connections',
    problems: [
      { id: 76, name: 'Number of Islands',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/',                   done: false },
      { id: 77, name: 'Clone Graph',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/clone-graph/',                         done: false },
      { id: 78, name: 'Max Area of Island',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/max-area-of-island/',                  done: false },
      { id: 79, name: 'Pacific Atlantic Water Flow',         difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',         done: false },
      { id: 80, name: 'Surrounded Regions',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/surrounded-regions/',                  done: false },
      { id: 81, name: 'Rotting Oranges',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/',                     done: false },
      { id: 82, name: 'Walls and Gates',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/walls-and-gates/',                     done: false },
      { id: 83, name: 'Course Schedule',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/',                     done: false },
      { id: 84, name: 'Course Schedule II',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/',                  done: false },
      { id: 85, name: 'Redundant Connection',                difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/',                done: false },
      { id: 86, name: 'Number of Connected Components',      difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', done: false },
      { id: 87, name: 'Graph Valid Tree',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/graph-valid-tree/',                    done: false },
      { id: 88,  name: 'Word Ladder',                                           difficulty: 'Hard',   url: 'https://leetcode.com/problems/word-ladder/', done: false },
      { id: 260, name: 'Open the Lock',                                        difficulty: 'Hard',   url: '', done: false },
      { id: 261, name: '01 Matrix',                                            difficulty: 'Medium', url: '', done: false },
      { id: 262, name: 'Shortest Path in Binary Matrix',                       difficulty: 'Medium', url: '', done: false },
      { id: 263, name: 'All Paths From Source to Target',                      difficulty: 'Medium', url: '', done: false },
      { id: 264, name: 'Find Eventual Safe States',                             difficulty: 'Medium', url: '', done: false },
      { id: 265, name: 'Minimum Genetic Mutation',                             difficulty: 'Medium', url: '', done: false },
      { id: 266, name: 'Is Graph Bipartite?',                                  difficulty: 'Medium', url: '', done: false },
      { id: 267, name: 'Number of Provinces',                                  difficulty: 'Medium', url: '', done: false },
      { id: 268, name: 'Evaluate Division',                                    difficulty: 'Medium', url: '', done: false },
      { id: 269, name: 'Accounts Merge',                                       difficulty: 'Medium', url: '', done: false },
      { id: 270, name: 'Keys and Rooms',                                       difficulty: 'Medium', url: '', done: false },
      { id: 271, name: 'Detonate the Maximum Bombs',                           difficulty: 'Medium', url: '', done: false },
      { id: 286, name: 'Number of Operations to Make Network Connected',       difficulty: 'Medium', url: '', done: false },
      { id: 287, name: 'Minimum Height Trees',                                 difficulty: 'Medium', url: '', done: false },
      { id: 288, name: 'Snakes and Ladders',                                   difficulty: 'Medium', url: '', done: false },
      { id: 289, name: 'Frog Jump',                                            difficulty: 'Hard',   url: '', done: false },
      { id: 290, name: 'Maximum Total Importance of Roads',                    difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'dp-1d',
    label: '1D Dynamic Programming',
    subtitle: 'Build from smaller answers',
    problems: [
      { id: 89,  name: 'Climbing Stairs',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/climbing-stairs/',                    done: false },
      { id: 90,  name: 'Min Cost Climbing Stairs',           difficulty: 'Easy',   url: 'https://leetcode.com/problems/min-cost-climbing-stairs/',           done: false },
      { id: 91,  name: 'House Robber',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/',                       done: false },
      { id: 92,  name: 'House Robber II',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-ii/',                    done: false },
      { id: 93,  name: 'Longest Palindromic Substring',      difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-substring/',      done: false },
      { id: 94,  name: 'Palindromic Substrings',             difficulty: 'Medium', url: 'https://leetcode.com/problems/palindromic-substrings/',             done: false },
      { id: 95,  name: 'Decode Ways',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/decode-ways/',                        done: false },
      { id: 96,  name: 'Coin Change',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/',                        done: false },
      { id: 97,  name: 'Maximum Product Subarray',           difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/',           done: false },
      { id: 98,  name: 'Word Break',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/word-break/',                         done: false },
      { id: 99,  name: 'Longest Increasing Subsequence',     difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/',     done: false },
      { id: 100, name: 'Partition Equal Subset Sum',         difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/',         done: false },
      { id: 272, name: 'Best Time to Buy and Sell Stock III',                 difficulty: 'Hard',   url: '', done: false },
      { id: 273, name: 'Best Time to Buy and Sell Stock IV',                  difficulty: 'Hard',   url: '', done: false },
      { id: 274, name: 'Delete and Earn',                                     difficulty: 'Medium', url: '', done: false },
      { id: 275, name: 'Minimum Cost for Tickets',                            difficulty: 'Medium', url: '', done: false },
      { id: 276, name: 'Domino and Tromino Tiling',                           difficulty: 'Medium', url: '', done: false },
      { id: 277, name: 'Perfect Squares',                                     difficulty: 'Medium', url: '', done: false },
      { id: 278, name: 'Integer Break',                                       difficulty: 'Medium', url: '', done: false },
      { id: 279, name: 'N-th Tribonacci Number',                              difficulty: 'Easy',   url: '', done: false },
      { id: 280, name: 'Jump Game III',                                       difficulty: 'Medium', url: '', done: false },
      { id: 296, name: 'Arithmetic Slices',                                   difficulty: 'Medium', url: '', done: false },
      { id: 297, name: 'Count Number of Teams',                               difficulty: 'Medium', url: '', done: false },
      { id: 298, name: 'Maximum Length of Repeated Subarray',                 difficulty: 'Medium', url: '', done: false },
      { id: 299, name: 'Number of Longest Increasing Subsequence',            difficulty: 'Medium', url: '', done: false },
      { id: 300, name: 'Minimum Number of Taps to Open to Water a Garden',    difficulty: 'Hard',   url: '', done: false },
    ],
  },
  {
    id: 'tries',
    label: 'Tries',
    subtitle: 'Prefix trees for string search',
    problems: [
      { id: 101, name: 'Implement Trie (Prefix Tree)',                        difficulty: 'Medium', url: '', done: false },
      { id: 102, name: 'Design Add and Search Words Data Structure',          difficulty: 'Medium', url: '', done: false },
      { id: 103, name: 'Word Search II',                                      difficulty: 'Hard',   url: '', done: false },
      { id: 104, name: 'Replace Words',                                       difficulty: 'Medium', url: '', done: false },
      { id: 105, name: 'Longest Word in Dictionary',                          difficulty: 'Easy',   url: '', done: false },
    ],
  },
  {
    id: 'intervals',
    label: 'Intervals',
    subtitle: 'Merge, insert, and schedule ranges',
    problems: [
      { id: 106, name: 'Merge Intervals',                                     difficulty: 'Medium', url: '', done: false },
      { id: 107, name: 'Insert Interval',                                     difficulty: 'Medium', url: '', done: false },
      { id: 108, name: 'Non-Overlapping Intervals',                           difficulty: 'Medium', url: '', done: false },
      { id: 109, name: 'Meeting Rooms II',                                    difficulty: 'Medium', url: '', done: false },
      { id: 110, name: 'Minimum Number of Arrows to Burst Balloons',          difficulty: 'Medium', url: '', done: false },
      { id: 111, name: 'Employee Free Time',                                  difficulty: 'Hard',   url: '', done: false },
      { id: 112, name: 'My Calendar I',                                       difficulty: 'Medium', url: '', done: false },
      { id: 113, name: 'Interval List Intersections',                         difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'greedy',
    label: 'Greedy',
    subtitle: 'Locally optimal, globally correct',
    problems: [
      { id: 114, name: 'Jump Game',                                           difficulty: 'Medium', url: '', done: false },
      { id: 115, name: 'Jump Game II',                                        difficulty: 'Medium', url: '', done: false },
      { id: 116, name: 'Gas Station',                                         difficulty: 'Medium', url: '', done: false },
      { id: 117, name: 'Hand of Straights',                                   difficulty: 'Medium', url: '', done: false },
      { id: 118, name: 'Merge Triplets to Form Target Triplet',               difficulty: 'Medium', url: '', done: false },
      { id: 119, name: 'Partition Labels',                                    difficulty: 'Medium', url: '', done: false },
      { id: 120, name: 'Valid Parenthesis String',                            difficulty: 'Medium', url: '', done: false },
      { id: 121, name: 'Candy',                                               difficulty: 'Hard',   url: '', done: false },
      { id: 122, name: 'Boats to Save People',                                difficulty: 'Medium', url: '', done: false },
      { id: 123, name: 'Lemonade Change',                                     difficulty: 'Easy',   url: '', done: false },
    ],
  },
  {
    id: 'advanced-graphs',
    label: 'Advanced Graphs',
    subtitle: 'Shortest paths and minimum spanning trees',
    problems: [
      { id: 124, name: 'Reconstruct Itinerary',                               difficulty: 'Hard',   url: '', done: false },
      { id: 125, name: 'Min Cost to Connect All Points',                      difficulty: 'Medium', url: '', done: false },
      { id: 126, name: 'Network Delay Time',                                  difficulty: 'Medium', url: '', done: false },
      { id: 127, name: 'Swim in Rising Water',                                difficulty: 'Hard',   url: '', done: false },
      { id: 128, name: 'Cheapest Flights Within K Stops',                     difficulty: 'Medium', url: '', done: false },
      { id: 129, name: 'Find the City With the Smallest Number of Neighbors', difficulty: 'Medium', url: '', done: false },
      { id: 130, name: 'Path with Maximum Probability',                       difficulty: 'Medium', url: '', done: false },
      { id: 131, name: 'Critical Connections in a Network',                   difficulty: 'Hard',   url: '', done: false },
    ],
  },
  {
    id: 'dp-2d',
    label: '2D Dynamic Programming',
    subtitle: 'Two-dimensional subproblems',
    problems: [
      { id: 132, name: 'Unique Paths II',                                     difficulty: 'Medium', url: '', done: false },
      { id: 133, name: 'Longest Common Subsequence',                          difficulty: 'Medium', url: '', done: false },
      { id: 134, name: 'Best Time to Buy and Sell Stock with Cooldown',       difficulty: 'Medium', url: '', done: false },
      { id: 135, name: 'Coin Change II',                                      difficulty: 'Medium', url: '', done: false },
      { id: 136, name: 'Target Sum',                                          difficulty: 'Medium', url: '', done: false },
      { id: 137, name: 'Interleaving String',                                 difficulty: 'Hard',   url: '', done: false },
      { id: 138, name: 'Longest Increasing Path in a Matrix',                 difficulty: 'Hard',   url: '', done: false },
      { id: 139, name: 'Distinct Subsequences',                               difficulty: 'Hard',   url: '', done: false },
      { id: 140, name: 'Edit Distance',                                       difficulty: 'Hard',   url: '', done: false },
      { id: 141, name: 'Burst Balloons',                                      difficulty: 'Hard',   url: '', done: false },
      { id: 142, name: 'Regular Expression Matching',                         difficulty: 'Hard',   url: '', done: false },
      { id: 143, name: 'Stone Game',                                          difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'bit-manipulation',
    label: 'Bit Manipulation',
    subtitle: 'Work at the bit level',
    problems: [
      { id: 144, name: 'Single Number',                                       difficulty: 'Easy',   url: '', done: false },
      { id: 145, name: 'Number of 1 Bits',                                    difficulty: 'Easy',   url: '', done: false },
      { id: 146, name: 'Counting Bits',                                       difficulty: 'Easy',   url: '', done: false },
      { id: 147, name: 'Reverse Bits',                                        difficulty: 'Easy',   url: '', done: false },
      { id: 148, name: 'Missing Number',                                      difficulty: 'Easy',   url: '', done: false },
      { id: 149, name: 'Sum of Two Integers',                                 difficulty: 'Medium', url: '', done: false },
      { id: 150, name: 'Reverse Integer',                                     difficulty: 'Medium', url: '', done: false },
      { id: 151, name: 'Single Number II',                                    difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'math-geometry',
    label: 'Math & Geometry',
    subtitle: 'Numbers, matrices, and spatial reasoning',
    problems: [
      { id: 152, name: 'Rotate Image',                                        difficulty: 'Medium', url: '', done: false },
      { id: 153, name: 'Spiral Matrix',                                       difficulty: 'Medium', url: '', done: false },
      { id: 154, name: 'Set Matrix Zeroes',                                   difficulty: 'Medium', url: '', done: false },
      { id: 155, name: 'Happy Number',                                        difficulty: 'Easy',   url: '', done: false },
      { id: 156, name: 'Plus One',                                            difficulty: 'Easy',   url: '', done: false },
      { id: 157, name: 'Pow(x, n)',                                           difficulty: 'Medium', url: '', done: false },
      { id: 158, name: 'Multiply Strings',                                    difficulty: 'Medium', url: '', done: false },
      { id: 159, name: 'Detect Squares',                                      difficulty: 'Medium', url: '', done: false },
      { id: 160, name: 'Integer to Roman',                                    difficulty: 'Medium', url: '', done: false },
      { id: 161, name: 'Roman to Integer',                                    difficulty: 'Easy',   url: '', done: false },
      { id: 162, name: 'Count Primes',                                        difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'monotonic-stack',
    label: 'Monotonic Stack',
    subtitle: 'Maintain a sorted invariant as you scan',
    problems: [
      { id: 163, name: 'Next Greater Element II',                             difficulty: 'Medium', url: '', done: false },
      { id: 164, name: 'Online Stock Span',                                   difficulty: 'Medium', url: '', done: false },
      { id: 165, name: 'Sum of Subarray Minimums',                            difficulty: 'Medium', url: '', done: false },
      { id: 166, name: '132 Pattern',                                         difficulty: 'Medium', url: '', done: false },
      { id: 167, name: 'Remove Duplicate Letters',                            difficulty: 'Medium', url: '', done: false },
      { id: 168, name: 'Remove K Digits',                                     difficulty: 'Medium', url: '', done: false },
      { id: 169, name: 'Minimum Cost Tree From Leaf Values',                  difficulty: 'Medium', url: '', done: false },
      { id: 170, name: 'Maximum Width Ramp',                                  difficulty: 'Medium', url: '', done: false },
    ],
  },
  {
    id: 'strings',
    label: 'String Manipulation',
    subtitle: 'Parse, transform, and match text',
    problems: [
      { id: 171, name: 'Valid Palindrome II',                                 difficulty: 'Easy',   url: '', done: false },
      { id: 172, name: 'Longest Palindromic Subsequence',                     difficulty: 'Medium', url: '', done: false },
      { id: 173, name: 'Reverse Words in a String',                           difficulty: 'Medium', url: '', done: false },
      { id: 174, name: 'String to Integer (atoi)',                            difficulty: 'Medium', url: '', done: false },
      { id: 175, name: 'Count and Say',                                       difficulty: 'Medium', url: '', done: false },
      { id: 176, name: 'Encode and Decode Strings',                           difficulty: 'Medium', url: '', done: false },
      { id: 177, name: 'ZigZag Conversion',                                   difficulty: 'Medium', url: '', done: false },
      { id: 178, name: 'Text Justification',                                  difficulty: 'Hard',   url: '', done: false },
      { id: 179, name: 'Is Subsequence',                                      difficulty: 'Easy',   url: '', done: false },
      { id: 180, name: 'Find the Index of the First Occurrence in a String',  difficulty: 'Easy',   url: '', done: false },
      { id: 181, name: 'Minimum Add to Make Parentheses Valid',               difficulty: 'Medium', url: '', done: false },
      { id: 182, name: 'Longest Common Prefix',                               difficulty: 'Easy',   url: '', done: false },
    ],
  },
  {
    id: 'sorting',
    label: 'Sorting',
    subtitle: 'Classic and specialized ordering algorithms',
    problems: [
      { id: 183, name: 'Sort an Array',                                       difficulty: 'Medium', url: '', done: false },
      { id: 184, name: 'Merge Sorted Array',                                  difficulty: 'Easy',   url: '', done: false },
      { id: 185, name: 'H-Index',                                             difficulty: 'Medium', url: '', done: false },
      { id: 186, name: 'Largest Number',                                      difficulty: 'Medium', url: '', done: false },
      { id: 187, name: 'Wiggle Sort II',                                      difficulty: 'Medium', url: '', done: false },
      { id: 188, name: 'Maximum Gap',                                         difficulty: 'Hard',   url: '', done: false },
    ],
  },
  {
    id: 'prefix-sum',
    label: 'Prefix Sum',
    subtitle: 'Precompute range queries in O(1)',
    problems: [
      { id: 189, name: 'Running Sum of 1d Array',                             difficulty: 'Easy',   url: '', done: false },
      { id: 190, name: 'Range Sum Query - Immutable',                         difficulty: 'Easy',   url: '', done: false },
      { id: 191, name: 'Contiguous Array',                                    difficulty: 'Medium', url: '', done: false },
      { id: 192, name: 'Find Pivot Index',                                    difficulty: 'Easy',   url: '', done: false },
      { id: 193, name: 'Maximum Subarray Sum with One Deletion',              difficulty: 'Medium', url: '', done: false },
      { id: 194, name: 'Count of Range Sum',                                  difficulty: 'Hard',   url: '', done: false },
    ],
  },
])

onMounted(() => { selectedTopic.value = topics[0] })
</script>
