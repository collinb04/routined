<script setup lang="ts">
import type { GraphFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: GraphFrame }>()

const W = 320
const H = 200
const R = 18

function nx(n: { x: number }) { return n.x * W }
function ny(n: { y: number }) { return n.y * H }

const KIND: Record<CellKind, { fill: string; stroke: string; text: string }> = {
  default:    { fill: '#ffffff',               stroke: '#d1d5db', text: '#374151' },
  active:     { fill: 'rgba(74,124,247,0.07)', stroke: '#4a7cf7', text: '#111827' },
  match:      { fill: 'rgba(34,197,94,0.12)',  stroke: '#22c55e', text: '#15803d' },
  eliminated: { fill: '#ffffff',               stroke: '#e5e7eb', text: '#9ca3af' },
  window:     { fill: 'rgba(74,124,247,0.05)', stroke: 'rgba(74,124,247,0.35)', text: '#374151' },
}

function nodeStyle(id: number) { return KIND[props.frame.nodeHL[id] ?? 'default'] }

function edgeKey(from: number, to: number) { return `${from}-${to}` }

function edgeStroke(from: number, to: number): string {
  const k = props.frame.edgeHL[edgeKey(from, to)] ?? props.frame.edgeHL[edgeKey(to, from)] ?? 'default'
  if (k === 'active')  return '#4a7cf7'
  if (k === 'match')   return '#22c55e'
  if (k === 'window')  return 'rgba(74,124,247,0.5)'
  if (k === 'eliminated') return '#e5e7eb'
  return '#d1d5db'
}

// Shorten edge endpoints so they don't overlap node circles
function edgePoints(from: number, to: number) {
  const fn = props.frame.nodes.find(n => n.id === from)!
  const tn = props.frame.nodes.find(n => n.id === to)!
  const fx = nx(fn), fy = ny(fn), tx = nx(tn), ty = ny(tn)
  const dx = tx - fx, dy = ty - fy
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = dx / len, uy = dy / len
  return {
    x1: fx + ux * R, y1: fy + uy * R,
    x2: tx - ux * R, y2: ty - uy * R,
  }
}
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg :viewBox="`0 0 ${W} ${H}`" :width="W" :height="H" class="block mx-auto max-w-full">
      <defs>
        <marker id="g-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#9ca3af" />
        </marker>
        <marker id="g-arrow-active" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#4a7cf7" />
        </marker>
        <marker id="g-arrow-match" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#22c55e" />
        </marker>
      </defs>

      <!-- Edges -->
      <line
        v-for="e in frame.edges"
        :key="`${e.from}-${e.to}`"
        v-bind="edgePoints(e.from, e.to)"
        :stroke="edgeStroke(e.from, e.to)"
        stroke-width="1.5"
        :marker-end="frame.directed ? (
          (frame.edgeHL[edgeKey(e.from, e.to)] ?? 'default') === 'active' ? 'url(#g-arrow-active)' :
          (frame.edgeHL[edgeKey(e.from, e.to)] ?? 'default') === 'match'  ? 'url(#g-arrow-match)'  :
          'url(#g-arrow)'
        ) : undefined"
        style="transition: stroke 0.2s"
      />

      <!-- Nodes -->
      <g v-for="node in frame.nodes" :key="node.id">
        <circle
          :cx="nx(node)" :cy="ny(node)" :r="R"
          :fill="nodeStyle(node.id).fill"
          :stroke="nodeStyle(node.id).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <text
          :x="nx(node)" :y="ny(node) + 0.5"
          text-anchor="middle" dominant-baseline="middle"
          :fill="nodeStyle(node.id).text"
          font-size="12" font-weight="600" font-family="ui-monospace, monospace"
          class="select-none"
        >{{ node.label }}</text>
      </g>
    </svg>
  </div>
</template>
