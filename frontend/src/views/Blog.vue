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
              After each problem, we debrief. That means breaking down the pattern used, why it fits that problem's shape,
              and how to recognize it the next time you see something similar. The debrief is where the real learning happens.
            </p>
          </div>
        </div>

      </div>

      <!-- Guide to Learning view -->
      <div v-else-if="activeView === 'guide'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-10">

        <!-- Hero -->
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text">
            A guide to<br class="hidden sm:block" />learning DSA
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
          <p class="text-sm text-text-dim leading-relaxed">Your brain can't hold everything — and it shouldn't have to. Good learning is about building the right compression.</p>
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <p class="text-sm text-text-dim leading-relaxed">
              When you encounter a new concept, your brain tries to compress it into something manageable. The goal isn't to memorize every detail — it's to build a <em>mental model</em> accurate enough to reason from.
            </p>
            <p class="text-sm text-text-dim leading-relaxed">
              In DSA, this means knowing that a stack is LIFO and what that <em>implies</em> — not every implementation detail. It means knowing that a hash map gives O(1) lookup and <em>why</em> — not how the hash function works internally.
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
              Not all topics are equal. Arrays, hash maps, and trees alone cover the majority of real interview problems. Learn those deeply before touching anything exotic. Time spent on graph theory before you've internalized two pointers is wasted time.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Prerequisite chains</h3>
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
            Decades of cognitive science research converge on the same handful of principles. Routined is built around them.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div v-for="principle in cogSciPrinciples" :key="principle.name" class="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-2.5">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">{{ principle.name }}</span>
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

      </div>

      <!-- Section skeleton -->
      <div v-else-if="selectedSection" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-4">

        <!-- Title block -->
        <div class="flex flex-col gap-3 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs text-text-muted bg-[#f5f5f2] px-2.5 py-0.5 rounded-full border border-gray-200">{{ selectedSection.category }}</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full font-medium"
              :class="{
                'text-emerald-700 bg-emerald-50': selectedSection.categoryId === 'data-structures',
                'text-violet-700 bg-violet-50': selectedSection.categoryId === 'algorithms',
                'text-[#3a9ae8] bg-[#3a9ae8]/10': selectedSection.categoryId === 'patterns',
                'text-amber-700 bg-amber-50': selectedSection.categoryId === 'the-connection',
              }"
            >{{ { 'data-structures': 'Data Structure', 'algorithms': 'Algorithm', 'patterns': 'Pattern', 'the-connection': 'Connection' }[selectedSection.categoryId] }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">
            {{ selectedSection.label }}
          </h1>
        </div>

        <!-- 1. Analogy -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Analogy</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">High abstraction</span>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            A real-world analogy that makes {{ selectedSection.label }} intuitive before getting into the mechanics...
          </p>
        </div>

        <!-- 2. What / Why / How -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">What / Why / How</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Conceptual</span>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">What</span>
              <p class="text-sm text-text-muted italic leading-relaxed">What exactly is {{ selectedSection.label }}? A precise definition, no vague hand-waving...</p>
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">Why</span>
              <p class="text-sm text-text-muted italic leading-relaxed">Why does {{ selectedSection.label }} exist? What problem does it solve that simpler approaches can't?</p>
            </div>
            <div class="h-px bg-gray-50" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[12px] font-semibold text-text">How</span>
              <p class="text-sm text-text-muted italic leading-relaxed">How does {{ selectedSection.label }} actually work? The mechanics, step by step...</p>
            </div>
          </div>
        </div>

        <!-- 3a. Memory & Storage (DS only) -->
        <div v-if="selectedSection.categoryId === 'data-structures'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Memory & Storage</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Technical</span>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">
            Where {{ selectedSection.label }} lives in memory and how it's laid out — this directly explains the complexity tradeoffs below.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Layout</span>
              <span class="text-xs text-text-muted italic leading-relaxed">e.g. Contiguous block / linked nodes / hash buckets...</span>
            </div>
            <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Implication</span>
              <span class="text-xs text-text-muted italic leading-relaxed">What this layout makes fast or slow, and why...</span>
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
            <div v-for="i in 3" :key="i" class="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span class="text-sm text-text-muted italic">"Signal phrase {{ i }}..."</span>
            </div>
          </div>
        </div>

        <!-- 4. Complexity -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Complexity</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Technical</span>
          </div>
          <div class="h-px bg-gray-100" />
          <!-- DS: per-operation table -->
          <div v-if="selectedSection.categoryId === 'data-structures'" class="flex flex-col divide-y divide-gray-50">
            <div v-for="op in ['Access', 'Search', 'Insert', 'Delete']" :key="op" class="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <span class="text-sm text-text-muted">{{ op }}</span>
              <span class="font-mono text-sm text-text-muted italic">O(?)</span>
            </div>
          </div>
          <!-- Algs / Patterns: time + space -->
          <div v-else class="flex gap-8">
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

        <!-- 5. Pros & Cons (DS only) -->
        <div v-if="selectedSection.categoryId === 'data-structures'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Pros & Cons</h2>
          <div class="h-px bg-gray-100" />
          <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col gap-2.5">
              <span class="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Strengths</span>
              <div v-for="i in 3" :key="i" class="flex items-start gap-2">
                <span class="text-emerald-400 mt-px text-sm leading-none">+</span>
                <span class="text-sm text-text-muted italic leading-relaxed">Strength {{ i }}...</span>
              </div>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-[11px] font-semibold text-red-400 uppercase tracking-wider">Weaknesses</span>
              <div v-for="i in 3" :key="i" class="flex items-start gap-2">
                <span class="text-red-300 mt-px text-sm leading-none">−</span>
                <span class="text-sm text-text-muted italic leading-relaxed">Weakness {{ i }}...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Key Properties -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Key Properties</h2>
          <div class="h-px bg-gray-100" />
          <ul class="flex flex-col gap-3">
            <li v-for="i in 4" :key="i" class="flex items-start gap-3">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-muted italic leading-relaxed">Key property {{ i }}...</span>
            </li>
          </ul>
        </div>

        <!-- 7. Use Cases -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Use Cases</h2>
          <div class="h-px bg-gray-100" />
          <p class="text-sm text-text-muted italic leading-relaxed">When you'd actually reach for {{ selectedSection.label }} and what makes it the right choice...</p>
          <div class="flex flex-col divide-y divide-gray-50">
            <div v-for="i in 3" :key="i" class="flex items-start gap-3 py-2.5 first:pt-1 last:pb-0">
              <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
              <span class="text-sm text-text-muted italic leading-relaxed">Use case {{ i }}...</span>
            </div>
          </div>
        </div>

        <!-- 8. Visuals & Examples -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Visuals & Examples</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Concrete</span>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="bg-[#f5f5f2] rounded-xl h-44 flex items-center justify-center border border-dashed border-gray-200">
            <span class="text-sm text-text-muted italic">Visual diagram / step-by-step illustration</span>
          </div>
          <p class="text-sm text-text-muted italic leading-relaxed">Worked example — tracing through a concrete input...</p>
        </div>

        <!-- 9. Code -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Code</h2>
            <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-100">Implementation</span>
          </div>
          <div class="h-px bg-gray-100" />
          <div class="bg-[#f5f5f2] rounded-xl p-5 font-mono text-sm leading-relaxed">
            <span class="text-gray-400">// {{ selectedSection.label }}</span><br/>
            <span class="text-gray-300">// Implementation / template goes here...</span>
          </div>
        </div>

        <!-- 10. Sandbox -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm border border-dashed border-gray-200">
          <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Sandbox</h2>
          <div class="h-px bg-gray-100" />
          <div class="h-32 flex items-center justify-center">
            <span class="text-sm text-text-muted italic">Interactive practice — coming soon</span>
          </div>
        </div>

        <!-- 11. Connections -->
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
                <span v-for="i in 2" :key="i" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">← Prereq {{ i }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Unlocks</span>
              <div class="flex flex-wrap gap-2">
                <span v-for="i in 3" :key="i" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">→ Next concept {{ i }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Related</span>
              <div class="flex flex-wrap gap-2">
                <span v-for="i in 3" :key="i" class="text-xs text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">∼ Related {{ i }}</span>
              </div>
            </div>
          </div>
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
import { ref, computed } from 'vue'

const sidebarOpen = ref(true)
const openCategories = ref([])
const selectedSection = ref(null)
const activeView = ref('intro')

const flatSections = computed(() =>
  categories.flatMap(cat =>
    cat.subsections.map(sub => ({ ...sub, category: cat.label, categoryId: cat.id }))
  )
)

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
  'The static content in routined is written at exactly that middle ground: conceptual precision without implementation noise.',
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
    science: 'Retrieving information from memory strengthens retention far more than re-reading. Testing yourself is a learning act, not just an assessment.',
    inRoutined: 'In routined: every problem you work through is an active recall event — you generate the answer, not consume it.',
  },
  {
    name: 'The Generation Effect',
    science: 'Information you produce yourself is retained better than information you passively read. Struggling before seeing an answer is a feature, not a bug.',
    inRoutined: 'In routined: the Socratic approach never hands you the answer — it guides you to generate the insight yourself.',
  },
  {
    name: 'Spaced Repetition',
    science: 'Reviewing material at the edge of forgetting dramatically outperforms cramming. Gradually increasing intervals lock things into long-term memory.',
    inRoutined: 'In routined: pattern tagging lets you revisit specific techniques at the right intervals rather than randomly.',
  },
  {
    name: 'Interleaving',
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
    label: 'Structured debrief after every problem',
    description: 'After solving, you break down the pattern used, why it fits, and what signals pointed to it. This is where recognition gets encoded — not during the solve itself.',
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
