<template>
  <div class="flex flex-col gap-10">
    <!-- Header -->
    <div class="flex flex-col items-center gap-2 text-center">
      <h2 class="text-4xl sm:text-6xl font-medium leading-snug tracking-tight text-text">
        Our Mission
      </h2>
      <p class="text-md text-text-dim leading-relaxed max-w-md">
        The story of what led to the creation of Routined and what our goal is.
      </p>
    </div>

    <!-- Main card -->
    <div class="w-full rounded-2xl overflow-hidden border border-black/6 shadow-sm flex" style="height:520px">

      <!-- Left: node detail panel -->
      <div class="w-72 shrink-0 bg-white flex flex-col border-r border-gray-100">
        <!-- Nav row -->
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-50">
          <button
            @click="selectedId = null"
            class="flex items-center gap-1 text-[11px] text-text-muted hover:text-text transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
            Back to overview
          </button>
          <span v-if="selectedId" class="text-[11px] text-text-muted tabular-nums">
            {{ currentIndex + 1 }} / {{ storyData.length }}
          </span>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
          <!-- Node selected -->
          <template v-if="activeNode">
            <div class="flex flex-col gap-1.5">
              <span class="text-[10px] font-mono uppercase tracking-widest text-text-muted">Current Node</span>
              <h3 class="text-[22px] font-semibold text-text leading-tight tracking-tight">
                {{ activeNode.label }}
              </h3>
            </div>

            <p class="text-sm text-text-dim leading-relaxed whitespace-pre-line flex-1">
              {{ activeNode.description }}
            </p>

            <!-- Impact callout -->
            <div v-if="activeNode.impact" class="flex gap-2.5 rounded-xl p-3.5" style="background:rgba(58,154,232,0.06)">
              <div class="w-0.75 rounded-lg bg-[#3a9ae8] shrink-0 self-stretch" />
              <div class="flex flex-col gap-0.5">
                <span class="text-[9px] font-medium font-mono uppercase tracking-widest  text-[#3a9ae8]">Impact</span>
                <p class="text-[11px] text-text-dim leading-relaxed font-medium">{{ activeNode.impact }}</p>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                @click="prevNode"
                :disabled="currentIndex <= 0"
                class="flex items-center justify-center gap-1 flex-1 bg-gray-100 text-text text-sm font-semibold px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:hover:bg-gray-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                Previous
              </button>
              <button
                @click="nextNode"
                :disabled="currentIndex >= storyData.length - 1"
                class="flex items-center justify-center gap-1 flex-1 bg-black text-white text-sm font-semibold px-4 py-3 rounded-xl hover:opacity-85 transition-opacity disabled:opacity-40">
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </template>

          <!-- No selection -->
          <template v-else>
            <span class="text-[10px] font-mono uppercase tracking-widest text-text-muted">Overview</span>
            <p class="text-sm text-text-dim leading-relaxed">
              Click any node to explore the story behind Routined — the curiosity, frustration, and insight that led to this platform.
            </p>
            <button
              @click="selectedId = storyData[0].id"
              class="text-sm font-semibold text-text hover:text-text-muted transition-colors text-left">
              Start from the beginning →
            </button>
          </template>
        </div>
      </div>

      <!-- Right: force-directed graph -->
      <div ref="graphContainer" class="flex-1 relative overflow-hidden" style="background:#fafaf9">
        <svg
          class="w-full h-full select-none"
          @mousedown="onSvgMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @wheel.prevent="onWheel">
          <g :transform="`translate(${cx + pan.x}, ${cy + pan.y}) scale(${zoom})`">
            <!-- Edges -->
            <line
              v-for="edge in edgeData"
              :key="`${edge.source}-${edge.target}`"
              :x1="pos(edge.source).x"
              :y1="pos(edge.source).y"
              :x2="pos(edge.target).x"
              :y2="pos(edge.target).y"
              :stroke="selectedId && (edge.source === selectedId || edge.target === selectedId) ? '#9ca3af' : '#d1d5db'"
              :stroke-width="selectedId && (edge.source === selectedId || edge.target === selectedId) ? 1.5 : 1"
              :opacity="selectedId && edge.source !== selectedId && edge.target !== selectedId ? 0.55 : 1"
            />
            <!-- Nodes -->
            <g
              v-for="node in storyData"
              :key="node.id"
              style="cursor:pointer"
              @mousedown.stop="onNodeMouseDown($event, node.id)">
              <circle
                :cx="pos(node.id).x"
                :cy="pos(node.id).y"
                :r="node.id === selectedId ? 10 : (neighborIds.has(node.id) ? 7 : 6)"
                :fill="node.id === selectedId ? '#111215' : 'white'"
                :stroke="node.id === selectedId ? '#111215' : (neighborIds.has(node.id) ? '#6b7280' : '#9ca3af')"
                stroke-width="1.5"
                :opacity="selectedId && !neighborIds.has(node.id) && node.id !== selectedId ? 0.65 : 1"
              />
              <!-- Label: always show for selected + neighbors; hide others -->
              <text
                v-if="!selectedId || node.id === selectedId || neighborIds.has(node.id)"
                text-anchor="middle"
                :x="pos(node.id).x"
                :y="pos(node.id).y"
                :fill="node.id === selectedId ? '#111215' : '#6b7280'"
                :font-size="node.id === selectedId ? 11 : 10"
                :font-weight="node.id === selectedId ? '600' : '400'"
                style="pointer-events:none;user-select:none">
                <tspan
                  v-for="(line, li) in node.labelLines"
                  :key="li"
                  :x="pos(node.id).x"
                  :dy="li === 0 ? (node.id === selectedId ? 23 : 18) : 13">
                  {{ line }}
                </tspan>
              </text>
            </g>
          </g>
        </svg>

        <!-- Legend -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-1.5 bg-white/90 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-black/5 shadow-sm">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-lg bg-text" />
            <span class="text-[9px] font-medium text-text-muted">Current Node</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-lg border border-[#9ca3af] bg-white" />
            <span class="text-[9px] font-medium text-text-muted">Other Nodes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hint -->
    <p class="text-center text-[11px] text-text-muted flex items-center justify-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <path d="M4 4l7.07 17 2.51-7.39L21 11.07z"/>
      </svg>
      Click a node to explore that part of the story
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

interface StoryNode {
  id: string
  label: string
  labelLines: string[]
  description: string
  impact: string
}

const storyData: StoryNode[] = [
  {
    id: 'curiosity',
    label: 'Curiosity',
    labelLines: ['Curiosity'],
    description: 'It started with pure curiosity. How are people passing these insanely difficult interviews... am I dumb?! So I began investigating, and I found the trick that allows you to go from getting by to really good.',
    impact: 'Curiosity is the prerequisite to learning anything deeply.',
  },
  {
    id: 'interviews',
    label: 'Interviews',
    labelLines: ['Interviews'],
    description: 'The first technical interview was a wake-up call. I knew how to code, but I didn\'t know how to think through novel problems under pressure. Knowing syntax wasn\'t enough. Failing an interview can feel detrimental, but failure is important for growth. Routined is built to isolate failure from high stakes.',
    impact: 'Interviews expose the gap between knowing and understanding.',
  },
  {
    id: 'leetcode',
    label: 'LeetCode Grind',
    labelLines: ['LeetCode', 'Grind'],
    description: 'I did what everyone does: started grinding. 100 problems, 200 problems. I could solve problems I\'d seen before — but new variants still stumped me completely. As more people game DSA questions, more companies add variation. Memorization won\'t get you by anymore.',
    impact: 'Grinding builds exposure, not pattern recognition.',
  },
  {
    id: 'frustration',
    label: 'Frustration',
    labelLines: ['Frustration'],
    description: 'After hundreds of problems I still felt lost on unseen variants. The grind wasn\'t building intuition — it was building a database of solutions I could forget. I thought there had to be a better way to learn and internalize.',
    impact: 'Frustration is apart of learning. Indefinite frustration is not.',
  },
  {
    id: 'memorization',
    label: 'Memorization (Not Learning)',
    labelLines: ['Memorization', '(Not Learning)'],
    description: 'I realized I was memorizing, not learning. Solution patterns without understanding the "why" vanish the moment the problem looks slightly different. This inflection point made me realize there is true methodology to solving problems.',
    impact: 'Memorization is fragile. Understanding is robust.',
  },
  {
    id: 'understanding',
    label: 'Understanding',
    labelLines: ['Understanding'],
    description: 'This was the turning point.\nI stopped asking "Which problem is this?" and started asking "What is the context of this problem actually telling me?" The constraints, the input shape, the phrasing of the question — they point to a pattern, and that pattern is what narrows the entire problem space.\n\nFrom there, understanding how and why an approach works shows you exactly how it affects the input. Solving the problem becomes a matter of matching that affected input to the output you were asked for.\n\nThat shift changed everything. It made me faster at problem solving and confident on unfamiliar problems.',
    impact: 'Deep understanding leads to long-term intuition.',
  },
  {
    id: 'ds-discovery',
    label: 'Data Structures Discovery',
    labelLines: ['Data Structures', 'Discovery'],
    description: 'Once I understood why data structures exist — what problems they actually solve — patterns became obvious. Every algorithm is just a data structure used cleverly.',
    impact: 'Data structures are the vocabulary of algorithms.',
  },
  {
    id: 'teaching',
    label: 'Teaching Others',
    labelLines: ['Teaching', 'Others'],
    description: 'Teaching others forced me to confront every gap in my understanding. Explaining something you half-know exposes exactly what you don\'t know. It was humbling and transformative.',
    impact: 'Teaching is the highest form of learning.',
  },
  {
    id: 'building',
    label: 'Building This Platform',
    labelLines: ['Building', 'This Platform'],
    description: 'I built Routined because I wished it had existed when I was struggling. A platform that teaches you to think, not to memorize. Every feature asks: does this make patterns stick?',
    impact: 'Build what you wish existed.',
  },
  {
    id: 'mission',
    label: 'Mission & Values',
    labelLines: ['Mission & Values'],
    description: 'Our mission: teach people to think like experts. Not to grind more, but to learn better. Pattern recognition is a learnable skill — and everyone deserves access to that insight.',
    impact: 'Learning efficiency multiplies everything downstream.',
  },
]

// Edges follow storyData in order, forming a single linear chain — the
// graph is a path, not a branching structure, so it always reads left-to-right.
const edgeData = [
  { source: 'curiosity', target: 'interviews' },
  { source: 'interviews', target: 'leetcode' },
  { source: 'leetcode', target: 'frustration' },
  { source: 'frustration', target: 'memorization' },
  { source: 'memorization', target: 'understanding' },
  { source: 'understanding', target: 'ds-discovery' },
  { source: 'ds-discovery', target: 'teaching' },
  { source: 'teaching', target: 'building' },
  { source: 'building', target: 'mission' },
]

// Rough starting layout — a physics simulation (repulsion + edge springs +
// centering) takes over from here, so this only seeds the initial arrangement
// and orientation of the settle-in animation, Obsidian-graph style.
const seedPositions: Record<string, [number, number]> = {
  'curiosity':     [-280, -170],
  'interviews':    [ -93, -170],
  'leetcode':      [  93, -170],
  'frustration':   [ 280, -170],
  'memorization':  [ 280,    0],
  'understanding': [   0,    0],
  'ds-discovery':  [-280,    0],
  'teaching':      [-280,  170],
  'building':      [   0,  170],
  'mission':       [ 280,  170],
}

interface SimNode {
  id: string
  x: number; y: number
  vx: number; vy: number
  fx: number | null; fy: number | null   // fixed while being dragged
}

const simNodes: SimNode[] = []
const simNodeMap = new Map<string, SimNode>()

// Reactive display positions (updated each frame)
const displayPos = ref<Record<string, { x: number; y: number }>>({})
const pos = (id: string) => displayPos.value[id] ?? { x: 0, y: 0 }

// Container size
const graphContainer = ref<HTMLElement | null>(null)
const containerW = ref(600)
const containerH = ref(520)
const cx = computed(() => containerW.value / 2)
const cy = computed(() => containerH.value / 2)

// Pan / zoom
const zoom = ref(0.9)
const pan = reactive({ x: 0, y: 0 })
let isPanning = false
let panAnchor = { mx: 0, my: 0, px: 0, py: 0 }

// Selection — always starts on the first node in the story
const selectedId = ref<string | null>(storyData[0].id)
const activeNode = computed(() => storyData.find(n => n.id === selectedId.value) ?? null)
const currentIndex = computed(() => storyData.findIndex(n => n.id === selectedId.value))

const neighborIds = computed(() => {
  const id = selectedId.value
  if (!id) return new Set<string>()
  return new Set(
    edgeData
      .filter(e => e.source === id || e.target === id)
      .map(e => (e.source === id ? e.target : e.source))
  )
})

function nextNode() {
  const i = currentIndex.value
  if (i >= 0 && i < storyData.length - 1) selectedId.value = storyData[i + 1].id
}

function prevNode() {
  const i = currentIndex.value
  if (i > 0) selectedId.value = storyData[i - 1].id
}

function selectNode(id: string) {
  selectedId.value = id
}

let animFrame = 0

// Force-directed simulation tuning — same shape as Obsidian's graph view:
// nodes repel each other, edges act as springs pulling connected nodes
// together, and a weak centering force keeps the whole graph from drifting.
const REPULSION = 14000
const SPRING_LENGTH = 130
const SPRING_STRENGTH = 0.02
const CENTER_STRENGTH = 0.012
const DAMPING = 0.82
const JITTER = 0.015   // tiny random drift so the graph never looks fully frozen

function initSim() {
  simNodes.length = 0
  simNodeMap.clear()
  storyData.forEach(node => {
    const [sx, sy] = seedPositions[node.id] ?? [0, 0]
    const spread = 60
    const n: SimNode = {
      id: node.id,
      x: sx + (Math.random() - 0.5) * spread,
      y: sy + (Math.random() - 0.5) * spread,
      vx: 0, vy: 0,
      fx: null, fy: null,
    }
    simNodes.push(n)
    simNodeMap.set(node.id, n)
  })
}

function simulateTick() {
  // Repulsion — every node pushes every other node away
  for (let i = 0; i < simNodes.length; i++) {
    for (let j = i + 1; j < simNodes.length; j++) {
      const a = simNodes[i], b = simNodes[j]
      let dx = b.x - a.x
      let dy = b.y - a.y
      let distSq = dx * dx + dy * dy
      if (distSq < 1) { dx = (Math.random() - 0.5) || 0.1; dy = (Math.random() - 0.5) || 0.1; distSq = dx * dx + dy * dy }
      const dist = Math.sqrt(distSq)
      const force = REPULSION / distSq
      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      a.vx -= fx; a.vy -= fy
      b.vx += fx; b.vy += fy
    }
  }

  // Springs — connected nodes pull toward the ideal edge length
  for (const edge of edgeData) {
    const a = simNodeMap.get(edge.source)
    const b = simNodeMap.get(edge.target)
    if (!a || !b) continue
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.1
    const diff = dist - SPRING_LENGTH
    const force = diff * SPRING_STRENGTH
    const fx = (dx / dist) * force
    const fy = (dy / dist) * force
    a.vx += fx; a.vy += fy
    b.vx -= fx; b.vy -= fy
  }

  // Integrate — centering, damping, a touch of jitter, then move
  for (const n of simNodes) {
    if (n.fx != null && n.fy != null) {
      n.x = n.fx; n.y = n.fy
      n.vx = 0; n.vy = 0
      continue
    }
    n.vx += -n.x * CENTER_STRENGTH + (Math.random() - 0.5) * JITTER
    n.vy += -n.y * CENTER_STRENGTH + (Math.random() - 0.5) * JITTER
    n.vx *= DAMPING
    n.vy *= DAMPING
    n.x += n.vx
    n.y += n.vy
  }
}

function animate() {
  simulateTick()
  const p: Record<string, { x: number; y: number }> = {}
  for (const n of simNodes) p[n.id] = { x: n.x, y: n.y }
  displayPos.value = p
  animFrame = requestAnimationFrame(animate)
}

// Pan / zoom / node-drag handlers
let draggingId: string | null = null
let dragStart = { mx: 0, my: 0, moved: false }

function onSvgMouseDown(e: MouseEvent) {
  isPanning = true
  panAnchor = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y }
}

