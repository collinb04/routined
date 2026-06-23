<script setup lang="ts">
import type { TreeFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: TreeFrame }>()

const W = 320
const R = 18
const LH = 70

const rootId = computed(() => {
  const childSet = new Set<number>()
  for (const n of props.frame.nodes) {
    if (n.left !== null) childSet.add(n.left)
    if (n.right !== null) childSet.add(n.right)
  }
  return props.frame.nodes.find(n => !childSet.has(n.id))?.id ?? null
})

const positions = computed(() => {
  const pos = new Map<number, { x: number; y: number }>()
  function place(id: number | null, depth: number, lo: number, hi: number) {
    if (id === null) return
    const node = props.frame.nodes.find(n => n.id === id)
    if (!node) return
    pos.set(id, { x: (lo + hi) / 2, y: depth * LH + R + 4 })
    place(node.left,  depth + 1, lo,          (lo + hi) / 2)
    place(node.right, depth + 1, (lo + hi) / 2, hi)
  }
  place(rootId.value, 0, 0, W)
  return pos
})

const svgH = computed(() => {
  if (!positions.value.size) return 80
  return Math.max(...[...positions.value.values()].map(p => p.y)) + R + 10
})

const edges = computed(() =>
  props.frame.nodes.flatMap(n => {
    const res: { from: number; to: number }[] = []
    if (n.left  !== null) res.push({ from: n.id, to: n.left  })
    if (n.right !== null) res.push({ from: n.id, to: n.right })
    return res
  })
)

const KIND: Record<CellKind, { fill: string; stroke: string; text: string }> = {
  default:    { fill: '#ffffff',               stroke: '#d1d5db',                   text: '#374151' },
  active:     { fill: 'rgba(74,124,247,0.07)', stroke: '#4a7cf7',                   text: '#111827' },
  match:      { fill: 'rgba(34,197,94,0.12)',  stroke: '#22c55e',                   text: '#15803d' },
  eliminated: { fill: '#ffffff',               stroke: '#e5e7eb',                   text: '#9ca3af' },
  window:     { fill: 'rgba(74,124,247,0.05)', stroke: 'rgba(74,124,247,0.35)',     text: '#374151' },
}

function nodeStyle(id: number) {
  return KIND[props.frame.highlights[id] ?? 'default']
}

function edgeStroke(from: number, to: number): string {
  const hf = props.frame.highlights[from] ?? 'default'
  const ht = props.frame.highlights[to]   ?? 'default'
  if (hf === 'eliminated' && ht === 'eliminated') return '#e5e7eb'
  if (hf === 'active'     || ht === 'active')     return '#4a7cf7'
  if (hf === 'match'      || ht === 'match')      return '#22c55e'
  if (hf === 'eliminated' || ht === 'eliminated') return '#e5e7eb'
  return '#d1d5db'
}
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg
      :viewBox="`0 0 ${W} ${svgH}`"
      :width="W"
      :height="svgH"
      class="block mx-auto max-w-full"
    >
      <!-- Edges underneath nodes -->
      <line
        v-for="e in edges"
        :key="`e-${e.from}-${e.to}`"
        :x1="positions.get(e.from)?.x ?? 0"
        :y1="positions.get(e.from)?.y ?? 0"
        :x2="positions.get(e.to)?.x ?? 0"
        :y2="positions.get(e.to)?.y ?? 0"
        :stroke="edgeStroke(e.from, e.to)"
        stroke-width="1.5"
        style="transition: stroke 0.2s"
      />

      <!-- Nodes -->
      <g v-for="node in frame.nodes" :key="`n-${node.id}`">
        <circle
          :cx="positions.get(node.id)?.x ?? 0"
          :cy="positions.get(node.id)?.y ?? 0"
          :r="R"
          :fill="nodeStyle(node.id).fill"
          :stroke="nodeStyle(node.id).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <text
          :x="positions.get(node.id)?.x ?? 0"
          :y="(positions.get(node.id)?.y ?? 0) + 0.5"
          text-anchor="middle"
          dominant-baseline="middle"
          :fill="nodeStyle(node.id).text"
          font-size="13"
          font-weight="600"
          font-family="ui-monospace, monospace"
          class="select-none"
          style="transition: fill 0.2s"
        >
          {{ node.val }}
        </text>
      </g>
    </svg>
  </div>
</template>
