<script setup lang="ts">
import type { LinkedListFrame, CellKind } from '@/composables/types'
import { computed } from 'vue'

const props = defineProps<{ frame: LinkedListFrame }>()

// Each node renders as a classic two-compartment box: [ value | next ] —
// the left cell holds the value, the right cell is the pointer slot (a dot
// if it targets another node, ∅ if it's the tail).
const VAL_W = 32
const NEXT_W = 22
const NODE_W = VAL_W + NEXT_W
const NODE_H = 32
const ARROW_W = 30
const SLOT_W = NODE_W + ARROW_W
const PAD = 14
const PTR_H = 24   // headroom above nodes for prev/curr/next pointer badges
const ARC_H = 34   // room below nodes for backward pointer arcs (reversal)
const CY = PTR_H + NODE_H / 2

const svgW = computed(() => PAD + props.frame.nodes.length * SLOT_W + 30)
const svgH = PTR_H + NODE_H + ARC_H

function nodeX(i: number) { return PAD + i * SLOT_W }
function nodeCenterX(i: number) { return nodeX(i) + NODE_W / 2 }
function nextSlotX(i: number) { return nodeX(i) + VAL_W + NEXT_W / 2 }

// Index (not id) of the node currently occupying array position i's `next` target
function indexOfId(id: number | null): number {
  if (id === null) return -1
  return props.frame.nodes.findIndex(n => n.id === id)
}

const KIND: Record<CellKind, { fill: string; stroke: string; text: string }> = {
  default:    { fill: '#ffffff',               stroke: '#d1d5db', text: '#374151' },
  active:     { fill: 'rgba(74,124,247,0.07)', stroke: '#4a7cf7', text: '#111827' },
  match:      { fill: 'rgba(34,197,94,0.12)',  stroke: '#22c55e', text: '#15803d' },
  eliminated: { fill: '#ffffff',               stroke: '#e5e7eb', text: '#9ca3af' },
  window:     { fill: 'rgba(74,124,247,0.05)', stroke: 'rgba(74,124,247,0.35)', text: '#374151' },
}

function style(id: number) { return KIND[props.frame.highlights[id] ?? 'default'] }

function markerFor(id: number): string {
  const h = props.frame.highlights[id] ?? 'default'
  if (h === 'active') return 'active'
  if (h === 'match') return 'match'
  if (h === 'eliminated') return 'elim'
  return 'default'
}

function arrowColor(id: number): string {
  const h = props.frame.highlights[id] ?? 'default'
  if (h === 'active') return '#4a7cf7'
  if (h === 'match')  return '#22c55e'
  if (h === 'eliminated') return '#e5e7eb'
  return '#d1d5db'
}

// Straight short arrow for the common case (next is the very next slot).
function straightArrow(i: number) {
  return {
    x1: nodeX(i) + NODE_W + 2, y1: CY,
    x2: nodeX(i) + NODE_W + ARROW_W - 6, y2: CY,
  }
}

// Curved arc under the row for anything else — most importantly the
// backward pointers that appear mid-reversal (curr.next = prev).
function arcPath(i: number, j: number): string {
  const sx = nextSlotX(i), sy = PTR_H + NODE_H - 2
  const tx = nodeCenterX(j), ty = PTR_H + NODE_H - 2
  const dip = Math.min(ARC_H - 6, 16 + Math.abs(i - j) * 6)
  const by = PTR_H + NODE_H + dip
  return `M ${sx} ${sy} C ${sx} ${by}, ${tx} ${by}, ${tx} ${ty + 7}`
}

function isAdjacentForward(i: number, j: number) { return j === i + 1 }

function pointersAt(id: number): string[] {
  return Object.entries(props.frame.pointers ?? {})
    .filter(([, nodeId]) => nodeId === id)
    .map(([label]) => label)
}

function pointerColor(id: number): string {
  const h = props.frame.highlights[id] ?? 'default'
  if (h === 'match')  return '#22c55e'
  if (h === 'active') return '#4a7cf7'
  return '#6b7280'
}
</script>

