<template>
  <div class="bg-[#f5f5f2] flex">

    <!-- Mobile backdrop (tap outside to close) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-black/20 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Sidebar / mobile dropdown -->
    <aside
      class="z-40 fixed lg:sticky top-16 left-0 right-0 lg:right-auto lg:self-start lg:h-[calc(100vh-4rem)] bg-[#f5f5f2] border-gray-200 border-b lg:border-b-0 lg:border-r flex flex-col transition-all duration-300 shrink-0"
      :class="sidebarOpen
        ? 'max-h-[70vh] overflow-y-auto shadow-xl lg:shadow-none lg:overflow-hidden lg:max-h-none lg:w-60'
        : 'max-h-0 overflow-hidden lg:max-h-none lg:w-0'"
    >
      <!-- Nav -->
      <nav class="w-full lg:w-60 flex-1 overflow-y-auto pb-6 px-2">

        <!-- Sidebar header -->
        <div class="flex items-center justify-between px-2 pt-6 pb-3">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Learn</span>
          <div class="flex items-center gap-1">
            <!-- Search button -->
            <button
              class="p-1 rounded-md text-text-muted hover:text-text transition-colors"
              title="Jump to topic (⌘K)"
              @click="searchOpen = true"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <!-- Collapse sidebar -->
            <button
              class="p-1 rounded-md text-text-muted hover:text-text transition-colors"
              @click="sidebarOpen = false"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Static pages (above clusters) -->
        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-0.5"
          :class="activeView === 'intro'
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="navigateToId('__intro')"
        >
          Intro
        </button>
        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-0.5"
          :class="activeView === 'guide'
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="navigateToId('__guide')"
        >
          Guide to Learning
        </button>
        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mb-3"
          :class="activeView === 'complexity'
            ? 'border-black text-text bg-black/5'
            : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
          @click="navigateToId('__complexity')"
        >
          Understanding Complexity
        </button>

        <!-- Cluster accordion -->
        <div v-for="cluster in CLUSTERS" :key="cluster.id" class="mb-0.5">

          <!-- Cluster row -->
          <button
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-text transition-colors hover:bg-black/5"
            @click="toggleCluster(cluster.id)"
          >
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full shrink-0" :style="{ background: cluster.color }" />
              {{ cluster.label }}
            </span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="shrink-0 text-text-muted transition-transform duration-200"
              :class="openClusters.includes(cluster.id) ? 'rotate-180' : ''"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          <!-- Cluster concepts -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div v-if="openClusters.includes(cluster.id)" class="mt-0.5 ml-1 flex flex-col gap-px pb-1">
              <button
                v-for="concept in cluster.concepts"
                :key="concept.id"
                class="w-full text-left pl-3 pr-3 py-1.5 rounded-lg text-[12.5px] transition-colors border-l-2"
                :class="[
                  selectedSection?.id === concept.id
                    ? 'border-black text-text font-medium bg-black/5'
                    : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text',
                  concept.isNew ? 'opacity-45 cursor-default' : '',
                ]"
                @click="!concept.isNew && navigateToId(concept.id)"
              >
                <span class="flex items-center gap-1.5">
                  {{ concept.label }}
                  <span v-if="concept.isNew" class="text-[9px] text-text-muted/50 ml-auto">soon</span>
                  <svg v-else-if="completed.has(concept.id)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
              </button>
            </div>
          </Transition>

        </div>

        <!-- Python Tips & Tricks standalone link -->
        <div class="mt-2 pt-2 border-t border-gray-100">
          <button
            class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2"
            :class="selectedSection?.id === 'python-tips'
              ? 'border-black text-text bg-black/5'
              : 'border-transparent text-text-muted hover:bg-black/5 hover:text-text'"
            @click="navigateToId('python-tips')"
          >
            Python Tips & Tricks
          </button>
        </div>

      </nav>

    </aside>

    <!-- Main content -->
    <main class="flex-1 min-w-0">

      <!-- Top bar with sidebar toggle -->
      <div class="sticky top-16 z-10 bg-[#f5f5f2] flex items-center gap-3 px-5 sm:px-10 pt-6 pb-2">
        <button
          class="p-1.5 -ml-1.5 rounded-md text-text-muted hover:text-text hover:bg-black/5 transition-colors"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18"/>
          </svg>
        </button>
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-xs text-text-muted">
          <template v-if="activeView === 'map'">
            <span class="text-text">Structure of Learning</span>
          </template>
          <template v-else-if="selectedSection">
            <button class="hover:text-text transition-colors" @click="navigateToId('__map')">Map</button>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            <span class="text-text">{{ selectedSection.label }}</span>
          </template>
        </div>
      </div>

      <!-- TopicSearch palette -->
      <TopicSearch
        v-model="searchOpen"
        :flat-sections="flatSections"
        @navigate="navigateToId"
      />

      <!-- Map view (Structure of Learning) -->
      <div v-if="activeView === 'map'" class="flex flex-col">

        <!-- Page header -->
        <div class="max-w-5xl mx-auto w-full px-5 sm:px-10 pt-4 pb-6 flex flex-col gap-2">
          <h1 class="text-2xl sm:text-3xl font-medium tracking-tight text-text">Structure of Learning</h1>
          <p class="text-sm text-text-muted leading-relaxed max-w-xl">
            Eight problem-domain clusters. The value is in the edges — the relationships between them — not the nodes.
            Hover a cluster to see its primitives. Hover an edge to see what connects them. Click a cluster to explore it.
          </p>
        </div>

        <!-- Cluster map -->
        <div class="max-w-5xl mx-auto w-full px-4 sm:px-8">
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden" style="aspect-ratio: 720/480;">
            <ClusterMap
              @select-cluster="selectCluster"
              @select-concept="navigateToId"
            />
          </div>
        </div>

        <!-- Selected cluster detail -->
        <div v-if="activeCluster" class="max-w-5xl mx-auto w-full px-5 sm:px-10 py-8 flex flex-col gap-5">
          <template v-for="cluster in CLUSTERS" :key="cluster.id">
            <div v-if="cluster.id === activeCluster" class="flex flex-col gap-5">

              <!-- Cluster header -->
              <div class="flex items-center gap-3">
                <span class="w-3 h-3 rounded-full shrink-0" :style="{ background: cluster.color }" />
                <h2 class="text-xl font-medium text-text">{{ cluster.label }}</h2>
              </div>

              <!-- Central primitive callout -->
              <div class="flex gap-4">
                <div class="w-1 rounded-full shrink-0" :style="{ background: cluster.color }" />
                <div class="flex flex-col gap-2 py-1">
                  <span
                    class="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit"
                    :style="{ color: cluster.color, background: cluster.color + '18' }"
                  >Central Primitive</span>
                  <p class="text-base font-medium text-text leading-relaxed">{{ cluster.primitive }}</p>
                  <p class="text-sm text-text-muted leading-relaxed">{{ cluster.primitiveExplainer }}</p>
                </div>
              </div>

              <!-- Why this groups together -->
              <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Why this groups together</span>
                <div class="h-px bg-gray-100" />
                <p class="text-sm text-text-dim leading-relaxed">{{ cluster.why }}</p>
              </div>

              <!-- Concepts in order -->
              <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Internal learning order</span>
                <div class="h-px bg-gray-100" />
                <div class="flex flex-col gap-2">
                  <button
                    v-for="(concept, i) in cluster.concepts"
                    :key="concept.id"
                    class="flex items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors"
                    :class="concept.isNew
                      ? 'bg-[#f5f5f2] opacity-50 cursor-default'
                      : 'bg-[#f5f5f2] hover:bg-black/5 cursor-pointer'"
                    @click="!concept.isNew && navigateToId(concept.id)"
                  >
                    <span class="text-2xl font-semibold text-gray-100 leading-none select-none w-8 shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
                    <span class="text-[13px] font-medium text-text flex-1">{{ concept.label }}</span>
                    <span v-if="concept.isNew" class="text-[10px] text-text-muted/50 border border-gray-200 rounded-full px-2 py-0.5">soon</span>
                    <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-text-muted shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>

              <!-- Transfer hooks -->
              <div v-if="cluster.transferHooks.length" class="flex flex-col gap-2">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted px-1">Connected clusters</span>
                <div
                  v-for="hook in cluster.transferHooks"
                  :key="hook.targetId"
                  class="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow"
                  @click="selectCluster(hook.targetId)"
                >
                  <div class="w-2 h-2 rounded-full mt-1.5 shrink-0" :style="{ background: CLUSTERS.find(c => c.id === hook.targetId)?.color }" />
                  <div class="flex flex-col gap-1 flex-1">
                    <span class="text-[11px] font-semibold text-text-muted uppercase tracking-widest">
                      {{ CLUSTERS.find(c => c.id === hook.targetId)?.label }}
                    </span>
                    <p class="text-sm text-text-dim leading-relaxed">{{ hook.text }}</p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-text-muted shrink-0 mt-0.5"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>

            </div>
          </template>
        </div>

        <!-- No-selection prompt -->
        <div v-else class="max-w-5xl mx-auto w-full px-5 sm:px-10 py-8">
          <p class="text-sm text-text-muted text-center">Click a cluster to see its structure and concepts.</p>
        </div>

      </div>

      <!-- Intro view -->
      <div v-if="activeView === 'intro'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-10">

        <!-- Hero -->
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text">
            Conquering the interview:<br class="hidden sm:block" />The Introduction
          </h1>
          <p class="text-text-dim leading-relaxed max-w-lg">
            Most people skip the intro sections. If you want to actually conquer DSA — don't be that person.
            Everything here builds the mental model that makes the rest click.
          </p>
        </div>

        <!-- Section 1: Why static content matters -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">01</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">Why the static content matters</h2>
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <p class="text-sm text-text-dim leading-relaxed">
              Most DSA prep is purely reactive — see a problem, try to solve it, move on. That approach leaves huge gaps.
              The static content here exists to fill those gaps <em>before</em> they cost you an interview.
            </p>
            <div class="flex flex-col gap-3 pt-1">
              <div v-for="point in whyPoints" :key="point" class="flex items-start gap-3">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-dim leading-relaxed">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: The analogy (DS / Algs / Patterns) -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">02</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">Materials, tools, and blueprints</h2>
          <p class="text-sm text-text-dim leading-relaxed">
            Think of solving a DSA problem like building something. You need three things.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div v-for="card in analogyCards" :key="card.label" class="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">{{ card.label }}</span>
              <div class="h-px bg-gray-100" />
              <p class="text-[13px] font-medium text-text">{{ card.analogy }}</p>
              <p class="text-xs text-text-dim leading-relaxed">{{ card.description }}</p>
            </div>
          </div>
        </div>

        <!-- Section 3: What, why, how -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">03</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">The what, why, and how</h2>
          <p class="text-sm text-text-dim leading-relaxed">
            Every topic in this guide is structured around three questions. Understand why before you'll remember how.
          </p>
          <div class="flex flex-col gap-2">
            <div v-for="step in whatWhyHow" :key="step.label" class="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-start gap-5">
              <span class="text-2xl font-semibold text-gray-100 leading-none select-none pt-0.5">{{ step.num }}</span>
              <div class="flex flex-col gap-1">
                <span class="text-[13px] font-semibold text-text">{{ step.label }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ step.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: How a DSA interview problem works -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">04</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">How a DSA interview problem actually works</h2>
          <p class="text-sm text-text-dim leading-relaxed">
            Every interview problem has the same layers. Knowing them gives you a process, not just a prayer.
          </p>

          <!-- Steps 1–3 -->
          <div class="flex flex-col gap-2">
            <div v-for="step in interviewSteps" :key="step.num" class="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-start gap-5">
              <span class="text-2xl font-semibold text-gray-100 leading-none select-none pt-0.5">{{ step.num }}</span>
              <div class="flex flex-col gap-1">
                <span class="text-[13px] font-semibold text-text">{{ step.label }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ step.description }}</span>
              </div>
            </div>
          </div>

          <!-- Step 4: Constraints -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-start gap-5">
              <span class="text-2xl font-semibold text-gray-100 leading-none select-none pt-0.5">4</span>
              <div class="flex flex-col gap-1.5">
                <span class="text-[13px] font-semibold text-text">Read the constraints</span>
                <span class="text-sm text-text-dim leading-relaxed">Constraints do two things — they rule out approaches or they spotlight them.</span>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
              <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Rules out</span>
                <span class="text-xs text-text-dim leading-relaxed">Dataset is enormous → backtracking is off the table. Anything exponential is dead on arrival.</span>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Highlights</span>
                <span class="text-xs text-text-dim leading-relaxed">No duplicates allowed → a set or hash map enforces that efficiently and naturally.</span>
              </div>
            </div>
          </div>

          <!-- Step 5: Pattern hints -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-start gap-5">
              <span class="text-2xl font-semibold text-gray-100 leading-none select-none pt-0.5">5</span>
              <div class="flex flex-col gap-1.5">
                <span class="text-[13px] font-semibold text-text">Spot the pattern in the wording</span>
                <span class="text-sm text-text-dim leading-relaxed">Certain phrases almost always map to a specific technique. This is the hardest skill to build — and exactly what routined is designed for.</span>
              </div>
            </div>
            <div class="ml-11 flex flex-col divide-y divide-gray-50">
              <div v-for="hint in patternHints" :key="hint.phrase" class="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-4">
                <span class="text-sm text-text-dim italic">{{ hint.phrase }}</span>
                <span class="text-xs font-medium text-text bg-[#f5f5f2] px-2.5 py-0.5 rounded-full border border-gray-200 shrink-0">{{ hint.pattern }}</span>
              </div>
            </div>
          </div>

          <!-- Closing: the grinding problem -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/70 flex flex-col gap-3">
            <span class="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full w-fit">The problem with grinding</span>
            <p class="text-sm text-text-dim leading-relaxed">
              Tools like roadmaps and curated problem lists have made DSA prep better. But there's still a ceiling: grinding 200 problems and hoping to think <em>"wait, I think I remember something similar... was that a queue or a heap?"</em> is not a reliable skill.
            </p>
            <p class="text-sm text-text-dim leading-relaxed">
              Routined is built to close that gap — to make pattern recognition something you've actually internalized, not something you're crossing your fingers about in an interview.
            </p>
          </div>
        </div>

        <!-- Section 5: DSA problem debrief -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">05</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">The DSA problem debrief</h2>
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 border border-[#3a9ae8]/20">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full">How we teach it</span>
            </div>
            <p class="text-sm text-text-dim leading-relaxed">
              You can't just grind 200 LeetCode problems and expect mastery. You need to know <em>what</em> you're doing
              and <em>why</em> it works — otherwise you're just memorizing solutions, not building a skill.
            </p>
            <p class="text-sm text-text-dim leading-relaxed">
              You will be guided through each problem with steps to minimize what options may be useful. After enough repetition,
              this will be second nature. We believe in problem solving rather than strict memorization.
            </p>
          </div>
        </div>

        <!-- Mark as completed -->
        <div class="flex justify-center pt-2">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium border transition-colors"
            :class="completed.has('__intro') ? 'bg-black text-white border-black hover:bg-black/80' : 'bg-white text-text border-gray-200 hover:border-gray-400'"
            @click="toggleCompleted('__intro')"
          >
            <svg v-if="completed.has('__intro')" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            {{ completed.has('__intro') ? 'Completed' : 'Mark as completed' }}
          </button>
        </div>

        <!-- Prev / Next -->
        <div class="flex items-center justify-between pt-2 pb-6">
          <div />
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="navigateToId('__guide')"
          >
            <div class="flex flex-col items-end">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Next</span>
              <span class="font-medium">Guide to Learning</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </div>

      <!-- Guide to Learning view -->
      <div v-else-if="activeView === 'guide'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-10">

        <!-- Hero -->
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text">
            Guide to Learning
          </h1>
          <p class="text-sm text-text-dim leading-relaxed max-w-lg">
            Knowing what to learn is half the battle. Knowing <em>how</em> to learn it is the other half. This guide covers both.
          </p>
        </div>

        <!-- Section 1: Information abstraction -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">01</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">Information abstraction</h2>
          <p class="text-sm text-text-dim leading-relaxed">Learning can be fast-tracked with one skill - understanding how information itself is structured.</p>
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <p class="text-sm text-text-dim leading-relaxed">
            Understanding how information is structured — what does that even mean? Think about anything you've ever learned: it almost certainly had prerequisites, things you needed to know first.
              And it probably became a prerequisite for something else down the line. How the topics connect is structure. There is also structure within a topic. Any topic can be represented at surface level
              or very complex, this is called levels of abstraction. Choosing the right altitude to think at will help you see the shape of a problem instead of getting lost in its details.
            </p>
            <div class="flex flex-col gap-3 pt-1">
              <div v-for="point in abstractionPoints" :key="point" class="flex items-start gap-3">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-dim leading-relaxed">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Topics connecting / ROI / prereqs -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">02</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">Topics connect — learn in the right order</h2>
          <p class="text-sm text-text-dim leading-relaxed">DSA is not a flat list of topics. It's a dependency graph. Knowing its shape saves you hours of frustration.</p>

          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <h3 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Return on investment</h3>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">
              Not all topics are equal. Arrays, hash maps, and trees alone cover the majority of real interview problems. 
              We structured the content to be grouped by relationship and in order. 
              Time spent on graph theory before you've internalized two pointers is wasted time.
              Notice a specific topic coming up a disproportionate amount of time? Become intimate with it.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Prerequisite chain examples</h3>
            <div class="h-px bg-gray-100" />
            <div class="flex flex-col gap-3">
              <div v-for="chain in prereqChains" :key="chain.topic" class="flex items-start gap-3">
                <span class="text-xs font-medium text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 shrink-0 mt-0.5">{{ chain.topic }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ chain.unlocks }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Cognitive science -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">03</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">How your brain actually learns</h2>
          <p class="text-sm text-text-dim leading-relaxed">
            Decades of cognitive science research converge on the same handful of principles. Routined is built around them. To the right of each concept is it's associated pioneer, the explanatory content is separate.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="principle in cogSciPrinciples" :key="principle.name" class="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-2.5">
              <div class="flex items-center justify-between gap-3">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">{{ principle.name }}</span>
                <div class="flex items-center gap-2 shrink-0">
                  <div class="flex flex-col items-end">
                    <span class="text-[11px] text-text-muted">{{ principle.researcher }}</span>
                    <span class="text-[10px] text-text-muted/60">{{ principle.credential }}</span>
                  </div>
                  <div class="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                    <img v-if="principle.image" :src="principle.image" :alt="principle.researcher" class="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div class="h-px bg-gray-100" />
              <p class="text-xs text-text-dim leading-relaxed">{{ principle.science }}</p>
              <p class="text-xs text-[#3a9ae8] leading-relaxed pt-0.5">{{ principle.inRoutined }}</p>
            </div>
          </div>
        </div>

        <!-- Section 4: How routined facilitates -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">04</span>
            <div class="flex-1 h-px bg-gray-200" />
          </div>
          <h2 class="text-xl font-medium text-text">How routined puts this into practice</h2>
          <div class="flex flex-col gap-2">
            <div v-for="feature in routinedFeatures" :key="feature.label" class="bg-white rounded-2xl px-6 py-4 shadow-sm flex items-start gap-5">
              <div class="flex flex-col gap-1">
                <span class="text-[13px] font-semibold text-text">{{ feature.label }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ feature.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mark as completed -->
        <div class="flex justify-center pt-2">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium border transition-colors"
            :class="completed.has('__guide') ? 'bg-black text-white border-black hover:bg-black/80' : 'bg-white text-text border-gray-200 hover:border-gray-400'"
            @click="toggleCompleted('__guide')"
          >
            <svg v-if="completed.has('__guide')" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            {{ completed.has('__guide') ? 'Completed' : 'Mark as completed' }}
          </button>
        </div>

        <!-- Prev / Next -->
        <div class="flex items-center justify-between pt-2 pb-6">
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="navigateToId('__intro')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors"><path d="m15 18-6-6 6-6"/></svg>
            <div class="flex flex-col items-start">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Previous</span>
              <span class="font-medium">Intro</span>
            </div>
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="navigateToId('__complexity')"
          >
            <div class="flex flex-col items-end">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Next</span>
              <span class="font-medium">Understanding Complexity</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </div>

      <!-- Understanding Complexity view -->
      <div v-else-if="activeView === 'complexity'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-10">

        <!-- Hero -->
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text">
            Understanding Complexity
          </h1>
          <p class="text-sm text-text-dim leading-relaxed max-w-lg">
            Big O describes how an algorithm's performance grows as its input grows — not the exact time in seconds, but the <em>shape</em> of the growth.
            Click any curve to see a plain-English explanation. Big O answers what the worst case scenario is.
          </p>
          <div class="flex gap-4">
            <div class="w-1 rounded-full bg-accent shrink-0" />
            <div class="flex flex-col gap-2 py-1">
              <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Importance</span>
              <p class="text-base font-medium text-text leading-relaxed">Complexity is the difference between a product that scales and one that collapses under load.</p>
              <p class="text-sm text-text-dim leading-relaxed">When working with millions of requests, the difference between visiting each request once vs an exponential amount is drastic. Companies want you to demonstrate your understanding of efficiency at scale in interviews.</p>
            </div>
          </div>
        </div>

        <ComplexityGraph />

        <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <h3 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">What matters in practice</h3>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-dim leading-relaxed"><strong class="text-text">O(n²) is a warning sign</strong> — not always wrong, but always worth questioning. If you have a nested loop, ask whether a hash map or two pointers can eliminate the inner one.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-dim leading-relaxed"><strong class="text-text">O(n log n) is the sorting ceiling</strong> — the best any comparison-based sort can do. Most well-optimized solutions land here or better.</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-dim leading-relaxed"><strong class="text-text">O(2ⁿ) means you need memoization</strong> — exponential growth blows up at n=30. If your recursion tree doubles at every step, cache the results (DP).</span>
            </div>
            <div class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-dim leading-relaxed"><strong class="text-text">Space complexity counts too</strong> — an O(n) space solution uses memory proportional to input size. O(1) means you only use a fixed number of extra variables, regardless of n.</span>
            </div>
          </div>
        </div>

        <!-- Mark as completed -->
        <div class="flex justify-center pt-2">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium border transition-colors"
            :class="completed.has('__complexity') ? 'bg-black text-white border-black hover:bg-black/80' : 'bg-white text-text border-gray-200 hover:border-gray-400'"
            @click="toggleCompleted('__complexity')"
          >
            <svg v-if="completed.has('__complexity')" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            {{ completed.has('__complexity') ? 'Completed' : 'Mark as completed' }}
          </button>
        </div>

        <!-- Prev / Next -->
        <div class="flex items-center justify-between pt-2 pb-6">
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="navigateToId('__guide')"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors"><path d="m15 18-6-6 6-6"/></svg>
            <div class="flex flex-col items-start">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Previous</span>
              <span class="font-medium">Guide to Learning</span>
            </div>
          </button>
          <div />
        </div>

      </div>


      <!-- Section skeleton -->
      <div v-else-if="selectedSection" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-4">

        <!-- ── Sorting ── -->
        <template v-if="selectedSection.id === 'sorting'">

          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Sorting</h1>
            <p class="text-sm text-text-muted leading-relaxed max-w-xl">The algorithms that put data in order — and the tradeoffs that make each one suited to different situations.</p>
          </div>

          <!-- Tab bar -->
          <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5">
            <button v-for="tab in ['intro', 'merge', 'bubble', 'insertion', 'bucket', 'quicksort']" :key="tab"
              class="flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 capitalize"
              :class="sortingTab === tab ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
              @click="sortingTab = tab">
              {{ tab === 'intro' ? 'Intro' : tab === 'merge' ? 'Merge' : tab === 'bubble' ? 'Bubble' : tab === 'insertion' ? 'Insertion' : tab === 'bucket' ? 'Bucket' : 'Quicksort' }}
            </button>
          </div>

          <!-- ── INTRO ── -->
          <template v-if="sortingTab === 'intro'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">What is sorting?</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Sorting rearranges a collection into a defined order — usually ascending. On its own, that's not very exciting. What makes it matter is everything sorting <em>enables</em>: binary search requires a sorted array. Two-pointer techniques often assume sorted input. Finding duplicates, closest pairs, or overlapping intervals all become dramatically simpler once the data has been put in order. Sorting is usually a preprocessing step, not the final answer.</p>
              <p class="text-sm text-text-dim leading-relaxed">In practice, you'll reach for Python's built-in <code class="font-mono text-xs bg-[#f5f5f2] px-1.5 py-0.5 rounded">sorted()</code> or <code class="font-mono text-xs bg-[#f5f5f2] px-1.5 py-0.5 rounded">.sort()</code> — both use <strong>Timsort</strong>, a hybrid of merge sort and insertion sort that runs in O(n log n) and is stable. Understanding the individual algorithms still matters: the concepts — divide and conquer, invariants, stability — show up everywhere else in DSA.</p>
            </div>

            <!-- Comparison table -->
            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Algorithm comparison</h2>
              <div class="h-px bg-gray-100" />
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-100">
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3 pr-4">Algorithm</th>
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3 pr-4">Avg time</th>
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3 pr-4">Worst time</th>
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3 pr-4">Space</th>
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3 pr-4">Stable</th>
                      <th class="text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted pb-3">In-place</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="row in SORT_TABLE" :key="row.name" class="group">
                      <td class="py-3 pr-4 font-medium text-text text-[13px]">{{ row.name }}</td>
                      <td class="py-3 pr-4 font-mono text-xs text-text-dim">{{ row.avg }}</td>
                      <td class="py-3 pr-4 font-mono text-xs text-text-dim">{{ row.worst }}</td>
                      <td class="py-3 pr-4 font-mono text-xs text-text-dim">{{ row.space }}</td>
                      <td class="py-3 pr-4">
                        <span class="text-xs font-medium px-1.5 py-0.5 rounded-full"
                          :class="row.stable ? 'bg-green-bg text-green' : 'bg-[#f5f5f2] text-text-muted'">
                          {{ row.stable ? 'Yes' : 'No' }}
                        </span>
                      </td>
                      <td class="py-3">
                        <span class="text-xs font-medium px-1.5 py-0.5 rounded-full"
                          :class="row.inplace ? 'bg-green-bg text-green' : 'bg-[#f5f5f2] text-text-muted'">
                          {{ row.inplace ? 'Yes' : 'No' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Lower bound callout -->
            <div class="flex gap-4">
              <div class="w-1 rounded-full bg-accent shrink-0" />
              <div class="flex flex-col gap-2 py-1">
                <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
                <p class="text-base font-medium text-text leading-relaxed">No comparison-based sort can beat O(n log n) in the worst case — it's a mathematical lower bound.</p>
                <p class="text-sm text-text-dim leading-relaxed">To sort n elements by comparing them, you need to determine which of n! possible orderings is correct. Each comparison eliminates half the remaining possibilities, so you need at least log₂(n!) comparisons — which simplifies to Ω(n log n). Bucket sort escapes this bound only because it doesn't compare elements against each other.</p>
              </div>
            </div>

            <!-- Python built-in card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Python built-ins</h2>
              <div class="h-px bg-gray-100" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <code class="font-mono text-xs font-semibold text-text">sorted(iterable)</code>
                  <p class="text-xs text-text-dim leading-relaxed">Returns a <strong>new sorted list</strong>. Works on any iterable (list, tuple, string, dict keys). Does not modify the original.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <code class="font-mono text-xs font-semibold text-text">list.sort()</code>
                  <p class="text-xs text-text-dim leading-relaxed">Sorts the list <strong>in-place</strong>, returns None. Slightly faster than sorted() since it avoids creating a new list.</p>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs font-medium text-text-muted">Both support:</span>
                <div class="flex flex-col gap-1.5">
                  <div v-for="tip in SORT_TIPS" :key="tip.code" class="flex flex-col gap-0.5">
                    <code class="font-mono text-[11.5px] text-text bg-[#f5f5f2] px-2.5 py-1.5 rounded-lg">{{ tip.code }}</code>
                    <span class="text-[11px] text-text-muted pl-1">{{ tip.note }}</span>
                  </div>
                </div>
              </div>
            </div>

          </template>

          <!-- ── MERGE SORT ── -->
          <template v-else-if="sortingTab === 'merge'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Imagine you have two separate piles of cards, each already sorted face-up. Merging them into one sorted pile is easy: always take the smaller of the two top cards. You never need to look further down either pile. Merge sort exploits this — it recursively splits the array in half until each piece has one element (trivially sorted), then merges those pieces back together, bottom up.</p>
              <p class="text-sm text-text-dim leading-relaxed">The split costs nothing. All the real work happens in the <strong>merge step</strong>, where two sorted halves are combined in linear time. Because there are log n levels of splitting, and each level does O(n) work in total across all merges, the overall cost is O(n log n) — always, regardless of input order.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(n log n)</span>
                <span class="text-[11px] text-text-muted">all cases</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(n)</span>
                <span class="text-[11px] text-text-muted">merge buffer</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Stable</span>
                <span class="text-sm font-semibold text-green">Yes</span>
                <span class="text-[11px] text-text-muted">equal elements keep order</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">How it works</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col gap-3">
                <div v-for="(step, i) in SORT_STEPS.merge" :key="i" class="flex gap-3">
                  <span class="text-2xl font-semibold text-gray-100 leading-none select-none shrink-0 pt-0.5">{{ i + 1 }}</span>
                  <div>
                    <span class="text-[12px] font-semibold text-text">{{ step.title }} — </span>
                    <span class="text-sm text-text-dim">{{ step.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-xs text-text-muted leading-relaxed">
                <strong class="text-text">When to use:</strong> when you need <strong>guaranteed O(n log n)</strong>, when stability matters, when sorting a linked list (no random access needed), or when implementing external sort on data that doesn't fit in memory.
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Step-by-step visual</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <div class="px-6 py-5">
                <PatternVisualizer pattern="sort-merge" />
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3 flex items-center justify-between">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(SORT_CODE.merge, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

          </template>

          <!-- ── BUBBLE SORT ── -->
          <template v-else-if="sortingTab === 'bubble'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Think of bubbles in a glass of water — lighter bubbles rise to the top. In bubble sort, larger elements "bubble" toward the end of the array. Each pass compares adjacent pairs and swaps them if they're out of order. After one full pass, the largest element is guaranteed to be in its correct final position. After k passes, the k largest elements are correctly placed.</p>
              <p class="text-sm text-text-dim leading-relaxed">Bubble sort is rarely used in production — O(n²) is too slow for large inputs. It earns its place in DSA education because it makes the concept of a <strong>loop invariant</strong> very tangible: you can watch the sorted suffix grow one element per pass and reason about exactly why it works.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(n²)</span>
                <span class="text-[11px] text-text-muted">O(n) best case</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">in-place</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Stable</span>
                <span class="text-sm font-semibold text-green">Yes</span>
                <span class="text-[11px] text-text-muted">adjacent swaps only</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">How it works</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col gap-3">
                <div v-for="(step, i) in SORT_STEPS.bubble" :key="i" class="flex gap-3">
                  <span class="text-2xl font-semibold text-gray-100 leading-none select-none shrink-0 pt-0.5">{{ i + 1 }}</span>
                  <div>
                    <span class="text-[12px] font-semibold text-text">{{ step.title }} — </span>
                    <span class="text-sm text-text-dim">{{ step.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-xs text-text-muted leading-relaxed">
                <strong class="text-text">Invariant:</strong> after pass i, the last i elements are in their final sorted positions. Each pass extends this sorted suffix by one.
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Step-by-step visual</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <div class="px-6 py-5">
                <PatternVisualizer pattern="sort-bubble" />
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(SORT_CODE.bubble, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

          </template>

          <!-- ── INSERTION SORT ── -->
          <template v-else-if="sortingTab === 'insertion'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Think about how you sort a hand of cards. You pick up one card at a time and slide it left until it's in the right position relative to the cards you're already holding. You don't look at all the remaining cards first — you just maintain a sorted section in your hand and insert each new card where it belongs.</p>
              <p class="text-sm text-text-dim leading-relaxed">Insertion sort works the same way. It maintains a sorted prefix at the front of the array and extends it by one element per pass — shifting existing elements right to open up the correct spot for the new one. It's O(n²) in the worst case, but O(n) when the input is nearly sorted, which makes it exceptionally practical. <strong>Timsort</strong>, Python's built-in algorithm, uses insertion sort for small subarrays (under ~64 elements) because it outperforms merge sort at that scale.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(n²)</span>
                <span class="text-[11px] text-text-muted">O(n) if nearly sorted</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">in-place</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Stable</span>
                <span class="text-sm font-semibold text-green">Yes</span>
                <span class="text-[11px] text-text-muted">shifts, not swaps</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">How it works</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col gap-3">
                <div v-for="(step, i) in SORT_STEPS.insertion" :key="i" class="flex gap-3">
                  <span class="text-2xl font-semibold text-gray-100 leading-none select-none shrink-0 pt-0.5">{{ i + 1 }}</span>
                  <div>
                    <span class="text-[12px] font-semibold text-text">{{ step.title }} — </span>
                    <span class="text-sm text-text-dim">{{ step.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-xs text-text-muted leading-relaxed">
                <strong class="text-text">When to use:</strong> small arrays, nearly-sorted data, or as the final pass in more complex algorithms like Timsort. It's also the mental model to reach for when you need to maintain a sorted structure while streaming in new values one at a time.
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Step-by-step visual</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <div class="px-6 py-5">
                <PatternVisualizer pattern="sort-insertion" />
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(SORT_CODE.insertion, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

          </template>

          <!-- ── BUCKET SORT ── -->
          <template v-else-if="sortingTab === 'bucket'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Imagine a postal worker sorting mail for a city. Instead of comparing every letter to every other letter, they first drop each piece into one of many labeled bins — say, by the first digit of the zip code. Within each bin, the volume is small and easy to sort. Then they collect the bins in order. The total work is much less than a full pairwise comparison.</p>
              <p class="text-sm text-text-dim leading-relaxed">Bucket sort does the same thing: distribute input elements into k buckets based on value range, sort each bucket individually (usually with insertion sort), then concatenate. If the input is <strong>uniformly distributed</strong>, each bucket gets roughly n/k elements, and the whole process runs in O(n + k). This is how bucket sort escapes the O(n log n) comparison lower bound — it doesn't compare elements against each other to determine placement; it uses their values directly.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(n + k)</span>
                <span class="text-[11px] text-text-muted">O(n²) worst case</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(n + k)</span>
                <span class="text-[11px] text-text-muted">buckets + output</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Stable</span>
                <span class="text-sm font-semibold text-green">Yes</span>
                <span class="text-[11px] text-text-muted">if inner sort is stable</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">How it works</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col gap-3">
                <div v-for="(step, i) in SORT_STEPS.bucket" :key="i" class="flex gap-3">
                  <span class="text-2xl font-semibold text-gray-100 leading-none select-none shrink-0 pt-0.5">{{ i + 1 }}</span>
                  <div>
                    <span class="text-[12px] font-semibold text-text">{{ step.title }} — </span>
                    <span class="text-sm text-text-dim">{{ step.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-xs text-text-muted leading-relaxed">
                <strong class="text-text">When to use:</strong> floating-point values uniformly distributed over a range (e.g. scores between 0.0 and 1.0), or any time you know the input spread and it's bounded. Degrades to O(n²) if all elements cluster in one bucket — never use it without understanding your input distribution.
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Step-by-step visual</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <div class="px-6 py-5">
                <PatternVisualizer pattern="sort-bucket" />
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(SORT_CODE.bucket, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

          </template>

          <!-- ── QUICKSORT ── -->
          <template v-else-if="sortingTab === 'quicksort'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">Picture arranging people at a party by height. You pick one person — the pivot — and ask everyone shorter to move left and everyone taller to move right. Now the pivot is in its exact final position, and you have two independent groups to sort. Apply the same logic recursively to each group. No one compares against anyone outside their group.</p>
              <p class="text-sm text-text-dim leading-relaxed">Quicksort is the fastest comparison sort in practice — not in theory. Its O(n log n) average case is the same as merge sort, but it wins on real hardware due to <strong>cache efficiency</strong>: it sorts in-place, so data stays hot in the CPU cache instead of being copied to a separate buffer. The weakness is the worst case: if the pivot is always the smallest or largest element, partitioning is lopsided and the algorithm degrades to O(n²). Randomizing the pivot selection makes this astronomically unlikely.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(n log n)</span>
                <span class="text-[11px] text-text-muted">O(n²) worst case</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(log n)</span>
                <span class="text-[11px] text-text-muted">call stack depth</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Stable</span>
                <span class="text-sm font-semibold text-text-muted">No</span>
                <span class="text-[11px] text-text-muted">partition swaps disturb order</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">How it works</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col gap-3">
                <div v-for="(step, i) in SORT_STEPS.quicksort" :key="i" class="flex gap-3">
                  <span class="text-2xl font-semibold text-gray-100 leading-none select-none shrink-0 pt-0.5">{{ i + 1 }}</span>
                  <div>
                    <span class="text-[12px] font-semibold text-text">{{ step.title }} — </span>
                    <span class="text-sm text-text-dim">{{ step.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-xs text-text-muted leading-relaxed">
                <strong class="text-text">Key tradeoff vs merge sort:</strong> Quicksort is faster in practice (cache-friendly, in-place) but has an O(n²) worst case and is not stable. Merge sort is slower in practice but guarantees O(n log n) and stability. Python's Timsort splits the difference by using merge sort logic at scale.
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Step-by-step visual</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <div class="px-6 py-5">
                <PatternVisualizer pattern="sort-quicksort" />
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(SORT_CODE.quicksort, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

          </template>

        </template>

        <!-- ── BFS & DFS ── -->
        <template v-else-if="selectedSection.id === 'bfs-dfs'">

          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">BFS & DFS</h1>
            <p class="text-sm text-text-muted leading-relaxed max-w-xl">The two fundamental traversal strategies — one explores level by level, the other goes as deep as possible first.</p>
          </div>

          <!-- Tab bar -->
          <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5">
            <button v-for="tab in ['bfs', 'dfs']" :key="tab"
              class="flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              :class="bfsDfsTab === tab ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
              @click="bfsDfsTab = tab">
              {{ tab === 'bfs' ? 'BFS' : 'DFS' }}
            </button>
          </div>

          <!-- ── BFS ── -->
          <template v-if="bfsDfsTab === 'bfs'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">BFS is like dropping a stone in water — ripples spread outward <strong>level by level</strong>, reaching every node at distance 1 before any node at distance 2. It uses a <strong>queue</strong> (first in, first out) to track what to visit next, processing nodes in the exact order they were discovered.</p>
              <p class="text-sm text-text-dim leading-relaxed">That ordering guarantee is the point. In an unweighted graph, the number of edges on a path is its cost. BFS explores paths in order of increasing edge count, so the first time it reaches a node, it has taken the shortest possible path. Once a node is dequeued, the optimal distance to it is final.</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(V + E)</span>
                <span class="text-[11px] text-text-muted">each vertex and edge visited once</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(V)</span>
                <span class="text-[11px] text-text-muted">queue + visited set</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">When to use BFS</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col divide-y divide-gray-100">
                <div v-for="signal in BFS_SIGNALS" :key="signal.cue" class="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                  <span class="text-[12px] font-medium text-text font-mono">{{ signal.cue }}</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">{{ signal.why }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(BFS_CODE, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

            <!-- Key insight -->
            <div class="flex gap-4">
              <div class="w-1 rounded-full bg-accent shrink-0" />
              <div class="flex flex-col gap-2 py-1">
                <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
                <p class="text-base font-medium text-text leading-relaxed">BFS guarantees shortest path in unweighted graphs — not because it's searching smarter, but because it can't visit anything far before visiting everything close.</p>
                <p class="text-sm text-text-dim leading-relaxed">The queue enforces FIFO order. Nodes at distance d are enqueued before nodes at distance d+1, so they're also dequeued first. That ordering is why the first time BFS reaches a node, the path taken is provably shortest. No revisit can improve it.</p>
              </div>
            </div>

          </template>

          <!-- ── DFS ── -->
          <template v-else-if="bfsDfsTab === 'dfs'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">DFS is like exploring a cave with a single flashlight — go as deep as possible down one tunnel before backtracking and trying the next. It uses a <strong>stack</strong> (or the call stack via recursion) to track the current path. When a dead end is reached, it unwinds to the last unexplored branch.</p>
              <p class="text-sm text-text-dim leading-relaxed">On trees there are no cycles, so DFS naturally terminates and needs no visited set. On graphs, a visited set is mandatory — without it, cycles cause infinite loops. The three tree traversal orders (preorder, inorder, postorder) are DFS with different points at which the node's value is processed.</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Time</span>
                <span class="font-mono text-sm font-semibold text-text">O(V + E)</span>
                <span class="text-[11px] text-text-muted">each vertex and edge visited once</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Space</span>
                <span class="font-mono text-sm font-semibold text-text">O(H)</span>
                <span class="text-[11px] text-text-muted">H = height of recursion / stack</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Tree traversal orders</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col divide-y divide-gray-100">
                <div class="flex flex-col gap-0.5 py-3 first:pt-0">
                  <span class="text-[12px] font-medium text-text font-mono">Preorder — root → left → right</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Process the node before its children. Use when the parent decision must be made before recursing — serializing trees, copying structure.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3">
                  <span class="text-[12px] font-medium text-text font-mono">Inorder — left → root → right</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Visits a BST in sorted order. If the problem needs sorted access to BST values, inorder is the answer.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3 last:pb-0">
                  <span class="text-[12px] font-medium text-text font-mono">Postorder — left → right → root</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Process children before the parent. Use when a node's answer depends on its subtrees — tree height, diameter, merge operations.</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">When to use DFS</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col divide-y divide-gray-100">
                <div v-for="signal in DFS_SIGNALS" :key="signal.cue" class="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                  <span class="text-[12px] font-medium text-text font-mono">{{ signal.cue }}</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">{{ signal.why }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(DFS_CODE, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

            <!-- Key insight -->
            <div class="flex gap-4">
              <div class="w-1 rounded-full bg-accent shrink-0" />
              <div class="flex flex-col gap-2 py-1">
                <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
                <p class="text-base font-medium text-text leading-relaxed">Recursive DFS and iterative DFS with an explicit stack are the same algorithm — the call stack IS a stack.</p>
                <p class="text-sm text-text-dim leading-relaxed">When you call a function recursively, Python pushes a frame onto the call stack and pops it when the function returns. Replacing the call stack with an explicit stack just makes that process visible. For graphs, always add a visited set — on trees, the absence of cycles makes it unnecessary. For deep graphs (recursion depth &gt; 1000), prefer the iterative form to avoid Python's stack limit.</p>
              </div>
            </div>

          </template>

        </template>

        <!-- ── Stacks & Queues ── -->
        <template v-else-if="selectedSection.id === 'stacks-queues'">

          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Stacks & Queues</h1>
            <p class="text-sm text-text-muted leading-relaxed max-w-xl">Two data structures built on a single rule: which end can you access? That constraint is the feature.</p>
          </div>

          <!-- Tab bar -->
          <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5">
            <button v-for="tab in ['stack', 'queue']" :key="tab"
              class="flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              :class="stacksQueuesTab === tab ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
              @click="stacksQueuesTab = tab">
              {{ tab === 'stack' ? 'Stack' : 'Queue' }}
            </button>
          </div>

          <!-- ── Stack ── -->
          <template v-if="stacksQueuesTab === 'stack'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">A stack is like a stack of plates — you add to the top and remove from the top. <strong>LIFO: Last In, First Out.</strong> The most recently added item is always the first to be removed. Only one end is ever accessible; the rest of the stack is hidden.</p>
              <p class="text-sm text-text-dim leading-relaxed">This constraint is the feature. Function calls unwind in reverse order because the runtime uses a call stack — each frame is pushed when a function is called and popped when it returns. DFS works the same way: push the current node, explore, pop when backtracking. Any time you need to undo the last action or process things in reverse order, a stack is the structure.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Push</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">append()</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Pop</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">pop()</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Peek</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">stack[-1]</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Use cases</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col divide-y divide-gray-100">
                <div class="flex flex-col gap-0.5 py-3 first:pt-0">
                  <span class="text-[12px] font-medium text-text">DFS traversal</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Recursive DFS uses the call stack implicitly. Iterative DFS uses an explicit stack — same behavior, no recursion depth limit.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3">
                  <span class="text-[12px] font-medium text-text">Balanced parentheses / bracket matching</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Push opening brackets, pop when a closing bracket matches the top. An empty stack at the end means balanced.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3">
                  <span class="text-[12px] font-medium text-text">Undo / redo systems</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Each action is pushed onto a stack. Undo pops the last action and reverses it. Redo pushes it back.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3 last:pb-0">
                  <span class="text-[12px] font-medium text-text">Monotonic stack problems</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">A stack with an ordering invariant (elements always increasing or decreasing). Finds "next greater element" in O(n) total.</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(STACK_CODE, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

            <!-- Key insight -->
            <div class="flex gap-4">
              <div class="w-1 rounded-full bg-accent shrink-0" />
              <div class="flex flex-col gap-2 py-1">
                <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
                <p class="text-base font-medium text-text leading-relaxed">A stack is a list with a rule. Python's list supports push and pop from the tail in O(1) — that's all a stack is.</p>
                <p class="text-sm text-text-dim leading-relaxed">append() and pop() are the only operations you need. Peek with stack[-1] — never remove when you just want to look. The discipline of only touching one end is what makes stacks useful: it encodes a relationship between order of insertion and order of removal that mirrors how function calls, DFS paths, and bracket matching all work.</p>
              </div>
            </div>

          </template>

          <!-- ── Queue ── -->
          <template v-else-if="stacksQueuesTab === 'queue'">

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">The idea</h2>
              <div class="h-px bg-gray-100" />
              <p class="text-sm text-text-dim leading-relaxed">A queue is like a line at a coffee shop — the first person in line is the first to order. <strong>FIFO: First In, First Out.</strong> Items are added at the back and removed from the front. The order of insertion is preserved exactly.</p>
              <p class="text-sm text-text-dim leading-relaxed">In Python, use <code class="font-mono text-xs bg-[#f5f5f2] px-1.5 py-0.5 rounded">collections.deque</code> — a doubly-ended queue that supports O(1) operations at both ends. A regular list can simulate a queue with <code class="font-mono text-xs bg-[#f5f5f2] px-1.5 py-0.5 rounded">pop(0)</code>, but that's O(n) — it shifts every element left. Don't do it.</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Enqueue</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">append()</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Dequeue</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">popleft()</span>
              </div>
              <div class="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
                <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted">Peek</span>
                <span class="font-mono text-sm font-semibold text-text">O(1)</span>
                <span class="text-[11px] text-text-muted">queue[0]</span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Use cases</h2>
              <div class="h-px bg-gray-100" />
              <div class="flex flex-col divide-y divide-gray-100">
                <div class="flex flex-col gap-0.5 py-3 first:pt-0">
                  <span class="text-[12px] font-medium text-text">BFS traversal</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">The queue IS BFS. Nodes are enqueued when discovered and dequeued when processed — FIFO guarantees level-by-level order and shortest paths.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3">
                  <span class="text-[12px] font-medium text-text">Level-order tree traversal</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Enqueue the root, then repeatedly dequeue a node and enqueue its children. Snapshot queue size before each level to process one depth at a time.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3">
                  <span class="text-[12px] font-medium text-text">Task scheduling / worker queues</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">Tasks arrive in order and should be processed in arrival order — the fundamental use case FIFO was designed for.</span>
                </div>
                <div class="flex flex-col gap-0.5 py-3 last:pb-0">
                  <span class="text-[12px] font-medium text-text">Sliding window maximum (monotonic deque)</span>
                  <span class="text-[12px] text-text-muted leading-relaxed">A deque used as a monotonic queue — remove elements from both ends to maintain a decreasing order, tracking the window maximum in O(1).</span>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div class="px-6 pt-5 pb-3">
                <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implementation</h2>
              </div>
              <div class="h-px bg-gray-100" />
              <pre class="hljs p-5! m-0! rounded-none!"><code v-html="hljs.highlight(QUEUE_CODE, { language: 'python' }).value" class="font-mono text-[12.5px] leading-relaxed" /></pre>
            </div>

            <!-- Key insight -->
            <div class="flex gap-4">
              <div class="w-1 rounded-full bg-accent shrink-0" />
              <div class="flex flex-col gap-2 py-1">
                <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
                <p class="text-base font-medium text-text leading-relaxed">Never use <code class="font-mono text-sm bg-[#f5f5f2] px-1 py-0.5 rounded">list.pop(0)</code> as a queue — it's O(n). Use <code class="font-mono text-sm bg-[#f5f5f2] px-1 py-0.5 rounded">collections.deque</code> with <code class="font-mono text-sm bg-[#f5f5f2] px-1 py-0.5 rounded">popleft()</code>.</p>
                <p class="text-sm text-text-dim leading-relaxed">A Python list is backed by an array. Removing from the front (pop(0)) shifts every remaining element one position left — O(n). A deque uses a doubly-linked block structure that makes both ends O(1). This is a silent performance bug that won't fail your code on small inputs but will time-out on large ones. Always use deque for queues.</p>
              </div>
            </div>

          </template>

        </template>

        <!-- ── Python Tips & Tricks ── -->
        <template v-else-if="selectedSection.id === 'python-tips'">

        <div class="flex flex-col gap-3 pb-2">
          <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Python Tips & Tricks</h1>
          <p class="text-sm text-text-muted leading-relaxed">Essential Python built-ins and patterns that come up constantly in DSA interviews.</p>
        </div>

        <div v-for="tip in selectedSection.content.tips" :key="tip.name" class="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div class="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 class="text-[13px] font-semibold text-text font-mono">{{ tip.name }}</h2>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-dim leading-relaxed px-6 pt-4 pb-3">{{ tip.description }}</p>
          <div class="rounded-xl overflow-hidden mx-6 mb-5">
            <pre class="hljs p-5! m-0! rounded-xl!"><code
              v-html="hljs.highlight(tip.code, { language: 'python' }).value"
              class="font-mono text-[12.5px] leading-relaxed"
            /></pre>
          </div>
        </div>

        </template>

        <!-- ── Generic skeleton for all other sections ── -->
        <template v-else>

        <!-- Title block -->
        <div class="flex flex-col gap-3 pb-2">
          <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">
            {{ selectedSection.label }}
          </h1>
        </div>



        <!-- 1. Analogy / Made Simple -->
        <div v-if="!selectedSection.content?.isClusterIntro" class="bg-white rounded-2xl shadow-sm flex flex-col">
          <div class="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              {{ selectedSection.content?.madeSimple ? 'Made Simple' : 'Analogy' }}
            </h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">
                {{ selectedSection.content?.madeSimple ? 'Visual' : 'High abstraction' }}
              </span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                {{ selectedSection.content?.madeSimple ? 'A visual walkthrough of the core concept before getting into mechanics.' : 'A real-world analogy to make the concept intuitive before getting into mechanics.' }}
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />

          <!-- Made Simple: string visual + step-by-step -->
          <template v-if="selectedSection.content?.madeSimple">
            <div class="px-6 pt-5 pb-2 flex flex-col gap-3">
              <code class="font-mono text-xs text-text-muted">s = "{{ selectedSection.content.madeSimple.visualString }}"</code>
              <div class="flex items-start gap-1.5">
                <div v-for="(char, i) in selectedSection.content.madeSimple.visualString.split('')" :key="i" class="flex flex-col items-center gap-1.5">
                  <div class="w-10 h-10 border border-gray-200 rounded-lg bg-[#f5f5f2] flex items-center justify-center font-mono text-base font-semibold text-text select-none">{{ char }}</div>
                  <span class="font-mono text-[10px] text-text-muted">{{ i }}</span>
                </div>
              </div>
            </div>
            <p class="text-sm text-text-dim leading-relaxed px-6 pt-2 pb-4" v-html="selectedSection.content.madeSimple.body" />
            <div class="mx-6 mb-5 rounded-xl border border-gray-100 overflow-hidden">
              <div class="px-4 py-2.5 bg-[#f5f5f2] border-b border-gray-100">
                <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Try it — s = "{{ selectedSection.content.madeSimple.visualString }}"</span>
              </div>
              <div class="flex flex-col divide-y divide-gray-50">
                <div v-for="step in selectedSection.content.madeSimple.steps" :key="step.expr" class="flex items-baseline gap-3 px-4 py-3">
                  <code class="font-mono text-[12px] text-text shrink-0">{{ step.expr }}</code>
                  <span class="text-text-muted text-[11px] shrink-0">→</span>
                  <code class="font-mono text-[12px] shrink-0 font-semibold" :class="step.isError ? 'text-red-400' : 'text-[#3a9ae8]'">{{ step.result }}</code>
                  <span class="text-[11px] text-text-muted leading-relaxed">{{ step.note }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- Standard analogy -->
          <template v-else>
            <div class="px-6 pt-4 pb-2"></div>
            <p class="text-sm leading-relaxed px-6 pt-0 pb-5"
               :class="selectedSection.content?.analogy ? 'text-text-dim' : 'text-text-muted italic'"
               v-html="selectedSection.content?.analogy || `A real-world analogy that makes ${selectedSection.label} intuitive before getting into the mechanics...`" />
          </template>
        </div>

        <!-- 2. What / Why / How -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">What / Why / How</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">Conceptual</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                The mental model — what it is, why it exists, and how it works.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">What</span>
              <p class="text-sm leading-relaxed" :class="selectedSection.content?.what ? 'text-text-dim' : 'text-text-muted italic'" v-html="selectedSection.content?.what || `What exactly is ${selectedSection.label}? A precise definition, no vague hand-waving...`" />
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">Why</span>
              <p class="text-sm leading-relaxed" :class="selectedSection.content?.why ? 'text-text-dim' : 'text-text-muted italic'" v-html="selectedSection.content?.why || `Why does ${selectedSection.label} exist? What problem does it solve that simpler approaches can't?`" />
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">How</span>
              <p class="text-sm leading-relaxed" :class="selectedSection.content?.how ? 'text-text-dim' : 'text-text-muted italic'" v-html="selectedSection.content?.how || `How does ${selectedSection.label} actually work? The mechanics, step by step...`" />
            </div>
          </div>
        </div>

        <!-- 3a. Fixed vs Dynamic (arrays only) -->
        <div v-if="selectedSection.content?.fixedVsDynamic" class="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Fixed vs Dynamic Arrays</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Concept</span>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-text">Fixed Array</span>
              <p class="text-sm text-text-dim leading-relaxed" v-html="selectedSection.content.fixedVsDynamic.fixed" />
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-text">Dynamic Array</span>
              <p class="text-sm text-text-dim leading-relaxed" v-html="selectedSection.content.fixedVsDynamic.dynamic" />
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-text">Amortized O(1) — Why Append Is Still Fast</span>
              <p class="text-sm text-text-dim leading-relaxed" v-html="selectedSection.content.fixedVsDynamic.amortized" />
            </div>
            <div class="bg-[#f5f5f2] rounded-xl p-4">
              <p class="text-sm text-text-dim leading-relaxed" v-html="selectedSection.content.fixedVsDynamic.pythonNote" />
            </div>
          </div>
        </div>

        <!-- 3b. Memory & Storage (DS only, not cluster intros) -->
        <div v-if="selectedSection.categoryId === 'data-structures' && !selectedSection.content?.isClusterIntro" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Memory & Storage</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">Technical</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                How this structure is laid out in memory — directly explains why certain operations are fast or slow.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm leading-relaxed" :class="selectedSection.content?.memory?.overview ? 'text-text-dim' : 'text-text-muted italic'"
             v-html="selectedSection.content?.memory?.overview || `Where ${selectedSection.label} lives in memory and how it's laid out — this directly explains the complexity tradeoffs below.`" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Layout</span>
              <span class="text-xs leading-relaxed" :class="selectedSection.content?.memory?.layout ? 'text-text-dim' : 'text-text-muted italic'" v-html="selectedSection.content?.memory?.layout || 'e.g. Contiguous block / linked nodes / hash buckets...'" />
            </div>
            <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implication</span>
              <span class="text-xs leading-relaxed" :class="selectedSection.content?.memory?.implication ? 'text-text-dim' : 'text-text-muted italic'" v-html="selectedSection.content?.memory?.implication || 'What this layout makes fast or slow, and why...'" />
            </div>
          </div>
        </div>

        <!-- 3b. Recognition Signals (Patterns only) -->
        <div v-if="selectedSection.categoryId === 'patterns'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-[#3a9ae8]/20">
          <div class="flex items-center gap-2">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Recognition Signals</h2>
            <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full">Key insight</span>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            Words, phrases, or constraints in a problem that almost always point to {{ selectedSection.label }}.
            Internalizing these is the difference between pattern recognition and guessing.
          </p>
          <div class="flex flex-col divide-y divide-gray-50">
            <template v-if="selectedSection.content?.signals?.length">
              <div v-for="signal in selectedSection.content.signals" :key="signal" class="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span class="text-sm text-text-dim italic">"{{ signal }}"</span>
              </div>
            </template>
            <template v-else>
              <div v-for="i in 3" :key="i" class="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span class="text-sm text-text-muted italic">"Signal phrase {{ i }}..."</span>
              </div>
            </template>
          </div>
        </div>

        <!-- 4. Complexity -->
        <div v-if="selectedSection.categoryId !== 'the-connection' && !selectedSection.content?.isClusterIntro" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Complexity</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">Technical</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                Big O time and space costs — how performance scales as input size grows.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <!-- DS: per-operation table -->
          <div v-if="selectedSection.categoryId === 'data-structures' && !selectedSection.content?.isClusterIntro" class="flex flex-col divide-y divide-gray-50">
            <div v-for="op in ['access', 'search', 'insert', 'delete']" :key="op" class="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <span class="text-sm text-text-muted capitalize">{{ op }}</span>
              <span class="font-mono text-sm" :class="selectedSection.content?.complexity?.[op] ? 'text-text-dim' : 'text-text-muted italic'">{{ selectedSection.content?.complexity?.[op] || 'O(?)' }}</span>
            </div>
          </div>
          <!-- Algs / Patterns: time + space -->
          <div v-else class="flex gap-8">
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] text-text-muted uppercase tracking-wider">Time</span>
              <span class="font-mono text-sm" :class="selectedSection.content?.complexity?.time ? 'text-text-dim' : 'text-text-muted italic'">{{ selectedSection.content?.complexity?.time || 'O(?)' }}</span>
            </div>
            <div class="w-px bg-gray-100" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[11px] text-text-muted uppercase tracking-wider">Space</span>
              <span class="font-mono text-sm" :class="selectedSection.content?.complexity?.space ? 'text-text-dim' : 'text-text-muted italic'">{{ selectedSection.content?.complexity?.space || 'O(?)' }}</span>
            </div>
          </div>
        </div>

        <!-- 5. Pros & Cons (DS only, not cluster intros) -->
        <div v-if="selectedSection.categoryId === 'data-structures' && !selectedSection.content?.isClusterIntro" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Pros & Cons</h2>
          <div class="h-px bg-gray-100" />
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col gap-2.5">
              <span class="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Strengths</span>
              <template v-if="selectedSection.content?.pros?.length">
                <div v-for="pro in selectedSection.content.pros" :key="pro" class="flex items-start gap-2">
                  <span class="text-emerald-400 mt-px text-sm leading-none">+</span>
                  <span class="text-sm text-text-dim leading-relaxed" v-html="pro" />
                </div>
              </template>
              <template v-else>
                <div v-for="i in 3" :key="i" class="flex items-start gap-2">
                  <span class="text-emerald-400 mt-px text-sm leading-none">+</span>
                  <span class="text-sm text-text-muted italic leading-relaxed">Strength {{ i }}...</span>
                </div>
              </template>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-[11px] font-semibold text-red-400 uppercase tracking-wider">Weaknesses</span>
              <template v-if="selectedSection.content?.cons?.length">
                <div v-for="con in selectedSection.content.cons" :key="con" class="flex items-start gap-2">
                  <span class="text-red-300 mt-px text-sm leading-none">−</span>
                  <span class="text-sm text-text-dim leading-relaxed" v-html="con" />
                </div>
              </template>
              <template v-else>
                <div v-for="i in 3" :key="i" class="flex items-start gap-2">
                  <span class="text-red-300 mt-px text-sm leading-none">−</span>
                  <span class="text-sm text-text-muted italic leading-relaxed">Weakness {{ i }}...</span>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 6. Key Properties -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Key Properties</h2>
          <div class="h-px bg-gray-100" />
          <ul class="flex flex-col gap-3">
            <template v-if="selectedSection.content?.keyProperties?.length">
              <li v-for="prop in selectedSection.content.keyProperties" :key="prop" class="flex items-start gap-3">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-dim leading-relaxed" v-html="prop" />
              </li>
            </template>
            <template v-else>
              <li v-for="i in 4" :key="i" class="flex items-start gap-3">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-muted italic leading-relaxed">Key property {{ i }}...</span>
              </li>
            </template>
          </ul>
        </div>

        <!-- 7. Use Cases -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Use Cases</h2>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col divide-y divide-gray-50">
            <template v-if="selectedSection.content?.useCases?.length">
              <div v-for="uc in selectedSection.content.useCases" :key="uc" class="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-dim leading-relaxed" v-html="uc" />
              </div>
            </template>
            <template v-else>
              <div v-for="i in 3" :key="i" class="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                <span class="text-sm text-text-muted italic leading-relaxed">Use case {{ i }}...</span>
              </div>
            </template>
          </div>
        </div>

        <!-- 8. Visuals & Examples -->
        <div v-if="!selectedSection.content?.isClusterIntro && !selectedSection.content?.madeSimple" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Visuals & Examples</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">Concrete</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                A worked example or diagram that makes the concept tangible and traceable.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <!-- Sliding window: tabbed fixed vs variable -->
          <template v-if="selectedSection.id === 'sliding-window'">
            <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5 w-fit">
              <button v-for="tab in ['fixed', 'variable']" :key="tab"
                class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="slidingWindowVisualTab === tab ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
                @click="slidingWindowVisualTab = tab">
                {{ tab === 'fixed' ? 'Fixed window' : 'Variable window' }}
              </button>
            </div>
            <PatternVisualizer
              :key="slidingWindowVisualTab"
              :pattern="slidingWindowVisualTab === 'fixed' ? 'sliding-window' : 'sliding-window-variable'"
            />
          </template>

          <!-- All other sections -->
          <template v-else>
            <div v-if="selectedSection && sectionVisualizer[selectedSection.id]" class="flex flex-col gap-6">
              <PatternVisualizer
                v-for="(pattern, pi) in [sectionVisualizer[selectedSection.id]].flat()"
                :key="`${selectedSection.id}-${pi}`"
                :pattern="pattern"
              />
            </div>
            <div v-else class="bg-[#f5f5f2] rounded-xl h-44 flex items-center justify-center border border-dashed border-gray-200">
              <span class="text-sm text-text-muted italic">Visual diagram / step-by-step illustration</span>
            </div>
          </template>
        </div>

        <!-- 9. Code -->
        <div v-if="!selectedSection.content?.isClusterIntro" class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Code</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">Implementation</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                Python code showing how to actually write or use this in practice.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="rounded-xl overflow-hidden text-sm leading-relaxed">
            <pre class="hljs p-5! m-0! rounded-xl!"><code
              v-if="selectedSection.content?.code"
              v-html="hljs.highlight(selectedSection.content.code, { language: 'python' }).value"
              class="font-mono"
            /><code v-else class="font-mono text-gray-500">// {{ selectedSection.label }}
// Implementation goes here...</code></pre>
          </div>
        </div>

        <!-- 10. Sandbox -->
        <div v-if="!selectedSection.content?.isClusterIntro && sectionProblem" class="flex flex-col gap-4">

          <!-- Problem info card (white) -->
          <div v-if="sectionProblem" class="rounded-xl border border-gray-200 bg-white px-6 py-5 flex flex-col gap-5 shadow-sm">
            <!-- Title + difficulty -->
            <div class="flex items-center gap-3">
              <span class="text-2xl font-semibold text-text">{{ sectionProblem.title }}</span>
              <span
                class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0"
                :style="sectionProblem.difficulty === 'easy'
                  ? 'background:#dcfce7;color:#16a34a'
                  : sectionProblem.difficulty === 'medium'
                    ? 'background:#fef9c3;color:#ca8a04'
                    : 'background:#fee2e2;color:#dc2626'"
              >{{ sectionProblem.difficulty }}</span>
            </div>
            <!-- Description -->
            <p class="text-[14px] leading-relaxed text-text-dim" v-html="sectionProblem.description" />
            <!-- Examples -->
            <div v-if="sectionProblem.examples?.length" class="flex flex-col gap-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-text-muted">Examples</span>
              <div
                v-for="(ex, i) in sectionProblem.examples"
                :key="i"
                class="rounded-lg px-4 py-3 flex flex-col gap-1.5 text-[12.5px] font-mono bg-gray-50 border border-gray-100"
              >
                <div><span class="text-text-muted">Input: </span><span class="text-text">{{ ex.input }}</span></div>
                <div><span class="text-text-muted">Output: </span><span class="text-text">{{ ex.output }}</span></div>
                <div v-if="ex.explanation" class="font-sans text-[12px] text-text-muted mt-0.5">{{ ex.explanation }}</div>
              </div>
            </div>
            <!-- Constraints -->
            <div v-if="sectionProblem.constraints.length" class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold uppercase tracking-wider text-text-muted">Constraints</span>
              <ul class="flex flex-col gap-1">
                <li v-for="c in sectionProblem.constraints" :key="c" class="text-[13px] text-text-dim font-mono">{{ c }}</li>
              </ul>
            </div>
          </div>

          <!-- Editor + Console row -->
          <div class="flex gap-3 items-stretch">

            <!-- Dark editor card -->
            <div class="flex-1 min-w-0 rounded-xl overflow-hidden flex flex-col" style="background:#1e1e1e;box-shadow:0 4px 24px rgba(0,0,0,0.18)">
              <!-- Editor header bar -->
              <!-- Title bar with reset -->
              <div class="flex items-center justify-end px-4 py-2.5 shrink-0" style="border-bottom:1px solid rgba(255,255,255,0.06);background:#252526">
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
            </div>

            <!-- Console panel -->
            <div
              class="shrink-0 rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
              :style="consoleOpen ? 'width:300px;opacity:1' : 'width:0;opacity:0;pointer-events:none'"
              style="background:#1e1e1e;box-shadow:0 4px 24px rgba(0,0,0,0.18)"
            >
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
                <TestResults v-if="sectionProblem && testResults.length" :results="testResults" />
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
                <div v-else class="flex flex-col items-center justify-center h-full gap-3 py-12 px-6">
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

          </div>

        </div>

        <!-- 11. Key Insight -->
        <div v-if="selectedSection.content?.keyInsight" class="flex gap-4">
          <div class="w-1 rounded-full bg-accent shrink-0" />
          <div class="flex flex-col gap-2 py-1">
            <span class="text-[10px] font-semibold text-accent bg-accent/8 px-2 py-0.5 rounded-full w-fit">Key insight</span>
            <p class="text-base font-medium text-text leading-relaxed" v-html="selectedSection.content.keyInsight.heading" />
            <p class="text-sm text-text-dim leading-relaxed" v-html="selectedSection.content.keyInsight.body" />
          </div>
        </div>

        <!-- 12. Connections -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm border border-[#3a9ae8]/25">
          <div class="flex items-center gap-2">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Connections</h2>
            <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full">Graph</span>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Prerequisites</span>
              <div class="flex flex-wrap gap-2">
                <template v-if="selectedSection.content?.connections?.prereqs?.length">
                  <button v-for="p in selectedSection.content.connections.prereqs" :key="p" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-white transition-colors" @click="navigateToLabel(p)">← {{ p }}</button>
                </template>
                <template v-else>
                  <span v-for="i in 2" :key="i" class="text-xs text-text-muted bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 italic">← Prereq {{ i }}</span>
                </template>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Unlocks</span>
              <div class="flex flex-wrap gap-2">
                <template v-if="selectedSection.content?.connections?.unlocks?.length">
                  <button v-for="u in selectedSection.content.connections.unlocks" :key="u" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-white transition-colors" @click="navigateToLabel(u)">→ {{ u }}</button>
                </template>
                <template v-else>
                  <span v-for="i in 3" :key="i" class="text-xs text-text-muted bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 italic">→ Next concept {{ i }}</span>
                </template>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Related</span>
              <div class="flex flex-wrap gap-2">
                <template v-if="selectedSection.content?.connections?.related?.length">
                  <button v-for="r in selectedSection.content.connections.related" :key="r" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-white transition-colors" @click="navigateToLabel(r)">∼ {{ r }}</button>
                </template>
                <template v-else>
                  <span v-for="i in 3" :key="i" class="text-xs text-text-muted bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 italic">∼ Related {{ i }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- ── end generic skeleton ── -->

        </template>

        <!-- Disclaimer (optional per-section note) -->
        <div v-if="selectedSection.content?.disclaimer" class="px-1">
          <p class="text-sm text-text-muted leading-relaxed italic">{{ selectedSection.content.disclaimer }}</p>
        </div>

        <!-- Mark as completed -->
        <div class="flex justify-center pt-2">
          <button
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium border transition-colors"
            :class="completed.has(selectedSection.id)
              ? 'bg-black text-white border-black hover:bg-black/80'
              : 'bg-white text-text border-gray-200 hover:border-gray-400'"
            @click="toggleCompleted(selectedSection.id)"
          >
            <svg v-if="completed.has(selectedSection.id)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            {{ completed.has(selectedSection.id) ? 'Completed' : 'Mark as completed' }}
          </button>
        </div>

        <!-- Prev / Next navigation -->
        <div class="flex items-center justify-between pt-2 pb-6">
          <button
            v-if="prevSection"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="selectedSection = prevSection"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <div class="flex flex-col items-start">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Previous</span>
              <span class="font-medium">{{ prevSection.label }}</span>
            </div>
          </button>
          <div v-else />

          <button
            v-if="nextSection"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-sm text-text hover:border-gray-300 transition-colors group"
            @click="selectedSection = nextSection"
          >
            <div class="flex flex-col items-end">
              <span class="text-[10px] uppercase tracking-widest text-text-muted">Next</span>
              <span class="font-medium">{{ nextSection.label }}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-text transition-colors">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
          <div v-else />
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/vs2015.css'
hljs.registerLanguage('python', python)
import PatternVisualizer from '@/components/visualizers/PatternVisualizer.vue'
import ClusterMap from '@/components/learn-map/ClusterMap.vue'
import TopicSearch from '@/components/learn-map/TopicSearch.vue'
import ComplexityGraph from '@/components/ComplexityGraph.vue'
import CodeEditor from '@/components/sandbox/CodeEditor.vue'
import TestResults from '@/components/sandbox/TestResults.vue'
import { usePyodide } from '@/composables/usePyodide'
import { PROBLEMS, problemForConcept } from '@/data/problems'
import { CLUSTERS, clusterForSection } from '@/data/clusters'


const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(window.innerWidth >= 1024)
const openCategories = ref([])
const openClusters = ref([])
const selectedSection = ref(null)
const activeView = ref('intro')
const activeCluster = ref(null)
const searchOpen = ref(false)

const sortingTab = ref('intro')
const bfsDfsTab = ref('bfs')
const stacksQueuesTab = ref('stack')
const slidingWindowVisualTab = ref('fixed')

const consoleOpen = ref(false)
const sandboxCode = ref('# Write Python here...')
const sandboxOutput = ref(null)
const sandboxLoading = ref(false)
const testResults = ref([])

const sectionProblem = computed(() =>
  selectedSection.value ? problemForConcept(selectedSection.value.id) : null
)

const { runPython, runTests } = usePyodide()

function resetSandbox() {
  sandboxCode.value = sectionProblem.value ? sectionProblem.value.starterCode : '# Write Python here...'
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
    if (sectionProblem.value) {
      testResults.value = await runTests(
        sandboxCode.value,
        sectionProblem.value.functionName,
        sectionProblem.value.testCases,
        sectionProblem.value.runnerSetup,
      )
    } else {
      sandboxOutput.value = await runPython(sandboxCode.value)
    }
  } catch (e) {
    const msg = e.message ?? String(e)
    sandboxOutput.value = msg.includes('timed out')
      ? `Error: Execution timed out after 5s.\nCheck for infinite loops or very slow code.`
      : `Error: ${msg}`
  } finally {
    sandboxLoading.value = false
  }
}

const BFS_SIGNALS = [
  { cue: '"Shortest path" or "minimum steps"', why: 'BFS guarantees the shortest path in unweighted graphs — nodes are dequeued in order of increasing distance.' },
  { cue: '"Level by level" processing', why: 'BFS naturally processes all nodes at depth d before any at depth d+1. Track levels by snapshotting queue size at each iteration.' },
  { cue: '"Connected components" or "number of islands"', why: 'Start BFS from each unvisited node. Each call explores exactly one connected component.' },
  { cue: '"Closest" or "nearest" to multiple sources', why: 'Multi-source BFS: seed the queue with all source nodes at once. Distance spreads outward uniformly from every source simultaneously.' },
]

const DFS_SIGNALS = [
  { cue: '"Does a path exist?" or "can we reach X?"', why: 'DFS explores any path to completion before backtracking — finds a path if one exists, without caring about its length.' },
  { cue: '"All paths" or "all combinations"', why: 'DFS + backtracking visits every possible path in the decision tree — it\'s the engine behind exhaustive search.' },
  { cue: '"Detect a cycle"', why: 'In DFS, finding an edge back to an already-visited node in the current recursion stack signals a cycle.' },
  { cue: '"Topological sort" or "dependency order"', why: 'DFS postorder (append after all descendants are visited) + reverse gives a valid topological ordering.' },
]

const BFS_CODE = `from collections import deque

# BFS on a graph — visits level by level
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# BFS with distance tracking — shortest path
def bfs_distance(graph, start, target):
    visited = {start}
    queue = deque([(start, 0)])      # (node, distance)
    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1                        # unreachable

# Grid BFS (number of islands)
def num_islands(grid):
    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                count += 1
                queue = deque([(r, c)])
                grid[r][c] = '0'    # mark visited by sinking
                while queue:
                    row, col = queue.popleft()
                    for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                        nr, nc = row+dr, col+dc
                        if 0<=nr<len(grid) and 0<=nc<len(grid[0]) and grid[nr][nc]=='1':
                            grid[nr][nc] = '0'
                            queue.append((nr, nc))
    return count`

const DFS_CODE = `# DFS — recursive (graph, needs visited set)
def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# DFS — iterative (explicit stack, avoids recursion depth limits)
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)

# Tree traversal orders (no visited set needed — no cycles)
def preorder(root):     # root → left → right
    if not root: return
    print(root.val)
    preorder(root.left)
    preorder(root.right)

def inorder(root):      # left → root → right  (BST → sorted output)
    if not root: return
    inorder(root.left)
    print(root.val)
    inorder(root.right)

def postorder(root):    # left → right → root
    if not root: return
    postorder(root.left)
    postorder(root.right)
    print(root.val)`

const STACK_CODE = `# Stack — Python list (append/pop at the tail)
stack = []
stack.append(1)    # push  O(1)
stack.append(2)
stack.append(3)
top = stack[-1]    # peek without removing: 3
val = stack.pop()  # pop   O(1): removes and returns 3

# Classic use: balanced parentheses
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in '({[':
            stack.append(ch)
        elif not stack or stack[-1] != pairs[ch]:
            return False
        else:
            stack.pop()
    return not stack

# Classic use: monotonic stack (next greater element)
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []          # stores indices
    for i, n in enumerate(nums):
        while stack and nums[stack[-1]] < n:
            result[stack.pop()] = n
        stack.append(i)
    return result`

const QUEUE_CODE = `from collections import deque

# Queue — collections.deque (O(1) at both ends)
queue = deque()
queue.append(1)          # enqueue  O(1)
queue.append(2)
queue.append(3)
front = queue[0]         # peek front: 1
val = queue.popleft()    # dequeue  O(1): returns 1
print(queue)             # deque([2, 3])

# Never use list.pop(0) — shifts all elements, O(n)
# bad = [1, 2, 3]; bad.pop(0)  ← avoid

# Classic use: BFS level-order tree traversal
def level_order(root):
    if not root: return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):   # snapshot current level size
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`

const SORT_TABLE = [
  { name: 'Merge Sort',        avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',     stable: true,  inplace: false },
  { name: 'Quicksort',         avg: 'O(n log n)', worst: 'O(n²)',      space: 'O(log n)', stable: false, inplace: true  },
  { name: 'Insertion Sort',    avg: 'O(n²)',       worst: 'O(n²)',      space: 'O(1)',     stable: true,  inplace: true  },
  { name: 'Bubble Sort',       avg: 'O(n²)',       worst: 'O(n²)',      space: 'O(1)',     stable: true,  inplace: true  },
  { name: 'Bucket Sort',       avg: 'O(n + k)',    worst: 'O(n²)',      space: 'O(n+k)',   stable: true,  inplace: false },
  { name: 'Timsort (built-in)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',    stable: true,  inplace: false },
]

const SORT_TIPS = [
  { code: 'sorted(arr, reverse=True)',                      note: 'Descending order' },
  { code: 'sorted(arr, key=lambda x: x[1])',                note: 'Sort by second element of each tuple' },
  { code: 'sorted(arr, key=len)',                           note: 'Sort strings by length' },
  { code: 'sorted(arr, key=lambda x: (x.grade, x.name))',  note: 'Multi-key sort — grade first, name as tiebreaker' },
]

const SORT_STEPS = {
  merge: [
    { title: 'Divide',   desc: 'Split the array at the midpoint into two halves. This takes O(1).' },
    { title: 'Conquer',  desc: 'Recursively call merge_sort on each half. The recursion bottoms out at arrays of length 1 — a single element is always sorted.' },
    { title: 'Merge',    desc: 'Combine the two sorted halves into one sorted array. Walk two pointers across the halves, always picking the smaller front element. This step is O(n).' },
    { title: 'Return',   desc: 'The merged result propagates back up the call stack until the full array is sorted.' },
  ],
  bubble: [
    { title: 'Outer loop',      desc: 'Runs n times. Each iteration represents one full pass through the unsorted portion of the array.' },
    { title: 'Inner loop',      desc: 'Walks from index 0 to n - i - 1. The last i elements are already in their final positions, so we skip them.' },
    { title: 'Compare and swap', desc: 'If arr[j] > arr[j+1], swap them. This pushes the larger element one step to the right.' },
    { title: 'Early exit',      desc: 'Track whether any swap occurred. If a full pass makes zero swaps, the array is already sorted — exit early. This gives O(n) best case on already-sorted input.' },
  ],
  insertion: [
    { title: 'Pick up the key', desc: 'Starting from index 1, take the current element (the key). Everything to its left is already sorted.' },
    { title: 'Find the gap',    desc: 'Walk left through the sorted portion, shifting each element one position right if it is larger than the key.' },
    { title: 'Place the key',   desc: 'When you find an element smaller than or equal to the key (or reach the start), drop the key into the vacated slot. The sorted prefix is now one element longer.' },
    { title: 'Repeat',          desc: 'Move to the next element and repeat. After n-1 passes, every element has been inserted into its correct position.' },
  ],
  bucket: [
    { title: 'Find range',      desc: 'Compute the min and max of the array to determine the full value range.' },
    { title: 'Distribute',      desc: 'Map each element to a bucket index based on its position in the value range. Elements with similar values end up in the same bucket.' },
    { title: 'Sort each bucket', desc: 'Sort the contents of each bucket. Because buckets are small (on average n/k elements), insertion sort is fast here.' },
    { title: 'Concatenate',     desc: 'Collect all buckets in order from first to last. The result is a fully sorted array.' },
  ],
  quicksort: [
    { title: 'Choose a pivot', desc: 'Select one element as the pivot. Common choices: last element, first element, or a random element. Random pivot avoids worst-case behavior on sorted or reverse-sorted input.' },
    { title: 'Partition',      desc: 'Rearrange elements so everything smaller than or equal to the pivot is to its left, everything larger is to its right. The pivot is now in its final sorted position. This step is O(n).' },
    { title: 'Recurse left',   desc: 'Apply quicksort to the subarray to the left of the pivot.' },
    { title: 'Recurse right',  desc: 'Apply quicksort to the subarray to the right of the pivot. No merge step needed — the pivot is already placed.' },
  ],
}

const SORT_CODE = {
  merge: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:         # <= preserves stability
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,

  bubble: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break               # already sorted — O(n) best case
    return arr`,

  insertion: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]         # shift larger elements right
            j -= 1
        arr[j + 1] = key                # place key in correct position
    return arr`,

  bucket: `def bucket_sort(arr):
    if not arr:
        return arr
    min_val, max_val = min(arr), max(arr)
    n = len(arr)
    buckets = [[] for _ in range(n)]

    for num in arr:
        ratio = (num - min_val) / (max_val - min_val + 1)
        idx   = int(ratio * n)
        buckets[idx].append(num)

    result = []
    for bucket in buckets:
        result.extend(sorted(bucket))   # insertion sort is fast for small buckets
    return result`,

  quicksort: `def quicksort(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo < hi:
        p = partition(arr, lo, hi)
        quicksort(arr, lo, p - 1)
        quicksort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]             # last element as pivot
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    return i + 1`,
}

const sectionVisualizer = {
  'two-pointers':        'two-pointers',
  'sliding-window':      'sliding-window',
  'binary-search':       'binary-search',
  'fast-slow':           'fast-slow',
  'dynamic-programming': 'dynamic-programming',
  'monotonic-stack':     'monotonic-stack',
  'trees':               'bst-search',
  'heaps':               'heap-extract',
  'arrays':              'array-access',
  'python-lists':        'python-list',
  'strings':             'array-access',
  'linked-lists':        'linked-list-insert',
  'stacks-queues':       'stack-queue',
  'hash-maps':           'hash-map',
  'graphs':              'graph-bfs',
  'recursion':           'recursion-tree',
  'greedy':              'greedy-coins',
  'backtracking':        'backtracking-tree',
  'merge-intervals':     'merge-intervals',
  'bfs-dfs':             ['bfs-dfs', 'dfs'],
  'topological-sort':    'topo-sort',
  'union-find':          'union-find',
}

const completed = ref(new Set())

function toggleCompleted(id) {
  const next = new Set(completed.value)
  next.has(id) ? next.delete(id) : next.add(id)
  completed.value = next
}

function isCatCompleted(cat) {
  return cat.subsections.length > 0 && cat.subsections.every(s => completed.value.has(s.id))
}

const catHoverBg = {
  'data-structures': 'hover:bg-blue-100',
  'algorithms':      'hover:bg-green-100',
  'patterns':        'hover:bg-pink-100',
  'the-connection':  'hover:bg-yellow-100',
}

const catActiveBg = {
  'data-structures': 'bg-blue-100',
  'algorithms':      'bg-green-100',
  'patterns':        'bg-pink-100',
  'the-connection':  'bg-yellow-100',
}

const careerResumeTips = [
  { title: 'ATS keywords', body: 'Most large companies run resumes through an applicant tracking system before a human sees them. Mirror the exact language from the job description — "React" not "ReactJS," "REST API" not "RESTful services" if that is what they wrote.' },
  { title: 'GitHub link', body: 'Put it in the header next to your email. Recruiters do click. Make sure your pinned repos are your best work and that every project has a README that explains what it does and how to run it.' },
  { title: 'Skills section', body: 'List languages, frameworks, and tools you can actually talk about in depth. Being grilled on something you listed but barely touched is one of the most avoidable interview mistakes.' },
  { title: 'GPA', body: 'Include it if it is above 3.5 and you have under 2 years of experience. Drop it otherwise — experience and projects carry more weight.' },
]

const careerStarFramework = [
  { letter: 'S', name: 'Situation', desc: '1–2 sentences. Set the scene. Where were you, what was the context, what was at stake?' },
  { letter: 'T', name: 'Task', desc: '1 sentence. What specifically were you responsible for?' },
  { letter: 'A', name: 'Action', desc: 'The bulk of your answer. What did you do, step by step? Use "I," not "we" — the interviewer is evaluating you.' },
  { letter: 'R', name: 'Result', desc: 'Non-negotiable. What happened? Quantify if possible. If not, describe scope or impact.' },
]

const careerBehavioralQuestions = [
  { question: 'Tell me about yourself.', hint: 'This is your pitch, not your life story. 60–90 seconds: where you are, what you have done, and why this role. Practice it until it sounds natural, not rehearsed.' },
  { question: 'Tell me about a challenge you faced.', hint: 'Pick a real technical or interpersonal challenge where your actions made a material difference. Avoid anything where "the challenge" was someone else\'s fault or where you had no agency.' },
  { question: 'Tell me about a time you disagreed with someone.', hint: 'Interviewers want to see you disagree respectfully, make your case with data, and either change your mind or accept the team\'s decision gracefully. Avoid stories where you just capitulated.' },
  { question: 'Tell me about a project you are proud of.', hint: 'Describe the problem, your specific contribution, and why the result matters. Bonus if you can articulate what you would do differently — it shows self-awareness.' },
  { question: 'Why do you want to work here?', hint: 'This is not the place to say "I love the culture." Name something specific about the company\'s product, technical stack, or mission that connects to something real about what you want to work on.' },
]

const careerBehavioralTraps = [
  'Saying "we" throughout — the interviewer cannot evaluate what "we" did. Say "I."',
  'No result. Every answer needs a measurable or observable outcome. "The team felt better about the process" is not a result.',
  'Blaming others. Even if someone else caused the problem, your answer should center your response to it.',
  'Answering a different question. Listen for the specific type — challenge, conflict, failure, success. Give them what they asked for.',
  'Too long. Behavioral answers should take 90–120 seconds, not 4 minutes. Practice trimming.',
]

const careerSysDesignStages = [
  { title: 'Networking basics', desc: 'TCP vs UDP, DNS, HTTP/HTTPS, latency vs throughput. If you cannot explain what happens when you type a URL, start here.' },
  { title: 'Storage primitives', desc: 'SQL vs NoSQL, indexes, replication, sharding, CAP theorem. Understanding storage constraints drives most architectural decisions.' },
  { title: 'Scalability patterns', desc: 'Load balancing, caching (CDN, Redis), message queues, horizontal vs vertical scaling. These are the levers you pull in an interview.' },
  { title: 'Case studies', desc: 'Design URL shortener, rate limiter, key-value store, feed system. Only after steps 1–3 — otherwise you are memorizing without understanding.' },
]

const careerSysDesignResources = [
  {
    topic: 'Start here',
    items: [
      { name: 'System Design Primer (GitHub)', note: 'The best free overview. Read the intro sections before anything else.' },
      { name: 'ByteByteGo newsletter', note: 'Alex Xu\'s weekly breakdowns are concise and visual. Free tier is enough.' },
    ],
  },
  {
    topic: 'Go deeper',
    items: [
      { name: 'Designing Data-Intensive Applications (Kleppmann)', note: 'The definitive book on storage and distributed systems. Dense but worth it. Read chapters 1, 3, 5, 7 minimum.' },
      { name: 'High Scalability blog', note: 'Real architecture teardowns of production systems. Good for seeing how the patterns play out at scale.' },
    ],
  },
  {
    topic: 'Practice',
    items: [
      { name: 'Exponent system design course', note: 'Mock interview videos with feedback. Useful for seeing what "good" looks like in real time.' },
      { name: 'System Design Fight Club (YouTube)', note: 'Short, opinionated comparisons. Good for cementing tradeoffs.' },
    ],
  },
]

const careerSysDesignInterview = [
  { title: 'Clarify requirements', desc: 'Ask about scale (users, requests/sec), read/write ratio, and consistency requirements before drawing anything. Most candidates skip this and design the wrong system.' },
  { title: 'Estimate scale', desc: 'Back-of-the-envelope math. 10M users × 100 requests/day = ~10k RPS. This tells you whether a single database can handle it or whether you need sharding.' },
  { title: 'High-level design', desc: 'Draw the main components: clients, load balancers, services, databases, caches. Get agreement before going deep on any one piece.' },
  { title: 'Deep dive', desc: 'The interviewer will steer you. Usually storage schema, a specific bottleneck, or a consistency/availability tradeoff. This is where you show depth.' },
  { title: 'Tradeoffs', desc: 'Proactively name what your design does not do well. SQL gives consistency but is harder to shard. Eventual consistency scales better but complicates client logic. Naming these unprompted is what separates strong candidates.' },
]



const flatSections = computed(() => {
  const allSections = categories.flatMap(cat =>
    cat.subsections.map(sub => ({ ...sub, category: cat.label, categoryId: cat.id }))
  )
  const sectionMap = new Map(allSections.map(s => [s.id, s]))
  const clusteredIds = new Set(CLUSTERS.flatMap(c => c.concepts.map(concept => concept.id)))

  const dsIntro = sectionMap.get('ds-intro')
  const clusterSections = CLUSTERS
    .flatMap(c => c.concepts.map(concept => sectionMap.get(concept.id)))
    .filter(Boolean)
  const unclustered = allSections.filter(s =>
    !clusteredIds.has(s.id) &&
    s.id !== 'ds-intro' &&
    s.categoryId !== 'the-connection'
  )
  const connectionSections = allSections.filter(s => s.categoryId === 'the-connection')

  return [
    ...(dsIntro ? [dsIntro] : []),
    ...clusterSections,
    ...unclustered,
    ...connectionSections,
  ]
})

const currentIndex = computed(() =>
  selectedSection.value ? flatSections.value.findIndex(s => s.id === selectedSection.value.id) : -1
)

const prevSection = computed(() =>
  currentIndex.value > 0 ? flatSections.value[currentIndex.value - 1] : null
)

const nextSection = computed(() =>
  currentIndex.value !== -1 && currentIndex.value < flatSections.value.length - 1
    ? flatSections.value[currentIndex.value + 1]
    : null
)

watch(selectedSection, (section) => {
  router.replace({ query: section ? { section: section.id } : {} })
  consoleOpen.value = false
  testResults.value = []
  sandboxOutput.value = null
  const problem = section ? problemForConcept(section.id) : null
  sandboxCode.value = problem ? problem.starterCode : '# Write Python here...'
})

onMounted(() => {
  const id = route.query.section
  if (id) {
    const found = flatSections.value.find(s => s.id === id)
    if (found) {
      selectedSection.value = found
      activeView.value = 'section'
    }
  }
  const cluster = route.query.cluster
  if (cluster) {
    activeCluster.value = cluster
    activeView.value = 'map'
  }
  window.addEventListener('keydown', globalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', globalKeydown)
})

function globalKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
}

function toggleCluster(id) {
  const idx = openClusters.value.indexOf(id)
  if (idx >= 0) openClusters.value.splice(idx, 1)
  else openClusters.value.push(id)
}

function selectCluster(id) {
  activeCluster.value = id
  activeView.value = 'map'
  if (!openClusters.value.includes(id)) openClusters.value.push(id)
  router.replace({ query: { cluster: id } })
}

function navigateToId(id) {
  if (id === '__map')         { activeView.value = 'map'; activeCluster.value = null; router.replace({ query: {} }); return }
  if (id === '__intro')       { activeView.value = 'intro'; selectedSection.value = null; router.replace({ query: {} }); return }
  if (id === '__guide')       { activeView.value = 'guide'; selectedSection.value = null; router.replace({ query: {} }); return }
  if (id === '__complexity')  { activeView.value = 'complexity'; selectedSection.value = null; router.replace({ query: {} }); return }

  const found = flatSections.value.find(s => s.id === id)
  if (found) {
    selectedSection.value = found
    activeView.value = 'section'
    // Open the cluster that owns this concept in the sidebar
    const owningCluster = clusterForSection(id)
    if (owningCluster && !openClusters.value.includes(owningCluster.id)) {
      openClusters.value.push(owningCluster.id)
    }
  } else {
    // Section not yet built — still navigate so the cluster is visible
    selectedSection.value = { id, label: id, category: '', categoryId: '', content: null }
    activeView.value = 'section'
  }
}

const whyPoints = [
  'Knowing a concept exists is different from knowing when and why to reach for it.',
  'Interviews test pattern recognition, not just syntax. Static content trains that recognition.',
  'Gaps in fundamentals compound — a weak understanding of trees will haunt you in graphs, heaps, and DP.',
  'That said, reading about riding a bike and riding one are different things. Use this as a foundation — then get in the fire. Read through once and then refer to when needed.',
]

const analogyCards = [
  {
    label: 'Data Structures',
    analogy: 'Materials',
    description: 'Arrays, trees, graphs — the raw materials your solution is built from. You need to know their properties.',
  },
  {
    label: 'Algorithms',
    analogy: 'Tools',
    description: 'Sorting, searching, traversal — the processes you apply to manipulate your materials efficiently.',
  },
  {
    label: 'Patterns',
    analogy: 'Blueprints',
    description: 'Two pointers, sliding window, BFS — reusable strategies that tell you how to combine tools and materials.',
  },
]

const interviewSteps = [
  {
    num: '1',
    label: 'Digest the problem',
    description: 'Read carefully and restate the objective in your own words. Clarify ambiguities. Define what the inputs and outputs actually are before touching code.',
  },
  {
    num: '2',
    label: 'Think aloud',
    description: "Verbalize your reasoning as you go. These interviews aren't just about getting the right answer — they're about showing you can communicate and would make a good teammate. A wrong answer explained clearly beats a correct answer pulled out silently.",
  },
  {
    num: '3',
    label: 'Start with brute force',
    description: "Find something that works before you optimize. A naive O(n²) solution you can explain is better than an optimal one you can't finish. State the complexity, then talk through where it breaks down and why.",
  },
]

const patternHints = [
  { phrase: '"First greater or smaller element"', pattern: 'Monotonic Stack' },
  { phrase: '"Find all possible combinations"', pattern: 'Backtracking' },
  { phrase: '"Top K elements"', pattern: 'Heap / Priority Queue' },
  { phrase: '"Subarray sum or condition"', pattern: 'Sliding Window' },
  { phrase: '"Sorted array, find target"', pattern: 'Binary Search' },
  { phrase: '"Shortest path / connected components"', pattern: 'BFS / DFS' },
]

// Guide to Learning data
const abstractionPoints = [
  'The right abstraction lets you reason quickly — a mental model you can run simulations on without looking anything up.',
  'Over-abstracting loses the precision you need during implementation. Under-abstracting is just memorization in disguise.',
  'The static content in routined is written at exactly that middle ground: conceptual precision without low ROI details.',
]

const prereqChains = [
  { topic: 'Arrays', unlocks: 'Foundation for nearly everything — two pointers, sliding window, and binary search all live here.' },
  { topic: 'Hash Maps', unlocks: 'O(1) lookup patterns, frequency counting, and memoization all depend on this being second nature.' },
  { topic: 'Trees', unlocks: 'Graphs, heaps, and a large share of dynamic programming problems require solid tree intuition first.' },
  { topic: 'Recursion', unlocks: 'Backtracking, divide & conquer, and all tree/graph traversal are recursive at their core.' },
]

const cogSciPrinciples = [
  {
    name: 'Active Recall',
    researcher: 'Jeffrey Karpicke',
    credential: 'Cognitive Psychologist, Purdue',
    image: 'Karpicke.jpg',
    science: 'Retrieving information from memory strengthens retention far more than re-reading. Testing yourself is a learning act, not just an assessment.',
    inRoutined: 'In routined: every problem you work through is an active recall event — you generate the answer, not consume it.',
  },
  {
    name: 'The Generation Effect',
    researcher: 'Peter Graf',
    credential: 'Psychologist, UBC',
    image: 'graf.png',
    science: 'Information you produce yourself is retained better than information you passively read. Struggling before seeing an answer is a feature, not a bug.',
    inRoutined: 'In routined: the Socratic approach never hands you the answer — it guides you to generate the insight yourself.',
  },
  {
    name: 'Spaced Repetition',
    researcher: 'Hermann Ebbinghaus',
    credential: 'Psychologist, 1885',
    image: 'ebbinghaus.webp',
    science: 'Reviewing material at the edge of forgetting dramatically outperforms cramming. Gradually increasing intervals lock things into long-term memory.',
    inRoutined: 'In routined: pattern tagging lets you revisit specific techniques at the right intervals rather than randomly.',
  },
  {
    name: 'Interleaving',
    researcher: 'Robert Bjork',
    credential: 'Cognitive Psychologist, UCLA',
    image: 'bjork.jpg',
    science: 'Mixing different problem types during practice improves the ability to transfer knowledge to new problems — far more than blocked repetition of one type.',
    inRoutined: 'In routined: the curriculum deliberately mixes patterns so recognition builds across contexts, not just within one.',
  },
]

const routinedFeatures = [
  {
    label: 'Socratic problem guidance',
    description: 'Rather than showing solutions, routined asks questions that lead you to the insight. This triggers the generation effect and builds intuition you actually own.',
  },
  {
    label: 'Structured mental model for every problem',
    description: 'Before any code is written, you will be guided to build the mental models that narrow down which solutions could possibly work. When under pressure- like in an interview, you will fall back to your preparation. So we have structured that preparation around narrowing your problem space.',
  },
  {
    label: 'Pattern-first organization',
    description: 'Problems are tagged and grouped by pattern so you build a complete mental model of each technique before moving on, rather than scattering across topics at random.',
  },
  {
    label: 'Static content as scaffolding',
    description: "The reference material is written at the right level of abstraction — precise enough to reason from, clean enough to remember. It's there to fill gaps, not to replace doing the work.",
  },
]

const whatWhyHow = [
  {
    num: '1',
    label: 'What',
    description: 'A clear definition. What exactly is this thing? No vague hand-waving — a precise mental model. One glanced over concept is abstraction, this content will try to cover all levels.',
  },
  {
    num: '2',
    label: 'Why',
    description: 'The motivation. Why does this exist? What problem does it solve that simpler approaches can\'t?',
  },
  {
    num: '3',
    label: 'How',
    description: 'The mechanics. How do you actually implement or apply it? Code, complexity, and common variations.',
  },
]

const categories = [
  {
    id: 'data-structures',
    label: 'Data Structures',
    subsections: [
      { id: 'ds-intro', label: 'Intro to Data Structures' },
      {
        id: 'linear-intro',
        label: 'Intro to Linear DSA',
        content: {
          what: `The <strong>Linear cluster</strong> is built on one primitive: linear data structures, also known as a sequencing of elements stored at consecutive positions. Because each position is numbered, you can reach any one in <strong>O(1)</strong> — no traversal, just addition. Everything in this cluster is a technique for exploiting that property.`,
          why: `Two pointers are just two indices moving through the same line under different rules. A sliding window is a range of consecutive indices that shifts. Prefix sums pre-compute cumulative totals so any range query becomes a single subtraction. Monotonic stacks maintain a useful ordering within that line. None of these are isolated tricks — they're all different ways of working a numbered sequence. Once you see the array as the foundation, the techniques follow naturally.`,
          isClusterIntro: true,
          how: `Start by identifying the index structure. Most linear problems reduce to: (1) a single index sweeping left to right, (2) two indices converging from opposite ends, or (3) a sliding window of fixed or variable width moving rightward. When you see an O(n²) brute force that checks every pair, ask whether a second pointer or a precomputed prefix sum can collapse the inner loop. The answer is almost always yes.`,
          keyProperties: [
            'O(1) random access is the foundation — it enables the two-pointer collapse',
            'Adjacent elements are adjacent in memory — CPU cache-friendly, fast in practice',
            'A sliding window is just a range [left, right] with rules for when each pointer moves',
            'Prefix sums turn range-sum queries from O(n) per query into O(1) after O(n) preprocessing',
            'Monotonic stacks maintain a useful ordering to answer "next greater element" in O(n) total',
          ],
          complexity: { time: 'O(n) for most techniques', space: 'O(1) to O(n) depending on technique' },
          useCases: [
            'Finding pairs or triplets that satisfy a condition in a sorted array (Two Pointers)',
            'Tracking the best contiguous subarray matching a constraint (Sliding Window)',
            'Answering range-sum queries in O(1) after O(n) preprocessing (Prefix Sums)',
            'Finding the next greater or smaller element for each position (Monotonic Stack)',
            'Stack-based problems: valid parentheses, expression evaluation (Stacks & Queues)',
          ],
          connections: {
            prereqs: ['Intro to Data Structures'],
            unlocks: ['Arrays', 'Strings', 'Two Pointers', 'Sliding Window', 'Prefix Sums', 'Stacks & Queues', 'Monotonic Stack'],
            related: ['Intro to Linked', 'Intro to Sorted Search'],
          },
        },
      },
      {
        id: 'arrays',
        label: 'Arrays',
        content: {
          analogy: `Think of an array like a row of numbered mailboxes in an apartment building. Every box has a fixed address, they\'re all lined up next to each other, 
          and you can walk straight to box #7 without checking any of the others first. You can\'t squeeze a new box between two existing ones without moving everything down.
           Similarly, you can add data to the end of the array(computers know the length) in constant time, we can find a piece of data if we know it's postion in the array(indexing) in constant time
           , but if we have to search for an item or add an item not in the last position of the array... we would have to, at worst case, move or search every item.`,
          what: 'An array is a <strong>fixed-size</strong>, ordered collection of elements stored in <strong>contiguous</strong> (back-to-back) memory locations, where every element is the same type and size. Because the layout is uniform, the CPU can calculate the address of any element directly: <strong>base_address + (index × element_size)</strong>. No searching, no traversal — just arithmetic. This makes index-based access <strong>O(1)</strong> and is the defining property that all other data structures are measured against.',
          why: 'When you need instant access to any element by position, nothing beats an array. Because elements sit side by side in memory, the CPU can jump directly to any index in <strong>constant time</strong> — no searching required.',
          how: `In other languages, you may have to declare a block of memory large enough to hold N elements of the same type. However, in python we do not have to declare types or sizes, that
          is handled by the interpreter and garbage collection. Element at index i lives at address: base_address + (i × element_size). Reads are <strong>O(1)</strong>. Insertions and deletions in the middle require shifting all subsequent elements — <strong>O(n)</strong>.`,
          memory: {
            overview: 'Arrays are the simplest possible memory layout: one <strong>contiguous</strong> block, elements packed tightly together. This is exactly what makes them fast for reads and slow for structural changes.',
            layout: 'Contiguous block — all elements sit back-to-back at sequential memory addresses.',
            implication: 'Index access is <strong>O(1)</strong> because the address of any element is calculable. Insertion/deletion in the middle is <strong>O(n)</strong> because elements must shift to fill or create gaps.',
          },
          complexity: {
            access: 'O(1)',
            search: 'O(n)',
            insert: 'O(n)',
            delete: 'O(n)',
          },
          pros: [
            'O(1) random access by index — the fastest possible read.',
            'Cache-friendly — contiguous layout means the CPU prefetches nearby elements automatically.',
            'Simple and predictable — low overhead, no extra pointers or metadata.',
          ],
          cons: [
            'Fixed size in many languages — resizing requires allocating a new block and copying everything.',
            'O(n) insertion/deletion in the middle — every element after the target must shift.',
            'Wastes memory if allocated large but sparsely used.',
          ],
          keyProperties: [
            'Zero-indexed — the first element is at index 0, the last at index n-1.',
            'Homogeneous — all elements are the same type (and therefore the same size in memory).',
            'Random access in O(1) — any element reachable directly by its index.',
            'Dynamic arrays (like Python lists or JS arrays) resize automatically, amortizing the copy cost to O(1) average for appends.',
          ],
          useCases: [
            'Storing ordered sequences where you\'ll frequently access elements by index (leaderboards, grids, buffers).',
            'Sliding window and two-pointer problems — both techniques rely on fast index access.',
            'Building blocks for other structures: heaps use arrays internally, hash tables use arrays of buckets.',
          ],
          code: `# Python
nums = [1, 2, 3, 4, 5]

# O(1) access
print(nums[2])          # 3

# O(n) insert at index
nums.insert(2, 99)      # [1, 2, 99, 3, 4, 5]

# O(1) amortized append
nums.append(6)

# O(n) search
print(3 in nums)        # True`,
          keyInsight: {
            heading: 'Index access is O(1) — the CPU calculates the address directly. But insert or delete in the middle is O(n), because every element after the target has to shift.',
            body: 'An array is a contiguous block of memory. Finding the element at index i costs one multiply and one add — no search involved. The tradeoff: inserting or deleting anywhere except the end means shifting every subsequent element. Append is <strong>O(1) amortized</strong> — Python over-allocates capacity and only resizes occasionally, spreading the cost across many appends. When a problem says "by index" or "contiguous subarray," you are working with an array.',
          },
          connections: {
            prereqs: ['Intro to Data Structures'],
            unlocks: ['Two Pointers', 'Sliding Window', 'Binary Search', 'Sorting'],
            related: ['Linked Lists', 'Hash Maps & Sets', 'Stacks & Queues'],
          },
          fixedVsDynamic: {
            fixed: 'A <strong>fixed-size</strong> array is allocated once with a size <strong>declared once</strong> that cannot change. The operating system reserves exactly N slots of memory upfront — no more, no less. If you need an 11th element in a size-10 array, you cannot have it. This rigidity is the tradeoff for absolute predictability: the compiler knows exactly how much space is needed, and the memory layout never changes.',
            dynamic: 'A dynamic array starts with an initial <strong>capacity</strong> and <strong>grows automatically</strong> when it fills up. When you add an element past the current capacity, the array allocates a new block — typically double the current size — copies all existing elements into it, and frees the old block. From the outside it looks like the array just grew. On the inside, a full copy just happened.',
            amortized: 'If doubling triggers an <strong>O(n)</strong> copy, how can append still be called O(1)? Amortized analysis looks at the total cost spread across many operations. Doublings happen at sizes 1, 2, 4, 8, 16... — the copy work at each step is 1, 2, 4, 8, 16... Summed over n appends, the total copy work is at most 2n. Divide that across n operations and the average (<strong>amortized O(1)</strong>) cost per append is O(1). Most appends are instant; the occasional expensive copy is paid for by the cheap appends that preceded it.',
            pythonNote: "Python's list is a dynamic array. It starts small, and CPython uses a growth factor slightly above 1.125× (not 2×) when resizing, tuned for practical workloads. You never manage this yourself — but knowing it exists explains why append is fast on average and why pre-allocating with [None] * n is faster when you already know the size.",
          },
          disclaimer: `A note on Python: Python does not have a built-in array type in the traditional sense. What you will actually use day-to-day is a list — Python's default sequence type. The concepts above (indexing, contiguous memory, O(1) access) are the foundational ideas that explain how lists work under the hood and why they behave the way they do. The next topic covers exactly how Python lists differ and why that distinction matters.`,
        },
      },
      {
        id: 'python-lists',
        label: 'Lists (Python)',
        content: {
          analogy: 'Think of a traditional array like a row of fixed-size lockers in a school hallway — every locker is the same size, reserved in advance, and numbered from zero. A Python list is more like a storage unit that can hold anything, grows on demand, and does not care what size or type you put inside. Same idea on the surface, very different under the hood.',
          what: 'In most languages, an "array" means a fixed-size, contiguous block of memory where every element is the same type. Python\'s list is not that. A Python list is a <strong>dynamic array</strong> of <strong>object references</strong> — it stores <strong>pointers</strong> to objects, not the objects themselves. This means a single list can hold integers, strings, and other lists at the same time, and it <strong>resizes automatically</strong> when you need more space.',
          why: 'Python is a <strong>dynamically typed</strong> language — variables have no declared type, and neither do list slots. Storing raw values of different sizes in a contiguous block is not possible without knowing the type upfront. Instead, Python lists store <strong>references (pointers)</strong> to objects that live elsewhere in memory. Every item takes the same space in the list (one pointer), regardless of what it actually is. This uniformity is what makes Python lists flexible while still allowing index-based access.',
          how: 'You use a Python list exactly like you would use an array in another language — index with [], slice with [:], loop with for. Appending is <strong>amortized O(1)</strong> because Python over-allocates <strong>capacity</strong> and only reallocates when the buffer fills. Under the hood, CPython implements list as a C array of <strong>PyObject pointers</strong> with a length and a capacity field.',
          memory: {
            overview: 'A Python list stores a contiguous C array of <strong>pointers</strong>. Each <strong>pointer</strong> is 8 bytes (on 64-bit systems) and points to a <strong>PyObject</strong> somewhere else in heap memory.',
            layout: 'Contiguous array of <strong>8-byte pointers</strong> → each points to a PyObject on the heap. The list also stores ob_size (current length) and allocated (reserved capacity).',
            implication: 'Index access is <strong>O(1)</strong> — it is just pointer arithmetic. However, each element has extra overhead (reference count, type info) compared to a raw C int array. numpy arrays avoid this by storing raw values, which is why they are faster for numerical work.',
          },
          complexity: { access: 'O(1)', search: 'O(n)', insert: 'O(1) amortized append / O(n) middle', delete: 'O(1) pop end / O(n) middle' },
          pros: [
            'Holds any mix of types — no type declaration needed',
            'Resizes automatically — no manual memory management',
            'Full array-like index and slice access in O(1) / O(k)',
          ],
          cons: [
            'More memory per element than a typed array — pointer + PyObject overhead',
            'Not cache-efficient for numerical work — values are scattered in heap memory',
            'For math-heavy code, numpy arrays are significantly faster because they store raw values contiguously',
          ],
          keyProperties: [
            'Python list ≠ traditional array — it is a dynamic array of object references',
            'Append is amortized O(1) — CPython over-allocates to avoid frequent resizing',
            'list.insert(i, x) and list.pop(i) at arbitrary positions are O(n) due to shifting',
            'For typed numerical arrays: use array.array or numpy.ndarray instead',
          ],
          useCases: [
            'Default general-purpose sequence in Python — use it whenever you need an ordered, mutable collection',
            'Stack (append/pop from end), not recommended as a queue (pop(0) is O(n) — use deque)',
            'When you need mixed types or do not know the size upfront',
            'Numerical work at scale → prefer numpy array for speed and memory efficiency',
          ],
          code: `# Python list — dynamic, mixed types, auto-resizing
nums = [1, 2, 3]
nums.append(4)          # O(1) amortized
nums.insert(1, 99)      # O(n) — shifts everything right
nums.pop()              # O(1) — removes last
nums.pop(0)             # O(n) — removes first, shifts all

# Mixed types work fine
mixed = [1, 'hello', True, [1, 2]]

# Slicing returns a new list
sub = nums[1:3]         # O(k) where k = slice length

# Under the hood comparison:
# C array:     [1][2][3]  — raw int values, 4 bytes each
# Python list: [*][*][*]  — 8-byte pointers to int objects on heap

# For numerical work, prefer numpy:
# import numpy as np
# arr = np.array([1, 2, 3])  # raw C ints, cache-friendly`,
          keyInsight: {
            heading: "Python's list is a dynamic array — <strong>append is O(1) amortized</strong>, but pop(0) is O(n).",
            body: 'The list over-allocates capacity and resizes (~12.5×) when full, making append amortized O(1). insert(i, x) shifts all elements right — O(n). pop() from the end is O(1); pop(0) shifts every element left — O(n). Use <strong>collections.deque</strong> for fast removal from both ends. In interviews, list is your array — you almost never need anything else.',
          },
          connections: {
            prereqs: ['Arrays', 'Intro to Data Structures'],
            unlocks: ['Linked Lists', 'Stacks & Queues'],
            related: ['Arrays', 'Linked Lists', 'Stacks & Queues'],
          },
        },
      },
      {
        id: 'strings',
        label: 'Strings',
        content: {
          madeSimple: {
            visualString: 'hello',
            body: 'A string is a sequence of characters in a fixed order. Python assigns each character a position number starting at 0 — <strong>s[0]</strong> is the first character, <strong>s[1]</strong> is the second, and so on. You can also count from the end using negative indices: <strong>s[-1]</strong> is always the last character, <strong>s[-2]</strong> is second to last. The critical rule: strings are <strong>immutable</strong>. You can read any character, but you cannot change one in place — every apparent modification returns a brand new string.',
            steps: [
              { expr: "s[1]",       result: "'e'",     note: 'index from the left — 0 is first',                   isError: false },
              { expr: "s[-1]",      result: "'o'",     note: 'negative index — -1 is always last',                 isError: false },
              { expr: "s[1:4]",     result: "'ell'",   note: 'slice: start at 1, stop before 4',                  isError: false },
              { expr: "s[::-1]",    result: "'olleh'", note: 'reverse: step -1 walks backward through every char', isError: false },
              { expr: "s[0] = 'H'", result: 'TypeError', note: 'immutable — you cannot assign to a position',     isError: true  },
            ],
          },
          what: 'A string is an <strong>immutable</strong> sequence of characters stored in contiguous memory, indexed from 0. In Python there is no separate character type — a single character is just a length-1 string. Strings are <strong>hashable</strong> because they are immutable, which means they can serve as dictionary keys. Every operation that appears to "modify" a string — concatenation, replace, slice — actually creates a new string and leaves the original untouched.',
          why: 'Immutability has a cost and a payoff. The cost: you cannot edit in place, so naive string building inside a loop is <strong>O(n²)</strong>. The payoff: strings can be used as hash map keys, shared between threads without locks, and cached by the interpreter. Knowing the immutability rule tells you when to reach for <code>\'\'<strong>.join()</strong></code> instead of <code>+=</code> — one of the most common Python performance mistakes.',
          how: 'Index access is <strong>O(1)</strong>. Slicing is <strong>O(k)</strong> where k is the slice length — it copies characters into a new string. Concatenation with <code>+</code> is <strong>O(n + m)</strong> — also a copy. To build a string from many pieces, collect them in a list and call <code>\'\'<strong>.join(list)</strong></code> at the end — that is one pass, <strong>O(n) total</strong> instead of O(n²).',
          memory: {
            overview: 'CPython stores strings as a compact, fixed array of Unicode code points. Because strings are immutable, CPython can <strong>intern</strong> short strings — reuse the same object when content is identical — which saves memory for repeated values like dictionary keys.',
            layout: 'Contiguous array of Unicode code points. CPython uses different internal encodings (Latin-1, UCS-2, or UCS-4) depending on the highest code point in the string, keeping memory proportional to what is actually needed.',
            implication: 'Index access is <strong>O(1)</strong> — same arithmetic as arrays. Slicing and concatenation are <strong>O(k)</strong> and <strong>O(n + m)</strong> because they produce new objects. Mutation in place is not possible — if you need to make many character-level changes, work with a list of characters and join at the end.',
          },
          complexity: {
            access: 'O(1)',
            search: 'O(n)',
            insert: 'O(n + m) — new string',
            delete: 'O(n) — new string',
          },
          pros: [
            'O(1) index access — same as arrays, same address arithmetic.',
            'Hashable — strings work as dict keys and set elements because they cannot change.',
            'CPython interns common strings — repeated identical strings often share one object in memory.',
          ],
          cons: [
            'Immutable — every "modification" allocates a new string. Plan for it.',
            'Naive concatenation with + in a loop is O(n²) — use \'\'.join() instead.',
            'For high-frequency character-level mutation, convert to a list of chars first.',
          ],
          keyProperties: [
            'Immutable — cannot be changed in place. s[0] = \'H\' raises TypeError.',
            '0-indexed — s[0] is the first character, s[-1] is the last.',
            'Slicing creates a new string — s[1:3] is O(k), not O(1).',
            'Concatenation creates a new string — \'\'.join(parts) is O(n) total vs O(n²) for repeated +.',
            'Hashable — usable as dict keys and set elements precisely because they cannot change.',
          ],
          useCases: [
            'Sliding window — longest substring without repeating characters, minimum window substring.',
            'Two pointers — palindrome checks, reversals, comparing from both ends simultaneously.',
            'Anagram and frequency problems — count characters with a dict or Counter, compare distributions.',
            'String building — parsing, formatting output; always use \'\'.join() for multi-part assembly.',
          ],
          code: `s = "hello"

# O(1) access
print(s[1])          # 'e'
print(s[-1])         # 'o'

# O(k) slice — creates a new string
print(s[1:4])        # 'ell'
print(s[::-1])       # 'olleh' — reverse

# Immutability — this raises TypeError:
# s[0] = 'H'

# O(n²) — don't do this in a loop
result = ""
for c in s:
    result += c      # new string every iteration

# O(n) — the right way
result = "".join(c for c in s)

# Useful string methods (all O(n))
s.split(",")         # split into list
",".join(["a","b"])  # join list into string
s.find("ll")         # first index, or -1
s.count("l")         # count occurrences
s.replace("l","r")   # new string, no mutation`,
          keyInsight: {
            heading: 'Strings are immutable — every concatenation creates a new string, and <strong>+= in a loop is O(n²)</strong>.',
            body: "Index access is O(1) and slicing is O(k), but concatenation with + copies both strings into a new one. Building a string with += across n iterations runs n copies of growing strings — that's O(n²). Instead, collect pieces in a list and call <strong>''.join()</strong> at the end: one pass, O(n) total. Two pointers and sliding window cover the dominant string problem patterns.",
          },
          connections: {
            prereqs: ['Arrays', 'Lists (Python)'],
            unlocks: ['Two Pointers', 'Sliding Window', 'Hash Maps & Sets'],
            related: ['Arrays', 'Hash Maps & Sets'],
          },
        },
      },
      {
        id: 'linked-intro',
        label: 'Intro to Linked DSA',
        content: {
          analogy: `Arrays are apartment buildings — numbered rooms, all in a row. Linked lists are more like a scavenger hunt: each clue tells you where to find the next one, but there's no shortcut to clue 47. You have to follow the chain.`,
          what: `The <strong>Linked cluster</strong> is built on the pointer. Each node holds a value and a reference to the next node. There are no indices — to reach node k you must traverse k steps from the head. This restriction is also the freedom: nodes can be rearranged without copying data.`,
          why: `This structure creates a specific set of natural operations. Cycle detection emerges when two pointers traverse the same chain at different speeds — they must eventually meet if the chain loops. Reversal is simply rewiring which direction the pointers face, without touching values. Merging two sorted lists means advancing whichever pointer holds the smaller value. The pointer is the primitive; these patterns are its natural consequences.`,
          isClusterIntro: true,
          how: `Draw the pointer diagram before writing any code. Most linked list bugs come from rewiring pointers in the wrong order — you lose your reference forward before you've saved it. The safe rule: save next before you redirect. For fast/slow problems, the two pointers always start at the head; slow moves one step, fast moves two; they meet if a cycle exists, fast hits null if there isn't one.`,
          keyProperties: [
            'No random access — reaching node k costs O(k), not O(1)',
            'Insertion and deletion at a known pointer: O(1) — just rewire two pointers, no shifting',
            'Fast/slow pointers converge in O(n) and use O(1) extra space — no visited set needed',
            'Reversal in-place: three pointers (prev, curr, next) — O(n) time, O(1) space',
            'Doubly linked lists add a prev pointer, enabling O(1) deletion from both ends',
          ],
          complexity: { time: 'O(n) traversal, O(1) insert/delete at known position', space: 'O(1) extra for most pointer techniques' },
          useCases: [
            'Detecting whether a linked list contains a cycle (Fast & Slow Pointers)',
            'Finding the middle of a list without knowing its length (Fast & Slow)',
            'Reversing a list or a sublist in-place (Reversal Patterns)',
            'LRU cache implementation (doubly linked list + hash map)',
          ],
          connections: {
            prereqs: ['Intro to Data Structures'],
            unlocks: ['Linked Lists', 'Fast & Slow Pointers', 'Reversal Patterns'],
            related: ['Intro to Linear', 'Intro to Recursive'],
          },
        },
      },
      {
        id: 'linked-lists',
        label: 'Linked Lists',
        content: {
          analogy: 'Imagine a scavenger hunt. Each clue doesn\'t tell you the answer outright — it tells you where to find the next clue. You can\'t skip to clue seven without following the chain from the start. But if the organizer wants to add a new clue between steps three and four, they just rewrite two slips of paper. No one has to move. That\'s a linked list. An array is more like an assigned seating chart — everyone has a numbered seat in a single row. You can jump straight to seat seven instantly. But if you want to insert someone in the middle, everyone after them has to slide down to make room. Same data, completely different rules.',
          what: 'Like an array, a linked list is an ordered collection of data stored in memory. The key difference is how that data is laid out. Arrays occupy a <strong>contiguous</strong> block — each element sits right next to the last. Linked lists throw that requirement out entirely — <strong>nodes</strong> can live anywhere in memory. So how do we know what comes next? Each node carries two things: its data, and a <strong>pointer</strong> — a reference to the memory address of the <strong>next</strong> node. The list is accessed from the <strong>head</strong> — instead of relying on physical proximity, we follow the chain.',
          why: 'When your data needs to grow, shrink, or be rearranged frequently, arrays force you to <strong>shift elements</strong> or <strong>reallocate memory</strong> — expensive operations. A linked list sidesteps both. Inserting a node between two existing nodes only requires updating <strong>two pointers</strong>, no matter how large the list. The tradeoff is that you give up <strong>random access</strong> to get cheap structural changes.',
          how: 'Build a <strong>Node</strong> class with two fields: <strong>data</strong> and <strong>next</strong> (pointer to the next node, defaults to None). String nodes together by setting each node\'s next to the following node. The list is just a reference to the <strong>head</strong> node — everything else is reachable by following the chain. To insert: update the previous node\'s next to point to the new node, and the new node\'s <strong>pointer</strong> to what came after. To delete: update the predecessor\'s next to skip over the target node.',
          memory: {
            overview: 'Linked list nodes are scattered across RAM — there is no requirement that they sit next to each other. Each node holds its data plus a pointer to wherever the next node happens to live.',
            layout: 'Non-contiguous / scattered — nodes can live anywhere in memory, linked only by pointers.',
            implication: 'No index math shortcut — reaching node k means traversing k steps from the head, making access O(n). But insertion and deletion at a known position are O(1) — just rewire two pointers, no shifting required.',
          },
          complexity: {
            access: 'O(n)',
            search: 'O(n)',
            insert: 'O(1) at known position',
            delete: 'O(1) at known position',
          },
          pros: [
            'O(1) insertion and deletion at a known position — just rewire two pointers, no elements shift.',
            'Dynamic size — grows and shrinks on demand without allocating a new block or copying data.',
            'No wasted pre-allocated memory — each node is created exactly when needed.',
          ],
          cons: [
            'O(n) access and search — no index jumping, must traverse from the head every time.',
            'Extra memory overhead — every node stores a pointer in addition to its data.',
            'Poor cache performance — nodes are scattered in RAM, so the CPU can\'t prefetch them the way it can with arrays.',
          ],
          keyProperties: [
            'Singly linked: each node points only forward (next). Doubly linked: each node points forward and backward (next + prev).',
            'The head pointer is the entry point to the entire list — lose it and the list is unreachable.',
            'The tail node\'s next pointer is None — that\'s how traversal knows to stop.',
            'No built-in index — reaching position k always costs k steps from the head.',
          ],
          useCases: [
            'Implementing stacks and queues — both only need O(1) add/remove at one or both ends, which linked lists provide naturally.',
            'Undo/redo history and browser back-forward navigation — each state is a node, easy to insert and remove.',
            'Any situation where insertion/deletion frequency is high and random access is rare.',
          ],
          code: `# Node definition
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None      # pointer defaults to None

# Build: 1 -> 2 -> 3
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)

# Traverse: O(n)
curr = head
while curr:
    print(curr.data)
    curr = curr.next

# Insert after head: O(1) at known node
new_node = Node(99)
new_node.next = head.next
head.next = new_node          # 1 -> 99 -> 2 -> 3

# Delete node after head: O(1) at known node
head.next = head.next.next    # 1 -> 2 -> 3`,
          keyInsight: {
            heading: 'No index access — traversal is always O(n). But insert and delete at a <strong>known node</strong> are O(1).',
            body: "Unlike arrays, a linked list stores no position information. Getting to node i means walking from the head — that's the fundamental cost. The payoff: once you have a pointer to a node, redirecting two pointers is all insert or delete requires. Most problems only need 1–3 pointers (curr, prev, next). Always draw the before and after state before writing pointer code — order of reassignment matters.",
          },
          connections: {
            prereqs: ['Arrays', 'Intro to Data Structures'],
            unlocks: ['Stacks & Queues', 'Fast & Slow Pointers'],
            related: ['Arrays', 'Stacks & Queues', 'Trees'],
          },
        },
      },
      {
        id: 'stacks-queues',
        label: 'Stacks & Queues',
        content: {
          analogy: 'A stack is like a stack of plates — you add to the top and remove from the top. Last in, first out. A queue is like a line at a coffee shop — first person in line is first to order. These ordering constraints are the feature, not the limitation.',
          what: 'A <strong>stack</strong> follows <strong>LIFO</strong> (<strong>Last In, First Out</strong>) ordering. A <strong>queue</strong> follows <strong>FIFO</strong> (<strong>First In, First Out</strong>). Both restrict how you interact with the data — only specific ends are accessible. In Python, a stack is a list using append/pop. A queue uses <strong>collections.deque</strong> with append/popleft.',
          why: 'Sometimes the order things were added determines what gets processed next. Function calls unwind in reverse order (stack). Tasks in a job queue should run in arrival order (queue). The constraint enforces correctness — it is not arbitrary.',
          how: 'Stack: push with <strong>append()</strong>, pop with <strong>pop()</strong> — both <strong>O(1)</strong>. Queue: enqueue with append(), dequeue with <strong>popleft()</strong> from collections.deque — both O(1). Never use list.pop(0) for queues — that shifts all elements and is <strong>O(n)</strong>.',
          memory: {
            overview: 'Both are implemented on top of arrays (Python lists) or linked lists. The LIFO/FIFO constraint is conceptual — the underlying data structure is flexible.',
            layout: 'Stack: array where operations happen at the tail. Queue: deque — a doubly-linked array allowing O(1) operations at both ends.',
            implication: 'Using a regular list as a queue is a common bug — list.pop(0) is O(n). deque.popleft() is O(1). The structure choice matters for performance.',
          },
          complexity: { access: 'O(n)', search: 'O(n)', insert: 'O(1)', delete: 'O(1)' },
          pros: [
            'O(1) push and pop — predictable and fast',
            'Simple interface — the constraint means there is only one right way to use it',
            'Stacks are essential for DFS, expression parsing, and undo functionality',
          ],
          cons: [
            'No random access — you can only interact with one end',
            'Not suitable when you need to inspect or retrieve arbitrary elements',
            'Easy to misimplement: using list.pop(0) instead of deque for a queue is a silent O(n) bug',
          ],
          keyProperties: [
            'LIFO (stack): last element added is the first removed — append() and pop()',
            'FIFO (queue): first element added is the first removed — use collections.deque with popleft()',
            'Stack top: stack[-1] to peek without removing',
            'Never use list.pop(0) for a queue — it is O(n), not O(1)',
          ],
          useCases: [
            'Stack: function call stack, DFS traversal, balanced parentheses, undo/redo',
            'Queue: BFS traversal, task scheduling, level-order tree traversal',
            'Monotonic stack problems use a stack to maintain order-based invariants',
          ],
          code: `from collections import deque

# STACK — Python list
stack = []
stack.append(1)    # push O(1)
stack.append(2)
stack.append(3)
top = stack[-1]    # peek: 3
stack.pop()        # pop O(1): removes 3

# QUEUE — collections.deque
queue = deque()
queue.append(1)          # enqueue O(1)
queue.append(2)
queue.append(3)
front = queue.popleft()  # dequeue O(1): 1
print(queue)             # deque([2, 3])

# BAD: list.pop(0) is O(n) — never use for queues`,
          keyInsight: {
            heading: 'Stacks power DFS. Queues power BFS. The data structure choice determines the traversal order.',
            body: 'Stack (LIFO): Python list with append() / pop(), both O(1). Queue (FIFO): <strong>collections.deque</strong> with append() / popleft(), both O(1). Never use a list as a queue — pop(0) is O(n). When a problem asks for level-by-level traversal or shortest path in steps, reach for a queue. For depth-first exploration or undo/redo patterns, reach for a stack. A monotonic stack is the same structure with an ordering invariant maintained on every push.',
          },
          connections: {
            prereqs: ['Arrays', 'Linked Lists'],
            unlocks: ['BFS & DFS', 'Monotonic Stack', 'Topological Sort'],
            related: ['Arrays', 'Linked Lists', 'BFS & DFS'],
          },
        },
      },
      {
        id: 'lookup-intro',
        label: 'Intro to Lookup',
        content: {
          analogy: `Searching a list for a value is like scanning every seat in a stadium. A hash map is like having a seating chart — you look up the name, get the section number, go straight there. One step, every time, regardless of stadium size.`,
          what: `The <strong>Lookup cluster</strong> is built on the hash function. A hash map converts any key into a direct storage address, giving <strong>O(1)</strong> average-case lookup, insert, and delete. You trade a fixed amount of memory for the ability to answer "is this here?" in constant time.`,
          why: `"Have we seen this value before?" — answered in O(1) instead of O(n). That single capability unlocks a wide class of problems. Two-sum becomes one pass: store each value you've seen, check if the complement exists. Frequency counting becomes a tally in one loop. Interval overlap detection works by sorting and scanning, often with a hash set for O(1) membership checks. The pattern is always the same: precompute into a structure that makes future lookups trivial.`,
          isClusterIntro: true,
          how: `When you catch yourself writing a nested loop to check "does this value exist somewhere earlier?" — that's your signal. Store each element in a hash map on the way through. For two-sum: as you scan, check if (target − current) is already in the map, then add current to the map. One pass, O(n). For intervals: sort by start time first, then sweep with a running merge endpoint. The sort brings order; the sweep does the work.`,
          keyProperties: [
            'O(1) average-case lookup, insert, and delete — this is what makes one-pass solutions possible',
            'The classic pattern: "for each element, check if complement exists, then add element"',
            'Hash sets for membership tests; hash maps when you need to store a value alongside the key',
            'defaultdict(int) in Python auto-initializes missing keys — cleaner frequency counting',
            'Hash maps are the cache for DP — memoization is just "hash map from inputs to result"',
          ],
          complexity: { time: 'O(1) average per operation', space: 'O(n) for the map' },
          useCases: [
            'Two-sum and complement-finding (seen before? O(1))',
            'Frequency counting and anagram detection',
            'Duplicate detection in O(n) instead of O(n²)',
            'Merging and detecting overlapping intervals',
            'Caching / memoization (DP cache is a hash map)',
          ],
          connections: {
            prereqs: ['Intro to Data Structures', 'Intro to Linear'],
            unlocks: ['Hash Maps & Sets', 'Interval Problems'],
            related: ['Intro to Optimization'],
          },
        },
      },
      {
        id: 'hash-maps',
        label: 'Hash Maps & Sets',
        content: {
          analogy: 'Imagine a library where instead of scanning shelf by shelf, you hand the librarian a book title and they instantly tell you the exact shelf and position. The title is the key, the location is the value, and the instant lookup is the hash function at work.',
          what: 'A <strong>hash map</strong> (<strong>dict</strong> in Python) stores <strong>key-value pairs</strong>. A <strong>hash set</strong> (<strong>set</strong> in Python) stores unique keys only. Both use a <strong>hash function</strong> to convert a key into an index into an internal array of <strong>buckets</strong>. Lookup, insert, and delete are <strong>O(1)</strong> average — no traversal needed.',
          why: 'When you need to look something up by name rather than position, arrays force you to scan every element — <strong>O(n)</strong>. A hash map converts the lookup into a computed address — <strong>O(1)</strong>. It is the right tool any time you group, count, cache, or check membership.',
          how: 'Python handles everything under the hood. Store a pair with dict[key] = value. Look up with dict[key] or the safer dict.get(key, default). The <strong>hash function</strong> converts the key to an integer index into the internal bucket array. <strong>Collisions</strong> are handled automatically.',
          memory: {
            overview: 'Internally, a hash map is an array of buckets. The hash function maps a key to a bucket index. This is why lookup is O(1) — it is just array access at a computed index.',
            layout: 'Array of buckets — each bucket holds one or more key-value pairs to handle hash collisions via chaining.',
            implication: 'Average O(1) for all operations. Worst case O(n) if many keys hash to the same bucket, but Python makes this extremely rare. Uses more memory than a plain array to keep load factor low.',
          },
          complexity: { access: 'O(1) avg', search: 'O(1) avg', insert: 'O(1) avg', delete: 'O(1) avg' },
          pros: [
            'O(1) average lookup, insert, and delete by key',
            'Flexible keys — any hashable type (string, int, tuple) works as a key',
            'Sets give O(1) membership testing and enforce uniqueness automatically',
          ],
          cons: [
            'Unordered — sets are not ordered; dicts maintain insertion order only since Python 3.7',
            'Higher memory usage — internal bucket array is kept partially empty to limit collisions',
            'Unhashable types (lists, dicts) cannot be keys — must convert to tuples first',
          ],
          keyProperties: [
            'Keys must be hashable — strings, ints, tuples work; lists and dicts do not',
            'dict.get(key, default) is safer than dict[key] — avoids KeyError if key is missing',
            'set supports union (|), intersection (&), and difference (-) operations',
            'Python dicts preserve insertion order as of Python 3.7',
          ],
          useCases: [
            'Frequency counting — count occurrences of elements in O(n)',
            'Caching / memoization — store computed results to avoid recomputation',
            'Two Sum — check if a complement exists in O(1) using a seen dict',
            'Grouping elements by property — anagram groups, word frequency maps',
          ],
          code: `# DICT — hash map
freq = {}
for ch in 'hello':
    freq[ch] = freq.get(ch, 0) + 1
# {'h': 1, 'e': 1, 'l': 2, 'o': 1}

val = freq.get('z', 0)   # 0, no KeyError

# SET — hash set
seen = set()
seen.add(3)
seen.add(3)        # duplicate ignored
print(3 in seen)   # True — O(1)

# Two Sum pattern
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i`,
          keyInsight: {
            heading: '"Have I seen this before?" — answered in <strong>O(1)</strong>. That single capability turns O(n²) problems into O(n).',
            body: "Average O(1) insert, lookup, and delete. Two Sum is the canonical pattern: store each value you've seen, check if target - current exists. <strong>Counter(iterable)</strong> gives frequency in one line. <strong>defaultdict(int)</strong> accumulates without key-existence checks. Python dict preserves insertion order (3.7+). set is a hash map with no values — use it for fast membership testing.",
          },
          connections: {
            prereqs: ['Arrays', 'Intro to Data Structures'],
            unlocks: ['Sliding Window', 'Two Pointers', 'Dynamic Programming'],
            related: ['Arrays', 'Stacks & Queues', 'Trees'],
          },
        },
      },
      {
        id: 'trees',
        label: 'Trees',
        content: {
          analogy: 'Think of a company org chart. One CEO at the top, everyone else reports to someone above them. No one reports to two managers (no shared parents), and no circular reporting chains. A tree is that hierarchy: one root, branching downward, clear parent-child relationships, no cycles.',
          what: 'A tree is a hierarchical data structure made of <strong>nodes</strong>. Each node has a value and zero or more <strong>children</strong>. Every tree has exactly one <strong>root</strong> node and every non-root node has exactly one <strong>parent</strong>. Nodes with no children are <strong>leaves</strong>. A <strong>binary tree</strong> restricts each node to at most two children (left and right) — the most common variant in DSA.',
          why: 'Many real-world relationships are <strong>hierarchical</strong> — file systems, org charts, decision processes. Trees represent and navigate these efficiently. <strong>Binary Search Trees (BSTs)</strong> support <strong>O(log n)</strong> search, insert, and delete when <strong>balanced</strong> — better than arrays for dynamic sorted data.',
          how: 'Define a <strong>Node</strong> class with <strong>val</strong>, <strong>left</strong>, and <strong>right</strong>. Traverse recursively — for each node, handle itself and its subtrees. <strong>Inorder</strong> (left → root → right), <strong>Preorder</strong> (root → left → right), and <strong>Postorder</strong> (left → right → root) are the three standard <strong>DFS</strong> traversal orders. <strong>BFS</strong> traverses level by level using a queue.',
          memory: {
            overview: 'Tree nodes are scattered in memory like linked list nodes — each stores data and pointers to children. No contiguous layout.',
            layout: 'Scattered nodes — each node stores its value and pointers to left/right children (or a list of children for n-ary trees).',
            implication: 'No index-based access — every retrieval requires traversal from the root. O(log n) for balanced trees, O(n) for degenerate (skewed) trees.',
          },
          complexity: { access: 'O(log n) avg', search: 'O(log n) avg', insert: 'O(log n) avg', delete: 'O(log n) avg' },
          pros: [
            'O(log n) search, insert, and delete in balanced trees',
            'Natural fit for hierarchical data — file systems, DOM, org charts, decision trees',
            'Foundation for heaps, tries, and many advanced structures',
          ],
          cons: [
            'O(n) worst case if the tree becomes skewed (degenerate) — degrades to a linked list',
            'No O(1) random access — must traverse from root every time',
            'Balancing (AVL, Red-Black trees) is complex to implement — use library structures when needed',
          ],
          keyProperties: [
            'Root: top node with no parent. Leaf: node with no children.',
            'Height: number of edges on the longest path from root to a leaf.',
            'BST property: all left descendants < node value < all right descendants.',
            'A complete binary tree has all levels full except possibly the last, filled left to right.',
          ],
          useCases: [
            'Binary Search Trees for dynamic sorted data with frequent insert and delete',
            'DFS and BFS traversal — trees are the most common traversal practice in interviews',
            'Representing recursive structures: expression trees, file systems, HTML DOM',
          ],
          code: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

# Build:   4
#         / \\
#        2   6
root = TreeNode(4)
root.left = TreeNode(2)
root.right = TreeNode(6)

# Inorder (left → root → right) → sorted for BST
def inorder(node):
    if not node:
        return
    inorder(node.left)
    print(node.val)
    inorder(node.right)

# Level-order BFS
from collections import deque
def level_order(root):
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.val)
        if node.left:  q.append(node.left)
        if node.right: q.append(node.right)`,
          keyInsight: {
            heading: 'The BST invariant — left &lt; node &lt; right — enables O(log n) search, but only when the tree stays balanced.',
            body: 'In a balanced BST, height is O(log n) — each comparison halves the remaining search space. An unbalanced BST degenerates into a linked list: O(n) height, O(n) search. Inorder traversal (left → root → right) visits BST nodes in sorted order. Most tree problems follow the same recursive pattern: solve for the left subtree, solve for the right, combine at the root.',
          },
          connections: {
            prereqs: ['Arrays', 'Linked Lists', 'Recursion & D&C'],
            unlocks: ['Heaps & Priority Queues', 'Graphs', 'BFS & DFS', 'Dynamic Programming'],
            related: ['Graphs', 'Heaps & Priority Queues', 'BFS & DFS'],
          },
        },
      },
      {
        id: 'ordered-intro',
        label: 'Intro to Ordered',
        content: {
          analogy: `An emergency room doesn't treat patients in the order they arrived — it treats the most critical case first. A heap works the same way: it always serves the most extreme element next, and it does so efficiently, without keeping everything in sorted order.`,
          what: `The <strong>Ordered cluster</strong> is built on partial order. A <strong>heap</strong> is a tree with one rule: every parent is smaller (min-heap) or larger (max-heap) than its children. That single constraint is enough to give you the minimum (or maximum) in <strong>O(1)</strong> and replace it in <strong>O(log n)</strong> — without ever sorting the rest.`,
          why: `Full sorting costs O(n log n). A heap gives you the best element in O(1) and the next best in O(log n). For top-K problems, you only need a heap of size K — not a sorted array of size n. As you scan elements, keep only the K largest in the heap. Total cost: O(n log K), often much cheaper than O(n log n). The insight is deferred commitment: don't sort what you don't need to sort.`,
          isClusterIntro: true,
          how: `Reach for a heap when a problem asks you to repeatedly find the minimum or maximum of a changing set. For top-K largest: maintain a min-heap of size K. As you scan each element, if it's larger than the heap's minimum, pop the minimum and push the new element. At the end, the heap contains exactly the K largest. Python's heapq is a min-heap by default — negate values for a max-heap.`,
          keyProperties: [
            'Min-heap invariant: every parent ≤ its children — the smallest element is always at the root',
            'heappush and heappop both run in O(log n) — the heap stays valid after each operation',
            'heapify() converts a list to a heap in O(n) — faster than n individual pushes',
            'Top-K with a size-K heap costs O(n log K), often much cheaper than O(n log n) full sort',
            'Two-heap pattern for running median: max-heap for lower half, min-heap for upper half',
          ],
          complexity: { time: 'O(log n) push/pop, O(1) peek at min/max', space: 'O(n) for the heap' },
          useCases: [
            'Finding the K largest or K smallest elements in a stream',
            'Scheduling: always process the highest-priority task next',
            'Merging K sorted lists efficiently (K-way merge)',
            'Median of a data stream (two heaps: one min, one max)',
            "Dijkstra's shortest path (BFS with a priority queue instead of a regular queue)",
          ],
          connections: {
            prereqs: ['Intro to Data Structures', 'Intro to Recursive'],
            unlocks: ['Heaps & Priority Queues', 'Top-K Patterns'],
            related: ['Intro to Graph'],
          },
        },
      },
      {
        id: 'heaps',
        label: 'Heaps & Priority Queues',
        content: {
          analogy: 'Think of an emergency room — patients are not seen in arrival order, the most critical patient goes next. A priority queue does exactly this. A heap is the data structure that implements it efficiently, always keeping track of who is most urgent without sorting everyone else.',
          what: "A <strong>heap</strong> is a tree-based structure satisfying the <strong>heap property</strong>: in a <strong>min-heap</strong>, every parent is smaller than or equal to its children, so the root is always the global minimum. In a <strong>max-heap</strong>, every parent is larger. Python's heapq module implements a min-heap. A <strong>priority queue</strong> is the abstract concept — a heap is the implementation.",
          why: 'When you need repeated access to the minimum or maximum of a changing dataset, sorting the whole list each time is O(n log n) per operation. A heap gives <strong>O(1)</strong> access to the min/max and <strong>O(log n)</strong> insert and remove — far more efficient for dynamic data.',
          how: "Python's <strong>heapq</strong> treats a regular list as a min-heap. <strong>heappush()</strong> adds in <strong>O(log n)</strong>. <strong>heappop()</strong> removes and returns the smallest in O(log n). heap[0] peeks the minimum in O(1). For a max-heap, <strong>negate</strong> values before pushing and negate again after popping.",
          memory: {
            overview: 'Despite being conceptually a tree, heaps are stored as arrays. The tree structure is implied by index math — no pointers needed.',
            layout: 'Array-backed — for node at index i: left child at 2i+1, right child at 2i+2, parent at (i-1)//2.',
            implication: 'Array storage makes heaps cache-friendly. The heap property guarantees O(1) access to the min/max but O(n) for arbitrary element access.',
          },
          complexity: { access: 'O(1) top only', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)' },
          pros: [
            'O(1) access to the minimum (min-heap) or maximum (max-heap)',
            'O(log n) insert and delete — efficient for dynamic datasets',
            'O(n) to build a heap from an existing list using heapq.heapify()',
          ],
          cons: [
            'Only the top element is O(1) accessible — arbitrary access requires O(n)',
            'Python only provides min-heap natively — max-heap requires negating values',
            'Not suitable when you need to search or retrieve elements by arbitrary value',
          ],
          keyProperties: [
            'Heap property: every parent ≤ its children (min-heap) or every parent ≥ children (max-heap)',
            'Root (heap[0]) is always the global minimum in a min-heap — O(1) to peek',
            'heapq.heapify() converts a list to a heap in-place in O(n)',
            'Top K problems almost always call for a heap',
          ],
          useCases: [
            'Top K largest or smallest elements — maintain a heap of size K',
            "Dijkstra's shortest path — repeatedly pull the closest unvisited node",
            'Merge K sorted lists — use a min-heap to always pick the smallest next element',
            'Scheduling — always process the highest priority task next',
          ],
          code: `import heapq

# Min-heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)

print(heap[0])               # peek min: 1, O(1)
print(heapq.heappop(heap))   # pop min: 1, O(log n)

# Build from list in O(n)
nums = [5, 3, 8, 1, 4]
heapq.heapify(nums)

# Max-heap: negate values
max_heap = []
for n in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -n)
print(-heapq.heappop(max_heap))  # 5

# Top K smallest
def top_k_smallest(nums, k):
    return heapq.nsmallest(k, nums)`,
          keyInsight: {
            heading: 'A heap gives you the minimum (or maximum) in <strong>O(1)</strong> without sorting everything else.',
            body: "A heap is not a sorted array — it only guarantees parent ≤ children (min-heap). Elements at the same level have no guaranteed order. Push and pop are O(log n). Peek is <strong>O(1)</strong>. heapify() builds a heap from an existing list in O(n), not O(n log n). Python's heapq is a min-heap — negate values to simulate a max-heap. Use a heap when you need repeated access to the current minimum or maximum of a changing dataset.",
          },
          connections: {
            prereqs: ['Trees', 'Arrays'],
            unlocks: ['Topological Sort', 'Greedy Algorithms'],
            related: ['Trees', 'Sorting', 'Greedy Algorithms'],
          },
        },
      },
      {
        id: 'top-k',
        label: 'Top-K Patterns',
        content: {
          analogy: 'You want the ten best restaurants in your city. You do not need a complete ranked list of every place — you just need the top ten. A min-heap of size 10 does exactly this: scan each restaurant, and if it scores higher than the worst in your current top-10, swap it in. The heap stays at size 10 the whole time.',
          what: '<strong>Top-K problems</strong> ask for the K largest, K smallest, or K most frequent elements. A <strong>min-heap of size K</strong> answers "K largest" in <strong>O(n log K)</strong> — far better than sorting everything at O(n log n). At each element, if it beats the heap root (the current worst of the top K), pop the root and push the new element. The heap always holds the K best candidates seen so far.',
          why: 'Sorting n elements costs O(n log n). When K is much smaller than n, a fixed-size heap reduces this to <strong>O(n log K)</strong> — you only maintain K elements in the heap instead of all n. For top-K frequency problems, a hash map + heap combination gives O(n log K), which beats sorting the frequency table entirely.',
          how: 'For <strong>K largest</strong>: maintain a min-heap of size K. For each element, push it; if heap size exceeds K, pop the minimum. At the end, the heap contains the K largest elements. For <strong>K most frequent</strong>: count frequencies with a hash map, then run the same heap strategy on (count, element) pairs.',
          complexity: { time: 'O(n log K)', space: 'O(K)' },
          signals: [
            '"Find the K largest / K smallest elements"',
            '"K most frequent elements"',
            '"Kth largest element in a stream"',
            '"Top K frequent words"',
            'Any problem where you need to maintain a running best-K without full sorting',
          ],
          keyProperties: [
            'Min-heap of size K finds K largest — the root is the current "worst of the best"',
            'Max-heap of size K finds K smallest — the root is the current "best of the worst"',
            'Python heapq is a min-heap; negate values to simulate max-heap',
            'heapq.nlargest(k, iterable) and nsmallest are O(n log K) — prefer them for one-shot queries',
          ],
          useCases: [
            'Kth Largest Element in an Array',
            'K Most Frequent Elements',
            'Top K Frequent Words',
            'Kth Largest Element in a Stream — maintain a running heap',
            'Find K Closest Points to Origin',
          ],
          code: `import heapq
from collections import Counter

# K largest elements — O(n log K)
def k_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)   # drop the smallest
    return heap   # contains K largest

# K most frequent elements — O(n log K)
def top_k_frequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count, key=count.get)

# Kth largest in a stream — maintain a size-K min-heap
class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = []
        for n in nums:
            self.add(n)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]   # Kth largest is the heap min`,
          keyInsight: {
            heading: 'A min-heap of size K finds the K largest elements in <strong>O(n log K)</strong> — no need to sort the full array.',
            body: "Push each element; if the heap exceeds K, pop the root (the current weakest candidate). The root is always the smallest of the top K seen so far. Sorting n elements costs O(n log n); a fixed-size heap reduces that to O(n log K) — a major win when K ≪ n. For K most frequent: <strong>Counter + heapq.nlargest(k, count, key=count.get)</strong> is the one-liner. Know it cold.",
          },
          connections: {
            prereqs: ['Heaps & Priority Queues', 'Sorting', 'Hash Maps & Sets'],
            unlocks: [],
            related: ['Heaps & Priority Queues', 'Sorting', 'K-way Merge'],
          },
        },
      },
      {
        id: 'graph-intro',
        label: 'Intro to Graph',
        content: {
          analogy: `Cities and roads. Each city is a node. Each road is an edge. Asking "is there a route from A to B?" is a graph problem. Asking "what's the shortest route?" is a graph problem. Asking "if this road closes, does the network stay connected?" is a graph problem. Most relationship problems, once you draw them, are graphs.`,
          what: `The <strong>Graph cluster</strong> is built on the adjacency relationship. Unlike arrays (fixed positions) or trees (hierarchical parents), a graph allows any node to connect to any other node. Structure emerges from relationships, not from fixed coordinates or ranks.`,
          why: `Four techniques, one underlying question: which things are connected, and how? <strong>BFS</strong> finds shortest paths in unweighted graphs — the same queue logic as tree level-order traversal, now on a general structure. <strong>Topological sort</strong> orders nodes with dependencies — the moment a problem has "A must come before B," it's a graph. <strong>Union-Find</strong> determines connected components without traversal at all, in near-O(1) per query. Together, these cover a huge class of problems that look unrelated on the surface.`,
          isClusterIntro: true,
          how: `Always start by representing the graph — usually an adjacency list (dict of lists in Python). Then ask: directed or undirected? Weighted or unweighted? Cyclic or acyclic? The answers narrow your tool selection fast. BFS for shortest path (unweighted). DFS for all paths or cycle detection. Topological sort for dependency ordering. Union-Find for connected components without repeated traversal. And always: maintain a visited set to avoid infinite loops on graphs with cycles.`,
          keyProperties: [
            'BFS uses a queue — processes nodes level by level, guarantees shortest path on unweighted graphs',
            'DFS uses a stack (or recursion) — explores as deep as possible before backtracking',
            'Adjacency list: O(V + E) space. Adjacency matrix: O(V²) — use list unless edges are dense',
            'Topological sort requires a DAG (directed acyclic graph) — any cycle makes it impossible',
            'Union-Find answers "are these connected?" in near-O(1) without traversal',
          ],
          complexity: { time: 'O(V + E) for BFS and DFS', space: 'O(V + E) for adjacency list' },
          useCases: [
            'Shortest path in an unweighted graph (BFS)',
            'All paths, cycle detection, connected components (DFS)',
            'Task scheduling with dependencies (Topological Sort)',
            'Grouping nodes into connected components (Union-Find)',
            'Course prerequisites, build systems, package managers (Topological Sort)',
          ],
          connections: {
            prereqs: ['Intro to Recursive', 'Intro to Linear'],
            unlocks: ['Graphs', 'Topological Sort', 'Union-Find'],
            related: ['Intro to Ordered'],
          },
        },
      },
      {
        id: 'graphs',
        label: 'Graphs',
        content: {
          analogy: "Think of a city road map. Cities are nodes, roads are edges. Some roads are one-way (directed), some are two-way (undirected). Some roads have tolls (weighted). Graphs are the most general structure — any set of things with any set of connections: social networks, flight routes, dependency chains.",
          what: 'A graph is a collection of nodes (<strong>vertices</strong>) and <strong>edges</strong> (connections between nodes). Unlike trees, graphs have no root, no required hierarchy, and can have cycles. Graphs can be <strong>directed</strong> (edges have direction) or <strong>undirected</strong>, and <strong>weighted</strong> (edges have costs) or unweighted. In Python, graphs are typically represented as <strong>adjacency lists</strong> using dicts.',
          why: "When relationships between data do not fit a clean hierarchy, you need a graph. <strong>Shortest path</strong>, <strong>connectivity</strong>, <strong>dependency ordering</strong> — these are graph problems. Graphs are the most general data structure, which is why graph algorithms (BFS, DFS, Dijkstra's) are so broadly applicable.",
          how: 'Represent as an <strong>adjacency list</strong>: a dict where each key is a node and its value is a list of neighbors. For weighted graphs, store (neighbor, weight) tuples. Traverse with <strong>BFS</strong> (queue, level by level) or <strong>DFS</strong> (stack or recursion, depth-first). Always track <strong>visited</strong> nodes to avoid infinite loops when <strong>cycles</strong> exist.',
          memory: {
            overview: 'Adjacency list representation uses a dict of lists — one entry per node. Memory-efficient for sparse graphs (few edges relative to nodes).',
            layout: 'Adjacency list: dict mapping each node to its neighbor list. Adjacency matrix: 2D array where matrix[i][j] = 1 if the edge exists.',
            implication: 'Adjacency list: O(V + E) space — preferred for sparse graphs. Adjacency matrix: O(V²) space — preferred for dense graphs or instant edge existence checks.',
          },
          complexity: { access: 'O(1) node lookup', search: 'O(V + E)', insert: 'O(1)', delete: 'O(V + E)' },
          pros: [
            'Most general structure — models any relationship between any set of things',
            'Adjacency list is memory-efficient for sparse graphs',
            'BFS and DFS provide powerful traversal and path-finding capabilities',
          ],
          cons: [
            'More complex to implement and reason about than trees',
            'Cycle detection is required to avoid infinite traversal',
            'Choosing the right representation (adjacency list vs matrix) matters for performance',
          ],
          keyProperties: [
            'V = vertices (nodes), E = edges — both factor into time and space complexity',
            'Directed: edges have direction (A→B ≠ B→A). Undirected: edges go both ways.',
            'Cycle: a path that starts and ends at the same node — must detect to avoid infinite loops.',
            'Connected component: a group of nodes where every node is reachable from every other.',
          ],
          useCases: [
            "Shortest path — Dijkstra's (weighted), BFS (unweighted)",
            'Cycle detection — topological sort only works on DAGs (directed acyclic graphs)',
            'Connected components — find islands, friend clusters, related node groups',
            'Dependency resolution — build systems, course prerequisites, task ordering',
          ],
          code: `from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C'],
}

# BFS — level by level (shortest path in unweighted graph)
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS — depth first (recursive)
def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`,
          keyInsight: {
            heading: 'Always use a visited set — without it, you loop forever on graphs with cycles.',
            body: 'Store graphs as <strong>adjacency lists</strong> — dicts in Python. Adjacency matrices use O(V²) space and are only worth it for dense graphs. BFS finds shortest paths in unweighted graphs (queue, level by level). DFS handles cycle detection, connected components, and topological sort (stack or recursion). Grid problems are just graphs: each cell is a node with up to 4 neighbors.',
          },
          connections: {
            prereqs: ['Trees', 'BFS & DFS', 'Recursion & D&C'],
            unlocks: ['Topological Sort', 'Union-Find'],
            related: ['Trees', 'BFS & DFS', 'Topological Sort'],
          },
        },
      },
    ],
  },
  {
    id: 'algorithms',
    label: 'Algorithms',
    subsections: [
      {
        id: 'algs-intro',
        label: 'Intro to Algorithms',
        content: {
          analogy: 'If data structures are the containers that hold data, algorithms are the recipes that operate on them. A recipe tells you which steps to take and in what order to transform ingredients into a meal. An algorithm tells you which operations to perform, in which order, to transform input into output.',
          what: 'An <strong>algorithm</strong> is a finite, step-by-step procedure for solving a problem. Every algorithm takes some <strong>input</strong>, performs a defined sequence of operations, and produces an <strong>output</strong>. Algorithms are evaluated by <strong>correctness</strong> (does it produce the right answer?) and <strong>efficiency</strong> (how fast, how much memory?).',
          why: 'The same problem can be solved many ways — with wildly different performance. Choosing the wrong algorithm can mean code that runs in milliseconds on small inputs but takes hours on real data. Understanding algorithms gives you the tools to reason about and compare those tradeoffs.',
          how: 'Every algorithm has a <strong>time complexity</strong> and a <strong>space complexity</strong>, expressed in <strong>Big O notation</strong>. Time complexity describes how runtime scales relative to input size n. Space complexity describes how memory scales. The goal: find an approach that is correct, readable, and efficient enough for the given constraints.',
          complexity: { time: 'Varies by algorithm', space: 'Varies by algorithm' },
          keyProperties: [
            'Correctness: must produce the right output for all valid inputs, including edge cases',
            'Time complexity: how runtime scales with n — O(1), O(log n), O(n), O(n log n), O(n²)...',
            'Space complexity: how memory scales with n — O(1) extra space is ideal',
            'Most problems have a brute-force O(n²) solution and an optimal one — knowing both is the skill',
          ],
          useCases: [
            'Every problem you encounter requires an algorithm — the question is always which one',
            'Sorting, searching, graph traversal, dynamic programming — each category of algorithm matches a category of problem shape',
            'Interview problems test your ability to identify which algorithmic approach fits the problem',
          ],
          code: `# Big O: common time complexities
# O(1)       — constant:     dict lookup, array index
# O(log n)   — logarithmic: binary search
# O(n)       — linear:      single loop through input
# O(n log n) — efficient:   sorting (Timsort, merge sort)
# O(n^2)     — quadratic:   nested loops (brute force)
# O(2^n)     — exponential: naive recursion (e.g. fib)
# O(n!)      — factorial:   all permutations

# Space complexity counts extra memory used:
# O(1) — no extra data structures (just a few variables)
# O(n) — storing a copy of input or a hash map of size n`,
          connections: {
            prereqs: ['Intro to Data Structures', 'Arrays', 'Hash Maps & Sets'],
            unlocks: ['Binary Search', 'Sorting', 'Recursion & D&C'],
            related: ['Data Structures', 'Patterns'],
          },
        },
      },
      {
        id: 'binary-search',
        label: 'Binary Search',
        content: {
          analogy: 'You are looking for a word in a dictionary. You do not start at A and flip page by page — you open to the middle. If your word comes before that page, search the left half. If after, search the right half. Each guess cuts the remaining search space in half. That is binary search.',
          what: "Binary search finds a target value in a <strong>sorted array</strong> by repeatedly comparing the target to the <strong>middle element</strong> and eliminating half the <strong>search space</strong> each time. It achieves <strong>O(log n)</strong> — far better than linear scan's O(n). The input must be sorted, or have a <strong>monotonic</strong> property for binary search to work.",
          why: 'Linear search on a sorted array ignores the order that is right there. Binary search exploits that order to eliminate half the possibilities with every comparison. For a million-element array, linear search takes up to 1,000,000 comparisons. Binary search takes at most 20.',
          how: 'Maintain <strong>left</strong> and <strong>right</strong> pointers representing the current search range. Compute <strong>mid = (left + right) // 2</strong>. If nums[mid] equals target, return mid. If nums[mid] < target, search the right half (left = mid + 1). If nums[mid] > target, search the left half (right = mid - 1). Repeat until found or left > right. The whole process is <strong>O(log n)</strong>.',
          complexity: { time: 'O(log n)', space: 'O(1)' },
          keyProperties: [
            'Array must be sorted (or have a monotonic property) — binary search on unsorted data is meaningless',
            'Each iteration halves the search space — at most log₂(n) steps',
            'Off-by-one errors are extremely common — know when to use mid+1 vs mid-1 and < vs <=',
            'Binary search on the answer: sometimes you binary search on a value range, not an array index',
          ],
          useCases: [
            'Finding a target in a sorted or rotated sorted array',
            'Finding the first or last occurrence of a value (leftmost/rightmost binary search)',
            'Binary search on the answer — "find the minimum capacity that works for k days"',
            'Any problem where you can eliminate half the search space with one comparison',
          ],
          code: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1     # search right half
        else:
            right = mid - 1    # search left half
    return -1   # not found

# Find leftmost (first) occurrence
def lower_bound(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left`,
          keyInsight: {
            heading: 'Binary search works on any monotonic predicate — not just sorted arrays.',
            body: "The classic form: lo, hi = 0, len(nums)-1; mid = (lo + hi) // 2. Use lo &lt;= hi for an exact match; lo &lt; hi for finding a boundary. Off-by-one in the update condition is the most common interview bug — settle on one template and know it cold. The deeper insight: any problem where you can ask 'is X feasible?' with a yes/no answer that's monotonic (all-false then all-true) can be solved with binary search over X values.",
          },
          connections: {
            prereqs: ['Arrays', 'Intro to Algorithms'],
            unlocks: ['Sorting', 'Two Pointers'],
            related: ['Two Pointers', 'Sorting', 'Sliding Window'],
          },
        },
      },
      {
        id: 'sorted-search-intro',
        label: 'Intro to Sorted Search',
        content: {
          analogy: `You're looking for a name in a phone book. You open to the middle — too late in the alphabet, so you throw away the second half entirely. Middle of what's left — too early, throw away the first half. A few more cuts and you have the name. You didn't read the book; you exploited the fact that it was sorted.`,
          what: `The <strong>Sorted Search cluster</strong> is built on monotonicity — the property that if you can determine which half of the search space contains the answer, you can discard the other half permanently. Each cut halves the problem, giving <strong>O(log n)</strong> instead of O(n).`,
          why: `Classic binary search applies this to a sorted array. The pattern generalizes further: "binary search on the answer space" works whenever you can frame any candidate answer as a yes/no question with monotonic structure. "Can k workers finish in d days?" — binary search over d. "What's the minimum capacity needed?" — binary search over capacity. The sorted array is one special case of a much broader idea. Once you recognize the yes/no monotonic structure, a whole class of optimization problems reveals itself as a search problem.`,
          isClusterIntro: true,
          how: `Two tests before applying binary search: (1) is the search space sorted or monotone? (2) can I determine which half contains the answer in O(1)? If both yes — binary search. For "search on answer space," the search space is a range of possible answers, not an array. Write a helper function: given a candidate value, can we verify it's feasible in O(n)? If that function is monotone (all false then all true), binary search over the candidate values.`,
          keyProperties: [
            'Binary search requires sorted input or a monotone feasibility function — not just any array',
            'Each comparison eliminates half the remaining candidates — O(log n) total',
            '"First true" binary search: lo and hi converge to the boundary where condition flips',
            'Off-by-one errors are the #1 failure mode — always check lo=3, hi=4 edge cases',
            '"Binary search on answer" works whenever feasibility is monotone: all-false then all-true',
          ],
          complexity: { time: 'O(log n) search, O(n log n) for sorting', space: 'O(1)' },
          useCases: [
            'Finding a value in a sorted array in O(log n) (Binary Search)',
            'Finding the first position where a condition becomes true (Binary Search)',
            'Minimizing or maximizing a value subject to a monotonic feasibility test',
            'Sorting as preprocessing before other techniques',
          ],
          connections: {
            prereqs: ['Intro to Linear', 'Intro to Data Structures'],
            unlocks: ['Sorting', 'Binary Search', 'Search on Answer Space'],
            related: ['Intro to Optimization'],
          },
        },
      },
      {
        id: 'sorting',
        label: 'Sorting',
        content: {
          analogy: "Everyone has sorted something — cards in a hand, books on a shelf. The question is whether you pick out the smallest one each time (selection sort), insert each new item into its correct spot (insertion sort), or split in half and merge sorted halves together (merge sort). The method matters because some are dramatically faster than others.",
          what: "Sorting rearranges elements into a specific order (usually ascending). Python's built-in sorted() and list.sort() use <strong>Timsort</strong> — a hybrid of merge sort and insertion sort — achieving <strong>O(n log n)</strong>. Understanding sorting algorithms matters because the concepts (<strong>divide and conquer</strong>, invariants, <strong>stability</strong>) appear throughout DSA.",
          why: 'Many algorithms become dramatically simpler once the input is sorted. <strong>Binary search</strong> requires a sorted array. Finding duplicates becomes O(n) after sorting. <strong>Two-pointer</strong> and <strong>Sliding window</strong> techniques often need sorted input. Sorting is a preprocessing step that unlocks more efficient algorithms downstream.',
          how: "For interviews, use Python's built-in sort (<strong>Timsort</strong>, <strong>O(n log n)</strong>) unless asked to implement one. Know <strong>merge sort</strong> deeply — it demonstrates divide and conquer, is stable, and has guaranteed O(n log n). Understand <strong>quicksort</strong> conceptually — O(n log n) average, <strong>O(n²)</strong> worst case, often fastest in practice due to cache efficiency.",
          complexity: { time: 'O(n log n)', space: 'O(n) merge sort / O(log n) quicksort' },
          keyProperties: [
            "Python's sorted() returns a new list; list.sort() sorts in-place — both are O(n log n)",
            'Stable sort: equal elements maintain their original relative order — Timsort is stable',
            'sorted(arr, key=lambda x: x[1]) — sort by any property using a key function',
            'Comparison sorts cannot beat O(n log n) in the worst case — mathematical lower bound',
          ],
          useCases: [
            'Preprocessing input before binary search or two-pointer techniques',
            'Finding duplicates, pairs, or closest elements efficiently',
            'Interval problems — sorting by start time simplifies overlap detection',
            'Custom sorting: by multiple keys, reverse order, or object attributes',
          ],
          code: `nums = [5, 2, 8, 1, 9, 3]
sorted_nums = sorted(nums)          # new list, O(n log n)
nums.sort()                         # in-place

# Sort with custom key
words = ['banana', 'fig', 'apple']
words.sort(key=lambda w: len(w))    # by length

# Sort tuples by second element, descending
pairs = [(1, 3), (2, 1), (3, 2)]
pairs.sort(key=lambda x: x[1], reverse=True)

# Merge sort (divide and conquer)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
          keyInsight: {
            heading: 'Sorting is preprocessing — it unlocks binary search, two pointers, interval merging, and greedy algorithms.',
            body: "Python's sorted() and list.sort() use <strong>Timsort</strong>: O(n log n), stable, O(n) space. Use these in interviews — never implement your own. No comparison sort can beat O(n log n) worst case; it's a mathematical lower bound. sorted(arr, key=lambda x: x[1]) sorts by any attribute. Reverse with reverse=True.",
          },
          connections: {
            prereqs: ['Arrays', 'Recursion & D&C'],
            unlocks: ['Binary Search', 'Two Pointers', 'Merge Intervals', 'Greedy Algorithms'],
            related: ['Binary Search', 'Two Pointers', 'Merge Intervals'],
          },
        },
      },
      {
        id: 'recursive-intro',
        label: 'Intro to Recursive',
        content: {
          analogy: `Imagine you want to know how many people are ahead of you in a line. You could count from the front — or you could just ask the person in front of you. They ask the person in front of them. The question propagates forward, and the answer comes back: "three people ahead of me, so four ahead of you." That's recursion. The problem asks itself.`,
          what: `The <strong>Recursive cluster</strong> is built on the call stack. Every recursive algorithm does three things: makes a choice, delegates the rest of the work to itself on a smaller input, then combines the result on the way back up. This structure — push, recurse, unwind — is the heartbeat of trees, DFS, backtracking, and divide & conquer.`,
          why: `A binary tree is this structure materialized in data: each node has two recursive sub-problems. DFS walks that structure, one choice at a time. Backtracking is DFS with a pruning step — when a partial path is already invalid, undo the last choice and try the next one. Divide & conquer splits the input in half, recurses on both, and merges the results. Same mechanical heartbeat, different decisions about what "try next" and "combine results" mean. Once you can feel the call stack unwind in your head, all of these click into place.`,
          isClusterIntro: true,
          how: `Three steps for any recursive function: (1) define the base case — what's the answer when input is smallest? (2) define the recursive step — how does this problem reduce to the same problem on smaller input? (3) trust the call — assume the recursive call returns the right answer, and build on it. Don't trace the whole recursion in your head. Write base case, write recursive step, trust the function. For backtracking: make a choice, recurse, undo the choice. Those three lines, repeated, explore the entire decision tree.`,
          keyProperties: [
            'Every recursive call adds a stack frame — deep recursion without a base case causes stack overflow',
            'The base case is not optional — it is what stops the recursion',
            'Memoization converts any recursive solution into DP: cache the result of each unique call',
            'Backtracking = DFS on a decision tree, with pruning to skip dead branches early',
            'Divide & conquer: split input in half, recurse on both halves, merge results on the way back up',
          ],
          complexity: { time: 'O(n) to O(2ⁿ) depending on branching factor', space: 'O(depth) call stack, O(n) for memoized DP' },
          useCases: [
            'Tree traversal: inorder, preorder, postorder, level-order',
            'Finding all paths, subsets, or permutations (Backtracking)',
            'Shortest path, connected components in graphs (BFS/DFS)',
            'Sorting via divide & conquer (merge sort, quicksort)',
            'Recursive structure is the base for memoized DP',
          ],
          connections: {
            prereqs: ['Intro to Linked', 'Intro to Linear'],
            unlocks: ['Recursion', 'Trees', 'BFS & DFS', 'Backtracking', 'Greedy'],
            related: ['Intro to Graph', 'Intro to Optimization'],
          },
        },
      },
      {
        id: 'recursion',
        label: 'Recursion & D&C',
        content: {
          analogy: 'A Russian nesting doll. Open the outer doll and inside is a slightly smaller version of the same thing. Keep opening until you hit the smallest doll that cannot be opened — that is the base case. The solution at each level is built from the solution at the next level down. Recursion: solve a smaller version of the same problem, combine results.',
          what: 'Recursion is when a function calls itself. <strong>Divide and conquer (D&C)</strong> is a recursive strategy: split the problem into smaller subproblems, solve each independently, then combine the results. A recursive function needs two parts: a <strong>base case</strong> (when to stop) and a <strong>recursive case</strong> (how to break the problem down and combine).',
          why: 'Some problems have a naturally recursive structure — trees, nested data, problems where the answer to size n depends on the answer to size n-1. Solving them iteratively produces complex, hard-to-reason-about code. Recursion expresses the solution in the same shape as the problem.',
          how: 'Identify the <strong>base case</strong> first — the input small enough that the answer is trivial. Then define the <strong>recursive step</strong>: assume your function correctly solves the smaller version, and write how to build the solution for the current input using that result. Trust the recursion. Do not try to trace every call manually.',
          complexity: { time: 'Branching factor × depth', space: 'O(depth) call stack' },
          keyProperties: [
            'Every recursive function needs a base case — without one, recursion runs forever (stack overflow)',
            'The call stack grows with each call — depth of recursion equals space complexity',
            'Memoization converts recursive solutions into dynamic programming by caching results',
            'Python has a recursion depth limit (~1000) — use iteration for very deep problems',
          ],
          useCases: [
            'Tree and graph traversal — naturally recursive since each subtree is itself a tree',
            'Merge sort and quicksort — split, recurse on each half, combine',
            'Backtracking — explore all possibilities by recursively building candidates',
            'Any problem where the structure of the solution mirrors the structure of the input',
          ],
          code: `# Factorial — classic recursion
def factorial(n):
    if n <= 1:              # base case
        return 1
    return n * factorial(n - 1)   # recursive case

# Fibonacci with memoization
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# Binary search via recursion
def binary_search(nums, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        return binary_search(nums, target, mid + 1, right)
    else:
        return binary_search(nums, target, left, mid - 1)`,
          keyInsight: {
            heading: "Define the base case, define the recursive step, and trust the call — don't trace the full recursion in your head.",
            body: 'Every recursive function does two things: returns a known answer for the smallest input (base case), and reduces any larger input to the same function on something smaller. Assume the recursive call returns the right answer — your job is to combine results. Python defaults to a recursion depth of 1000; for deep recursion, convert to iterative with an explicit stack. Memoize by caching each subproblem result the first time — that\'s DP.',
          },
          connections: {
            prereqs: ['Arrays', 'Intro to Algorithms'],
            unlocks: ['Dynamic Programming', 'Backtracking', 'Trees', 'BFS & DFS'],
            related: ['Dynamic Programming', 'Backtracking', 'Trees'],
          },
        },
      },
      {
        id: 'optimization-intro',
        label: 'Intro to Optimization',
        content: {
          analogy: `Fibonacci computed naively recalculates fib(2) hundreds of times just to compute fib(10). A child who's bad at math but has a notepad beats a genius without one: write down fib(2) the first time, look it up every time after. That notepad is the DP cache.`,
          what: `The <strong>Optimization cluster</strong> is built on overlapping subproblems. A problem has this property when its solution can be composed from solutions to smaller versions of the same problem — and those smaller versions appear repeatedly. Dynamic programming solves each subproblem once, stores the result, and reuses it rather than recomputing.`,
          why: `The progression from 1D DP to 2D DP to interval DP to knapsack is not a collection of unrelated tricks. It's a progression in the shape of the state space. 1D DP tracks one variable (position, index). 2D DP tracks two (two strings, a grid). Interval DP asks about every subarray of every length. Knapsack adds a capacity constraint. The process is always the same: define what the subproblem is, write the recurrence that expresses the larger problem in terms of smaller ones, fill the table bottom-up (or recurse top-down with memoization). What changes is only how many dimensions of state the problem forces you to track.`,
          isClusterIntro: true,
          how: `The DP thought process: (1) define what dp[i] means — precisely, in one sentence; (2) write the recurrence — how does dp[i] depend on previous values? (3) identify base cases; (4) fill the table in dependency order. If you can't define dp[i] in one sentence, you haven't found the right state yet. When stuck, write the brute-force recursive solution first, then add a memo dictionary. That's valid DP and often easier to verify than jumping straight to bottom-up.`,
          keyProperties: [
            'Two requirements: optimal substructure + overlapping subproblems — both must hold for DP to apply',
            'Top-down (memoization) = recursive function + cache. Bottom-up (tabulation) = loop + table.',
            'Space optimization: if dp[i] only needs dp[i-1], you can reduce to two variables instead of an array',
            '1D DP: one dimension of state. 2D DP: two (grid, two sequences). Interval: all subranges. Knapsack: adds a capacity.',
            'State definition is everything — if the recurrence is hard, the state is usually wrong',
          ],
          complexity: { time: 'O(states × transitions)', space: 'O(states), often reducible to O(1 row)' },
          useCases: [
            'Longest common subsequence, edit distance (2D DP on two strings)',
            'Minimum path through a grid (2D DP)',
            'Longest palindromic subsequence, matrix chain (Interval DP)',
            'Subset sum, 0/1 knapsack, coin change (Knapsack Variants)',
            'Any problem where brute-force recursion repeats the same sub-call',
          ],
          connections: {
            prereqs: ['Intro to Recursive', 'Intro to Lookup'],
            unlocks: ['Dynamic Programming', '2D DP', 'Interval DP', 'Knapsack Variants'],
            related: ['Intro to Sorted Search'],
          },
        },
      },
      {
        id: 'dynamic-programming',
        label: 'Dynamic Programming',
        content: {
          analogy: 'Computing fib(50) by calling fib(49) and fib(48), each calling fib(48) and fib(47)... you end up computing fib(2) millions of times. Dynamic programming says: compute each subproblem once, write down the answer, and look it up if you need it again. It turns exponential recursion into polynomial time.',
          what: 'Dynamic programming (DP) optimizes problems with two properties: <strong>overlapping subproblems</strong> (the same subproblem is solved multiple times) and <strong>optimal substructure</strong> (the optimal solution is built from optimal solutions to subproblems). It solves each subproblem once and stores the result — either top-down (<strong>memoization</strong>) or bottom-up (<strong>tabulation</strong>).',
          why: 'Pure recursion on DP problems produces exponential time — it recomputes the same subproblems over and over. DP eliminates that redundancy. Problems that look impossible with brute force become polynomial with caching.',
          how: 'Two approaches: (1) <strong>Memoization</strong> (<strong>top-down</strong>) — write the recursive solution, add <strong>@lru_cache</strong> or a dict to store results before returning. (2) <strong>Tabulation</strong> (<strong>bottom-up</strong>) — build a table from small subproblems to large, filling in answers iteratively. Memoization is easier to derive; tabulation is often more space-efficient.',
          complexity: { time: 'O(n) to O(n²) depending on problem', space: 'O(n) to O(n²) for dp table' },
          keyProperties: [
            'Overlapping subproblems: without DP, the same computation is repeated — caching eliminates this',
            'Optimal substructure: the best answer for size n is built from best answers for smaller sizes',
            '@lru_cache(maxsize=None) adds memoization to any recursive function with one line in Python',
            '1D DP: dp[i] depends on previous entries. 2D DP: dp[i][j] depends on dp[i-1][j], dp[i][j-1].',
          ],
          useCases: [
            'Fibonacci, climbing stairs, coin change — 1D DP classics',
            'Longest common subsequence, edit distance — 2D DP on two sequences',
            '0/1 knapsack — choose items to maximize value within a weight limit',
            'Any problem where the optimal answer for n depends on the optimal answer for n-1',
          ],
          code: `# Memoization (top-down)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Tabulation (bottom-up)
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Coin change: minimum coins to make amount
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
          keyInsight: {
            heading: 'DP is recursion + memoization. If your recursive solution recomputes the same subproblems, DP fixes it.',
            body: 'Define the state before writing any code: what does dp[i] represent? The recurrence follows directly from the definition. <strong>Top-down</strong>: memoized recursion, often easier to write. <strong>Bottom-up</strong>: iterative table, often faster in practice. Same complexity, different code shape. If a greedy solution gets the wrong answer, DP is the fix — DP considers all subproblems; greedy commits to one and never looks back.',
          },
          connections: {
            prereqs: ['Recursion & D&C', 'Arrays', 'Hash Maps & Sets'],
            unlocks: ['2D DP', 'Interval DP', 'Knapsack Variants'],
            related: ['Recursion & D&C', 'Backtracking', 'Greedy Algorithms'],
          },
        },
      },
      {
        id: 'dp-2d',
        label: '2D DP',
        content: {
          analogy: 'A hiker crossing a grid of terrain, choosing at each cell whether to come from the left or from above. The cheapest path to any cell depends only on the cheapest path to the two cells feeding into it. Fill the grid cell by cell — left to right, top to bottom — and the answer is waiting in the bottom-right corner.',
          what: '<strong>2D DP</strong> adds a second dimension of state to the standard 1D DP table. Instead of dp[i], you track dp[i][j] — where i and j represent two independent dimensions of the problem (often two strings, two arrays, or a position and a constraint). The recurrence fills a 2D grid; each cell depends on a small set of neighboring cells.',
          why: 'Problems involving two sequences, two indices, or a position paired with a running value cannot be modeled with 1D DP alone. Adding a dimension captures the state fully. The cost is O(n × m) time and space, but most 2D DP problems have no better known approach.',
          how: 'Define dp[i][j] as the answer for subproblem (i, j). Write the base cases (usually row 0 and column 0). Write the recurrence relating dp[i][j] to previously computed cells. Fill in order so every cell you reference has already been computed. The answer is typically dp[n][m] or the maximum/minimum over some slice of the table.',
          complexity: { time: 'O(n × m)', space: 'O(n × m), often reducible to O(min(n, m)) with row compression' },
          signals: [
            '"Edit distance between two strings"',
            '"Longest common subsequence of two sequences"',
            '"Unique paths in a grid" — 2D position with movement constraints',
            '"Minimum path sum through a grid"',
            'Any problem with two independent sequences or a 2D traversal',
          ],
          keyProperties: [
            'State is dp[i][j] — two dimensions, two independent sources of variation',
            'Base cases are the 0th row and 0th column — fill these explicitly before the main loop',
            'Fill order must ensure referenced cells are already computed — row by row, left to right',
            'Space optimization: if dp[i][j] only depends on dp[i-1][...], you only need two rows',
          ],
          useCases: [
            'Longest Common Subsequence',
            'Edit Distance (Levenshtein distance)',
            'Unique Paths in a Grid',
            'Minimum Path Sum',
            'Regular Expression Matching',
          ],
          code: `# Longest Common Subsequence
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Edit Distance
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i          # delete all chars of word1
    for j in range(n + 1):
        dp[0][j] = j          # insert all chars of word2

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # delete
                    dp[i][j-1],    # insert
                    dp[i-1][j-1],  # replace
                )

    return dp[m][n]`,
          keyInsight: {
            heading: 'dp[i][j] represents the answer for the first i elements of one sequence and first j of another — fill row by row.',
            body: 'Base cases: row 0 (empty first sequence) and column 0 (empty second) — initialize these before the loops. LCS recurrence: if chars match, dp[i-1][j-1] + 1; else max(dp[i-1][j], dp[i][j-1]). Space optimization: if dp[i][j] only looks at row i-1, two 1D arrays replace the full table.',
          },
          connections: {
            prereqs: ['Dynamic Programming', 'Arrays', 'Strings'],
            unlocks: [],
            related: ['Dynamic Programming', 'Interval DP', 'Knapsack Variants'],
          },
        },
      },
      {
        id: 'dp-intervals',
        label: 'Interval DP',
        content: {
          analogy: 'Deciding in what order to multiply a chain of matrices. The cost depends on which pair you multiply first — a choice that splits the chain into two subchains, each of which must also be solved optimally. Small intervals are solved first, then combined into larger ones, until the entire chain is handled.',
          what: '<strong>Interval DP</strong> solves problems defined on contiguous subarrays or subsequences, where the answer for interval [i, j] is built from answers to strictly shorter intervals. The key structural property: the answer for [i, j] involves choosing a split point k inside [i, j] and combining solutions to [i, k] and [k, j]. The table is filled by increasing interval length.',
          why: 'Problems like burst balloons, stone merging, and matrix chain multiplication have exponentially many recursive subproblems if approached naively. Interval DP memoizes all (i, j) pairs — O(n²) subproblems — and computes each in O(n) by iterating over split points. Total: O(n³), which is often the best achievable for these problems.',
          how: 'Let dp[i][j] = answer for the subarray from i to j. Fill by interval length: first solve all length-1 intervals, then length-2, up to length-n. For each interval [i, j], try every split point k from i to j-1, compute the cost of splitting there (using already-solved subproblems), and take the optimum.',
          complexity: { time: 'O(n³) in most cases', space: 'O(n²)' },
          signals: [
            '"Burst balloons" — removing elements where the cost depends on neighbors',
            '"Minimum cost to merge stones" or split an array into groups',
            '"Matrix chain multiplication" — order of operations optimization',
            '"Palindrome partitioning" — minimum cuts to split a string into palindromes',
            'Any problem where you optimize over all ways to split a range',
          ],
          keyProperties: [
            'Fill by length, not by start index — ensures subproblems are solved before they are needed',
            'The split point k iterates over all positions inside [i, j] — this is the O(n) inner loop',
            'dp[i][i] (length-1 intervals) are the base cases — usually 0 or a trivial value',
            'Hardest part is getting the recurrence right — carefully define what dp[i][j] represents',
          ],
          useCases: [
            'Burst Balloons',
            'Minimum Cost to Merge Stones',
            'Strange Printer',
            'Minimum Score Triangulation of Polygon',
            'Palindrome Removal',
          ],
          code: `# Burst Balloons — O(n³)
# dp[i][j] = max coins from bursting all balloons between i and j (exclusive)
def max_coins(nums):
    nums = [1] + nums + [1]   # sentinel boundaries
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    # fill by interval length (at least 2 apart = at least 1 balloon inside)
    for length in range(2, n):
        for i in range(n - length):
            j = i + length
            for k in range(i + 1, j):
                # k is the LAST balloon burst in [i+1, j-1]
                coins = nums[i] * nums[k] * nums[j]
                dp[i][j] = max(dp[i][j], dp[i][k] + coins + dp[k][j])

    return dp[0][n - 1]`,
          keyInsight: {
            heading: 'Fill by interval length, not by start index — this guarantees subproblems are always smaller than the current one.',
            body: 'For each interval [i, j], try every split point k in (i, j). This O(n) inner loop inside O(n²) intervals makes total complexity O(n³). dp[i][i] (single element) is the base case — usually 0. The hardest part is defining what dp[i][j] means. Write that definition in plain English before writing any code.',
          },
          connections: {
            prereqs: ['Dynamic Programming', '2D DP'],
            unlocks: [],
            related: ['Dynamic Programming', '2D DP', 'Knapsack Variants'],
          },
        },
      },
      {
        id: 'dp-knapsack',
        label: 'Knapsack Variants',
        content: {
          analogy: 'A thief with a backpack of limited capacity, choosing which items to steal to maximize value. Each item has a weight and a value. The decision for each item is binary: take it or leave it. If you can take fractions of items, greedy works — pick by value-per-weight. If you must take whole items, greedy fails, and DP is the tool.',
          what: '<strong>Knapsack DP</strong> solves optimization problems with a capacity or budget constraint, where you choose a subset of items. The classic <strong>0/1 knapsack</strong> asks: given items each with a weight and value, and a maximum capacity W, maximize total value. dp[i][w] = max value using the first i items with capacity w. The "0/1" means each item is taken at most once.',
          why: 'Greedy (take highest value-per-weight) does not work for 0/1 knapsack because you cannot take fractions. The subset space is 2ⁿ — exponential. DP collapses this to O(n × W) by observing that dp[i][w] only depends on dp[i-1][...]. The same idea generalizes to dozens of interview problems: coin change, subset sum, partition equal subset — all are knapsack variants.',
          how: 'Build dp[i][w] = max value considering items 0..i with capacity w. For each item i and capacity w: either skip item i (dp[i-1][w]) or take it if it fits (dp[i-1][w - weight[i]] + value[i]). Take the max. Final answer is dp[n][W]. Space optimization: since row i only depends on row i-1, you can use a single 1D array updated in reverse.',
          complexity: { time: 'O(n × W)', space: 'O(n × W), reducible to O(W) with 1D array' },
          signals: [
            '"Can you partition a set into two equal-sum subsets?"',
            '"Minimum coins to make change" — unbounded variant (items reusable)',
            '"Count distinct ways to reach a target sum" — 0/1 or unbounded',
            '"Maximum value subject to a weight limit"',
            'Any "select a subset meeting a constraint, optimize a quantity" problem',
          ],
          keyProperties: [
            '0/1 knapsack: each item used at most once — update capacity in reverse to avoid reuse',
            'Unbounded knapsack: items can be reused — update capacity forward (Coin Change)',
            '1D optimization: dp[w] = max(dp[w], dp[w - wt] + val) — iterate w in reverse for 0/1',
            'Subset sum is 0/1 knapsack with value = weight: "can we reach exactly W?"',
          ],
          useCases: [
            'Partition Equal Subset Sum',
            'Coin Change — minimum coins (unbounded knapsack)',
            'Coin Change II — count ways (unbounded)',
            'Target Sum — count assignments using +/- to reach target',
            'Ones and Zeroes — 2D knapsack with two capacity dimensions',
          ],
          code: `# 0/1 Knapsack — O(n × W) time, O(W) space
def knapsack(weights, values, W):
    dp = [0] * (W + 1)
    for w, v in zip(weights, values):
        for cap in range(W, w - 1, -1):   # reverse to avoid reuse
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[W]

# Partition Equal Subset Sum
def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for n in nums:
        for cap in range(target, n - 1, -1):
            dp[cap] = dp[cap] or dp[cap - n]
    return dp[target]

# Coin Change — unbounded knapsack (coins reusable)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for cap in range(coin, amount + 1):   # forward: allow reuse
            dp[cap] = min(dp[cap], dp[cap - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
          keyInsight: {
            heading: 'Iterate capacity in <strong>reverse</strong> for 0/1 knapsack (each item once), <strong>forward</strong> for unbounded (items can repeat).',
            body: '1D recurrence: dp[cap] = max(dp[cap], dp[cap - weight] + value). Iterating reverse prevents the same item from being used twice in one pass. Iterating forward allows reuse — that\'s Coin Change. Subset sum is just 0/1 knapsack with value = weight: dp[target] becomes True/False instead of a numeric value.',
          },
          connections: {
            prereqs: ['Dynamic Programming', 'Arrays'],
            unlocks: [],
            related: ['Dynamic Programming', '2D DP', 'Greedy Algorithms'],
          },
        },
      },
      {
        id: 'greedy',
        label: 'Greedy Algorithms',
        content: {
          analogy: 'Making change for 87 cents using the fewest coins. You naturally grab the largest coin that fits — a 50-cent piece, then a 25-cent piece, then a dime, then two pennies. You never second-guess yourself. That is greedy: at each step, pick the locally optimal choice and never look back.',
          what: 'A greedy algorithm makes the <strong>locally optimal</strong> choice at each step, hoping that a series of local optima leads to a <strong>global optimum</strong>. It never backtracks or reconsiders past decisions. Greedy works when the problem has the <strong>greedy choice property</strong> — local optimality guarantees global optimality.',
          why: 'When greedy works, it is often the simplest and fastest approach — typically O(n) or O(n log n). The challenge is knowing when to trust it. Problems requiring consideration of all combinations (knapsack, coin change with arbitrary denominations) usually need DP. Problems with clear local structure often favor greedy.',
          how: 'Sort the input if order matters, then iterate through making the greedy choice at each step. Proving greedy works usually involves an <strong>exchange argument</strong>: show that any solution differing from the greedy choice can be transformed into the greedy solution without getting worse.',
          complexity: { time: 'O(n log n) with sort, O(n) without', space: 'O(1) typically' },
          keyProperties: [
            'Greedy choice property: a locally optimal choice leads to a globally optimal solution',
            'No backtracking — once a choice is made, it is final',
            'Sort first: most greedy problems start by sorting by the relevant criterion',
            'When greedy fails, DP is usually the fallback — DP considers all subproblems, greedy does not',
          ],
          useCases: [
            'Interval scheduling — select maximum non-overlapping intervals (sort by end time)',
            'Merge intervals — sort by start, greedily merge overlapping ranges',
            'Jump game — can you reach the end? Track the furthest reachable index',
            'Assign tasks to minimize completion time by sorting by duration',
          ],
          code: `# Maximum non-overlapping intervals
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by end time
    count = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end     # take this interval
        else:
            count += 1         # skip (overlaps prev)
    return count

# Jump game: can you reach the last index?
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False       # cannot reach index i
        max_reach = max(max_reach, i + jump)
    return True`,
          keyInsight: {
            heading: 'Greedy works when the locally optimal choice never forecloses a globally better outcome.',
            body: "The key question: does committing to the best-looking option now ever block a better global result? If yes, DP is the fix. Most greedy algorithms start with sorting — if you don't know which criterion, ask what property should come first. Classic signals: maximum non-overlapping intervals, minimum number of operations, can you reach the end?",
          },
          connections: {
            prereqs: ['Sorting', 'Arrays', 'Intro to Algorithms'],
            unlocks: ['Merge Intervals'],
            related: ['Dynamic Programming', 'Sorting', 'Merge Intervals'],
          },
        },
      },
      {
        id: 'backtracking',
        label: 'Backtracking',
        content: {
          analogy: 'Solving a maze: at every fork you pick a direction. If you hit a dead end, you backtrack to the last fork and try a different route. You explore every possibility systematically, but bail out early when a path is clearly wrong. That is backtracking — exhaustive search with intelligent pruning.',
          what: 'Backtracking is a recursive algorithm that builds candidates incrementally and abandons a candidate (backtracks) as soon as it determines the candidate cannot lead to a valid solution. It explores the solution space as a <strong>state space tree</strong>, <strong>pruning</strong> branches that violate constraints early to avoid wasted work.',
          why: 'Some problems require finding all valid solutions or the optimal one among all possibilities — there is no shortcut. Backtracking explores all options but avoids redundant work through pruning. It is the right choice when the problem asks for "all combinations," "all permutations," or "all valid arrangements."',
          how: 'Define a recursive function that takes the current partial solution. At each step, try adding each valid next choice. If the current partial solution is invalid, return immediately (<strong>pruning</strong>). If the solution is complete, record it. Otherwise, recurse with the updated state, then undo the change (backtrack) before trying the next option. Ensure every path has a valid <strong>base case</strong> to terminate recursion.',
          complexity: { time: 'O(n!) to O(2ⁿ) depending on branching', space: 'O(n) call stack depth' },
          keyProperties: [
            'Pruning: if the current partial solution cannot lead to a valid answer, stop immediately',
            'Undo: after each recursive call, undo the change you made — that is the backtrack step',
            '"Find all possible..." in a problem statement almost always means backtracking',
            'State: track what has been chosen so far and what remains available',
          ],
          useCases: [
            'All permutations and combinations of a set',
            'All subsets — every possible subset of an array',
            'N-Queens, Sudoku solver — place elements on a grid with constraints',
            'Word search — find a word in a grid by exploring all paths',
          ],
          code: `# All subsets of a list
def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])     # record current state
        for i in range(start, len(nums)):
            current.append(nums[i])   # choose
            backtrack(i + 1, current)
            current.pop()             # undo (backtrack)
    backtrack(0, [])
    return result

# All permutations
def permutations(nums):
    result = []
    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return
        for n in nums:
            if n not in current:
                current.append(n)
                backtrack(current)
                current.pop()
    backtrack([])
    return result`,
          keyInsight: {
            heading: 'Make a choice, recurse, undo the choice — the <strong>undo step</strong> is what lets backtracking explore all possibilities.',
            body: "Without the undo, you contaminate the path for future branches. Pruning — skipping invalid partial states early — is what separates a fast backtrack from a slow one. Three templates: subsets (include/exclude each element), permutations (used[] array), combinations (start index to avoid reuse). Track the path as a list: append on the way in, pop on the way out.",
          },
          connections: {
            prereqs: ['Recursion & D&C', 'Arrays'],
            unlocks: ['Dynamic Programming'],
            related: ['Recursion & D&C', 'Dynamic Programming'],
          },
        },
      },
    ],
  },
  {
    id: 'patterns',
    label: 'Patterns',
    subsections: [
      {
        id: 'patterns-intro',
        label: 'Intro to Patterns',
        content: {
          analogy: 'A chess grandmaster does not calculate every possible move from scratch. They have seen enough positions to recognize patterns — "this looks like a pin," "this is a fork." Patterns in DSA work the same way: once internalized, you stop seeing random problems and start seeing familiar shapes.',
          what: 'A pattern is a reusable algorithmic strategy that applies to a class of problems with similar structure. Where algorithms are specific steps (binary search, DFS), patterns are the higher-level strategy (shrink the search space from both ends, explore layer by layer). Recognizing the pattern is usually harder than implementing it.',
          why: 'You cannot memorize solutions to every possible problem. You can internalize around 15 patterns that cover the vast majority of interview problems. When you see a new problem and recognize its pattern, you know the approach before writing a single line of code.',
          how: 'For each pattern, learn: what problem shape it solves, what signals in the problem point to it, and how it works mechanically. Practice applying it to new problems until recognition is automatic. After each problem, debrief: name the pattern, explain why it fit, identify the signals you used.',
          complexity: { time: 'Pattern-dependent', space: 'Pattern-dependent' },
          keyProperties: [
            'A pattern is a strategy, not a specific algorithm — it can be implemented multiple ways',
            'Signal recognition is the skill: certain constraints and phrasings map predictably to specific patterns',
            'Patterns build on each other — Two Pointers and Sliding Window are closely related',
            'Most interview problems test one or two patterns — your job is to identify which',
          ],
          useCases: [
            'When a brute force O(n²) solution exists, there is often a pattern that gets it to O(n)',
            'Use signal recognition to identify the pattern before choosing a data structure',
            'Debrief after each problem: name the pattern, the signals, and why it applies',
          ],
          code: `# Pattern → Common signal → Typical complexity
# Two Pointers      → sorted array, pair/triplet sum    → O(n)
# Sliding Window    → contiguous subarray condition      → O(n)
# Fast & Slow       → cycle detection, linked list mid  → O(n)
# Merge Intervals   → overlapping ranges                 → O(n log n)
# BFS               → shortest path, level by level      → O(V + E)
# DFS               → all paths, cycle detection         → O(V + E)
# Topological Sort  → dependency ordering (DAG)          → O(V + E)
# Union-Find        → connected components               → O(n)
# Monotonic Stack   → next greater/smaller element       → O(n)
# Binary Search     → sorted input, halve space          → O(log n)`,
          connections: {
            prereqs: ['Intro to Data Structures', 'Intro to Algorithms', 'Arrays', 'Hash Maps & Sets'],
            unlocks: ['Two Pointers', 'Sliding Window', 'Fast & Slow Pointers', 'BFS & DFS', 'Monotonic Stack'],
            related: ['Data Structures', 'Algorithms'],
          },
        },
      },
      {
        id: 'two-pointers',
        label: 'Two Pointers',
        content: {
          analogy: 'Squeezing a tube of toothpaste from both ends toward the middle at the same time. Each pointer starts at an extreme and moves inward based on what you find. Instead of checking every possible pair from the outside in at O(n²), two coordinated fingers scan the array in a single O(n) pass.',
          what: '<strong>Two pointers</strong> uses two index variables pointing to different positions in an array, moving them toward each other or in the same direction to solve problems in <strong>O(n)</strong> that would otherwise require nested loops. It typically requires the array to be <strong>sorted</strong> or have some exploitable <strong>monotonic</strong> structure.',
          why: 'Brute-force pair-searching is <strong>O(n²)</strong> — check every combination. Two pointers exploits sorted order (or a similar invariant) to eliminate whole ranges of candidates with a single comparison, reducing to <strong>O(n)</strong>. Any time you search for pairs, triplets, or check conditions from both ends, two pointers is likely the move.',
          how: 'Place one pointer at the start (<strong>left</strong> = 0) and one at the end (<strong>right</strong> = len - 1). Evaluate the pair or condition. If the result is too small, move left forward. If too large, move right backward. If the target is met, record and move both. Continue until pointers meet in <strong>O(n)</strong>.',
          complexity: { time: 'O(n)', space: 'O(1)' },
          signals: [
            'Find a pair that sums to a target in a sorted array',
            'Remove duplicates in-place from a sorted array',
            'Reverse an array or check if a string is a palindrome',
            'Container with most water or similar geometric problems',
            'Three Sum / Four Sum — fix one element, apply two pointers on the rest',
          ],
          keyProperties: [
            'Requires sorted input (or a monotonic property) to work correctly',
            'O(n) time, O(1) space — eliminates the need for a nested loop',
            'Both pointers moving inward: classic for pair-finding. Same direction: used in fast/slow variant.',
            'Can be combined with sorting as preprocessing — sort + two pointers = O(n log n) total',
          ],
          useCases: [
            'Two Sum II on a sorted array',
            'Three Sum — sort, fix one element, apply two pointers on the rest',
            'Removing duplicates from a sorted array in-place',
            'Valid palindrome check',
          ],
          code: `# Two Sum II — input is sorted
def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1

# Remove duplicates in-place from sorted array
def remove_duplicates(nums):
    left = 1
    for right in range(1, len(nums)):
        if nums[right] != nums[right - 1]:
            nums[left] = nums[right]
            left += 1
    return left

# Valid palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
          keyInsight: {
            heading: 'Two pointers turn an O(n²) nested loop into <strong>O(n)</strong> by moving left and right based on sorted order.',
            body: 'Requires sorted input (or a monotonic property). Left starts at 0, right at len-1. Sum too small: move left. Too large: move right. Same-direction variant: left = slow write pointer, right = fast read pointer — used for in-place compress or remove. Both pointers only move forward, so each element is processed at most twice: O(n) total.',
          },
          connections: {
            prereqs: ['Arrays', 'Sorting', 'Intro to Patterns'],
            unlocks: ['Sliding Window', 'Fast & Slow Pointers'],
            related: ['Sliding Window', 'Fast & Slow Pointers', 'Binary Search'],
          },
        },
      },
      {
        id: 'sliding-window',
        label: 'Sliding Window',
        content: {
          analogy: '<strong>Fixed window</strong><br>A cashier scanning exactly k items off a conveyor belt at a time. As the belt advances one position, the leftmost item exits the scanner and one new item enters from the right. The window is always exactly k items wide — it never grows or shrinks, it just shifts forward.<br><br><strong>Variable window</strong><br>Two people holding opposite ends of a rope stretched across a row of elements. The right person steps forward to grow the window and take in more elements. When the window holds too much and violates the condition, the left person steps forward to release elements from the back. The rope stretches and contracts dynamically until the right range is found.',
          what: '<strong>Sliding window</strong> solves problems involving <strong>contiguous</strong> subarrays or substrings. Instead of recomputing the answer for every possible subarray from scratch (<strong>O(n²)</strong>), maintain a <strong>window</strong> of elements and update the answer incrementally as the window slides — <strong>O(n)</strong>. Fixed-size windows slide uniformly; variable-size windows expand and shrink based on a condition.',
          why: 'Any time the problem asks about a <strong>contiguous subarray</strong> — maximum sum, longest substring meeting a condition — brute force is <strong>O(n²)</strong> or worse. Sliding window avoids recomputing from scratch by maintaining running state and updating it as the window moves.',
          how: 'For a <strong>fixed window</strong>: advance both left and right together, keeping window size constant. For a <strong>variable window</strong>: expand right until the window violates a condition, then shrink left until valid again. At each step, update your answer from the current window state in <strong>O(n)</strong>.',
          complexity: { time: 'O(n)', space: 'O(k) where k is window size or alphabet' },
          signals: [
            '"Maximum or minimum sum subarray of size k"',
            '"Longest substring with at most k distinct characters"',
            '"Find smallest subarray with sum ≥ target"',
            '"Minimum window substring containing all characters of a pattern"',
          ],
          keyProperties: [
            'Window is always a contiguous range [left, right] — both pointers only move forward',
            'Fixed window: right - left + 1 == k always. Variable window: size changes based on a condition.',
            'A hash map or Counter often tracks the state inside the window',
            'The window never shrinks from the right — left only ever chases right',
          ],
          useCases: [
            'Maximum sum subarray of size k',
            'Longest substring without repeating characters',
            'Minimum window substring containing all characters of a target string',
            'Longest subarray with sum at most k',
          ],
          code: `# Fixed window: max sum of k consecutive elements
def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    best = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        best = max(best, window_sum)
    return best

# Variable window: longest substring without repeating chars
def length_of_longest_substring(s):
    seen = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1    # shrink window past duplicate
        seen[ch] = right
        best = max(best, right - left + 1)
    return best`,
          keyInsight: {
            heading: 'Expand right freely, shrink left as soon as the window violates the condition — both pointers only move forward, so the total cost is <strong>O(n)</strong>.',
            body: "Fixed window: advance both ends together, keep size constant. Variable window: expand right until the constraint breaks, then shrink left until valid again. The invariant: at every moment, the window either satisfies your condition or you're in the process of restoring it. Pair with a Counter or dict to track state inside the window. Most variable-window problems need one.",
          },
          connections: {
            prereqs: ['Arrays', 'Hash Maps & Sets', 'Two Pointers'],
            unlocks: [],
            related: ['Two Pointers', 'Fast & Slow Pointers', 'Hash Maps & Sets'],
          },
        },
      },
      {
        id: 'fast-slow',
        label: 'Fast & Slow Pointers',
        content: {
          analogy: "Two runners on a circular track, one twice as fast. If the track loops, the fast runner will eventually lap the slow one — they will meet. If the track is a straight line, the fast runner just reaches the end. This is Floyd's cycle detection: fast moves two steps, slow moves one — they either meet (cycle) or fast exits (no cycle).",
          what: "Fast and slow pointers (Floyd's tortoise and hare) use two pointers moving at different speeds. The <strong>fast pointer</strong> moves two steps per iteration; the <strong>slow pointer</strong> moves one. If there is a <strong>cycle</strong>, they meet. If there is not, the fast pointer reaches None first. This also finds the <strong>middle</strong> of a linked list in one pass.",
          why: 'Detecting a <strong>cycle</strong> naively requires storing all visited nodes — <strong>O(n)</strong> space. Fast and slow pointers detect cycles in O(n) time with <strong>O(1)</strong> space. When fast reaches the end, slow is exactly at the midpoint — no extra pass needed.',
          how: 'Initialize both pointers at the <strong>head</strong>. Each iteration: move slow one step, fast two steps. If fast or fast.next is None — no cycle. If slow == fast — <strong>cycle</strong> detected. For finding the middle: when fast is None, slow is at the <strong>midpoint</strong>.',
          complexity: { time: 'O(n)', space: 'O(1)' },
          signals: [
            '"Detect a cycle in a linked list"',
            '"Find the middle of a linked list"',
            '"Find the start of a cycle"',
            '"Happy number" or any problem with repeated state detection',
          ],
          keyProperties: [
            'Fast moves 2 steps, slow moves 1 — if a cycle exists, they will always meet',
            'Meeting point is not the cycle start — a second pass from head finds the start',
            'When fast = None, slow = middle of the linked list',
            'Applicable to any sequence with potential cycles, not just linked lists',
          ],
          useCases: [
            'Linked list cycle detection',
            'Find the start of the cycle in a linked list',
            'Find the middle of a linked list (to split for merge sort on lists)',
            'Happy number — detect when the digit-squaring sequence cycles',
          ],
          code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Cycle detection
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find middle of linked list
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow   # slow is at middle when fast exits`,
          keyInsight: {
            heading: 'If a cycle exists, fast (2 steps) and slow (1 step) will always meet inside it.',
            body: "When fast reaches None, slow is exactly at the midpoint — use this to split a linked list in one pass. The meeting point is not the cycle start. To find the cycle entrance: reset slow to head, advance both one step at a time, and they meet at the entrance. Works on any repeated-state sequence, not just linked lists — the Happy Number problem uses the same pattern.",
          },
          connections: {
            prereqs: ['Linked Lists', 'Two Pointers'],
            unlocks: [],
            related: ['Two Pointers', 'Linked Lists', 'Sliding Window'],
          },
        },
      },
      {
        id: 'merge-intervals',
        label: 'Merge Intervals',
        content: {
          analogy: 'You have meeting slots on a calendar: 9-11am, 10-12pm, 2-3pm, 2:30-4pm. Some overlap. You want the merged blocks — when are you actually busy? Sort by start time, walk through, and merge any slot that starts before the previous one ends.',
          what: '<strong>Merge intervals</strong> is a pattern for problems involving <strong>overlapping ranges</strong>. <strong>Sort</strong> the intervals by start time, then iterate — if the current interval <strong>overlaps</strong> with the last merged one (current.start <= last.end), extend the last one. Otherwise, add the current interval as a new block.',
          why: 'Without sorting, detecting which intervals overlap requires comparing every pair — <strong>O(n²)</strong>. Sorting by start time allows a single linear pass: you only need to compare each interval with the one immediately before it.',
          how: '<strong>Sort</strong> intervals by start time in <strong>O(n log n)</strong>. Initialize result with the first interval. For each subsequent interval: if it <strong>overlaps</strong> with result[-1] (current.start <= result[-1].end), merge by setting result[-1].end = max(result[-1].end, current.end). Otherwise append as a new interval.',
          complexity: { time: 'O(n log n)', space: 'O(n)' },
          signals: [
            '"Merge overlapping intervals"',
            '"Find all non-overlapping intervals"',
            '"Insert a new interval into a sorted list"',
            '"Meeting rooms — can all meetings fit? How many rooms needed?"',
          ],
          keyProperties: [
            'Sort by start time first — the linear merge only works after sorting',
            'Overlap condition: current.start <= previous.end (they share at least one point)',
            'Merge by taking max of end times — the merged end is the furthest-reaching end',
            'Insert interval variant: split into before, overlapping, and after groups',
          ],
          useCases: [
            'Merging calendar events or time blocks into contiguous busy periods',
            'Finding free time slots in a schedule',
            'Minimum meeting rooms — how many rooms are needed at peak overlap?',
            'Interval intersection — find where two interval lists overlap',
          ],
          code: `def merge_intervals(intervals):
    if not intervals:
        return []
    intervals.sort(key=lambda x: x[0])  # sort by start
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:       # overlap
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

# Insert new interval into sorted non-overlapping list
def insert_interval(intervals, new_interval):
    result = []
    i = 0
    while i < len(intervals) and intervals[i][1] < new_interval[0]:
        result.append(intervals[i]); i += 1
    while i < len(intervals) and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    result.extend(intervals[i:])
    return result`,
          keyInsight: {
            heading: 'Sort by start time first — then detecting overlap is a single left-to-right scan in <strong>O(n)</strong>.',
            body: "Two intervals overlap if and only if the next interval's start ≤ current merged end. When they overlap, extend the end to max(current end, next end) — don't assume the later interval always has the larger end. One pass after sorting: O(n log n) total. Without sorting first, detecting overlaps requires O(n²) pairwise comparisons.",
          },
          connections: {
            prereqs: ['Arrays', 'Sorting', 'Greedy Algorithms'],
            unlocks: [],
            related: ['Sorting', 'Greedy Algorithms', 'Two Pointers'],
          },
        },
      },
      {
        id: 'bfs-dfs',
        label: 'BFS & DFS',
        content: {
          analogy: 'BFS is like dropping a stone in water — ripples spread outward level by level, reaching all points at distance 1 before distance 2. DFS is like exploring a cave with a single flashlight — go as deep as you can down one tunnel before backtracking and trying the next. Both visit every node; the order and data structure differ.',
          what: '<strong>BFS</strong> (Breadth-First Search) and <strong>DFS</strong> (Depth-First Search) are the two fundamental graph and tree traversal algorithms. BFS uses a <strong>queue</strong> to explore nodes level by level, guaranteeing the <strong>shortest path</strong> in unweighted graphs. DFS uses a <strong>stack</strong> (or recursion) to explore as deep as possible before backtracking. Both visit every reachable node in <strong>O(V + E)</strong>.',
          why: 'Most graph and tree problems reduce to: visit every node, find a path, or determine reachability. <strong>BFS</strong> finds <strong>shortest paths</strong> in unweighted graphs. <strong>DFS</strong> is natural for exploring all paths, detecting <strong>cycles</strong>, and topological ordering.',
          how: '<strong>BFS</strong>: add start to a <strong>queue</strong> and <strong>visited</strong> set. Loop: dequeue a node, process it, add unvisited neighbors to the queue. <strong>DFS</strong>: call recursively (or use a stack) — mark as visited, process, recurse on unvisited neighbors. Always maintain a <strong>visited</strong> set for graphs (trees do not need one since there are no cycles).',
          complexity: { time: 'O(V + E)', space: 'O(V)' },
          signals: [
            '"Shortest path" or "minimum steps" in an unweighted graph → BFS',
            '"All paths" or "can we reach X?" → DFS',
            '"Level by level" processing → BFS',
            '"Connected components" or "number of islands" → either BFS or DFS',
          ],
          keyProperties: [
            'BFS: queue (deque) + visited set. Guarantees shortest path in unweighted graphs.',
            'DFS: recursion or explicit stack + visited set. Natural for trees (no visited set needed).',
            'Level-order traversal = BFS. Inorder / preorder / postorder = DFS.',
            'Both run in O(V + E) — the difference is traversal order, not total work.',
          ],
          useCases: [
            'Shortest path in an unweighted graph (BFS)',
            'Detecting cycles in directed or undirected graphs (DFS)',
            'Connected components — count islands, friend groups, regions',
            'Level-order tree traversal (BFS), tree height or diameter (DFS)',
          ],
          code: `from collections import deque

graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}

# BFS — level by level
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS — recursive
def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Number of islands (grid BFS/DFS)
def num_islands(grid):
    count = 0
    def sink(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            sink(r+dr, c+dc)
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                count += 1; sink(r, c)
    return count`,
          keyInsight: {
            heading: 'Queue gives you BFS (shortest path). Stack or recursion gives you DFS. The data structure is the algorithm.',
            body: 'BFS visits level by level and finds shortest path in unweighted graphs. DFS explores deep before backtracking — use it for path existence, cycle detection, and all paths. BFS space is O(width), DFS space is O(height) — for wide trees, DFS wins on memory; for deep trees, BFS does. Grid problems are BFS/DFS where each cell has up to 4 neighbors.',
          },
          connections: {
            prereqs: ['Graphs', 'Trees', 'Stacks & Queues', 'Recursion & D&C'],
            unlocks: ['Topological Sort', 'Union-Find'],
            related: ['Graphs', 'Trees', 'Topological Sort'],
          },
        },
      },
      {
        id: 'topological-sort',
        label: 'Topological Sort',
        content: {
          analogy: 'Getting dressed in the morning: socks before shoes, underwear before pants, shirt before jacket. There is a dependency order — some items must come before others. Topological sort takes a directed graph of dependencies and outputs a valid ordering where every dependency comes before the thing that depends on it.',
          what: "<strong>Topological sort</strong> produces a linear ordering of nodes in a <strong>Directed Acyclic Graph (DAG)</strong> such that for every directed edge A → B, A appears before B. It only works on DAGs — any <strong>cycle</strong> makes a valid ordering impossible. Two algorithms: <strong>DFS</strong>-based (add to stack after exploring all descendants) and Kahn's algorithm (BFS-based, uses <strong>in-degree</strong> counts).",
          why: 'Whenever you have tasks with <strong>dependencies</strong> — course prerequisites, build systems, job scheduling — you need to determine a valid execution order. Topological sort gives you exactly that in <strong>O(V + E)</strong>.',
          how: "Kahn's algorithm: count incoming edges (<strong>in-degree</strong>) for each node. Add all nodes with in-degree 0 to a <strong>queue</strong>. Repeatedly dequeue a node, add to result, decrement in-degree for its neighbors — adding any that reach 0 to the queue. If the result contains all nodes, a valid ordering exists. Otherwise, a <strong>cycle</strong> exists.",
          complexity: { time: 'O(V + E)', space: 'O(V + E)' },
          signals: [
            '"Course prerequisite" ordering problems',
            '"Task scheduling with dependencies"',
            '"Build order" or "compilation order"',
            'Detect a cycle in a directed graph',
          ],
          keyProperties: [
            'Only works on DAGs — a cycle means no valid topological ordering exists',
            "If not all nodes appear in output, a cycle was detected (Kahn's cycle detection)",
            'Multiple valid orderings may exist — any ordering satisfying all edges is correct',
            'DFS approach: add node to result stack when all its descendants are finished',
          ],
          useCases: [
            'Course schedule — can you finish all courses given prerequisites?',
            'Build systems — determine compilation order from module dependencies',
            'Task scheduling — order tasks so all dependencies run first',
            'Detecting cycles in a directed graph',
          ],
          code: `from collections import deque, defaultdict

def topological_sort(n, edges):
    graph = defaultdict(list)
    in_degree = [0] * n
    for a, b in edges:       # a must come before b
        graph[a].append(b)
        in_degree[b] += 1

    queue = deque([i for i in range(n) if in_degree[i] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == n else []  # [] means cycle exists

# Course Schedule
def can_finish(num_courses, prerequisites):
    return len(topological_sort(num_courses, prerequisites)) == num_courses`,
          keyInsight: {
            heading: "Topological sort only works on DAGs — a cycle means no valid ordering exists, and Kahn's detects it automatically.",
            body: "Kahn's algorithm: start with all in-degree-0 nodes, remove them, decrement successor in-degrees, repeat. Nodes remaining at the end = cycle detected. DFS-based: after visiting all descendants of a node, append it to results; reverse at the end. Signal words: prerequisites, build order, task dependencies, course schedule.",
          },
          connections: {
            prereqs: ['Graphs', 'BFS & DFS', 'Stacks & Queues'],
            unlocks: [],
            related: ['Graphs', 'BFS & DFS', 'Union-Find'],
          },
        },
      },
      {
        id: 'union-find',
        label: 'Union-Find',
        content: {
          analogy: 'Tracking groups of people: two people are in the same group if they are directly connected or connected through mutual friends. As you add connections, you merge groups. To check if two people are in the same group, find the leader of each group and see if they match. That is Union-Find.',
          what: "<strong>Union-Find</strong> (Disjoint Set Union, DSU) tracks which elements belong to the same group (component). It supports two operations: <strong>find(x)</strong> — returns the root/representative of x's group, and <strong>union(x, y)</strong> — merges the groups of x and y. With <strong>path compression</strong> and <strong>union by rank</strong>, both operations are effectively <strong>O(1)</strong> amortized.",
          why: 'Checking <strong>connectivity</strong> between elements naively requires graph traversal — <strong>O(V + E)</strong> per query. Union-Find answers "are these two elements connected?" in nearly <strong>O(1)</strong> amortized time after O(n) initialization. It is the right tool for dynamic connectivity problems.',
          how: 'Initialize parent[i] = i for each element. <strong>find(x)</strong>: follow parent pointers to the root — with <strong>path compression</strong>, point every visited node directly to the root. <strong>union(x, y)</strong>: find roots of both; link the smaller tree under the larger one (<strong>union by rank</strong>) to keep the structure flat.',
          complexity: { time: 'O(α(n)) ≈ O(1) amortized', space: 'O(n)' },
          signals: [
            '"Number of connected components"',
            '"Detect a cycle in an undirected graph"',
            '"Are these two nodes in the same group?"',
            '"Redundant connection" — find the edge that creates a cycle',
          ],
          keyProperties: [
            'Path compression: after find(), point every visited node directly to the root — flattens the tree',
            'Union by rank: always attach smaller tree under larger — prevents degenerate tall trees',
            'Combined, both optimizations give amortized O(α(n)) — effectively constant for all practical n',
            'Cannot separate merged groups — Union-Find is append-only',
          ],
          useCases: [
            'Number of connected components in a graph',
            'Detecting cycles in undirected graphs',
            "Kruskal's minimum spanning tree algorithm",
            'Friend circles or social network grouping',
          ],
          code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False     # already connected
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

# Count connected components
def count_components(n, edges):
    uf = UnionFind(n)
    for a, b in edges:
        uf.union(a, b)
    return len({uf.find(i) for i in range(n)})`,
          keyInsight: {
            heading: 'Path compression makes find() near-O(1): parent[x] = find(parent[x]) — one line that flattens the entire tree.',
            body: "Two operations: find(x) returns the root of x's component; union(x, y) merges the two components. Without optimizations, O(n) per operation. With path compression + union by rank, O(α(n)) ≈ O(1) in practice. Signal words: connected components, cycle detection in undirected graphs, groups that merge over time.",
          },
          connections: {
            prereqs: ['Graphs', 'BFS & DFS', 'Arrays'],
            unlocks: [],
            related: ['Graphs', 'BFS & DFS', 'Topological Sort'],
          },
        },
      },
      {
        id: 'monotonic-stack',
        label: 'Monotonic Stack',
        content: {
          analogy: 'A line of people and you want to know, for each person, who is the next taller person ahead. As you walk through, you maintain a list of candidates — people who have not found their answer yet. When you see a taller person, they are the answer for everyone shorter at the back of your list. You pop those people off and record the answer. The candidate list always stays in order — that is the monotonic invariant.',
          what: 'A <strong>monotonic stack</strong> maintains elements in strictly increasing or strictly decreasing order. When a new element violates that order, elements are popped until order is restored — and the moment of popping is when answers are computed. It solves "next greater or smaller element" problems in <strong>O(n)</strong> instead of <strong>O(n²)</strong>.',
          why: 'Finding the next greater element naively requires checking every subsequent element for each element — <strong>O(n²)</strong>. A <strong>monotonic stack</strong> processes each element at most twice (once pushed, once popped), making it <strong>O(n)</strong>. Any problem about the nearest element that is larger or smaller than the current one is a monotonic stack problem.',
          how: 'For <strong>next greater element</strong>: iterate through the array maintaining a <strong>stack</strong> of indices in decreasing order of their values. For each new element, pop all elements from the stack that are smaller — the current element is their answer. Push the current index. Elements still in the stack at the end have no greater element to their right.',
          complexity: { time: 'O(n)', space: 'O(n)' },
          signals: [
            '"Next greater element" or "next smaller element"',
            '"Previous greater element" or "previous smaller element"',
            '"Largest rectangle in histogram"',
            '"Daily temperatures" — days until a warmer day',
          ],
          keyProperties: [
            'Each element is pushed once and popped once — O(n) total work',
            'Monotonic decreasing stack → finds next greater elements. Monotonic increasing → next smaller.',
            'Store indices in the stack, not values — you need the index to compute distances',
            'Works on circular arrays by iterating 2n elements with modulo indexing',
          ],
          useCases: [
            'Daily Temperatures — for each day, how many days until a warmer temperature?',
            'Next Greater Element I and II (including circular arrays)',
            'Largest Rectangle in Histogram',
            'Trapping Rain Water',
          ],
          code: `# Next greater element for each position
def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []   # indices waiting for their answer

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]   # nums[i] is next greater for idx
        stack.append(i)

    return result   # indices still in stack have no next greater

# Daily Temperatures
def daily_temperatures(temps):
    result = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and t > temps[stack[-1]]:
            idx = stack.pop()
            result[idx] = i - idx   # days until warmer
        stack.append(i)
    return result`,
          keyInsight: {
            heading: 'Each element is pushed once and popped once — the inner while loop is still <strong>O(n)</strong> total.',
            body: "Store indices in the stack, not values — you need the index to compute distances like 'how many days until warmer.' A monotonic decreasing stack finds the next greater element for each popped item; a monotonic increasing stack finds next smaller. Popping happens when the invariant breaks — that's the moment you compute the answer for the popped element.",
          },
          connections: {
            prereqs: ['Stacks & Queues', 'Arrays', 'Intro to Patterns'],
            unlocks: [],
            related: ['Stacks & Queues', 'Sliding Window', 'Two Pointers'],
          },
        },
      },
      {
        id: 'prefix-sums',
        label: 'Prefix Sums',
        content: {
          analogy: 'An odometer on a road trip. Instead of measuring how far you drove each leg individually, you record the total mileage at every stop. To find the distance between any two stops, subtract the earlier reading from the later one — one calculation, no matter how many stops are in between.',
          what: 'A <strong>prefix sum array</strong> stores the cumulative sum at each index: <code>prefix[i] = nums[0] + ... + nums[i-1]</code>. With this table precomputed in one <strong>O(n)</strong> pass, the sum of any subarray <code>nums[l..r]</code> reduces to <code>prefix[r+1] - prefix[l]</code> — <strong>O(1)</strong> per query instead of O(n).',
          why: 'Subarray sum problems are rampant in interviews. Brute force computes every range from scratch — <strong>O(n²)</strong>. Prefix sums move that work upfront in one O(n) pass, then answer any range query in <strong>O(1)</strong>. Combined with a hash map, they also count subarrays meeting a sum condition without any nested loops.',
          how: 'Build <code>prefix[0..n]</code> where <code>prefix[0] = 0</code> and <code>prefix[i] = prefix[i-1] + nums[i-1]</code>. Range sum: <code>prefix[r+1] - prefix[l]</code>. For counting subarrays summing to k: track prefix sums in a hash map — at each index, check how many times <code>prefix[i] - k</code> has appeared.',
          complexity: { time: 'O(n) build, O(1) per query', space: 'O(n)' },
          signals: [
            '"Sum of any subarray" asked repeatedly — prefix sums give O(1) per query',
            '"Count subarrays that sum to k" — prefix sums + hash map',
            '"Pivot index where left sum equals right sum"',
            'Running total needed across multiple queries on the same static array',
          ],
          keyProperties: [
            'prefix[0] = 0 is the sentinel — handles subarrays starting at index 0 without a special case',
            'Range sum is prefix[r+1] - prefix[l] — get the off-by-one right',
            'For counting subarrays summing to k, use a defaultdict: "has prefix[i] - k appeared before?"',
            'Extends to 2D for grid problems: 2D prefix sums answer rectangle sum queries in O(1)',
          ],
          useCases: [
            'Subarray Sum Equals K — count subarrays with exact sum target',
            'Range Sum Query — precompute once, answer all queries in O(1)',
            'Find Pivot Index — where left sum equals right sum',
            'Product of Array Except Self — prefix products instead of prefix sums',
          ],
          code: `# Build prefix sum array
nums = [1, 2, 3, 4, 5]
prefix = [0] * (len(nums) + 1)
for i, x in enumerate(nums):
    prefix[i + 1] = prefix[i] + x

# O(1) range sum: sum of nums[l..r]
def range_sum(l, r):
    return prefix[r + 1] - prefix[l]

# Count subarrays summing to k
from collections import defaultdict

def subarray_sum(nums, k):
    count = 0
    running = 0
    seen = defaultdict(int)
    seen[0] = 1          # empty prefix
    for x in nums:
        running += x
        count += seen[running - k]
        seen[running] += 1
    return count`,
          keyInsight: {
            heading: 'Build prefix sums once in O(n), then answer any range sum query in <strong>O(1)</strong>.',
            body: 'prefix[0] = 0 is mandatory — it handles subarrays starting at index 0 without special cases. Range sum: prefix[r+1] - prefix[l]. Counting subarrays summing to k: use a defaultdict and check if (running_sum - k) has been seen. One pass, O(n). Whenever the same static array receives multiple range queries, prefix sums are the answer.',
          },
          connections: {
            prereqs: ['Arrays', 'Hash Maps & Sets'],
            unlocks: ['Sliding Window'],
            related: ['Sliding Window', 'Dynamic Programming', 'Arrays'],
          },
        },
      },
      {
        id: 'list-reversal',
        label: 'Reversal Patterns',
        content: {
          analogy: 'A group of people in a line who need to reverse their order. Instead of walking to new positions, two people at opposite ends swap places, then the next two in from each end swap, and so on until they meet in the middle. Nobody leaves the line — you just swap within it.',
          what: '<strong>In-place reversal</strong> manipulates pointers or indices directly on the existing structure — no auxiliary array. For <strong>linked lists</strong>, you iterate through and redirect each node\'s <code>next</code> pointer. For <strong>arrays</strong>, you swap symmetric elements from both ends inward. Space is always <strong>O(1)</strong>.',
          why: 'Problems involving reversals — whole lists, sublists, groups of k nodes — test pointer manipulation directly, which is a skill interviewers grade. The naive approach copies to a new structure. In-place reversal does the same work with <strong>O(1)</strong> space and forces you to think carefully about order-of-operations when redirecting pointers.',
          how: 'For a linked list: keep three pointers — <code>prev = None</code>, <code>curr = head</code>, <code>next_node</code>. Each step: save <code>curr.next</code>, point <code>curr.next</code> back to <code>prev</code>, advance both. When <code>curr</code> is None, <code>prev</code> is the new head. For a sublist reversal, locate the node before the start — it becomes the reconnection anchor.',
          complexity: { time: 'O(n)', space: 'O(1)' },
          signals: [
            '"Reverse a linked list" or "reverse a sublist from m to n"',
            '"Reverse nodes in k-group" — process the list in segments',
            '"Rotate a list by k positions"',
            '"Check if a linked list is a palindrome" — reverse the second half, compare',
          ],
          keyProperties: [
            'Three pointers are always enough: prev, curr, next — draw it out if stuck',
            'Order matters: save next_node before overwriting curr.next',
            'Sublist reversal needs the node before the sublist — it becomes the reconnection point',
            'Rotating by k = reversing parts of the list, not repeated shifting',
          ],
          useCases: [
            'Reverse Linked List — the foundational problem',
            'Reverse Linked List II — reverse from position m to n',
            'Reverse Nodes in k-Group',
            'Rotate List by k positions',
            'Palindrome Linked List — reverse second half and compare',
          ],
          code: `# Reverse entire linked list
def reverse_list(head):
    prev, curr = None, head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

# Reverse sublist from position left to right (1-indexed)
def reverse_between(head, left, right):
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next
    curr = prev.next
    for _ in range(right - left):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
    return dummy.next

# Reverse an array in-place
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1`,
          keyInsight: {
            heading: 'Save curr.next before overwriting it — forgetting this one step breaks the rest of the list.',
            body: 'Three pointers: prev = None, curr = head, next_node. Draw the before and after state first. For sublist reversal: find the node before the sublist (it becomes the anchor), reverse the sublist, reattach both ends. Rotate by k: reverse the whole list, reverse [0..k-1], reverse [k..n-1] — no shifting, just pointer operations.',
          },
          connections: {
            prereqs: ['Linked Lists', 'Arrays', 'Two Pointers'],
            unlocks: ['Fast & Slow Pointers'],
            related: ['Two Pointers', 'Fast & Slow Pointers'],
          },
        },
      },
      {
        id: 'binary-search-answer',
        label: 'Search on Answer Space',
        content: {
          analogy: "You lost your keys somewhere in your house. You don't check every room sequentially — you pick the middle, look, and based on whether the keys could be there, eliminate half the house. Modified binary search applies this halving to cases where the target is not a specific value, but a condition that is either satisfied or not — and once it flips, it never flips back.",
          what: 'Standard binary search finds a value in a sorted array. <strong>Modified binary search</strong> applies the same halving logic to: rotated sorted arrays, finding the first or last position satisfying a condition, or searching over a range of <strong>possible answers</strong> to an optimization problem. If a function is <strong>monotonic</strong> — false for small values and true from some threshold onward — binary search finds the transition in <strong>O(log n)</strong>.',
          why: 'Linear scan is O(n). Whenever a function is monotonic over a search space, binary search reduces it to <strong>O(log n)</strong>. This applies not just to sorted arrays but to any problem where you can define a predicate and check it in O(f(n)) — total cost becomes O(f(n) × log n).',
          how: 'Identify what you are searching over (array indices, or a range of possible answer values). Define the <strong>monotonic predicate</strong>. Set <code>lo</code> and <code>hi</code> to the extremes. At each <code>mid</code>, evaluate the predicate. If satisfied, record <code>mid</code> as a candidate and narrow toward smaller values. The loop exits when the search space collapses.',
          complexity: { time: 'O(log n) on arrays; O(log(range) × f(n)) for answer-space search', space: 'O(1)' },
          signals: [
            '"Find first or last occurrence of a value"',
            '"Search in a rotated sorted array" — one half is always fully sorted',
            '"Minimum capacity / speed / days to complete task" — minimize-the-maximum pattern',
            'Any problem where you can check "is answer ≤ x feasible?" in O(n)',
          ],
          keyProperties: [
            'Monotonicity is the requirement — once the condition flips, it never flips back',
            'Off-by-one errors are common: know when to use lo < hi vs lo <= hi, and mid vs mid + 1',
            'Rotated array: one half is always fully sorted — determine which half, then decide where target lies',
            'Binary search on answer: lo = minimum possible, hi = maximum possible; search for the boundary',
          ],
          useCases: [
            'Search in Rotated Sorted Array',
            'Find Minimum in Rotated Sorted Array',
            'First Bad Version / find leftmost or rightmost position',
            'Koko Eating Bananas — minimize eating speed that finishes in h hours',
            'Capacity to Ship Packages — minimize weight limit that ships all packages in d days',
          ],
          code: `# Find leftmost position of target
def search_left(nums, target):
    lo, hi = 0, len(nums) - 1
    result = -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            result = mid
            hi = mid - 1    # keep searching left for first occurrence
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# Search in rotated sorted array
def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:       # left half is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                            # right half is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

# Binary search on answer: min speed to finish in h hours (Koko)
def min_eating_speed(piles, h):
    def can_finish(speed):
        return sum((p + speed - 1) // speed for p in piles) <= h
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid        # mid works — try smaller
        else:
            lo = mid + 1
    return lo`,
          keyInsight: {
            heading: "If you can ask 'is X feasible?' with a monotonic yes/no answer, <strong>binary search over X</strong>.",
            body: "lo = minimum possible answer, hi = maximum possible answer. The predicate is the entire logic — get that right and the template handles the rest. Rotated array: one half is always fully sorted; check which half, then determine if target lies in it. When the predicate costs O(n), the total is O(n log(range)) — that's why min/max capacity problems have O(n × log(max_val)) solutions.",
          },
          connections: {
            prereqs: ['Binary Search', 'Arrays', 'Sorting'],
            unlocks: [],
            related: ['Binary Search', 'Greedy Algorithms', 'Sliding Window'],
          },
        },
      },
      {
        id: 'two-heaps',
        label: 'Two Heaps',
        content: {
          analogy: "A company tracks salaries split into two teams — the lower half and the upper half. The lower team's manager always knows the highest salary in her group. The upper team's manager always knows the lowest salary in his group. The median is always held by one of those two managers — you never need to look at everyone.",
          what: '<strong>Two heaps</strong> maintains a <strong>max-heap</strong> for the lower half of a data stream and a <strong>min-heap</strong> for the upper half. By keeping sizes balanced — max-heap has equal or one more element — the <strong>median</strong> is always the max-heap\'s root, or the average of both roots. No re-sorting needed after each insertion.',
          why: 'Finding the median of a stream after each insertion is O(n log n) naively — sort every time. Two heaps achieves <strong>O(log n) per insertion</strong> and <strong>O(1) per median query</strong>. The pattern also applies wherever you need simultaneous access to the largest element of the lower half and the smallest of the upper half.',
          how: 'Insert: if <code>num ≤ max_heap.top</code>, push to the max-heap; otherwise push to the min-heap. Rebalance so sizes differ by at most 1 — move the root of the larger heap to the smaller. Median: if sizes are equal, average both tops; if max-heap is larger, its top is the median.',
          complexity: { time: 'O(log n) insert, O(1) find median', space: 'O(n)' },
          signals: [
            '"Median of a data stream"',
            '"Sliding window median"',
            'Need simultaneous access to the max of the lower half and the min of the upper half',
            '"Maximize capital" — scheduling problems where you pick the best available option below a threshold',
          ],
          keyProperties: [
            'Python heapq is a min-heap — negate values to simulate a max-heap for the lower half',
            'After every insertion, rebalance: |len(lo) - len(hi)| must stay ≤ 1',
            'Invariant: max_heap.top ≤ min_heap.top — verify after every push and rebalance',
            'Sliding window median extends this by removing elements that leave the window',
          ],
          useCases: [
            'Find Median from Data Stream',
            'Sliding Window Median',
            'IPO — maximize profit by choosing available projects within budget',
          ],
          code: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []   # max-heap (negate values)
        self.hi = []   # min-heap

    def add_num(self, num):
        heapq.heappush(self.lo, -num)

        # Invariant: max of lo must not exceed min of hi
        if self.lo and self.hi and (-self.lo[0]) > self.hi[0]:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))

        # Rebalance sizes
        if len(self.lo) > len(self.hi) + 1:
            heapq.heappush(self.hi, -heapq.heappop(self.lo))
        elif len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def find_median(self):
        if len(self.lo) > len(self.hi):
            return float(-self.lo[0])
        return (-self.lo[0] + self.hi[0]) / 2.0`,
          keyInsight: {
            heading: 'Two heaps maintain the running median: a max-heap for the lower half, a min-heap for the upper half.',
            body: "Invariant: max_heap.top ≤ min_heap.top. If this breaks after an insert, move the offending root to the other heap. After every insert, rebalance so |len(lo) - len(hi)| ≤ 1. The heap with more elements holds the median when sizes are unequal. Python's heapq is a min-heap — negate values going into the lower-half heap.",
          },
          connections: {
            prereqs: ['Heaps & Priority Queues', 'Sorting'],
            unlocks: [],
            related: ['Heaps & Priority Queues', 'Sliding Window'],
          },
        },
      },
      {
        id: 'cyclic-sort',
        label: 'Cyclic Sort',
        content: {
          analogy: 'A shuffled deck of numbered cards (1 through n). Each card tells you exactly where it belongs — card 3 goes in position 3. Just put each card where it says until everything is in place. No comparisons needed, only placements. When you are done, any card still out of place is either a duplicate or evidence of a missing number.',
          what: '<strong>Cyclic sort</strong> is an O(n) in-place algorithm for arrays containing numbers in a known range — typically [1..n] or [0..n-1]. Each element is swapped to its correct index. After one pass, any element still out of place signals a <strong>missing number</strong> or <strong>duplicate</strong>.',
          why: 'Finding missing or duplicate numbers in a bounded range can use a hash set (O(n) space) or sorting (O(n log n)). Cyclic sort achieves <strong>O(n) time and O(1) space</strong> by exploiting the constraint that values map directly to indices — each element already "knows" where it belongs.',
          how: 'Walk index i from 0 to n-1. While <code>nums[i]</code> is not at its correct position (<code>nums[i] - 1 ≠ i</code> for a [1..n] array), swap it there. But if <code>nums[i] == nums[nums[i]-1]</code>, stop — that is a duplicate. After the full pass, scan once for any index where <code>nums[i] ≠ i + 1</code>.',
          complexity: { time: 'O(n) — each element is placed at most once', space: 'O(1)' },
          signals: [
            '"Find the missing number" in an array of [1..n]',
            '"Find all duplicates" in an array where values are in [1..n]',
            '"First missing positive integer"',
            'Array values are in a bounded, known range where values map to indices',
          ],
          keyProperties: [
            'Only works when values map directly to indices — range [1..n] or [0..n-1] must be known',
            'Each swap moves at least one element to its final position — the while loop terminates in O(n) total',
            'Skip swapping when nums[i] == nums[nums[i]-1] — that is a duplicate, not a misplaced element',
            'After the sort pass, one more scan finds all out-of-place values',
          ],
          useCases: [
            'Missing Number (LeetCode 268)',
            'Find All Duplicates in an Array',
            'Find the Duplicate Number',
            'First Missing Positive',
          ],
          code: `# Cyclic sort for values in [1..n]
def cyclic_sort(nums):
    i = 0
    while i < len(nums):
        j = nums[i] - 1          # correct index for nums[i]
        if nums[i] != nums[j]:
            nums[i], nums[j] = nums[j], nums[i]
        else:
            i += 1

# Find all missing numbers in [1..n]
def find_missing_numbers(nums):
    cyclic_sort(nums)
    return [i + 1 for i in range(len(nums)) if nums[i] != i + 1]

# Find the duplicate number
def find_duplicate(nums):
    i = 0
    while i < len(nums):
        j = nums[i] - 1
        if nums[i] != i + 1:
            if nums[i] != nums[j]:   # swap to correct position
                nums[i], nums[j] = nums[j], nums[i]
            else:
                return nums[i]       # same value already at j — it's the duplicate
        else:
            i += 1`,
          keyInsight: {
            heading: 'When values map directly to indices — range [1..n] — you can sort in <strong>O(n)</strong> without comparisons.',
            body: 'At each index i, while nums[i] is out of place, swap it to position nums[i]-1. The while loop is key — one swap is often not enough. Skip swapping if nums[i] == nums[nums[i]-1]: identical values means you found a duplicate, not a misplaced element. After the full pass, scan once: any index where nums[i] != i+1 is your answer (missing number or duplicate).',
          },
          connections: {
            prereqs: ['Arrays', 'Sorting'],
            unlocks: [],
            related: ['Arrays', 'Binary Search'],
          },
        },
      },
      {
        id: 'k-way-merge',
        label: 'K-way Merge',
        content: {
          analogy: 'Three friends each hand you a sorted deck of cards one at a time. To merge into one sorted deck, look at the top card from each friend, take the smallest, and ask that friend for their next card. A min-heap always knows who holds the current minimum — you never compare more than k cards at once.',
          what: '<strong>K-way merge</strong> uses a <strong>min-heap</strong> to merge k sorted arrays or lists in <strong>O(n log k)</strong> time, where n is the total number of elements. The heap holds one candidate per source — always the current minimum of each list. Pop the minimum, append to result, push the next element from the same source.',
          why: 'Merging k sorted arrays by repeated pairwise merge takes <strong>O(nk)</strong> total work. A heap-based approach reduces this to <strong>O(n log k)</strong> — the heap size is k throughout, so each push and pop is O(log k), and there are n total operations. This also handles k sorted linked lists without converting them to arrays.',
          how: 'Push the first element of each list into a min-heap as tuples: <code>(value, list_index, element_index)</code>. Pop the minimum, append to result, push the next element from that same source list. The source index inside the tuple tells you which list to draw from. Repeat until the heap is empty.',
          complexity: { time: 'O(n log k) where n = total elements, k = number of lists', space: 'O(k) for the heap' },
          signals: [
            '"Merge k sorted lists or arrays"',
            '"Kth smallest element in a sorted matrix"',
            '"Smallest range covering elements from k lists"',
            '"Sort a nearly-sorted array where each element is at most k positions from sorted position"',
          ],
          keyProperties: [
            'Heap holds exactly one candidate per source — size stays at k throughout',
            'Tuple must include source index so you know which list to pull from when popping',
            'For linked lists: push (node.val, list_index, node) and follow node.next after each pop',
            'Kth smallest in a sorted matrix = k-way merge over n sorted rows',
          ],
          useCases: [
            'Merge K Sorted Lists',
            'Kth Smallest Element in a Sorted Matrix',
            'Smallest Range Covering Elements from K Lists',
            'Sort a Nearly Sorted Array',
          ],
          code: `import heapq

# Merge k sorted arrays
def merge_k_sorted(arrays):
    heap = []
    for i, arr in enumerate(arrays):
        if arr:
            heapq.heappush(heap, (arr[0], i, 0))

    result = []
    while heap:
        val, arr_i, elem_i = heapq.heappop(heap)
        result.append(val)
        if elem_i + 1 < len(arrays[arr_i]):
            next_val = arrays[arr_i][elem_i + 1]
            heapq.heappush(heap, (next_val, arr_i, elem_i + 1))
    return result

# Merge k sorted linked lists
def merge_k_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = curr = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
          keyInsight: {
            heading: 'A heap of size k merges k sorted lists in <strong>O(n log k)</strong> — it holds exactly one candidate per source.',
            body: 'Tuple format: (value, source_index, element_index). Seed the heap with the first element from every source. Loop: pop the minimum, append to result, push the next element from that same source. The heap never grows beyond k entries. Kth smallest in a sorted matrix uses the same pattern: treat each row as a sorted source.',
          },
          connections: {
            prereqs: ['Heaps & Priority Queues', 'Sorting', 'Linked Lists'],
            unlocks: [],
            related: ['Heaps & Priority Queues', 'Merge Intervals'],
          },
        },
      },
    ],
  },
  {
    id: 'the-connection',
    label: 'The Connection',
    subsections: [
      {
        id: 'pattern-recognition',
        label: 'Pattern Recognition Framework',
        content: {
          analogy: 'A doctor does not run every test on every patient. They listen to symptoms, notice patterns, and form a hypothesis. Interview problems work the same way — the problem statement gives symptoms, and your job is to diagnose the pattern before running any code.',
          what: '<strong>Pattern recognition</strong> is the skill of reading a problem statement and identifying which algorithmic <strong>pattern</strong> or <strong>data structure</strong> it maps to — before starting to code. It involves reading signal words, noting constraints, and matching the problem shape to a known solution shape.',
          why: 'Jumping straight into code without recognizing the <strong>pattern</strong> leads to brute force solutions and dead ends. The first few minutes of any interview should be <strong>pattern recognition</strong>, not code. Naming the pattern correctly tells you the approach, the <strong>time complexity</strong> target, and the <strong>data structures</strong> you will need.',
          how: 'Read the problem and note: What is the input shape (sorted array, linked list, graph)? What does the problem ask for (a count, a subarray, a path, all possibilities)? What <strong>constraints</strong> are given (size k, at most k, return true/false)? Map these to the <strong>pattern</strong> signal list until one fits.',
          complexity: { time: 'O(1) — pattern matching is a mental skill', space: 'O(1)' },
          keyProperties: [
            '"Find a pair that sums to X in sorted input" → Two Pointers',
            '"Contiguous subarray with condition" → Sliding Window',
            '"All valid arrangements / combinations" → Backtracking',
            '"Dependencies, ordering, prerequisites" → Topological Sort',
            '"Shortest path, minimum steps" → BFS',
            '"Connected components, cycle detection" → Union-Find or DFS',
            '"Next greater / smaller element" → Monotonic Stack',
            '"Top K, always need min or max from changing data" → Heap',
          ],
          useCases: [
            'The first 2-3 minutes of any interview problem — name the pattern before writing code',
            'Post-problem debrief — identify which signals you missed and why',
            'Studying: group problems by pattern (not topic name) for faster generalization',
          ],
          code: `# Pattern recognition checklist — ask these questions first:
#
# 1. Input shape:
#    Sorted array?     → Two Pointers or Binary Search
#    Linked list?      → Fast & Slow Pointers
#    Tree or Graph?    → BFS or DFS
#    String?           → Sliding Window or Hash Map
#
# 2. What the problem asks for:
#    "All combinations"?  → Backtracking
#    "Shortest path"?     → BFS
#    "Min/Max of K"?      → Heap
#    "Valid ordering"?    → Topological Sort
#
# 3. Constraints as clues:
#    "At most K distinct"?  → Sliding Window
#    "Sum equals target"?   → Two Pointers or Hash Map
#    "Overlapping ranges"?  → Merge Intervals`,
          connections: {
            prereqs: ['Intro to Patterns', 'Intro to Algorithms'],
            unlocks: [],
            related: ['Choosing the Right DS', 'Interview Strategy', 'Complexity Trade-offs'],
          },
        },
      },
      {
        id: 'choosing-ds',
        label: 'Choosing the Right DS',
        content: {
          analogy: 'A carpenter does not use a hammer for every job — screws need a screwdriver, precise cuts need a saw. Choosing the wrong tool wastes effort. In DSA, choosing the wrong data structure is the same mistake. The structure choice determines the complexity ceiling for every operation in your algorithm.',
          what: "Choosing the right <strong>data structure</strong> is the decision that most constrains your algorithm's performance. Every data structure makes some operations fast and others slow. Matching the operations your algorithm needs to the structure that makes those operations <strong>O(1)</strong> or <strong>O(log n)</strong> is the core skill.",
          why: 'A correct algorithm with the wrong <strong>data structure</strong> can be 100x slower than necessary. Recognizing that a problem needs <strong>O(1)</strong> lookup → hash map, O(1) insert/delete at both ends → deque, or <strong>O(log n)</strong> min access → heap eliminates whole classes of brute-force approaches.',
          how: 'Identify which operations your algorithm needs most frequently and what <strong>time complexity</strong> is acceptable. Look up which <strong>data structure</strong> provides that operation at the required complexity. Consider <strong>space complexity</strong> constraints secondarily.',
          complexity: { time: 'Decision is O(1) — only the operations that follow count', space: 'Varies by structure' },
          keyProperties: [
            'Need O(1) lookup by key → dict (hash map)',
            'Need O(1) membership testing → set (hash set)',
            'Need O(log n) min or max → heapq (min-heap)',
            'Need O(1) insert and delete at both ends → deque',
            'Need ordered hierarchy with fast search → BST or sorted list (sortedcontainers)',
            'Need to track groups / connectivity → Union-Find',
          ],
          useCases: [
            'Before writing any code, ask: which operations does my algorithm need most?',
            'If two data structures both work, pick the one matching your most frequent operation',
            'Recognize when changing the data structure eliminates a nested loop entirely',
          ],
          code: `# Quick reference: operation → best data structure
#
# O(1) lookup by key          → dict
# O(1) membership             → set
# O(1) push/pop at one end    → list (stack)
# O(1) push/pop at both ends  → deque
# O(log n) min/max access     → heapq (min-heap)
# O(log n) insert/delete      → sortedcontainers.SortedList
# O(n) ordered traversal      → sorted list or BST
#
# Common upgrades that eliminate nested loops:
#   list  → deque      (if you pop from front)
#   list  → set        (if you check membership repeatedly)
#   list  → dict       (if you look up elements by value)
#   O(n²) → hash map   (trade O(n) space for O(n) time)`,
          connections: {
            prereqs: ['Intro to Data Structures', 'Intro to Patterns'],
            unlocks: [],
            related: ['Pattern Recognition Framework', 'Complexity Trade-offs'],
          },
        },
      },
      {
        id: 'complexity-tradeoffs',
        label: 'Complexity Trade-offs',
        content: {
          analogy: 'Storage space and retrieval speed in a filing system. You can keep files in one big pile — easy to add, hard to find. Or sort them alphabetically — easy to find, hard to add. There is no free lunch: every choice that makes one operation faster typically makes another slower or uses more memory.',
          what: 'Every algorithm and data structure involves tradeoffs between <strong>time complexity</strong>, <strong>space complexity</strong>, and implementation complexity. Understanding these tradeoffs lets you make intentional choices rather than accidentally optimizing for the wrong thing.',
          why: 'Interviewers are often less interested in the fastest solution than in your ability to reason about <strong>tradeoffs</strong>. Being able to say "this approach is <strong>O(n)</strong> time but <strong>O(n)</strong> space — if memory is tight, we can trade back to <strong>O(n²)</strong> time and <strong>O(1)</strong> space" demonstrates real understanding.',
          how: 'For any algorithm, identify the dominant operation (the loop or recursion that runs most often) and count how many times it runs relative to input size n. This gives <strong>time complexity</strong>. Then count the extra memory you allocate (arrays, hash maps, stacks) relative to n. This gives <strong>space complexity</strong>.',
          complexity: { time: 'Varies by algorithm and structure', space: 'Varies by algorithm and structure' },
          keyProperties: [
            'Time-space tradeoff: caching results (memoization) trades O(n) space for dramatically faster time',
            'Preprocessing tradeoff: sorting takes O(n log n) upfront but enables O(n) or O(log n) operations later',
            'Worst-case vs average-case: hash maps are O(1) average but O(n) worst case',
            'In-place vs auxiliary: in-place saves space but may destroy input; auxiliary space is safer',
          ],
          useCases: [
            'Justify algorithm choices in an interview by naming the tradeoffs explicitly',
            'Identify when a space-for-time tradeoff (hash map) eliminates a nested loop',
            'Recognize when a memory constraint forces a specific approach',
          ],
          code: `# Common time-space tradeoffs:
#
# Two Sum:
#   Naive:    O(n^2) time, O(1) space  — nested loop
#   Optimal:  O(n)   time, O(n) space  — hash map
#
# Fibonacci:
#   Naive recursion:  O(2^n) time, O(n)  space  — recomputes
#   Memoized:         O(n)   time, O(n)  space  — cache results
#   Tabulated:        O(n)   time, O(n)  space  — bottom-up table
#   Space-optimized:  O(n)   time, O(1)  space  — two variables
#
# Finding duplicates:
#   Nested loop:      O(n^2) time, O(1) space
#   Sort then scan:   O(n log n) time, O(1) space
#   Hash set:         O(n)   time, O(n) space`,
          connections: {
            prereqs: ['Intro to Algorithms', 'Intro to Data Structures'],
            unlocks: [],
            related: ['Pattern Recognition Framework', 'Choosing the Right DS', 'Interview Strategy'],
          },
        },
      },
      {
        id: 'interview-strategy',
        label: 'Interview Strategy',
        content: {
          analogy: 'A surgeon does not pick up the scalpel the moment the patient enters the room. They review the case, confirm the plan, and prepare before operating. Coding interviews reward the same discipline: think before you code, communicate your reasoning, and solve methodically.',
          what: 'Interview strategy is the process framework for approaching a problem — from reading the prompt to delivering a working solution. It is separate from technical knowledge. Many candidates who know the right algorithm still underperform because they rush, skip steps, or fail to communicate. The <strong>UMPIRE</strong> framework structures this process.',
          why: 'Interviewers evaluate <strong>problem-solving process</strong>, not just the final answer. A candidate who talks through their thinking, catches their own bugs, and handles edge cases communicates competence even without a perfect solution. A candidate who codes silently in the wrong direction signals poor process.',
          how: 'Follow the <strong>UMPIRE</strong> framework: Understand (clarify inputs, outputs, constraints), Match (identify the pattern), Plan (outline the approach before coding), Implement (write clean code while narrating), Review (trace through an example), Evaluate (state <strong>time complexity</strong> and <strong>space complexity</strong> and possible improvements).',
          complexity: { time: 'O(interview length)', space: 'O(preparation)' },
          keyProperties: [
            'Never start coding without confirming you understand the problem — ask about edge cases first',
            'State your approach before implementing — the interviewer can redirect if you are on the wrong path',
            'Write clean, readable code — variable names matter, magic numbers are a red flag',
            'Test with a simple example by hand before declaring done — trace through your own code',
            'Always state the time and space complexity at the end — even approximate is better than silent',
          ],
          useCases: [
            'Every technical interview — apply the framework to every problem regardless of difficulty',
            'When stuck: verbalize where you are, ask clarifying questions, try a simpler version first',
            'When done: proactively identify limitations and improvements before the interviewer asks',
          ],
          code: `# UMPIRE framework — apply to every interview problem
#
# U — Understand
#     Read carefully. What is the input? The output?
#     What are the constraints? Edge cases (empty, single, duplicates)?
#
# M — Match
#     Name the pattern. "This looks like sliding window because..."
#
# P — Plan
#     Outline the algorithm in plain English before writing code.
#     State the expected time and space complexity.
#
# I — Implement
#     Write clean code. Name variables well. Narrate as you go.
#
# R — Review
#     Trace through your solution with a simple example by hand.
#     Check edge cases: empty input, single element, large n.
#
# E — Evaluate
#     State time and space complexity. Mention any improvements.`,
          connections: {
            prereqs: ['Pattern Recognition Framework', 'Intro to Patterns', 'Intro to Algorithms'],
            unlocks: [],
            related: ['Pattern Recognition Framework', 'Complexity Trade-offs', 'Choosing the Right DS'],
          },
        },
      },
      {
        id: 'python-tips',
        label: 'Python DSA Tips & Tricks',
        content: {
          tips: [
            {
              name: 'collections.defaultdict',
              description: 'A dict subclass that auto-initializes missing keys with a factory function — no more KeyError. In DSA this removes the "if key not in d" boilerplate that clutters frequency maps, adjacency lists, and grouping patterns.',
              code: `from collections import defaultdict

# Frequency map — no KeyError on first access
freq = defaultdict(int)
for ch in "abracadabra":
    freq[ch] += 1

# Adjacency list for a graph
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)

# Group words by length
groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)`,
            },
            {
              name: 'collections.Counter',
              description: 'Counts element frequencies in one line. Supports arithmetic between counters — add, subtract, intersect. Go-to for anagram checks, character frequency problems, and top-K frequency questions.',
              code: `from collections import Counter

c = Counter("anagram")
# Counter({'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1})

# Anagram check
Counter("listen") == Counter("silent")  # True

# Top 2 most common
c.most_common(2)  # [('a', 3), ('n', 1)]

# Subtract: find excess characters
diff = Counter("aab") - Counter("ab")
# Counter({'a': 1})`,
            },
            {
              name: 'collections.deque',
              description: 'A double-ended queue with O(1) append and popleft — unlike list where pop(0) is O(n) because it shifts every element. Use it for BFS, sliding window problems, and any pattern that needs both ends.',
              code: `from collections import deque

q = deque()
q.append(1)      # add right  — O(1)
q.appendleft(0)  # add left   — O(1)
q.popleft()      # remove left — O(1)  ← list.pop(0) is O(n)
q.pop()          # remove right — O(1)

# BFS template
queue = deque([start])
visited = {start}
while queue:
    node = queue.popleft()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)`,
            },
            {
              name: 'heapq',
              description: "Python's built-in min-heap. Push tuples to sort by priority. Negate values to simulate a max-heap — Python has no max-heap built in. Use for top-K, K closest, merge K sorted lists, and Dijkstra's algorithm.",
              code: `import heapq

h = []
heapq.heappush(h, 3)
heapq.heappush(h, 1)
heapq.heappush(h, 2)
heapq.heappop(h)   # 1 — always the minimum

# Max-heap: negate to flip order
heapq.heappush(h, -5)
-heapq.heappop(h)  # 5

# Top K elements
heapq.nlargest(3, nums)   # [largest, 2nd, 3rd]
heapq.nsmallest(3, nums)  # [smallest, 2nd, 3rd]

# Priority queue: (priority, value)
heapq.heappush(h, (dist, node))`,
            },
            {
              name: 'sorted() with key=',
              description: 'Sort any iterable by a custom key without mutating the original. Works on tuples, strings, objects — anything. Paired with lambda it replaces most custom comparator patterns in DSA.',
              code: `# Sort by second element of each tuple
pairs = [(1, 3), (2, 1), (3, 2)]
sorted(pairs, key=lambda x: x[1])
# [(2, 1), (3, 2), (1, 3)]

# Sort strings by length, then alphabetically
words = ["banana", "apple", "fig"]
sorted(words, key=lambda w: (len(w), w))
# ['fig', 'apple', 'banana']

# Sort intervals by start time
intervals.sort(key=lambda x: x[0])

# Descending
sorted(nums, reverse=True)`,
            },
            {
              name: 'enumerate()',
              description: 'Iterates with both index and value, eliminating manual counter variables. In DSA use it when you need position alongside the element — building value-to-index maps, detecting first/last occurrence, or two-pointer variations.',
              code: `fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry

# Build value → index map (Two Sum pattern)
index_map = {val: i for i, val in enumerate(nums)}

# Find index of first violation
for i, (a, b) in enumerate(zip(nums, nums[1:])):
    if b < a:
        print(f"unsorted at index {i+1}")
        break`,
            },
            {
              name: 'zip()',
              description: 'Pairs elements from multiple iterables in lockstep. Use it to iterate two arrays in parallel, compare adjacent pairs without index math, or transpose a matrix in one line.',
              code: `a = [1, 2, 3]
b = [4, 5, 6]

for x, y in zip(a, b):
    print(x + y)   # 5, 7, 9

# Compare adjacent elements (sorted check)
for prev, curr in zip(nums, nums[1:]):
    if curr < prev:
        return False

# Transpose a matrix
transposed = list(zip(*matrix))
# [[row0col0, row1col0, ...], ...]

# Zip with index offset (sliding pairs)
for left, right in zip(s, s[1:]):
    ...`,
            },
            {
              name: 'set operations',
              description: 'Sets give O(1) average membership testing — converting a list to a set before a membership-check loop turns O(n²) into O(n). Built-in union, intersection, and difference replace manual nested loops.',
              code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # union:        {1, 2, 3, 4, 5, 6}
a & b   # intersection: {3, 4}
a - b   # difference:   {1, 2}
a ^ b   # symmetric diff: {1, 2, 5, 6}

# O(1) membership — critical in loops
seen = set()
for n in nums:
    if n in seen:   # O(1), not O(n)
        return True
    seen.add(n)

# Remove duplicates while preserving order
seen = set()
result = [x for x in nums if not (x in seen or seen.add(x))]`,
            },
            {
              name: 'bisect',
              description: 'Binary search on a sorted list in O(log n), without writing the algorithm yourself. bisect_left returns the leftmost insertion index; bisect_right the rightmost. Use for range queries, lower/upper bound lookups, and binary search problems.',
              code: `import bisect

nums = [1, 3, 5, 7, 9]

bisect.bisect_left(nums, 5)    # 2 — index of 5
bisect.bisect_left(nums, 4)    # 2 — where 4 would go
bisect.bisect_right(nums, 5)   # 3 — index after 5

# Insert while keeping sorted — O(log n) search, O(n) insert
bisect.insort(nums, 6)
# [1, 3, 5, 6, 7, 9]

# Count elements strictly less than target
count = bisect.bisect_left(nums, target)

# Count elements in range [lo, hi]
left = bisect.bisect_left(nums, lo)
right = bisect.bisect_right(nums, hi)
count = right - left`,
            },
            {
              name: 'list comprehensions',
              description: 'Create filtered or transformed lists in one expression. Faster than an equivalent for-loop in CPython. Also works for 2D grid initialization and matrix flattening — patterns that appear constantly in DSA.',
              code: `# Filter evens and double them
evens = [x * 2 for x in range(10) if x % 2 == 0]

# Flatten a 2D matrix
flat = [cell for row in matrix for cell in row]

# Initialize a 2D grid (correct — each row is independent)
grid = [[0] * cols for _ in range(rows)]
# Not: [[0] * cols] * rows  ← all rows share the same list

# Build char → index map
index_map = {c: i for i, c in enumerate(s)}

# Collect valid neighbors in a grid
directions = [(0,1),(0,-1),(1,0),(-1,0)]
neighbors = [
    (r+dr, c+dc)
    for dr, dc in directions
    if 0 <= r+dr < rows and 0 <= c+dc < cols
]`,
            },
          ],
        },
      },
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

function navigateToLabel(label) {
  const match = flatSections.value.find(s => s.label === label)
  if (match) {
    selectedSection.value = match
    activeView.value = 'section'
  }
}
</script>

<style scoped>
</style>
