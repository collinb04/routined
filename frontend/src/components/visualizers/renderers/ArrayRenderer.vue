<script setup lang="ts">
import type { ArrayFrame, CellKind } from '@/composables/types'

const props = defineProps<{ frame: ArrayFrame }>()

function pointersAt(i: number): string[] {
  return Object.entries(props.frame.pointers)
    .filter(([, idx]) => idx === i)
    .map(([label]) => label)
}

const CELL_STYLES: Record<CellKind, string> = {
  default:    'bg-white border-border text-text',
  active:     'bg-[rgba(74,124,247,0.07)] border-accent text-text relative z-10',
  match:      'bg-green-bg border-green text-green relative z-10',
  eliminated: 'bg-white border-border text-text opacity-20',
  window:     'bg-[rgba(74,124,247,0.05)] border-[rgba(74,124,247,0.35)] text-text',
}

function cellClass(i: number): string {
  const kind = props.frame.highlights[i] ?? 'default'
  return `w-11 h-11 border flex items-center justify-center font-mono text-sm font-medium
          select-none transition-colors duration-200 ${CELL_STYLES[kind]}`
}

function pointerCircleClass(i: number): string {
  const kind = props.frame.highlights[i] ?? 'default'
  const base = 'w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center text-[9px] font-bold leading-none transition-colors duration-200'
  if (kind === 'match')  return `${base} border-green text-green bg-green-bg`
  if (kind === 'active' || kind === 'window') return `${base} border-accent text-accent bg-[rgba(74,124,247,0.07)]`
  return `${base} border-text/30 text-text/50`
}
</script>

<template>
  <div class="flex flex-col items-center gap-1 overflow-x-auto py-1">
    <!-- Cells row -->
    <div class="flex flex-shrink-0">
      <div
        v-for="(val, i) in frame.array"
        :key="i"
        class="flex flex-col items-center"
        style="width: 44px"
      >
        <div
          :class="cellClass(i)"
          :style="i > 0 ? 'margin-left: -1px' : ''"
        >
          {{ val }}
        </div>
        <!-- Pointer stem + label circles -->
        <div class="h-8 flex flex-col items-center justify-start pt-1 gap-px">
          <template v-if="pointersAt(i).length">
            <div class="w-px h-2 bg-text/20" />
            <div
              v-for="ptr in pointersAt(i)"
              :key="ptr"
              :class="pointerCircleClass(i)"
            >
              {{ ptr }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Index labels -->
    <div class="flex flex-shrink-0">
      <div
        v-for="(_, i) in frame.array"
        :key="i"
        class="text-center text-[10px] text-text-muted/50 font-mono"
        style="width: 44px"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>
