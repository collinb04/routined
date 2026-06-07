<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { LENSES } from '@/api/tutor'
const store = useSessionStore()
</script>

<template>
  <nav class="flex flex-col gap-1 mt-2">
    <div
      v-for="(lens, i) in LENSES"
      :key="i"
      class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
      :class="{
        'bg-black/10': store.currentLens === i,
      }"
    >
      <div
        class="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] shrink-0 transition-colors"
        :class="{
          'border-accent text-black': store.currentLens === i && !store.lensCompleted[i],
          'border-green bg-green/10 text-green': store.lensCompleted[i],
          'border-border text-text-muted': store.currentLens !== i && !store.lensCompleted[i],
        }"
      >
        <span v-if="store.lensCompleted[i]">✓</span>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span
        class="text-sm transition-colors"
        :class="{
          'text-text': store.currentLens === i,
          'text-text-dim': store.lensCompleted[i],
          'text-text-muted': store.currentLens !== i && !store.lensCompleted[i],
        }"
      >
        {{ lens.label }}
      </span>
    </div>
  </nav>
</template>
