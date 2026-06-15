<template>
  <div class="bg-[#f5f5f2] flex overflow-hidden" style="height: calc(100vh - 4rem)">

    <!-- Sidebar -->
    <aside
      class="bg-[#f5f5f2] border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0 overflow-hidden"
      :class="sidebarOpen ? 'w-60' : 'w-0'"
    >
      <div class="w-60 flex items-center justify-between px-4 pt-6 pb-3">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Topics</span>
        <button class="p-1 rounded-md text-text-muted hover:text-text transition-colors" @click="sidebarOpen = false">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav class="w-60 flex-1 overflow-y-auto pb-6 px-2">
        <button
          v-for="topic in topics"
          :key="topic.id"
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-0.5"
          :class="selectedTopic?.id === topic.id
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="selectedTopic = topic"
        >
          {{ topic.label }}
        </button>
      </nav>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-y-auto">

      <!-- Top bar -->
      <div class="flex items-center gap-3 px-5 sm:px-10 pt-6 pb-2">
        <button
          class="p-1.5 -ml-1.5 rounded-md text-text-muted hover:text-text hover:bg-black/5 transition-colors"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18"/>
          </svg>
        </button>
        <span v-if="selectedTopic" class="text-xs text-text-muted">{{ selectedTopic.label }}</span>
      </div>

      <!-- Empty state -->
      <div v-if="!selectedTopic" class="flex flex-col items-center justify-center gap-5 px-5 py-32">
        <div class="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-text-muted">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </div>
        <div class="text-center flex flex-col gap-1">
          <p class="font-semibold text-text">Select a topic</p>
          <p class="text-sm text-text-muted">Choose a topic from the sidebar to start practicing.</p>
        </div>
      </div>

      <!-- Topic view -->
      <div v-else class="max-w-4xl mx-auto px-5 sm:px-10 py-6 flex flex-col gap-5">

        <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">
          {{ selectedTopic.label }}
        </h1>

        <!-- Table -->
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-muted w-14">Status</th>
                <th class="px-2 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-muted w-10">Star</th>
                <th class="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-muted">Problem</th>
                <th class="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-muted w-28">Difficulty</th>
                <th class="px-4 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-text-muted w-24">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="problem in selectedTopic.problems"
                :key="problem.id"
                class="border-b border-gray-50 last:border-0 transition-colors"
                :class="problem.done ? 'bg-green-50/50' : 'hover:bg-[#f5f5f2]/70'"
              >
                <!-- Status -->
                <td class="px-5 py-3.5">
                  <button
                    class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                    :class="problem.done ? 'bg-black border-black' : 'border-gray-300 hover:border-gray-500'"
                    @click="problem.done = !problem.done"
                  >
                    <svg v-if="problem.done" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </td>

                <!-- Star -->
                <td class="px-2 py-3.5">
                  <button @click="problem.starred = !problem.starred" class="block transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
                      :fill="problem.starred ? '#f59e0b' : 'none'"
                      :stroke="problem.starred ? '#f59e0b' : '#d1d5db'"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                </td>

                <!-- Problem name -->
                <td class="px-4 py-3.5">
                  <a
                    :href="problem.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-black transition-colors group"
                  >
                    {{ problem.name }}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="text-text-muted opacity-0 group-hover:opacity-60 transition-opacity shrink-0">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </td>

                <!-- Difficulty -->
                <td class="px-4 py-3.5">
                  <span class="text-[12.5px] font-medium"
                    :class="{
                      'text-green-600':  problem.difficulty === 'Easy',
                      'text-amber-500':  problem.difficulty === 'Medium',
                      'text-red-500':    problem.difficulty === 'Hard',
                    }">
                    {{ problem.difficulty }}
                  </span>
                </td>

                <!-- Solution -->
                <td class="px-4 py-3.5">
                  <button class="text-text-muted hover:text-text transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sidebarOpen = ref(true)
const selectedTopic = ref(null)

