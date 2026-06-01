<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="mt-12 bg-white flex flex-col">
    <main class="flex-1 flex items-center justify-center px-16 py-10">
      <div class="max-w-3xl flex flex-col gap-7 items-start">
        <h1 class="text-[clamp(38px,5.5vw,64px)] font-light leading-[1.12] tracking-tight text-text">
          You've been <span class="font-semibold">memorizing.</span><br />
          <span class="text-accent">You should start <span class="font-semibold">thinking</span></span>
        </h1>
        <div class="flex items-center gap-6 text-lg text-text-muted">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
            Distinguish
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
        <p class="text-lg text-text-dim leading-relaxed max-w-lg">
          Experts aren't smarter, but they do have better mental models. Routined instills said models until it's just... <span class="italic">how you think.</span>
        </p>
        <div class="flex gap-3 items-center mt-2">
          <a href="#" class="bg-accent text-white text-sm font-semibold px-7 py-3 rounded-lg transition-opacity hover:opacity-85">
            Start a session
          </a>
          <a href="#" class="text-text-muted text-sm px-6 py-3 rounded-lg transition-opacity hover:bg-gray-100/50 hover:text-text">
            See how it works
          </a>
        </div>
      </div>
    </main>

  </div>
</template>
