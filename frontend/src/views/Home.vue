<template>
  <div class="bg-[#f5f5f2] flex flex-col">
    <section id="#">
      <main class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-5 sm:px-16 py-10 overflow-hidden bg-[#f5f5f2]">
        <div class="max-w-4xl flex flex-col gap-7 items-center sm:items-start">
          <h1 class="text-[32px] sm:text-[clamp(38px,5.5vw,64px)] font-light leading-[1.12] tracking-tight text-text text-center sm:text-left">
            <span class="text-black">DSA interviews are no joke.</span> <br/>
            Stop <span class="font-semibold">memorizing</span> solutions. <br/>
            <span class="text-black"> Start <span class="font-semibold"><span style="color:#e85d4a">r</span><span style="color:#e8a23a">e</span><span style="color:#e8d23a">c</span>
            <span style="color:#4caf7d">o</span><span style="color:#3a9ae8">g</span><span style="color:#7c5ce8">n</span><span style="color:#c45ce8">i</span>
            <span style="color:#e85d9a">z</span><span style="color:#e85d4a">i</span><span style="color:#e8a23a">n</span><span style="color:#e8d23a">g</span></span></span>
            patterns.
          </h1>
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 text-lg text-text-muted">
            <span class="flex items-center gap-1.5">
              <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
              Disect
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
              Recognize
            </span>
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
              Internalize
            </span>
          </div>
          <p class="text-md sm:text-lg text-text-dim leading-relaxed max-w-xs sm:max-w-2xl text-center sm:text-left">
            Brute force isn't good enough to pass the interview, why would it be good enough to learn?
             Start learning efficiently with Routined.
          </p>
          <div class="flex gap-3 items-center mt-2">
            <a href="/problems" class="bg-black text-white text-sm font-semibold px-7 py-3 rounded-lg transition-opacity hover:opacity-85">
              Start a session
            </a>
            <a href="#problems" class="text-text-muted text-sm px-6 py-3 rounded-lg transition-opacity hover:bg-white hover:text-text">
              See how it works
            </a>
          </div>
        </div>
      </main>
    </section>

    <!-- HOW IT WORKS (STEPS) -->
    <section id="problems" class="min-h-screen flex flex-col items-center justify-center gap-12 px-5 sm:px-[12.5%] py-16 sm:py-28 bg-[#f5f5f2]">
      <div class="max-w-3xl w-full flex flex-col gap-2 text-center">
        <h2 class="text-4xl sm:text-6xl font-medium leading-snug tracking-tight text-text text-center">
          A Concrete Walkthrough
        </h2>
        <p class="text-md text-text-dim leading-relaxed max-w-lg text-center mx-auto">
          It may not be easy work, but it is simple. Watch this demo to see what it takes to become a DSA machine.
        </p>
      </div>
      <div class="max-w-3xl w-full aspect-video bg-black/5 rounded-2xl flex items-center justify-center border border-black/8">
        <div class="flex flex-col items-center gap-3 text-text-muted">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
          </svg>
          <span class="text-sm font-medium">Video coming soon</span>
        </div>
      </div>
    </section>

    <!-- BENTO GRID -->
    <section class="flex flex-col items-center gap-10 px-5 sm:px-[12.5%] py-16 sm:py-24 bg-[#f5f5f2]">

      <!-- Header -->
      <div class="max-w-4xl w-full flex flex-col items-center gap-3 text-center">
        <h2 class="text-4xl sm:text-6xl font-medium leading-snug tracking-tight text-text">
          Engineered for the interview.
        </h2>
        <p class="text-md text-text-dim leading-relaxed max-w-md">
          Every decision — from cluster order to problem selection — is built around one question: does this make patterns stick?
        </p>
      </div>

      <!-- Grid -->
      <div class="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 [&>div]:transition-transform [&>div]:duration-200 [&>div]:ease-out [&>div]:hover:scale-[1.025]">

        <!-- Dark hero card (flippable, row-span-2) -->
        <div class="sm:row-span-2 rounded-2xl cursor-pointer h-full" style="perspective:1000px" @click="heroFlipped = !heroFlipped">
          <div class="relative w-full h-full min-h-64 sm:min-h-70" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: heroFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-7 flex flex-col justify-between" style="background:linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 100%),rgba(17,17,17,0.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.18),0 0 16px rgba(255,255,255,0.07);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/30 text-[10px] font-semibold uppercase tracking-widest">Foundation</span>
                <span class="flex items-center gap-1 text-white/25 text-[9px] font-medium select-none">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <p class="text-5xl font-semibold text-white leading-none tracking-tight"><span class="text-4xl">Win</span> Big.</p>
              <div class="flex flex-col gap-4">
                <p class="text-white/60 text-sm leading-relaxed">Pattern recognition is one of the strongest components of measured intelligence. Gifted people aren't memorizing more, they're noticing structure faster.</p>
                <p class="text-white font-semibold text-sm">That's a learnable skill.</p>
                <div class="h-px bg-white/10" />
                <p class="text-white text-xl font-medium leading-snug tracking-tight">Built around how you actually learn.</p>
              </div>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-7 flex flex-col gap-5 bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-red-400">Without Routined</span>
              <p class="text-4xl font-semibold text-gray-800 leading-none">Fall Behind.</p>
              <div class="flex flex-col gap-3">
                <p class="text-gray-400 text-sm leading-relaxed">Grinding solutions is one of the weakest retention strategies. Without pattern recognition, you're just hoping to see the same problem twice.</p>
              </div>
              <div class="mt-auto">
                <div class="h-px bg-gray-100 mb-4" />
                <p class="text-gray-700 text-xl font-medium leading-snug">Built on luck. Broken by a new problem.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 01 Cluster Learning (flippable) -->
        <div class="rounded-2xl cursor-pointer" style="perspective:1000px" @click="clusterFlipped = !clusterFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: clusterFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style="background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%),rgba(124,92,232,0.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 16px rgba(255,255,255,0.12);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/50 text-[10px] font-medium uppercase tracking-widest">01</span>
                <span class="flex items-center gap-1 text-white/30 text-[9px] font-medium select-none">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <div>
                <p class="font-semibold text-white mt-1">Cluster Learning</p>
                <p class="text-white/70 text-xs leading-relaxed mt-1">Concepts ordered by how they connect, not alphabetically.</p>
              </div>
              <a href="/learn" @click.stop class="mt-3 inline-block text-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-white text-black hover:bg-black hover:text-white transition-colors duration-150">Explore the clusters →</a>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-5 flex flex-col gap-3 bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <p class="text-[9px] font-bold uppercase tracking-widest text-red-500">Competitors offer</p>
              <ul class="flex flex-col gap-2.5">
                <li v-for="item in competitors" :key="item" class="flex items-start gap-2">
                  <svg class="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="2" y1="2" x2="10" y2="10" stroke="#ef4444" stroke-width="1.75" stroke-linecap="round"/><line x1="10" y1="2" x2="2" y2="10" stroke="#ef4444" stroke-width="1.75" stroke-linecap="round"/></svg>
                  <span class="text-xs text-gray-500 leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Patterns & Algorithms (flippable) -->
        <div class="rounded-2xl cursor-pointer" style="perspective:1000px" @click="patternsFlipped = !patternsFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: patternsFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style="background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%),rgba(232,93,74,0.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 16px rgba(255,255,255,0.12);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Patterns & Algorithms</span>
                <span class="flex items-center gap-1 text-white/30 text-[9px] font-medium select-none shrink-0 ml-2">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <div>
                <p class="text-5xl font-bold text-white leading-none">36</p>
                <p class="text-white/70 text-xs mt-1.5">Topics covered — from sliding window to DP</p>
              </div>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-red-400">Without Routined</span>
              <div>
                <p class="text-5xl font-bold text-gray-800 leading-none">0</p>
                <p class="text-gray-400 text-xs mt-1.5">Patterns truly internalized by grinding solutions alone</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 300 Problems (flippable) -->
        <div class="rounded-2xl cursor-pointer" style="perspective:1000px" @click="problemsFlipped = !problemsFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: problemsFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between" style="background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%),rgba(58,154,232,0.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 16px rgba(255,255,255,0.12);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Problems</span>
                <span class="flex items-center gap-1 text-white/30 text-[9px] font-medium select-none">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <div>
                <p class="text-5xl font-bold text-white leading-none mt-1">300</p>
                <p class="text-white/70 text-xs mt-1.5">Handpicked problems to drill in key ideas</p>
              </div>
              <a href="/problems" @click.stop class="mt-3 inline-block text-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-white text-black hover:bg-black hover:text-white transition-colors duration-150">Start drilling →</a>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-red-400">Without Routined</span>
              <div>
                <p class="text-5xl font-bold text-gray-800 leading-none">3,000+</p>
                <p class="text-gray-400 text-xs mt-1.5">Problems you can grind and still blank on your interview</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 02 Socratic Method (flippable) -->
        <div class="rounded-2xl cursor-pointer" style="perspective:1000px" @click="socraticFlipped = !socraticFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: socraticFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col gap-1" style="background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%),rgba(76,175,125,0.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 16px rgba(255,255,255,0.12);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/50 text-[10px] font-medium uppercase tracking-widest">02</span>
                <span class="flex items-center gap-1 text-white/30 text-[9px] font-medium select-none">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <p class="font-semibold text-white">Socratic Method</p>
              <p class="text-white/70 text-xs leading-relaxed mt-1">Our AI chat guides you to the insight with reactive questioning — no solution feeding here.</p>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col gap-2 bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-red-400">Without Routined</span>
              <p class="font-semibold text-gray-800">Answer Dumping</p>
              <p class="text-gray-400 text-xs leading-relaxed mt-1">Copy a solution, move on. No understanding built, no transfer to new problems.</p>
            </div>
          </div>
        </div>

        <!-- Wide stat: 0 solutions memorized (flippable, col-span-2) -->
        <div class="sm:col-span-2 rounded-2xl cursor-pointer" style="perspective:1000px" @click="solutionsFlipped = !solutionsFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: solutionsFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 bg-white flex items-center gap-6 shadow-sm" style="backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <p class="text-7xl font-bold text-text leading-none shrink-0">0</p>
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <p class="font-semibold text-text">Solutions memorized.</p>
                  <span class="flex items-center gap-1 text-gray-300 text-[9px] font-medium select-none shrink-0 ml-4">
                    flip
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                  </span>
                </div>
                <p class="text-sm text-text-dim leading-relaxed mt-1">That's the point. You learn to think through problems, not recite answers to ones you've seen before.</p>
              </div>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-6 bg-white flex items-center gap-6" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <p class="text-7xl font-bold text-gray-200 leading-none shrink-0">100s</p>
              <div>
                <p class="text-[9px] font-bold uppercase tracking-widest text-red-400 mb-1">Without Routined</p>
                <p class="font-semibold text-gray-700">Solutions memorized.</p>
                <p class="text-sm text-gray-400 leading-relaxed mt-1">Memorized and forgotten. Solutions without understanding vanish the moment the problem looks slightly different.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Goal card (flippable) -->
        <div class="rounded-2xl cursor-pointer" style="perspective:1000px" @click="goalFlipped = !goalFlipped">
          <div class="relative w-full min-h-44" style="transform-style:preserve-3d;transition:transform 0.55s cubic-bezier(0.4,0.2,0.2,1)" :style="{ transform: goalFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
            <!-- Front -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col gap-4" style="background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.04) 100%),rgba(232,162,58,0.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 0 2px rgba(255,255,255,0.35),0 0 16px rgba(255,255,255,0.12);backface-visibility:hidden;-webkit-backface-visibility:hidden">
              <div class="flex items-start justify-between">
                <span class="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Goal</span>
                <span class="flex items-center gap-1 text-white/30 text-[9px] font-medium select-none">
                  flip
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                </span>
              </div>
              <ul class="flex flex-col gap-2.5">
                <li v-for="goal in ['Interview-ready pattern recognition', 'Get your dream job', 'Learn to learn in the process']" :key="goal" class="flex items-start gap-2">
                  <span class="mt-1.5 w-1 h-1 rounded-full bg-white/50 shrink-0" />
                  <span class="text-xs text-white/80 leading-relaxed">{{ goal }}</span>
                </li>
              </ul>
            </div>
            <!-- Back -->
            <div class="absolute inset-0 rounded-2xl p-6 flex flex-col gap-4 bg-white" style="backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:rotateY(180deg);box-shadow:0 0 0 2px rgba(0,0,0,0.07)">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-red-400">Without Routined</span>
              <ul class="flex flex-col gap-2.5">
                <li v-for="item in ['Blank on unseen variants', 'Grind 300 problems for a chance', 'Forget what you learned']" :key="item" class="flex items-start gap-2">
                  <svg class="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="2" y1="2" x2="10" y2="10" stroke="#ef4444" stroke-width="1.75" stroke-linecap="round"/><line x1="10" y1="2" x2="2" y2="10" stroke="#ef4444" stroke-width="1.75" stroke-linecap="round"/></svg>
                  <span class="text-xs text-gray-500 leading-relaxed">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- RESULTS + TESTIMONIALS
    <section class="min-h-screen flex flex-col items-center justify-center gap-12 px-5 sm:px-[12.5%] py-16 sm:py-28 bg-[#f5f5f2]">
      <div class="max-w-3xl w-full flex flex-col gap-4 text-center">
        <h2 class="text-4xl sm:text-6xl font-medium leading-snug tracking-tight text-text">
          Real Results
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        <div v-for="t in testimonials" :key="t.name" class="flex flex-col gap-4 bg-white rounded-2xl p-6">
          <p class="text-text-dim leading-relaxed text-sm">"{{ t.quote }}"</p>
          <div class="flex items-center gap-3 mt-auto">
            <div class="w-9 h-9 rounded-full bg-white shrink-0" />
            <div>
              <p class="font-semibold text-sm text-text">{{ t.name }}</p>
              <p class="text-xs text-text-muted">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- FAQS + CONTACT -->
    <section id="contact" class="min-h-screen flex items-center justify-center px-5 sm:px-[12.5%] py-16 sm:py-28 bg-[#f5f5f2]">
      <div class="max-w-5xl w-full flex flex-col md:flex-row gap-10 md:gap-16 md:items-start">

        <!-- FAQs -->
        <div class="flex-1 flex flex-col gap-6">
          <h2 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text text-center">FAQs</h2>
          <div class="flex flex-col divide-y divide-gray-200">
            <div v-for="faq in faqs" :key="faq.q" class="py-5 cursor-pointer group" @click="openFaq = openFaq === faq.q ? null : faq.q">
              <div class="flex items-center justify-between gap-4">
                <p class="font-semibold text-text">{{ faq.q }}</p>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"
                  class="shrink-0 text-text-muted transition-transform duration-200"
                  :class="openFaq === faq.q ? 'rotate-180' : ''"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
              <div v-if="openFaq === faq.q" class="mt-3">
                <p class="text-sm text-text-dim leading-relaxed">{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider (desktop only) -->
        <div class="hidden md:block w-px self-stretch bg-gray-200" />

        <!-- Contact -->
        <div class="flex-1 flex flex-col gap-6">
          <h2 class="text-3xl sm:text-5xl font-medium leading-snug tracking-tight text-text text-center">Get in Touch</h2>
          <p class="text-text-dim">Questions, feedback, partnerships — reach out anytime.</p>
          <form class="flex flex-col gap-4">
            <input type="text" placeholder="Name" class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-black/10" />
            <input type="email" placeholder="Email" class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-black/10" />
            <textarea rows="4" placeholder="Message" class="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-black/10 resize-none" />
            <button type="submit" class="bg-black text-white text-sm font-semibold px-7 py-3 rounded-lg hover:opacity-85 transition-opacity">
              Send message
            </button>
          </form>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const openFaq = ref(null)
  const heroFlipped = ref(false)
  const clusterFlipped = ref(false)
  const patternsFlipped = ref(false)
  const problemsFlipped = ref(false)
  const socraticFlipped = ref(false)
  const solutionsFlipped = ref(false)
  const goalFlipped = ref(false)

  const whyCards = [
    { icon: '', title: 'Mental models, not solutions', body: 'We teach you how experts think about problems, not just the answer to this one problem.' },
    { icon: '', title: 'Spaced repetition built in', body: 'Concepts surface again right before you forget them, so knowledge actually sticks.' },
    { icon: '', title: 'Interview-focused', body: 'Every session is calibrated to the patterns that actually show up in DSA interviews.' },
  ]

const faqs = [
    { q: 'Is this just another Leetcode clone?', a: 'No. We don\'t grade you on passing test cases. We train you on the reasoning process — asking questions until you arrive at the insight yourself.' },
    { q: 'What skill level is this for?', a: 'Primarily aimed at CS students and early-career engineers preparing for DSA interviews, but the mental models are useful at any level.' },
    { q: 'How long should I practice each day?', a: '30–45 minutes of focused Socratic practice beats 3 hours of passive grinding. Quality over quantity.' },
    { q: 'Is it free?', a: 'We\'re in early access — reach out or sign up to get notified when we launch.' },
  ]

  const competitors = [
    'Throw a problem at you',
    'Supply a solution',
    'Pattern recognition by chance',
  ]

</script>
