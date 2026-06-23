<script setup lang="ts">
import { ref, computed } from 'vue'
import { CLUSTERS, CLUSTER_EDGES } from '@/data/clusters'
import type { Cluster, ClusterEdge } from '@/data/clusters'

const emit = defineEmits<{
  selectCluster: [clusterId: string]
  selectConcept: [sectionId: string]
}>()

const hoveredCluster = ref<string | null>(null)
const hoveredEdge = ref<string | null>(null)

const W = 720
const H = 480
const NW = 130  // node width
const NH = 56   // node height

function edgeKey(e: ClusterEdge) { return `${e.from}-${e.to}` }

function clusterById(id: string) { return CLUSTERS.find(c => c.id === id)! }

// Compute line endpoints that terminate at node rect edges rather than centers.
// Given two node centers, find where the segment exits the source rect.
function edgePoints(e: ClusterEdge) {
  const a = clusterById(e.from).position
  const b = clusterById(e.to).position
  const dx = b.cx - a.cx
  const dy = b.cy - a.cy
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len === 0) return { x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy }
  const ux = dx / len
  const uy = dy / len
  // Offset start/end from center by half node dimensions + 4px gap
  const startPad = Math.min(Math.abs(NW / 2 / (ux || 0.001)), Math.abs(NH / 2 / (uy || 0.001))) + 4
  const endPad   = startPad
  return {
    x1: a.cx + ux * startPad,
    y1: a.cy + uy * startPad,
    x2: b.cx - ux * endPad,
    y2: b.cy - uy * endPad,
  }
}

function midpoint(e: ClusterEdge) {
  const { x1, y1, x2, y2 } = edgePoints(e)
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
}

const hoveredClusterData = computed(() =>
  hoveredCluster.value ? clusterById(hoveredCluster.value) : null
)

const hoveredEdgeData = computed(() =>
  hoveredEdge.value ? CLUSTER_EDGES.find(e => edgeKey(e) === hoveredEdge.value) ?? null : null
)

// Map SVG coords → CSS % for the tooltip overlay
function tooltipStyle(cluster: Cluster) {
  const pctX = cluster.position.cx / W
  const pctY = cluster.position.cy / H
  // Anchor tooltip: left of cluster center for right-side nodes, right of center for left-side nodes
  const anchorLeft = pctX < 0.55
  return {
    [anchorLeft ? 'left' : 'right']: `${anchorLeft ? pctX * 100 + 2 : (1 - pctX) * 100 + 2}%`,
    top: pctY < 0.72
      ? `calc(${(pctY + 0.1) * 100}% + 4px)`
      : undefined,
    bottom: pctY >= 0.72
      ? `calc(${(1 - pctY + 0.1) * 100}% + 4px)`
      : undefined,
  }
}
</script>

