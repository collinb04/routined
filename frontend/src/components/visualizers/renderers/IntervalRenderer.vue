<script setup lang="ts">
import type { IntervalFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: IntervalFrame }>()

const W = 320
const PAD_L = 28
const PAD_R = 12
const CHART_W = W - PAD_L - PAD_R
const ROW_H = 22
const ROW_GAP = 4
const MERGE_Y_OFFSET = 16  // gap between original rows and merged row

const allVals = computed(() => [
  ...props.frame.intervals.flatMap(i => [i.start, i.end]),
  ...props.frame.merged.flatMap(i => [i.start, i.end]),
])
const minV = computed(() => Math.min(...allVals.value, 0))
const maxV = computed(() => Math.max(...allVals.value, 1))
const range = computed(() => maxV.value - minV.value || 1)

function toX(v: number) { return PAD_L + ((v - minV.value) / range.value) * CHART_W }

const origH = computed(() => props.frame.intervals.length * (ROW_H + ROW_GAP))
const svgH = computed(() => origH.value + MERGE_Y_OFFSET + ROW_H + 24)

const KIND_COLOR: Record<CellKind, { fill: string; stroke: string }> = {
  default:    { fill: 'rgba(74,124,247,0.12)', stroke: '#4a7cf7' },
  active:     { fill: 'rgba(74,124,247,0.25)', stroke: '#4a7cf7' },
  match:      { fill: 'rgba(34,197,94,0.2)',   stroke: '#22c55e' },
  eliminated: { fill: 'rgba(0,0,0,0.04)',       stroke: '#d1d5db' },
  window:     { fill: 'rgba(74,124,247,0.08)', stroke: 'rgba(74,124,247,0.4)' },
}

function barColor(id: number) { return KIND_COLOR[props.frame.highlights[id] ?? 'default'] }
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg :viewBox="`0 0 ${W} ${svgH}`" :width="W" :height="svgH" class="block mx-auto max-w-full">
      <!-- Axis line -->
      <line :x1="PAD_L" :y1="svgH - 10" :x2="W - PAD_R" :y2="svgH - 10" stroke="#e5e7eb" stroke-width="1" />

      <!-- Original intervals -->
      <g v-for="(iv, i) in frame.intervals" :key="iv.id">
        <rect
          :x="toX(iv.start)"
          :y="i * (ROW_H + ROW_GAP) + 4"
          :width="Math.max(toX(iv.end) - toX(iv.start), 4)"
          :height="ROW_H"
          rx="4"
          :fill="barColor(iv.id).fill"
          :stroke="barColor(iv.id).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <text
          :x="toX(iv.start) + (toX(iv.end) - toX(iv.start)) / 2"
          :y="i * (ROW_H + ROW_GAP) + 4 + ROW_H / 2 + 1"
          text-anchor="middle" dominant-baseline="middle"
          fill="#374151" font-size="10" font-weight="600" font-family="ui-monospace, monospace"
          class="select-none"
        >[{{ iv.start }},{{ iv.end }}]</text>
      </g>

      <!-- Merged row label -->
      <text
        :x="PAD_L - 4" :y="origH + MERGE_Y_OFFSET + ROW_H / 2 + 4"
        text-anchor="end" dominant-baseline="middle"
        fill="#9ca3af" font-size="9" font-weight="600" font-family="ui-sans-serif, sans-serif"
        class="select-none"
      >out</text>

      <!-- Merged result intervals -->
      <rect
        v-for="iv in frame.merged"
        :key="`m-${iv.id}`"
        :x="toX(iv.start)"
        :y="origH + MERGE_Y_OFFSET"
        :width="Math.max(toX(iv.end) - toX(iv.start), 4)"
        :height="ROW_H"
        rx="4"
        fill="rgba(34,197,94,0.2)"
        stroke="#22c55e"
        stroke-width="1.5"
        style="transition: x 0.3s, width 0.3s"
      />
      <text
        v-for="iv in frame.merged"
        :key="`mt-${iv.id}`"
        :x="toX(iv.start) + (toX(iv.end) - toX(iv.start)) / 2"
        :y="origH + MERGE_Y_OFFSET + ROW_H / 2 + 1"
        text-anchor="middle" dominant-baseline="middle"
        fill="#15803d" font-size="10" font-weight="600" font-family="ui-monospace, monospace"
        class="select-none"
      >[{{ iv.start }},{{ iv.end }}]</text>
    </svg>
  </div>
</template>