<template>
  <div class="overflow-x-auto py-1">
    <svg :width="svgW" :height="svgH" class="block mx-auto" :viewBox="`0 0 ${svgW} ${svgH}`">
      <defs>
        <marker id="ll-arr-default" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#d1d5db" />
        </marker>
        <marker id="ll-arr-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#4a7cf7" />
        </marker>
        <marker id="ll-arr-match" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#22c55e" />
        </marker>
        <marker id="ll-arr-elim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#e5e7eb" />
        </marker>
      </defs>

      <!-- Arrows drawn first, under the node boxes -->
      <g v-for="(node, i) in frame.nodes" :key="`arr-${node.id}`">
        <line
          v-if="node.next !== null && isAdjacentForward(i, indexOfId(node.next))"
          v-bind="straightArrow(i)"
          :stroke="arrowColor(node.id)"
          stroke-width="1.5"
          :marker-end="`url(#ll-arr-${markerFor(node.id)})`"
          style="transition: stroke 0.2s"
        />
        <path
          v-else-if="node.next !== null && indexOfId(node.next) !== -1"
          :d="arcPath(i, indexOfId(node.next))"
          fill="none"
          :stroke="arrowColor(node.id)"
          stroke-width="1.5"
          :marker-end="`url(#ll-arr-${markerFor(node.id)})`"
          style="transition: stroke 0.2s"
        />
      </g>

      <g v-for="(node, i) in frame.nodes" :key="node.id">
        <!-- Pointer label(s) above this node -->
        <template v-if="pointersAt(node.id).length">
          <line
            :x1="nodeCenterX(i)" :y1="PTR_H - 3"
            :x2="nodeCenterX(i)" :y2="PTR_H + 3"
            :stroke="pointerColor(node.id)" stroke-width="1.3"
          />
          <g
            v-for="(ptr, pi) in pointersAt(node.id)"
            :key="ptr"
            :transform="`translate(${nodeCenterX(i) - (pointersAt(node.id).length - 1) * 12 + pi * 24}, 0)`"
          >
            <rect x="-11" y="0" width="22" height="14" rx="4" fill="white" :stroke="pointerColor(node.id)" stroke-width="1.3" />
            <text x="0" y="7.5" text-anchor="middle" dominant-baseline="middle" font-size="8.5" font-weight="700" :fill="pointerColor(node.id)" font-family="ui-monospace, monospace">{{ ptr }}</text>
          </g>
        </template>

        <!-- Node box -->
        <rect
          :x="nodeX(i)" :y="PTR_H"
          :width="NODE_W" :height="NODE_H"
          rx="6"
          :fill="style(node.id).fill"
          :stroke="style(node.id).stroke"
          stroke-width="1.5"
          style="transition: fill 0.2s, stroke 0.2s"
        />
        <!-- Divider between value cell and next cell -->
        <line
          :x1="nodeX(i) + VAL_W" :y1="PTR_H + 3"
          :x2="nodeX(i) + VAL_W" :y2="PTR_H + NODE_H - 3"
          :stroke="style(node.id).stroke" stroke-width="1.2"
        />
        <!-- Value -->
        <text
          :x="nodeX(i) + VAL_W / 2" :y="CY + 1"
          text-anchor="middle" dominant-baseline="middle"
          :fill="style(node.id).text"
          font-size="13" font-weight="600" font-family="ui-monospace, monospace"
          class="select-none"
        >{{ node.val }}</text>
        <!-- Next-pointer slot: a dot if it targets a node, ∅ if it's the tail -->
        <circle
          v-if="node.next !== null"
          :cx="nextSlotX(i)" :cy="CY"
          r="2.5"
          :fill="style(node.id).stroke"
        />
        <text
          v-else
          :x="nextSlotX(i)" :y="CY + 1"
          text-anchor="middle" dominant-baseline="middle"
          fill="#9ca3af" font-size="10" font-family="ui-monospace, monospace"
          class="select-none"
        >&#8709;</text>
      </g>
    </svg>
    <div class="flex items-center justify-center gap-1 pt-1 text-[9px] text-text-muted font-mono select-none">
      <span class="border border-gray-300 rounded-sm px-1 py-px">value</span>
      <span class="opacity-50">|</span>
      <span class="border border-gray-300 rounded-sm px-1 py-px">next</span>
    </div>
  </div>
</template>
