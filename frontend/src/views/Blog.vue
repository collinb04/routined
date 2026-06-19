<template>
  <div class="bg-[#f5f5f2] flex">

    <!-- Sidebar -->
    <aside
      class="sticky top-16 self-start h-[calc(100vh-4rem)] bg-[#f5f5f2] border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0 overflow-hidden"
      :class="sidebarOpen ? 'w-60' : 'w-0'"
    >
      <!-- Nav -->
      <nav class="w-60 flex-1 overflow-y-auto pb-6 px-2">
        <!-- Sidebar header -->
        <div class="flex items-center justify-between px-2 pt-6 pb-3">
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
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-text transition-colors"
            :class="catHoverBg[cat.id]"
            @click="toggleCategory(cat.id)"
          >
            <span class="flex items-center gap-1.5">
              {{ cat.label }}
              <svg v-if="isCatCompleted(cat)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </span>
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
                :class="[catHoverBg[cat.id], selectedSection?.id === sub.id
                  ? ['border-black text-text font-medium', catActiveBg[cat.id]]
                  : 'border-transparent text-text-muted']"
                @click="selectSection(sub, cat)"
              >
                <span class="flex items-center gap-1.5">
                  {{ sub.label }}
                  <svg v-if="completed.has(sub.id)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>
              </button>
            </div>
          </Transition>

        </div>

        <button
          class="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors border-l-2 mt-2"
          :class="activeView === 'career-prep'
            ? 'border-orange-400 text-text bg-orange-50'
            : 'border-transparent text-text-muted hover:bg-orange-50 hover:text-text'"
          @click="activeView = 'career-prep'; selectedSection = null"
        >
          Career Prep
        </button>

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
          <p class="text-sm text-text-dim leading-relaxed">Your brain can't hold everything — and it shouldn't have to. Good learning is about building the right compression.</p>
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <p class="text-sm text-text-dim leading-relaxed">
              When you encounter a new concept, your brain tries to compress it into something manageable. The goal isn't to memorize every detail, it's to build a <em>mental model</em> 
              accurate enough to reason from. Understanding when to stay at the surface and when to dive deep is important.
            </p>
            <p class="text-sm text-text-dim leading-relaxed">
              When a new topic arises, do your best to think "what does this remind me of?" Learning is accelerated by connecting topics to one another, preferably with familiar ones.
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

      </div>

      <!-- Career Prep coming soon -->
      <div v-else-if="activeView === 'career-prep'" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-8">

        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Career Prep</h1>
            <span class="text-[10px] font-semibold uppercase tracking-widest text-orange-400 shrink-0">Coming soon</span>
          </div>
          <p class="text-sm text-text-muted leading-relaxed">The DSA section covers the technical interview — this one covers everything around it. Here's what's coming.</p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
              </div>
              <span class="text-[12px] font-semibold text-text">Resume &amp; Applications</span>
            </div>
            <p class="text-sm text-text-dim leading-relaxed">Concrete tips on structuring your resume for technical roles, what to include on each bullet, how to frame projects without experience, and the need-to-knows that most candidates skip over.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span class="text-[12px] font-semibold text-text">Behavioral Interviews</span>
            </div>
            <p class="text-sm text-text-dim leading-relaxed">The STAR framework applied to real engineer questions, how to structure answers for leadership principles, common traps to avoid, and a bank of strong story templates you can adapt to your own experience.</p>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              </div>
              <span class="text-[12px] font-semibold text-text">System Design Resources</span>
            </div>
            <p class="text-sm text-text-dim leading-relaxed">A curated, opinionated list of third-party resources for system design — organized by topic so you know what to read and in what order, rather than drowning in the Grokking rabbit hole.</p>
          </div>
        </div>

      </div>

      <!-- Section skeleton -->
      <div v-else-if="selectedSection" class="max-w-3xl mx-auto px-5 sm:px-10 py-10 flex flex-col gap-4">

        <!-- ── Intro to Data Structures ── -->
        <template v-if="selectedSection.id === 'ds-intro'">

          <!-- Header -->
          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Intro to Data Structures</h1>
          </div>

          <!-- 1. Hook + Definition -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Definition</h2>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">
              First, let's understand what a data structure even is. Looking at the name we can infer it is a structure that holds data. Perfect, all done!
            </p>
            <p class="text-sm text-text-dim leading-relaxed">
              Jk jk — a data structure is something that organizes and stores data in a way that determines how it can be accessed and modified. That second part is the important bit.
            </p>
          </div>

          <!-- 2. Why More Than One -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Why more than one?</h2>
            </div>
            <!-- macOS-style tab bar -->
            <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5">
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="dsIntroWhyTab === 'type-of-data'
                  ? 'bg-white text-text shadow-sm'
                  : 'text-text-muted hover:text-text'"
                @click="dsIntroWhyTab = 'type-of-data'"
              >type of data</button>
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="dsIntroWhyTab === 'constraints'
                  ? 'bg-white text-text shadow-sm'
                  : 'text-text-muted hover:text-text'"
                @click="dsIntroWhyTab = 'constraints'"
              >constraints</button>
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="dsIntroWhyTab === 'access-memory'
                  ? 'bg-white text-text shadow-sm'
                  : 'text-text-muted hover:text-text'"
                @click="dsIntroWhyTab = 'access-memory'"
              >access &amp; memory</button>
            </div>
            <!-- Tab content -->
            <div class="flex flex-col gap-2">
              <template v-if="dsIntroWhyTab === 'type-of-data'">
                <span class="text-[12px] font-semibold text-text">The type of data</span>
                <p class="text-sm text-text-dim leading-relaxed">Some data is just a simple list of things in order, like a leaderboard or a todo list. Some data is pairs — a word and its definition, a username and a password — that's what we call key-value data. Some data has relationships baked in, like a family tree or a file system with folders inside folders — that's hierarchical. And some data is just connections between things with no real "up" or "down," like how people on a social app are connected to some people but not others — that's more of a network. Different shapes of data want different shapes of structures. You wouldn't store a family tree the same way you store a todo list.</p>
              </template>
              <template v-else-if="dsIntroWhyTab === 'constraints'">
                <span class="text-[12px] font-semibold text-text">Constraints</span>
                <p class="text-sm text-text-dim leading-relaxed">This one feels backwards at first — why would I want <em>less</em> functionality? But constraints are a feature, not a bug. If you can only ever add or remove from the top of a pile, that's a constraint — and it makes the structure completely predictable. You'll see this with stacks (last in, first out — like a stack of plates) and queues (first in, first out — like a line at the deli counter). By taking away options, we make the behavior obvious and reliable, which is exactly what lets us build bigger systems on top of it.</p>
              </template>
              <template v-else>
                <span class="text-[12px] font-semibold text-text">Access &amp; modification</span>
                <p class="text-sm text-text-dim leading-relaxed">At a high level this is asking: when I want a piece of data, do I need it instantly — like looking something up by name — or am I okay walking through everything one by one? Do I add and remove things constantly, or is the data mostly set once it's created? The answers push you toward different structures, and we'll unpack exactly why as we go.</p>
              </template>
            </div>
          </div>

          <!-- 3. Key Insight Callout -->
          <div class="flex gap-4">
            <div class="w-1 rounded-full bg-[#3a9ae8] shrink-0" />
            <div class="flex flex-col gap-3 py-1">
              <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full w-fit">Key insight</span>
              <p class="text-base font-medium text-text leading-relaxed">A problem, abstracted as much as possible, is simply: how do I turn the input into the output?</p>
              <p class="text-sm text-text-dim leading-relaxed">This starts with how you structure the data in the input. Seriously — like 80% of solving a problem well is just picking the right structure before you write a single line of logic.</p>
            </div>
          </div>

          <!-- 4. RAM & Memory Model -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">RAM & Memory Model</h2>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">There are two types of memory in a computer: short-lived memory (RAM) and long-term memory (the hard drive or SSD). A static program lives in long-term memory. When you run it, it becomes a <em>process</em> — and that process lives in RAM. Which means your data structures, while the program runs, also live in RAM.</p>
            <p class="text-sm text-text-dim leading-relaxed">RAM is a bunch of addresses. To find any piece of data, something has to know its address. If you know what your friend's house looks like but have no idea where it is, you might have to pass every house on the block — worst case. The same is true in memory. How we organize data determines how fast we can find it.</p>

            <!-- Expandable: go deeper -->
            <button
              class="flex items-center justify-between w-full bg-[#f5f5f2] rounded-xl px-4 py-3 text-sm text-text-muted hover:text-text transition-colors"
              @click="dsIntroRamOpen = !dsIntroRamOpen"
            >
              <span class="text-xs font-medium">go deeper: contiguous vs scattered, big O</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200" :class="dsIntroRamOpen ? 'rotate-180' : ''"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="dsIntroRamOpen" class="flex flex-col gap-4 pt-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Contiguous</span>
                  <p class="text-xs text-text-dim leading-relaxed">All data sits right next to each other in memory — like apartments in a building sharing one street address range. If you know where the row starts, you can do math to jump straight to any spot. Great for fast lookups.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Scattered</span>
                  <p class="text-xs text-text-dim leading-relaxed">Each piece of data could be anywhere. The only way you find the next piece is if something tells you where to look — that's a <em>pointer</em>, just an address that says "the next thing is over there." Great for flexibility, growth, and rearranging.</p>
                </div>
              </div>
              <p class="text-sm text-text-dim leading-relaxed">Neither is "better" — they're different tradeoffs. Get comfortable with that word. It's the theme of this entire course.</p>
              <p class="text-sm text-text-dim leading-relaxed">Quick heads up: "how fast we find, add, or remove data" has an actual name — <em>time complexity</em>, written with something called Big O notation. We're not diving into that today. Just plant the flag that it exists and that it's how we compare structures. It's not just a vibe.</p>
            </div>
          </div>

          <!-- 5. The Silverware Drawer -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Preview: The Silverware Drawer</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="ds in dsPreview" :key="ds" class="text-xs font-medium text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200">{{ ds }}</span>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">Think of data structures like utensils — you wouldn't use a fork to eat cereal. You <em>could</em> use a spoon for salad, but there'd be some complications. Same deal here:</p>
            <div class="flex flex-col gap-3">
              <div v-for="item in dsPreviewDetails" :key="item.name" class="flex items-start gap-3">
                <span class="text-xs font-medium text-text bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-200 shrink-0 mt-0.5">{{ item.name }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ item.description }}</span>
              </div>
            </div>
            <p class="text-sm text-text-dim leading-relaxed pt-1">You don't need to memorize any of that right now — I'm just giving you a preview of the drawer so the next few lessons don't feel random. Each structure is a different utensil for a different meal. Your job is picking the right one before you start eating.</p>
            <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-sm text-text-dim italic">
              Next up: we actually start opening drawers. First stop — arrays.
            </div>
          </div>

        </template>

        <!-- ── Intro to Algorithms ── -->
        <template v-else-if="selectedSection.id === 'algs-intro'">

          <!-- Header -->
          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Intro to Algorithms</h1>
          </div>

          <!-- 1. Definition -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Definition</h2>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">
              First, let's understand what an algorithm even is— an algorithm is a finite, step-by-step procedure for solving a problem. It takes <em>input</em>, performs a defined sequence of operations, and produces <em>output</em>. Two things matter: it has to be <em>correct</em> (always gives the right answer), and it has to be <em>efficient</em> (gets there fast enough). That second one is where most of DSA lives.
              <br/>
              <br/>
              One of my professors had us put together a step-by-step for PB & Js. As an 18 year-old, I found this pretty silly,
              but it was to stress a simple point. All an algorithm is, is a step-by-step plan to turn inputs into an output! Even Smuckers, Jif, and sourdough(the best bread- argue with a wall).
            </p>
          </div>

          <!-- 2. Why efficiency matters (tabs) -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M11 16V9"/><path d="M15 16v-3"/><path d="M19 16V6"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Why efficiency matters</h2>
            </div>
            <!-- macOS-style tab bar -->
            <div class="bg-gray-100 rounded-xl p-1 flex gap-0.5">
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="algsIntroWhyTab === 'time' ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
                @click="algsIntroWhyTab = 'time'"
              >time</button>
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="algsIntroWhyTab === 'space' ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
                @click="algsIntroWhyTab = 'space'"
              >space</button>
              <button
                class="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                :class="algsIntroWhyTab === 'tradeoffs' ? 'bg-white text-text shadow-sm' : 'text-text-muted hover:text-text'"
                @click="algsIntroWhyTab = 'tradeoffs'"
              >tradeoffs</button>
            </div>
            <!-- Tab content -->
            <div class="flex flex-col gap-2">
              <template v-if="algsIntroWhyTab === 'time'">
                <span class="text-[12px] font-semibold text-text">Time complexity</span>
                <p class="text-sm text-text-dim leading-relaxed">How does the runtime grow as the input gets bigger? An algorithm that looks at every element once is O(n) — double the input, double the time. An algorithm with a nested loop is O(n²) — double the input, four times the time. At n = 1,000,000, the difference between O(n) and O(n²) is the difference between a millisecond and a full day. The right algorithm on the same input can be astronomically faster.</p>
              </template>
              <template v-else-if="algsIntroWhyTab === 'space'">
                <span class="text-[12px] font-semibold text-text">Space complexity</span>
                <p class="text-sm text-text-dim leading-relaxed">How does memory usage grow with input size? Build a full copy of the input to work from — that's O(n) extra space. Use only a handful of variables regardless of input size — that's O(1). Memory isn't free, especially in constrained environments. In most interview problems time is the primary concern, but you're always expected to state the space complexity too.</p>
              </template>
              <template v-else>
                <span class="text-[12px] font-semibold text-text">Tradeoffs</span>
                <p class="text-sm text-text-dim leading-relaxed">Time and space almost always trade off against each other. You can often make something faster by using more memory — storing results you've already computed instead of recomputing them. Or save memory by doing more work. Neither is universally better. The skill is knowing which resource matters more for a given problem, and being able to articulate that tradeoff clearly.</p>
              </template>
            </div>
          </div>

          <!-- 3. Key Insight callout -->
          <div class="flex gap-4">
            <div class="w-1 rounded-full bg-[#3a9ae8] shrink-0" />
            <div class="flex flex-col gap-3 py-1">
              <span class="text-[10px] font-semibold text-[#3a9ae8] bg-[#3a9ae8]/10 px-2 py-0.5 rounded-full w-fit">Key insight</span>
              <p class="text-base font-medium text-text leading-relaxed">The question is never just "does it work?" — it's "does it work fast enough?"</p>
              <p class="text-sm text-text-dim leading-relaxed">A correct algorithm that takes a year to run is useless. Both properties matter. Get both right and you're done — that's the entire game.</p>
            </div>
          </div>

          <!-- 4. Big O Notation -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Big O Notation</h2>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">Big O notation is how we describe algorithm efficiency. The "O" stands for "order of" — as in, the order of magnitude by which the runtime scales. It describes the <em>worst case</em> and ignores constants. We care about the shape of the growth, not the exact number.</p>
            <p class="text-sm text-text-dim leading-relaxed">When someone asks "what's the complexity?", they mean: how many operations does the algorithm perform, expressed as a function of input size <em>n</em>. You'll use this constantly in interviews, and more importantly, you'll use it to think through your own code before you write it.</p>

            <!-- Expandable -->
            <button
              class="flex items-center justify-between w-full bg-[#f5f5f2] rounded-xl px-4 py-3 text-sm text-text-muted hover:text-text transition-colors"
              @click="algsIntroComplexityOpen = !algsIntroComplexityOpen"
            >
              <span class="text-xs font-medium">go deeper: complexity table, what each means in practice</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-200" :class="algsIntroComplexityOpen ? 'rotate-180' : ''"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="algsIntroComplexityOpen" class="flex flex-col gap-4 pt-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(1) — Constant</span>
                  <p class="text-xs text-text-dim leading-relaxed">Same time regardless of input size. Dict lookup, array index access. The ideal case — doesn't get better than this.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(log n) — Logarithmic</span>
                  <p class="text-xs text-text-dim leading-relaxed">Cuts the problem in half each step. Binary search. One billion items → about 30 steps. Strikingly efficient.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(n) — Linear</span>
                  <p class="text-xs text-text-dim leading-relaxed">Touches every element once. Most single loops. Usually the best achievable when you must look at all input.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(n log n) — Efficient</span>
                  <p class="text-xs text-text-dim leading-relaxed">Timsort, merge sort. Slightly worse than linear but still fast. The target complexity for most sorting problems.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(n²) — Quadratic</span>
                  <p class="text-xs text-text-dim leading-relaxed">Nested loops over the same input. Double the input → four times the work. Almost always the brute-force baseline to beat.</p>
                </div>
                <div class="bg-[#f5f5f2] rounded-xl p-4 flex flex-col gap-2">
                  <span class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">O(2ⁿ) and beyond</span>
                  <p class="text-xs text-text-dim leading-relaxed">Exponential and factorial. Fine for tiny inputs, unusable past n ≈ 30–50. These are the complexities we optimize away.</p>
                </div>
              </div>
              <p class="text-sm text-text-dim leading-relaxed">None of these is inherently "bad" — it depends entirely on what the problem demands. Know the target complexity, then find an algorithm that meets it.</p>
            </div>
          </div>

          <!-- 5. Preview: The Toolkit -->
          <div class="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Preview: The Toolkit</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="alg in algsPreview" :key="alg" class="text-xs font-medium text-text bg-[#f5f5f2] px-2.5 py-1 rounded-full border border-gray-200">{{ alg }}</span>
            </div>
            <div class="h-px bg-gray-100" />
            <p class="text-sm text-text-dim leading-relaxed">Every algorithm you'll encounter in DSA falls into one of a handful of categories. Here's a quick preview so the next few lessons don't feel random:</p>
            <div class="flex flex-col gap-3">
              <div v-for="item in algsPreviewDetails" :key="item.name" class="flex items-start gap-3">
                <span class="text-xs font-medium text-text bg-[#f5f5f2] px-2 py-0.5 rounded-full border border-gray-200 shrink-0 mt-0.5">{{ item.name }}</span>
                <span class="text-sm text-text-dim leading-relaxed">{{ item.description }}</span>
              </div>
            </div>
            <div class="bg-[#f5f5f2] rounded-xl px-4 py-3 text-sm text-text-dim italic">
              Next up: we start exploring each category. First stop — binary search.
            </div>
          </div>

        </template>

        <!-- ── Python DSA Tips & Tricks ── -->
        <template v-else-if="selectedSection.id === 'python-tips'">

          <div class="flex flex-col gap-3 pb-2">
            <h1 class="text-3xl sm:text-4xl font-medium leading-snug tracking-tight text-text">Python DSA Tips &amp; Tricks</h1>
            <p class="text-sm text-text-muted leading-relaxed">A quick-reference guide to the Python tools that come up again and again in DSA problems. Each one either simplifies the code, improves the complexity, or both.</p>
          </div>

          <div
            v-for="tip in selectedSection.content.tips"
            :key="tip.name"
            class="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <!-- Name + description -->
            <div class="p-6 flex flex-col gap-3 border-b border-gray-100">
              <span class="font-mono text-[13px] font-semibold text-text">{{ tip.name }}</span>
              <p class="text-sm text-text-dim leading-relaxed">{{ tip.description }}</p>
            </div>
            <!-- Code -->
            <div class="overflow-hidden">
              <pre class="hljs p-5! m-0! rounded-none!"><code
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

        <!-- 1. Analogy -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
          <div class="flex items-center justify-between">
            <h2 class="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Analogy</h2>
            <div class="relative group">
              <span class="text-[10px] text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-md border border-gray-100 cursor-default">High abstraction</span>
              <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block w-52 bg-gray-800 text-white text-[11px] leading-relaxed rounded-lg px-3 py-2 pointer-events-none z-20 text-center">
                A real-world analogy to make the concept intuitive before getting into mechanics.
              </div>
            </div>
          </div>
          <div class="h-px bg-gray-100" />
          <p class="text-sm leading-relaxed" :class="selectedSection.content?.analogy ? 'text-text-dim' : 'text-text-muted italic'"
             v-html="selectedSection.content?.analogy || `A real-world analogy that makes ${selectedSection.label} intuitive before getting into the mechanics...`" />
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

        <!-- 3b. Memory & Storage (DS only) -->
        <div v-if="selectedSection.categoryId === 'data-structures'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
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
        <div v-if="selectedSection.categoryId !== 'the-connection'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
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
          <div v-if="selectedSection.categoryId === 'data-structures'" class="flex flex-col divide-y divide-gray-50">
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

        <!-- 5. Pros & Cons (DS only) -->
        <div v-if="selectedSection.categoryId === 'data-structures'" class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
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
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
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
          <div class="bg-[#f5f5f2] rounded-xl h-44 flex items-center justify-center border border-dashed border-gray-200">
            <span class="text-sm text-text-muted italic">Visual diagram / step-by-step illustration</span>
          </div>
          <p class="text-sm text-text-muted italic leading-relaxed">Worked example — tracing through a concrete input...</p>
        </div>

        <!-- 9. Code -->
        <div class="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
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

        </template>
        <!-- ── end generic skeleton ── -->

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
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/vs2015.css'
hljs.registerLanguage('python', python)

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(true)
const openCategories = ref([])
const selectedSection = ref(null)
const activeView = ref('intro')
const dsIntroRamOpen = ref(false)
const dsIntroWhyTab = ref('type-of-data')
const algsIntroComplexityOpen = ref(false)
const algsIntroWhyTab = ref('time')

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

const dsPreview = ['Array', 'Linked List', 'Stack & Queue', 'Hash Map', 'Tree & Graph']

const dsPreviewDetails = [
  { name: 'Array', description: 'Great when you know exactly how many items you need and want fast access by index. A pain if you constantly add or remove from the middle.' },
  { name: 'Linked List', description: 'Great for constant rearranging — you can grow, shrink, and reorder cheaply. Slow if you need to find something specific, since you walk from the front.' },
  { name: 'Stack & Queue', description: 'Constrained by design. Stacks are last-in first-out (like plates). Queues are first-in first-out (like a deli line). The constraint is the point.' },
  { name: 'Hash Map', description: 'The instant-lookup utensil. Trades some memory and ordering for O(1) access by key. Reach for it whenever you need to count, group, or find things by name.' },
  { name: 'Tree & Graph', description: 'Trees for anything with a natural hierarchy — file systems, decisions, rankings. Graphs for pure connections with no clean hierarchy — friendships, routes, dependencies.' },
]

const algsPreview = ['Searching', 'Sorting', 'Recursion', 'Dynamic Programming', 'Greedy', 'Graph Traversal']

const algsPreviewDetails = [
  { name: 'Searching', description: 'Finding a value in a collection. Binary search turns O(n) into O(log n) by exploiting sorted order — one of the cleanest efficiency gains in all of DSA.' },
  { name: 'Sorting', description: 'Rearranging data into order. Unlocks binary search, two pointers, and most sliding window problems. Often a preprocessing step, not the solution itself.' },
  { name: 'Recursion', description: 'Solving a problem by solving a smaller version of the same problem. The foundation of trees, graphs, divide-and-conquer, and backtracking.' },
  { name: 'Dynamic Programming', description: 'Caching subproblem results to avoid recomputing them. Turns exponential brute force into polynomial time. The hardest category to internalize — and the most rewarding.' },
  { name: 'Greedy', description: 'Always pick the locally optimal choice and never look back. Fast and elegant when the problem supports it — and knowing when it applies is the real skill.' },
  { name: 'Graph Traversal', description: 'BFS and DFS — the two ways to visit every node in a graph. Most graph problems reduce to choosing the right traversal and tracking what you\'ve seen.' },
]

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

watch(selectedSection, (section) => {
  router.replace({ query: section ? { section: section.id } : {} })
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
})

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
    researcher: 'Jeffrey Karpicke',
    credential: 'Cognitive Psychologist, Purdue',
    image: '/public/karpicke.jpg',
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
      { id: 'ds-intro', label: 'Intro to Data Structures' },
      {
        id: 'arrays',
        label: 'Arrays',
        content: {
          analogy: `Think of an array like a row of numbered mailboxes in an apartment building. Every box has a fixed address, they\'re all lined up next to each other, 
          and you can walk straight to box #7 without checking any of the others first. You can\'t squeeze a new box between two existing ones without moving everything down.
           Similarly, you can add data to the end of the array(computers know the length) in constant time, we can find a piece of data if me know it's postion in the array(indexing) in constant time
           , but if we have to search for an item or add an item not in the last position of the array... we would have to at worst case, move or search every item.`,
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
          connections: {
            prereqs: ['Arrays', 'Intro to Data Structures'],
            unlocks: ['Linked Lists', 'Stacks & Queues'],
            related: ['Arrays', 'Linked Lists', 'Stacks & Queues'],
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
          connections: {
            prereqs: ['Arrays', 'Linked Lists'],
            unlocks: ['BFS & DFS', 'Monotonic Stack', 'Topological Sort'],
            related: ['Arrays', 'Linked Lists', 'BFS & DFS'],
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
          connections: {
            prereqs: ['Arrays', 'Linked Lists', 'Recursion & D&C'],
            unlocks: ['Heaps & Priority Queues', 'Graphs', 'BFS & DFS', 'Dynamic Programming'],
            related: ['Graphs', 'Heaps & Priority Queues', 'BFS & DFS'],
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
          connections: {
            prereqs: ['Trees', 'Arrays'],
            unlocks: ['Topological Sort', 'Greedy Algorithms'],
            related: ['Trees', 'Sorting', 'Greedy Algorithms'],
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
          connections: {
            prereqs: ['Arrays', 'Intro to Algorithms'],
            unlocks: ['Sorting', 'Two Pointers'],
            related: ['Two Pointers', 'Sorting', 'Sliding Window'],
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
          connections: {
            prereqs: ['Arrays', 'Recursion & D&C'],
            unlocks: ['Binary Search', 'Two Pointers', 'Merge Intervals', 'Greedy Algorithms'],
            related: ['Binary Search', 'Two Pointers', 'Merge Intervals'],
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
          connections: {
            prereqs: ['Arrays', 'Intro to Algorithms'],
            unlocks: ['Dynamic Programming', 'Backtracking', 'Trees', 'BFS & DFS'],
            related: ['Dynamic Programming', 'Backtracking', 'Trees'],
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
          connections: {
            prereqs: ['Recursion & D&C', 'Arrays', 'Hash Maps & Sets'],
            unlocks: ['Greedy Algorithms'],
            related: ['Recursion & D&C', 'Backtracking', 'Greedy Algorithms'],
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
          analogy: 'Looking out a moving train window. You see a fixed-width view of the landscape. As the train moves, the leftmost edge disappears and a new bit appears on the right. You are always looking at a contiguous chunk — just sliding it forward. A sliding window maintains that view into a subarray, expanding or contracting it as needed.',
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
          connections: {
            prereqs: ['Stacks & Queues', 'Arrays', 'Intro to Patterns'],
            unlocks: [],
            related: ['Stacks & Queues', 'Sliding Window', 'Two Pointers'],
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
