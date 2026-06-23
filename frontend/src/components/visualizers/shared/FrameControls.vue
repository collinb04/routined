<script setup lang="ts">
defineProps<{
  index: number
  total: number
  isFirst: boolean
  isLast: boolean
  playing: boolean
  msPerStep: number
}>()

defineEmits<{
  prev: []
  next: []
  reset: []
  togglePlay: []
  setSpeed: [ms: number]
}>()

const speeds = [
  { label: '0.5×', ms: 2000 },
  { label: '1×',   ms: 1000 },
  { label: '2×',   ms: 500  },
]
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Progress track -->
    <div class="h-[3px] bg-surface-raised rounded-full overflow-hidden">
      <div
        class="h-full bg-accent/50 rounded-full transition-all duration-200"
        :style="`width: ${((index + 1) / total) * 100}%`"
      />
    </div>

    <!-- Buttons + meta -->
    <div class="flex items-center gap-1.5">
      <!-- Prev -->
      <button
        :disabled="isFirst"
        @click="$emit('prev')"
        class="w-7 h-7 rounded-lg border border-border flex items-center justify-center
               hover:bg-surface transition-colors text-text
               disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <!-- Play / Pause -->
      <button
        @click="$emit('togglePlay')"
        class="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
        :class="playing ? 'bg-accent text-white' : 'bg-text text-white'"
      >
        <!-- Pause -->
        <svg v-if="playing" width="9" height="11" viewBox="0 0 9 11" fill="currentColor">
          <rect x="0" y="0" width="3" height="11" rx="0.75"/>
          <rect x="6" y="0" width="3" height="11" rx="0.75"/>
        </svg>
        <!-- Play -->
        <svg v-else width="9" height="11" viewBox="0 0 9 11" fill="currentColor">
          <path d="M0 0 L9 5.5 L0 11 Z"/>
        </svg>
      </button>

      <!-- Next -->
      <button
        :disabled="isLast"
        @click="$emit('next')"
        class="w-7 h-7 rounded-lg border border-border flex items-center justify-center
               hover:bg-surface transition-colors text-text
               disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- Reset -->
      <button
        @click="$emit('reset')"
        class="w-7 h-7 rounded-lg border border-border flex items-center justify-center
               hover:bg-surface transition-colors text-text-muted hover:text-text"
        title="Reset"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 4v6h6"/>
          <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
        </svg>
      </button>

      <!-- Step counter -->
      <span class="text-[11px] text-text-muted tabular-nums ml-auto">
        {{ index + 1 }} / {{ total }}
      </span>

      <!-- Speed selector -->
      <div class="flex items-center gap-2 pl-1">
        <button
          v-for="s in speeds"
          :key="s.label"
          @click="$emit('setSpeed', s.ms)"
          class="text-[11px] transition-colors"
          :class="msPerStep === s.ms
            ? 'text-accent font-semibold'
            : 'text-text-muted hover:text-text'"
        >
          {{ s.label }}
        </button>
      </div>
    </div>
  </div>
</template>
