<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { LENSES } from '@/api/tutor'
const store = useSessionStore()
</script>

<template>
  <nav class="lens-nav">
    <div
      v-for="(lens, i) in LENSES"
      :key="i"
      class="lens-step"
      :class="{
        active: store.currentLens === i,
        completed: store.lensCompleted[i]
      }"
    >
      <div class="lens-dot">
        <span v-if="store.lensCompleted[i]">✓</span>
        <span v-else>{{ i + 1 }}</span>
      </div>
      <span class="lens-label">{{ lens.label }}</span>
    </div>
  </nav>
</template>