<script setup lang="ts">
import type { GridFrame, CellKind } from '@/composables/types'

const props = defineProps<{ frame: GridFrame }>()

function pointersAt(r: number, c: number): string[] {
  return Object.entries(props.frame.pointers)
    .filter(([, [pr, pc]]) => pr === r && pc === c)
    .map(([label]) => label)
}

const CELL_STYLES: Record<CellKind, string> = {
  default:    'bg-white border-border text-text',
  active:     'bg-[rgba(74,124,247,0.07)] border-accent text-text relative z-10',
  match:      'bg-green-bg border-green text-green relative z-10',
  eliminated: 'bg-white border-border text-text opacity-20',
  window:     'bg-[rgba(74,124,247,0.05)] border-[rgba(74,124,247,0.35)] text-text',
}

function cellClass(r: number, c: number): string {
  const kind = props.frame.highlights[r]?.[c] ?? 'default'
  return `w-10 h-10 border flex items-center justify-center font-mono text-[13px] font-medium
          select-none transition-colors duration-200 shrink-0 ${CELL_STYLES[kind]}`
}

function pointerBadgeClass(r: number, c: number): string {
  const kind = props.frame.highlights[r]?.[c] ?? 'default'
  const base = 'w-[16px] h-[16px] rounded-lg border-[1.5px] flex items-center justify-center text-[8px] font-bold leading-none transition-colors duration-200'
  if (kind === 'match')  return `${base} border-green text-green bg-green-bg`
  if (kind === 'active' || kind === 'window') return `${base} border-accent text-accent bg-[rgba(74,124,247,0.07)]`
  return `${base} border-text/30 text-text/50`
}
</script>

<template>
  <div class="flex flex-col items-center gap-2 overflow-x-auto py-1">
    <div class="flex flex-col" style="width: fit-content">
      <div v-for="(row, r) in frame.grid" :key="r" class="flex" :style="r > 0 ? 'margin-top: -1px' : ''">
        <div
          v-for="(val, c) in row"
          :key="c"
          :class="cellClass(r, c)"
          :style="c > 0 ? 'margin-left: -1px' : ''"
        >
          {{ val }}
        </div>
      </div>
    </div>
    <!-- Pointer legend -->
    <div v-if="Object.keys(frame.pointers).length" class="flex flex-wrap items-center justify-center gap-3">
      <div v-for="[label, [r, c]] in Object.entries(frame.pointers)" :key="label" class="flex items-center gap-1.5">
        <div :class="pointerBadgeClass(r, c)">{{ label }}</div>
        <span class="text-[10px] text-text-muted font-mono">({{ r }}, {{ c }})</span>
      </div>
    </div>
  </div>
</template>
