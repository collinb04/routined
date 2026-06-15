<template>
  <div class="bg-[#f5f5f2] flex overflow-hidden" style="height: calc(100vh - 4rem)">

    <!-- Sidebar -->
    <aside
      class="bg-[#f5f5f2] border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0 overflow-hidden"
      :class="sidebarOpen ? 'w-60' : 'w-0'"
    >
      <!-- Sidebar header -->
      <div class="w-60 flex items-center justify-between px-4 pt-6 pb-3">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Contents</span>
        <button
          class="p-1 rounded-md text-text-muted hover:text-text transition-colors"
          @click="sidebarOpen = false"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="w-60 flex-1 overflow-y-auto pb-6 px-2">

        <!-- Intro (flat, no subsections) -->
        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-2"
          :class="activeView === 'intro'
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="activeView = 'intro'; selectedSection = null"
        >
          Intro
        </button>

                <!-- Intro (flat, no subsections) -->
        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-2"
          :class="activeView === 'guide'
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="activeView = 'guide'; selectedSection = null"
        >
          Guide to Learning
        </button>

        <div v-for="cat in categories" :key="cat.id" class="mb-0.5">

          <!-- Category row -->
          <button
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-text hover:bg-black/5 transition-colors"
            @click="toggleCategory(cat.id)"
          >
            <span>{{ cat.label }}</span>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="shrink-0 text-text-muted transition-transform duration-200"
              :class="openCategories.includes(cat.id) ? 'rotate-180' : ''"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          <!-- Subsections -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="openCategories.includes(cat.id)" class="mt-0.5 ml-1 flex flex-col gap-px pb-1">
              <button
                v-for="sub in cat.subsections"
                :key="sub.id"
                class="w-full text-left pl-3 pr-3 py-1.5 rounded-lg text-[12.5px] transition-colors border-l-2"
                :class="selectedSection?.id === sub.id
                  ? 'border-black text-text font-medium bg-black/5'
                  : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
                @click="selectSection(sub, cat)"
              >
                {{ sub.label }}
              </button>
            </div>
          </Transition>

        </div>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">

      <!-- Top bar with sidebar toggle -->
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
        <div v-if="selectedSection" class="flex items-center gap-1.5 text-xs text-text-muted">
          <span>{{ selectedSection.category }}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          <span class="text-text">{{ selectedSection.label }}</span>
        </div>
      </div>

      <!-- Intro view -->
      <div v-if="activeView === 'intro'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-5">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Knowledge Base</p>
        <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">
          Everything you need to know<br class="hidden sm:block" /> to crack DSA interviews.
        </h1>
        <p class="text-text-dim leading-relaxed max-w-lg">
          A structured reference covering data structures, algorithms, and the patterns that connect them.
          Use the sidebar to navigate — each section has a skeleton you can fill in as you learn.
        </p>
        <div class="flex flex-wrap gap-2 mt-1">
          <span v-for="tag in ['Data Structures', 'Algorithms', 'Patterns', 'The Connection']" :key="tag"
            class="text-[11px] font-medium text-text-muted bg-white border border-gray-200 rounded-full px-3 py-1">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Section skeleton -->
      <div v-else-if="selectedSection" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-5">

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">
          {{ selectedSection.label }}
        </h1>

        <!-- Overview -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Overview</h2>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            A high-level summary of {{ selectedSection.label }} — what it is, when to use it, and why it matters in the context of DSA.
          </p>
        </div>

        <!-- Key Concepts -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Key Concepts</h2>
          <div class="h-px bg-gray-100" />
          <ul class="flex flex-col gap-3">
            <li v-for="i in 4" :key="i" class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-muted italic">Key concept {{ i }} goes here...</span>
            </li>
          </ul>
        </div>

        <!-- Code Example -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Code Example</h2>
          <div class="h-px bg-gray-100" />
          <div class="bg-[#f5f5f2] rounded-xl p-5 font-mono text-sm leading-relaxed">
            <span class="text-gray-400">// {{ selectedSection.label }}</span><br/>
            <span class="text-gray-300">// Add implementation here...</span>
          </div>
        </div>

        <!-- Complexity -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Complexity</h2>
          <div class="h-px bg-gray-100" />
          <div class="flex gap-8">
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] text-text-muted uppercase tracking-wider">Time</span>
              <span class="font-mono text-sm text-text-muted italic">O(?)</span>
            </div>
            <div class="w-px bg-gray-100" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] text-text-muted uppercase tracking-wider">Space</span>
              <span class="font-mono text-sm text-text-muted italic">O(?)</span>
            </div>
          </div>
        </div>

        <!-- Related Problems -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Related Problems</h2>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col divide-y divide-gray-50">
            <div v-for="i in 3" :key="i" class="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span class="text-sm text-text-muted italic">Problem {{ i }}...</span>
              <span class="text-xs text-text-muted bg-[#f5f5f2] px-2.5 py-0.5 rounded-full border border-gray-200">—</span>
            </div>
          </div>
        </div>

        <!-- Notes & Tips -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Notes & Tips</h2>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            Interview tips, common pitfalls, and gotchas for {{ selectedSection.label }}...
          </p>
        </div>

        <!-- The Connection (not shown for "The Connection" category itself) -->
        <div v-if="selectedSection.categoryId !== 'the-connection'" class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm border border-[#3a9ae8]/25">
          <div class="flex items-center gap-2">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The Connection</h2>
            <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full">Insight</span>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            How {{ selectedSection.label }} connects to broader patterns and when to reach for it during problem-solving...
          </p>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(true)
const openCategories = ref([])
const selectedSection = ref(null)
const activeView = ref('intro')

const categories = [
  {
    id: 'data-structures',
    label: 'Data Structures',
    subsections: [
      { id: 'arrays', label: 'Arrays' },
      { id: 'linked-lists', label: 'Linked Lists' },
      { id: 'stacks-queues', label: 'Stacks & Queues' },
      { id: 'hash-maps', label: 'Hash Maps & Sets' },
      { id: 'trees', label: 'Trees' },
      { id: 'heaps', label: 'Heaps & Priority Queues' },
      { id: 'graphs', label: 'Graphs' },
    ],
  },
  {
    id: 'algorithms',
    label: 'Algorithms',
    subsections: [
      { id: 'binary-search', label: 'Binary Search' },
      { id: 'sorting', label: 'Sorting' },
      { id: 'recursion', label: 'Recursion & D&C' },
      { id: 'dynamic-programming', label: 'Dynamic Programming' },
      { id: 'greedy', label: 'Greedy Algorithms' },
      { id: 'backtracking', label: 'Backtracking' },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    subsections: [
      { id: 'two-pointers', label: 'Two Pointers' },
      { id: 'sliding-window', label: 'Sliding Window' },
      { id: 'fast-slow', label: 'Fast & Slow Pointers' },
      { id: 'merge-intervals', label: 'Merge Intervals' },
      { id: 'bfs-dfs', label: 'BFS & DFS' },
      { id: 'topological-sort', label: 'Topological Sort' },
      { id: 'union-find', label: 'Union-Find' },
      { id: 'monotonic-stack', label: 'Monotonic Stack' },
    ],
  },
  {
    id: 'the-connection',
    label: 'The Connection',
    subsections: [
      { id: 'pattern-recognition', label: 'Pattern Recognition Framework' },
      { id: 'choosing-ds', label: 'Choosing the Right DS' },
      { id: 'complexity-tradeoffs', label: 'Complexity Trade-offs' },
      { id: 'interview-strategy', label: 'Interview Strategy' },
    ],
  },
]

function toggleCategory(id) {
  const idx = openCategories.value.indexOf(id)
  if (idx >= 0) {
    openCategories.value.splice(idx, 1)
  } else {
    openCategories.value.push(id)
  }
}

function selectSection(sub, cat) {
  selectedSection.value = { ...sub, category: cat.label, categoryId: cat.id }
  activeView.value = 'section'
}
</script>
