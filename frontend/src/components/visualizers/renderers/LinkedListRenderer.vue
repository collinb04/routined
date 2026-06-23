<script setup lang="ts">
import type { LinkedListFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: LinkedListFrame }>()

const NODE_W = 40
const NODE_H = 36
const ARROW_W = 28
const SLOT_W = NODE_W + ARROW_W
const PAD = 12
const CY = NODE_H / 2 + 6  // vertical center

const svgW = computed(() => PAD + props.frame.nodes.length * SLOT_W + 40)
const svgH = NODE_H + 12

function nodeX(i: number) { return PAD + i * SLOT_W }

const KIND: Record<CellKind, { fill: string; stroke: string; text: string }> = {
  default:    { fill: '#ffffff',               stroke: '#d1d5db', text: '#374151' },
  active:     { fill: 'rgba(74,124,247,0.07)', stroke: '#4a7cf7', text: '#111827' },
  match:      { fill: 'rgba(34,197,94,0.12)',  stroke: '#22c55e', text: '#15803d' },
  eliminated: { fill: '#ffffff',               stroke: '#e5e7eb', text: '#9ca3af' },
  window:     { fill: 'rgba(74,124,247,0.05)', stroke: 'rgba(74,124,247,0.35)', text: '#374151' },
}

function style(id: number) { return KIND[props.frame.highlights[id] ?? 'default'] }

function arrowColor(id: number): string {
  const h = props.frame.highlights[id] ?? 'default'
  if (h === 'active') return '#4a7cf7'
  if (h === 'match')  return '#22c55e'
  if (h === 'eliminated') return '#e5e7eb'
  return '#d1d5db'
}
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg :width="svgW" :height="svgH" class="block mx-auto" :viewBox="`0 0 ${svgW} ${svgH}`">
      <defs>
        <marker id="arr-default" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#d1d5db" />
        </marker>
        <marker id="arr-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4a7cf7" />
        </marker>
        <marker id="arr-match" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#22c55e" />
        </marker>
        <marker id="arr-elim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#e5e7eb" />
        </marker>
      </defs>

      <!-- Nodes + arrows -->
      <g v-for="(node, i) in frame.nodes" :key="node.id">
        <!-- Node rect -->
        <rect
          :x="nodeX(i)" :y="6"
          :width="NODE_W" :height="NODE_H"
          rx="6"
          :fill="style(node.id).fill"
          :stroke="style(node.id).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <text
          :x="nodeX(i) + NODE_W / 2" :y="CY + 1"
          text-anchor="middle" dominant-baseline="middle"
          :fill="style(node.id).text"
          font-size="13" font-weight="600" font-family="ui-monospace, monospace"
          class="select-none"
        >{{ node.val }}</text>

        <!-- Arrow to next node (or null) -->
        <line
          v-if="node.next !== null"
          :x1="nodeX(i) + NODE_W + 2" :y1="CY"
          :x2="nodeX(i) + NODE_W + ARROW_W - 6" :y2="CY"
          :stroke="arrowColor(node.id)"
          stroke-width="1.5"
          :marker-end="`url(#arr-${
            (frame.highlights[node.id] ?? 'default') === 'active' ? 'active' :
            (frame.highlights[node.id] ?? 'default') === 'match'  ? 'match'  :
            (frame.highlights[node.id] ?? 'default') === 'eliminated' ? 'elim' : 'default'
          })`"
          style="transition: stroke 0.2s"
        />
        <!-- null terminator -->
        <text
          v-if="node.next === null"
          :x="nodeX(i) + NODE_W + 8" :y="CY + 1"
          dominant-baseline="middle"
          fill="#9ca3af" font-size="11" font-family="ui-monospace, monospace"
          class="select-none"
        >null</text>
      </g>
    </svg>
  </div>
</template>
