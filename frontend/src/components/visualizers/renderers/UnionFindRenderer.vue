<script setup lang="ts">
import type { UnionFindFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: UnionFindFrame }>()

const R = 18
const SPACING = 56
const PAD = 24
const CY = 80  // node center y
const svgW = computed(() => PAD * 2 + (props.frame.n - 1) * SPACING)
const svgH = 140

function cx(i: number) { return PAD + i * SPACING }

function findRoot(i: number): number {
  let cur = i
  while (props.frame.parent[cur] !== cur) cur = props.frame.parent[cur]
  return cur
}

// Assign a color index to each root
const rootColors = computed(() => {
  const roots = new Map<number, number>()
  let idx = 0
  for (let i = 0; i < props.frame.n; i++) {
    const r = findRoot(i)
    if (!roots.has(r)) roots.set(r, idx++)
  }
  return roots
})

const PALETTE = [
  { fill: 'rgba(74,124,247,0.1)',  stroke: '#4a7cf7', text: '#1e40af' },
  { fill: 'rgba(34,197,94,0.12)',  stroke: '#22c55e', text: '#15803d' },
  { fill: 'rgba(249,115,22,0.1)',  stroke: '#f97316', text: '#c2410c' },
  { fill: 'rgba(168,85,247,0.1)',  stroke: '#a855f7', text: '#7e22ce' },
  { fill: 'rgba(236,72,153,0.1)',  stroke: '#ec4899', text: '#9d174d' },
  { fill: 'rgba(234,179,8,0.1)',   stroke: '#eab308', text: '#854d0e' },
]

function nodeStyle(i: number) {
  const hl = props.frame.highlights[i] ?? 'default'
  if (hl === 'active') return { fill: 'rgba(74,124,247,0.15)', stroke: '#4a7cf7', text: '#111827' }
  if (hl === 'match')  return { fill: 'rgba(34,197,94,0.15)',  stroke: '#22c55e', text: '#15803d' }
  const root = findRoot(i)
  const idx = rootColors.value.get(root) ?? 0
  return PALETTE[idx % PALETTE.length]
}

// For each non-root node, draw an arrow to parent
const parentArrows = computed(() => {
  const arrows: { from: number; to: number }[] = []
  for (let i = 0; i < props.frame.n; i++) {
    if (props.frame.parent[i] !== i) arrows.push({ from: i, to: props.frame.parent[i] })
  }
  return arrows
})

function arrowPath(from: number, to: number) {
  const fx = cx(from), tx = cx(to)
  const mid = (fx + tx) / 2
  const lift = Math.abs(tx - fx) * 0.5 + 24
  return `M ${fx} ${CY - R} Q ${mid} ${CY - lift} ${tx} ${CY - R}`
}
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg :viewBox="`0 0 ${svgW} ${svgH}`" :width="svgW" :height="svgH" class="block mx-auto max-w-full">
      <defs>
        <marker id="uf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af" />
        </marker>
      </defs>

      <!-- Parent pointer arcs -->
      <path
        v-for="a in parentArrows"
        :key="`${a.from}-${a.to}`"
        :d="arrowPath(a.from, a.to)"
        fill="none" stroke="#9ca3af" stroke-width="1.5"
        marker-end="url(#uf-arrow)"
        style="transition: d 0.3s"
      />

      <!-- Nodes -->
      <g v-for="i in frame.n" :key="i - 1">
        <circle
          :cx="cx(i - 1)" :cy="CY"
          :r="R"
          :fill="nodeStyle(i - 1).fill"
          :stroke="nodeStyle(i - 1).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <text
          :x="cx(i - 1)" :y="CY + 0.5"
          text-anchor="middle" dominant-baseline="middle"
          :fill="nodeStyle(i - 1).text"
          font-size="13" font-weight="600" font-family="ui-monospace, monospace"
          class="select-none"
        >{{ i - 1 }}</text>
        <!-- Label below -->
        <text
          :x="cx(i - 1)" :y="CY + R + 14"
          text-anchor="middle" dominant-baseline="middle"
          fill="#9ca3af" font-size="9" font-family="ui-sans-serif, sans-serif"
          class="select-none"
        >{{ findRoot(i - 1) === i - 1 ? 'root' : '' }}</text>
      </g>
    </svg>
  </div>
</template>