function onNodeMouseDown(e: MouseEvent, id: string) {
  draggingId = id
  dragStart = { mx: e.clientX, my: e.clientY, moved: false }
  const n = simNodeMap.get(id)
  if (n) { n.fx = n.x; n.fy = n.y }
}

function eventToWorld(e: MouseEvent) {
  const rect = graphContainer.value!.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  return {
    x: (mx - (cx.value + pan.x)) / zoom.value,
    y: (my - (cy.value + pan.y)) / zoom.value,
  }
}

function onMouseMove(e: MouseEvent) {
  if (draggingId) {
    const n = simNodeMap.get(draggingId)
    if (n) {
      const { x, y } = eventToWorld(e)
      n.fx = x; n.fy = y
    }
    if (Math.abs(e.clientX - dragStart.mx) > 4 || Math.abs(e.clientY - dragStart.my) > 4) dragStart.moved = true
    return
  }
  if (!isPanning) return
  pan.x = panAnchor.px + (e.clientX - panAnchor.mx)
  pan.y = panAnchor.py + (e.clientY - panAnchor.my)
}

function onMouseUp() {
  if (draggingId) {
    const id = draggingId
    const n = simNodeMap.get(id)
    if (n) { n.fx = null; n.fy = null }
    if (!dragStart.moved) selectNode(id)
    draggingId = null
  }
  isPanning = false
}

function onWheel(e: WheelEvent) {
  const rect = graphContainer.value!.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const factor = 1 - e.deltaY * 0.001
  const newZoom = Math.max(0.25, Math.min(4, zoom.value * factor))
  const ratio = newZoom / zoom.value
  pan.x = mx - ratio * (mx - pan.x)
  pan.y = my - ratio * (my - pan.y)
  zoom.value = newZoom
}

onMounted(() => {
  const el = graphContainer.value!
  containerW.value = el.clientWidth
  containerH.value = el.clientHeight

  initSim()
  animFrame = requestAnimationFrame(animate)

  const ro = new ResizeObserver(() => {
    containerW.value = el.clientWidth
    containerH.value = el.clientHeight
  })
  ro.observe(el)
  onUnmounted(() => ro.disconnect())
})

onUnmounted(() => cancelAnimationFrame(animFrame))
</script>
