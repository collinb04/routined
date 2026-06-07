<template>
  <aside class="bg-surface border-r border-border px-6 py-7 flex flex-col gap-5 overflow-y-auto">
    <div class="flex items-center gap-2.5">
      <span class="font-mono text-xs text-text-muted">#001</span>
      <span class="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-50 text-yellow-600 border border-yellow-200">
        Medium
      </span>
    </div>
    <h2 class="text-lg font-semibold text-text leading-snug">Two Sum</h2>
    <p class="text-sm text-text-dim leading-relaxed">
      Given an array of integers
      <code class="font-mono text-xs bg-surface-raised border border-border px-1 py-0.5 rounded text-black">nums</code>
      and an integer
      <code class="font-mono text-xs bg-surface-raised border border-border px-1 py-0.5 rounded text-black">target</code>,
      return indices of the two numbers that add up to <code class="font-mono text-xs bg-surface-raised border border-border px-1 py-0.5 rounded text-black">target</code>.
    </p>
    <LensNav />
  </aside>
</template>

<script setup lang="ts">
import LensNav from './LensNav.vue'
</script>