<template>
  <div class="relative select-none">

    <svg
      role="img"
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full"
      style="color: inherit"
    >
      <title>Cluster dependency map</title>
      <desc>
        Eight problem-domain clusters and their prerequisite / transfer relationships.
        Linear → Linked → Recursive → Graph and Optimization.
        Sorted Search, Lookup, and Ordered connect via transfer edges.
      </desc>

      <defs>
        <marker id="arr-prereq" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" opacity="0.3" />
        </marker>
        <marker id="arr-transfer" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" opacity="0.18" />
        </marker>
      </defs>

      <!-- ── Edges (drawn first so nodes render on top) ── -->
      <g v-for="edge in CLUSTER_EDGES" :key="edgeKey(edge)">
        <!-- Invisible fat hit area -->
        <line
          v-bind="edgePoints(edge)"
          stroke="transparent"
          stroke-width="14"
          class="cursor-pointer"
          @mouseenter="hoveredEdge = edgeKey(edge)"
          @mouseleave="hoveredEdge = null"
        />
        <!-- Visible line -->
        <line
          v-bind="edgePoints(edge)"
          stroke="currentColor"
          :stroke-width="hoveredEdge === edgeKey(edge) ? 1.8 : 1.2"
          :stroke-dasharray="edge.type === 'transfer' ? '5 4' : 'none'"
          :opacity="hoveredEdge === edgeKey(edge) ? 0.5 : 0.2"
          :marker-end="`url(#arr-${edge.type})`"
          class="pointer-events-none transition-opacity duration-100"
        />
        <!-- Midpoint label on hover -->
        <g v-if="hoveredEdge === edgeKey(edge)" class="pointer-events-none">
          <rect
            :x="midpoint(edge).x - 48"
            :y="midpoint(edge).y - 10"
            width="96"
            height="18"
            rx="5"
            fill="white"
            opacity="0.92"
          />
          <text
            :x="midpoint(edge).x"
            :y="midpoint(edge).y + 1"
            text-anchor="middle"
            dominant-baseline="central"
            font-size="9.5"
            fill="currentColor"
            opacity="0.6"
          >{{ edge.shared }}</text>
        </g>
      </g>

      <!-- ── Cluster Nodes ── -->
      <g
        v-for="cluster in CLUSTERS"
        :key="cluster.id"
        class="cursor-pointer"
        @mouseenter="hoveredCluster = cluster.id"
        @mouseleave="hoveredCluster = null"
        @click="emit('selectCluster', cluster.id)"
      >
        <!-- Drop shadow -->
        <rect
          :x="cluster.position.cx - NW/2 + 1.5"
          :y="cluster.position.cy - NH/2 + 1.5"
          :width="NW" :height="NH"
          rx="9"
          :fill="cluster.color"
          opacity="0.06"
        />

        <!-- Node background -->
        <rect
          :x="cluster.position.cx - NW/2"
          :y="cluster.position.cy - NH/2"
          :width="NW" :height="NH"
          rx="9"
          fill="white"
          :stroke="cluster.color"
          :stroke-width="hoveredCluster === cluster.id ? 2 : 1"
          :stroke-opacity="hoveredCluster === cluster.id ? 0.7 : 0.22"
          class="transition-all duration-150"
        />

        <!-- Color top cap (solid) — drawn as two stacked rects to get flat bottom + round top -->
        <rect
          :x="cluster.position.cx - NW/2"
          :y="cluster.position.cy - NH/2"
          :width="NW" :height="5"
          rx="9"
          :fill="cluster.color"
          :opacity="hoveredCluster === cluster.id ? 1 : 0.6"
          class="transition-opacity duration-150"
        />
        <rect
          :x="cluster.position.cx - NW/2"
          :y="cluster.position.cy - NH/2 + 3"
          :width="NW" :height="4"
          :fill="cluster.color"
          :opacity="hoveredCluster === cluster.id ? 1 : 0.6"
          class="transition-opacity duration-150"
        />

        <!-- Label -->
        <text
          :x="cluster.position.cx"
          :y="cluster.position.cy - 7"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="13"
          font-weight="500"
          fill="currentColor"
          opacity="0.9"
        >{{ cluster.label }}</text>

        <!-- Primitive subtitle -->
        <text
          :x="cluster.position.cx"
          :y="cluster.position.cy + 11"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="9"
          fill="currentColor"
          opacity="0.38"
        >{{ cluster.primitive }}</text>
      </g>

    </svg>

    <!-- ── Hover Tooltip ── -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="hoveredClusterData"
        class="absolute z-20 w-52 bg-white rounded-xl shadow-lg border border-gray-100 p-3.5 pointer-events-none"
        :style="tooltipStyle(hoveredClusterData)"
      >
        <!-- Primitive -->
        <div class="flex flex-col gap-1 pb-2.5 border-b border-gray-100">
          <span
            class="text-[10px] font-semibold uppercase tracking-widest"
            :style="{ color: hoveredClusterData.color }"
          >Central Primitive</span>
          <span class="text-[12.5px] font-semibold text-text leading-snug">{{ hoveredClusterData.primitive }}</span>
          <span class="text-[11px] text-text-muted leading-snug">{{ hoveredClusterData.primitiveExplainer }}</span>
        </div>

        <!-- Concepts -->
        <div class="flex flex-col gap-1 pt-2.5">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-0.5">Concepts</span>
          <button
            v-for="(concept, i) in hoveredClusterData.concepts"
            :key="concept.id"
            class="flex items-center gap-2 text-left rounded-md px-1 py-0.5 -mx-1 pointer-events-auto transition-colors"
            :class="concept.isNew ? 'opacity-40 cursor-default' : 'hover:bg-black/5 cursor-pointer'"
            @click.stop="!concept.isNew && emit('selectConcept', concept.id)"
          >
            <span class="text-[10px] text-text-muted/50 tabular-nums w-4 shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="text-[11.5px] text-text-dim flex-1">{{ concept.label }}</span>
            <span v-if="concept.isNew" class="text-[9px] text-text-muted/40 shrink-0">soon</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- ── Edge shared-concept label (bottom bar) ── -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="hoveredEdgeData"
        class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-full px-3.5 py-1.5 pointer-events-none"
      >
        <span class="text-[11px]">{{ hoveredEdgeData.shared }}</span>
        <span class="h-3 w-px bg-white/20" />
        <span class="text-[10px] text-white/50">{{ hoveredEdgeData.type }}</span>
      </div>
    </Transition>

    <!-- ── Legend ── -->
    <div class="absolute bottom-3 right-3 flex items-center gap-4 text-[10px] text-text-muted pointer-events-none">
      <div class="flex items-center gap-1.5">
        <svg width="22" height="8" class="shrink-0">
          <line x1="0" y1="4" x2="22" y2="4" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
        </svg>
        <span>Prerequisite</span>
      </div>
      <div class="flex items-center gap-1.5">
        <svg width="22" height="8" class="shrink-0">
          <line x1="0" y1="4" x2="22" y2="4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.45"/>
        </svg>
        <span>Transfer</span>
      </div>
    </div>

  </div>
</template>
