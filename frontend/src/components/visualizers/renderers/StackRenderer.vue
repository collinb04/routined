<script setup lang="ts">
import type { StackFrame } from '@/composables/types'

const props = defineProps<{ frame: StackFrame }>()

function arrayCellClass(i: number): string {
  const { currentIndex, poppingIndices } = props.frame
  const base = 'w-11 h-11 border flex items-center justify-center font-mono text-sm font-medium select-none transition-colors duration-200'
  if (poppingIndices.includes(i))    return `${base} bg-green-bg border-green text-green relative z-10`
  if (i === currentIndex)            return `${base} bg-[rgba(74,124,247,0.07)] border-accent text-text relative z-10`
  if (i < currentIndex)              return `${base} bg-white border-border/40 text-text/30`
  return `${base} bg-white border-border text-text`
}

function resultCellClass(i: number): string {
  const base = 'w-11 h-11 border flex items-center justify-center font-mono text-sm font-medium select-none transition-colors duration-200'
  if (props.frame.result[i] !== null) return `${base} bg-green-bg border-green text-green`
  return `${base} bg-white border-border/30 text-text-muted/40`
}

function stackCellClass(isTop: boolean): string {
  const base = 'w-14 border flex items-center justify-center font-mono text-sm font-medium transition-colors duration-200 py-2.5'
  if (isTop) return `${base} bg-[rgba(74,124,247,0.07)] border-accent text-text`
  return `${base} bg-white border-border text-text`
}
</script>

<template>
  <div class="flex gap-4 overflow-x-auto py-1">

    <!-- Left: input array + result row -->
    <div class="flex flex-col gap-1 flex-1 min-w-0 items-center">
      <!-- Label row -->
      <div class="flex justify-center w-full mb-0.5">
        <div class="flex flex-shrink-0">
          <div v-for="(_, i) in frame.array" :key="i" class="text-[10px] text-text-muted/50 font-mono text-center" style="width:44px">{{ i }}</div>
        </div>
      </div>

      <!-- Input array -->
      <div class="flex flex-col items-center gap-px">
        <span class="text-[9px] font-semibold uppercase tracking-wider text-text-muted/50 self-start ml-1">input</span>
        <div class="flex flex-shrink-0">
          <div
            v-for="(val, i) in frame.array"
            :key="i"
            :class="arrayCellClass(i)"
            :style="i > 0 ? 'margin-left:-1px' : ''"
          >
            {{ val }}
          </div>
        </div>
      </div>

      <!-- Result row -->
      <div class="flex flex-col items-center gap-px mt-1">
        <span class="text-[9px] font-semibold uppercase tracking-wider text-text-muted/50 self-start ml-1">NGE</span>
        <div class="flex flex-shrink-0">
          <div
            v-for="(val, i) in frame.result"
            :key="i"
            :class="resultCellClass(i)"
            :style="i > 0 ? 'margin-left:-1px' : ''"
          >
            {{ val === null ? '?' : val === -1 ? '−1' : val }}
          </div>
        </div>
      </div>
    </div>

    <!-- Right: stack tower -->
    <div class="flex flex-col items-center gap-1 flex-shrink-0">
      <span class="text-[9px] font-semibold uppercase tracking-wider text-text-muted/50">stack</span>
      <div class="flex flex-col-reverse border border-dashed border-border rounded-lg overflow-hidden min-h-[5.5rem] w-14 justify-end">
        <TransitionGroup name="stack-item" tag="div" class="flex flex-col-reverse">
          <div
            v-for="(idx, pos) in frame.stack"
            :key="idx"
            :class="stackCellClass(pos === frame.stack.length - 1)"
            style="margin-top:-1px"
          >
            {{ frame.array[idx] }}
          </div>
        </TransitionGroup>
        <div v-if="frame.stack.length === 0"
             class="flex items-center justify-center h-10 text-[10px] text-text-muted/40 italic">
          empty
        </div>
      </div>
      <span class="text-[9px] text-text-muted/40">top ↑</span>
    </div>

  </div>
</template>

<style scoped>
.stack-item-enter-active,
.stack-item-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.stack-item-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.stack-item-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