const topics = reactive([
  {
    id: 'arrays-hashing',
    label: 'Arrays & Hashing',
    problems: [
      { id: 1,  name: 'Contains Duplicate',               difficulty: 'Easy',   url: 'https://leetcode.com/problems/contains-duplicate/',               done: false, starred: false },
      { id: 2,  name: 'Valid Anagram',                     difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-anagram/',                     done: false, starred: false },
      { id: 3,  name: 'Two Sum',                           difficulty: 'Easy',   url: 'https://leetcode.com/problems/two-sum/',                           done: false, starred: false },
      { id: 4,  name: 'Group Anagrams',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/',                    done: false, starred: false },
      { id: 5,  name: 'Top K Frequent Elements',           difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/',           done: false, starred: false },
      { id: 6,  name: 'Product of Array Except Self',      difficulty: 'Medium', url: 'https://leetcode.com/problems/product-of-array-except-self/',      done: false, starred: false },
      { id: 7,  name: 'Valid Sudoku',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/valid-sudoku/',                      done: false, starred: false },
      { id: 8,  name: 'Longest Consecutive Sequence',      difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/',      done: false, starred: false },
    ],
  },
  {
    id: 'two-pointers',
    label: 'Two Pointers',
    problems: [
      { id: 9,  name: 'Valid Palindrome',                  difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-palindrome/',                  done: false, starred: false },
      { id: 10, name: 'Two Sum II',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',  done: false, starred: false },
      { id: 11, name: '3Sum',                              difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/',                              done: false, starred: false },
      { id: 12, name: 'Container With Most Water',         difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/',         done: false, starred: false },
      { id: 13, name: 'Trapping Rain Water',               difficulty: 'Hard',   url: 'https://leetcode.com/problems/trapping-rain-water/',               done: false, starred: false },
    ],
  },
  {
    id: 'sliding-window',
    label: 'Sliding Window',
    problems: [
      { id: 14, name: 'Best Time to Buy and Sell Stock',          difficulty: 'Easy',   url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',          done: false, starred: false },
      { id: 15, name: 'Longest Substring Without Repeating Chars', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', done: false, starred: false },
      { id: 16, name: 'Longest Repeating Character Replacement',  difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/',  done: false, starred: false },
      { id: 17, name: 'Permutation in String',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/',                    done: false, starred: false },
      { id: 18, name: 'Minimum Window Substring',                 difficulty: 'Hard',   url: 'https://leetcode.com/problems/minimum-window-substring/',                 done: false, starred: false },
      { id: 19, name: 'Sliding Window Maximum',                   difficulty: 'Hard',   url: 'https://leetcode.com/problems/sliding-window-maximum/',                   done: false, starred: false },
    ],
  },
  {
    id: 'stack',
    label: 'Stack',
    problems: [
      { id: 20, name: 'Valid Parentheses',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/valid-parentheses/',                   done: false, starred: false },
      { id: 21, name: 'Min Stack',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/min-stack/',                           done: false, starred: false },
      { id: 22, name: 'Evaluate Reverse Polish Notation',    difficulty: 'Medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',    done: false, starred: false },
      { id: 23, name: 'Generate Parentheses',                difficulty: 'Medium', url: 'https://leetcode.com/problems/generate-parentheses/',                done: false, starred: false },
      { id: 24, name: 'Daily Temperatures',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/',                  done: false, starred: false },
      { id: 25, name: 'Car Fleet',                           difficulty: 'Medium', url: 'https://leetcode.com/problems/car-fleet/',                           done: false, starred: false },
      { id: 26, name: 'Largest Rectangle in Histogram',      difficulty: 'Hard',   url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',      done: false, starred: false },
    ],
  },
  {
    id: 'binary-search',
    label: 'Binary Search',
    problems: [
      { id: 27, name: 'Binary Search',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/binary-search/',                         done: false, starred: false },
      { id: 28, name: 'Search a 2D Matrix',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/search-a-2d-matrix/',                    done: false, starred: false },
      { id: 29, name: 'Koko Eating Bananas',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/',                   done: false, starred: false },
      { id: 30, name: 'Find Minimum in Rotated Sorted Array',  difficulty: 'Medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',  done: false, starred: false },
      { id: 31, name: 'Search in Rotated Sorted Array',        difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',        done: false, starred: false },
      { id: 32, name: 'Time Based Key-Value Store',            difficulty: 'Medium', url: 'https://leetcode.com/problems/time-based-key-value-store/',            done: false, starred: false },
      { id: 33, name: 'Median of Two Sorted Arrays',           difficulty: 'Hard',   url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',           done: false, starred: false },
    ],
  },
  {
    id: 'linked-list',
    label: 'Linked List',
    problems: [
      { id: 34, name: 'Reverse Linked List',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/reverse-linked-list/',                   done: false, starred: false },
      { id: 35, name: 'Merge Two Sorted Lists',                difficulty: 'Easy',   url: 'https://leetcode.com/problems/merge-two-sorted-lists/',                done: false, starred: false },
      { id: 36, name: 'Linked List Cycle',                     difficulty: 'Easy',   url: 'https://leetcode.com/problems/linked-list-cycle/',                     done: false, starred: false },
      { id: 37, name: 'Reorder List',                          difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/',                          done: false, starred: false },
      { id: 38, name: 'Remove Nth Node From End of List',      difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',      done: false, starred: false },
      { id: 39, name: 'Copy List with Random Pointer',         difficulty: 'Medium', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',         done: false, starred: false },
      { id: 40, name: 'Add Two Numbers',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/add-two-numbers/',                       done: false, starred: false },
      { id: 41, name: 'Find the Duplicate Number',             difficulty: 'Medium', url: 'https://leetcode.com/problems/find-the-duplicate-number/',             done: false, starred: false },
      { id: 42, name: 'LRU Cache',                             difficulty: 'Medium', url: 'https://leetcode.com/problems/lru-cache/',                             done: false, starred: false },
      { id: 43, name: 'Merge K Sorted Lists',                  difficulty: 'Hard',   url: 'https://leetcode.com/problems/merge-k-sorted-lists/',                  done: false, starred: false },
      { id: 44, name: 'Reverse Nodes in K-Group',              difficulty: 'Hard',   url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',              done: false, starred: false },
    ],
  },
  {
    id: 'trees',
    label: 'Trees',
    problems: [
      { id: 45, name: 'Invert Binary Tree',                              difficulty: 'Easy',   url: 'https://leetcode.com/problems/invert-binary-tree/',                                     done: false, starred: false },
      { id: 46, name: 'Maximum Depth of Binary Tree',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',                           done: false, starred: false },
      { id: 47, name: 'Diameter of Binary Tree',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/diameter-of-binary-tree/',                                done: false, starred: false },
      { id: 48, name: 'Balanced Binary Tree',                            difficulty: 'Easy',   url: 'https://leetcode.com/problems/balanced-binary-tree/',                                   done: false, starred: false },
      { id: 49, name: 'Same Tree',                                       difficulty: 'Easy',   url: 'https://leetcode.com/problems/same-tree/',                                              done: false, starred: false },
      { id: 50, name: 'Subtree of Another Tree',                         difficulty: 'Easy',   url: 'https://leetcode.com/problems/subtree-of-another-tree/',                                done: false, starred: false },
      { id: 51, name: 'Lowest Common Ancestor of a BST',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',         done: false, starred: false },
      { id: 52, name: 'Binary Tree Level Order Traversal',               difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',                      done: false, starred: false },
      { id: 53, name: 'Binary Tree Right Side View',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-right-side-view/',                            done: false, starred: false },
      { id: 54, name: 'Count Good Nodes in Binary Tree',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/',                        done: false, starred: false },
      { id: 55, name: 'Validate Binary Search Tree',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/',                            done: false, starred: false },
      { id: 56, name: 'Kth Smallest Element in a BST',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',                          done: false, starred: false },
      { id: 57, name: 'Construct Tree from Preorder and Inorder',        difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', done: false, starred: false },
      { id: 58, name: 'Binary Tree Maximum Path Sum',                    difficulty: 'Hard',   url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',                           done: false, starred: false },
      { id: 59, name: 'Serialize and Deserialize Binary Tree',           difficulty: 'Hard',   url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',                  done: false, starred: false },
    ],
  },
  {
    id: 'heap',
    label: 'Heap / Priority Queue',
    problems: [
      { id: 60, name: 'Kth Largest Element in a Stream',     difficulty: 'Easy',   url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',     done: false, starred: false },
      { id: 61, name: 'Last Stone Weight',                   difficulty: 'Easy',   url: 'https://leetcode.com/problems/last-stone-weight/',                   done: false, starred: false },
      { id: 62, name: 'K Closest Points to Origin',          difficulty: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/',          done: false, starred: false },
      { id: 63, name: 'Kth Largest Element in an Array',     difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',     done: false, starred: false },
      { id: 64, name: 'Task Scheduler',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/',                      done: false, starred: false },
      { id: 65, name: 'Design Twitter',                      difficulty: 'Medium', url: 'https://leetcode.com/problems/design-twitter/',                      done: false, starred: false },
      { id: 66, name: 'Find Median from Data Stream',        difficulty: 'Hard',   url: 'https://leetcode.com/problems/find-median-from-data-stream/',        done: false, starred: false },
    ],
  },
  {
    id: 'backtracking',
    label: 'Backtracking',
    problems: [
      { id: 67, name: 'Subsets',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/',                     done: false, starred: false },
      { id: 68, name: 'Combination Sum',              difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/',              done: false, starred: false },
      { id: 69, name: 'Permutations',                 difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/',                 done: false, starred: false },
      { id: 70, name: 'Subsets II',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets-ii/',                   done: false, starred: false },
      { id: 71, name: 'Combination Sum II',           difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum-ii/',           done: false, starred: false },
      { id: 72, name: 'Word Search',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/',                  done: false, starred: false },
      { id: 73, name: 'Palindrome Partitioning',      difficulty: 'Medium', url: 'https://leetcode.com/problems/palindrome-partitioning/',      done: false, starred: false },
      { id: 74, name: 'Letter Combinations of Phone', difficulty: 'Medium', url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', done: false, starred: false },
      { id: 75, name: 'N-Queens',                     difficulty: 'Hard',   url: 'https://leetcode.com/problems/n-queens/',                     done: false, starred: false },
    ],
  },
  {
    id: 'graphs',
    label: 'Graphs',
    problems: [
      { id: 76, name: 'Number of Islands',                   difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/',                   done: false, starred: false },
      { id: 77, name: 'Clone Graph',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/clone-graph/',                         done: false, starred: false },
      { id: 78, name: 'Max Area of Island',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/max-area-of-island/',                  done: false, starred: false },
      { id: 79, name: 'Pacific Atlantic Water Flow',         difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',         done: false, starred: false },
      { id: 80, name: 'Surrounded Regions',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/surrounded-regions/',                  done: false, starred: false },
      { id: 81, name: 'Rotting Oranges',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/',                     done: false, starred: false },
      { id: 82, name: 'Walls and Gates',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/walls-and-gates/',                     done: false, starred: false },
      { id: 83, name: 'Course Schedule',                     difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/',                     done: false, starred: false },
      { id: 84, name: 'Course Schedule II',                  difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/',                  done: false, starred: false },
      { id: 85, name: 'Redundant Connection',                difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/',                done: false, starred: false },
      { id: 86, name: 'Number of Connected Components',      difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', done: false, starred: false },
      { id: 87, name: 'Graph Valid Tree',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/graph-valid-tree/',                    done: false, starred: false },
      { id: 88, name: 'Word Ladder',                         difficulty: 'Hard',   url: 'https://leetcode.com/problems/word-ladder/',                         done: false, starred: false },
    ],
  },
  {
    id: 'dp-1d',
    label: '1D Dynamic Programming',
    problems: [
      { id: 89,  name: 'Climbing Stairs',                    difficulty: 'Easy',   url: 'https://leetcode.com/problems/climbing-stairs/',                    done: false, starred: false },
      { id: 90,  name: 'Min Cost Climbing Stairs',           difficulty: 'Easy',   url: 'https://leetcode.com/problems/min-cost-climbing-stairs/',           done: false, starred: false },
      { id: 91,  name: 'House Robber',                       difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/',                       done: false, starred: false },
      { id: 92,  name: 'House Robber II',                    difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-ii/',                    done: false, starred: false },
      { id: 93,  name: 'Longest Palindromic Substring',      difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-palindromic-substring/',      done: false, starred: false },
      { id: 94,  name: 'Palindromic Substrings',             difficulty: 'Medium', url: 'https://leetcode.com/problems/palindromic-substrings/',             done: false, starred: false },
      { id: 95,  name: 'Decode Ways',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/decode-ways/',                        done: false, starred: false },
      { id: 96,  name: 'Coin Change',                        difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/',                        done: false, starred: false },
      { id: 97,  name: 'Maximum Product Subarray',           difficulty: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/',           done: false, starred: false },
      { id: 98,  name: 'Word Break',                         difficulty: 'Medium', url: 'https://leetcode.com/problems/word-break/',                         done: false, starred: false },
      { id: 99,  name: 'Longest Increasing Subsequence',     difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/',     done: false, starred: false },
      { id: 100, name: 'Partition Equal Subset Sum',         difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/',         done: false, starred: false },
    ],
  },
])
</script>
