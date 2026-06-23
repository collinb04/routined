<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const selected = ref<string | null>(null)

function toggle(id: string) {
  selected.value = selected.value === id ? null : id
}

// Plot area in logical pixels (matches viewBox 500×270)
const CW = 500, CH = 270
const L = 50, T = 20, R = 485, B = 245
const plotW = R - L, plotH = B - T

// O(n) at n=40 reaches 70% of plot height
const S = plotH * 0.70 / 40

const CURVES = [
  {
    id: 'o1',
    label: 'O(1)',
    color: '#16a34a',
    fn: (_n: number) => S * 0.5,
    heading: 'Constant time — the gold standard.',
    desc: 'No matter how big the input gets, this operation always takes the same number of steps. One element or a billion — same time. Array index access and dictionary lookups work this way.',
  },
  {
    id: 'ologn',
    label: 'O(log n)',
    color: '#0891b2',
    fn: (n: number) => S * Math.log2(n + 1) * 1.4,
    heading: 'Logarithmic time — barely grows.',
    desc: "Every time the input doubles, you add exactly one more step. For a million items that's only 20 steps. Binary search works this way — each comparison cuts the remaining work in half.",
  },
  {
    id: 'on',
    label: 'O(n)',
    color: '#7c3aed',
    fn: (n: number) => S * n,
    heading: 'Linear time — one step per element.',
    desc: "Double the input, double the time. If your algorithm visits each element exactly once, it's O(n). A single for loop over the data is the typical example.",
  },
  {
    id: 'onlogn',
    label: 'O(n log n)',
    color: '#d97706',
    fn: (n: number) => S * n * Math.log2(n + 1) * 0.35,
    heading: 'Linearithmic time — the sorting ceiling.',
    desc: "Slightly worse than O(n) but dramatically better than O(n²). This is the best any comparison-based sort can achieve. Merge sort and Timsort (Python's built-in) run here.",
  },
  {
    id: 'on2',
    label: 'O(n²)',
    color: '#ea580c',
    fn: (n: number) => S * n * n * 0.055,
    heading: 'Quadratic time — nested loops.',
    desc: "Double the input, four times the time. At n=1000 that's a million operations. Every pair of elements is compared. Bubble sort and naive two-sum work this way — fine for small inputs, brutal for large ones.",
  },
  {
    id: 'o2n',
    label: 'O(2ⁿ)',
    color: '#dc2626',
    fn: (n: number) => S * Math.pow(2, n) * 0.003,
    heading: 'Exponential time — avoid at all costs.',
    desc: "Every element you add doubles the work. At n=30 that's over a billion operations. This is what naive recursion without memoization looks like — computing fib(n) by branching into fib(n-1) and fib(n-2) at every step.",
  },
]

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = window.devicePixelRatio || 1
  canvas.width = CW * dpr
  canvas.height = CH * dpr

  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, CW, CH)

  // Grid lines
  ctx.strokeStyle = '#f0f0ee'
  ctx.lineWidth = 1
  for (const y of [55, 90, 125, 160, 195]) {
    ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke()
  }

  // Axes
  ctx.strokeStyle = '#d1d5db'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(L, B); ctx.lineTo(R, B); ctx.stroke()

  // Axis labels
  ctx.fillStyle = '#9ca3af'
  ctx.font = '10px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Input size  (n)', (L + R) / 2, 264)
  ctx.save()
  ctx.translate(14, (T + B) / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText('Operations', 0, 0)
  ctx.restore()

  // Clip curves to the plot area — curves are clipped, never break
  ctx.save()
  ctx.beginPath()
  ctx.rect(L, T, plotW, plotH + 1)
  ctx.clip()

  // Draw curves with 300 samples for smooth rendering
  for (const curve of CURVES) {
    const dimmed = selected.value !== null && selected.value !== curve.id
    ctx.globalAlpha = dimmed ? 0.12 : 1
    ctx.strokeStyle = curve.color
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    const SAMPLES = 300
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES
      const n = 1 + t * 39       // n: 1 → 40
      const x = L + t * plotW
      const y = B - curve.fn(n)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  ctx.restore()
  ctx.globalAlpha = 1
}

const selectedCurve = () => CURVES.find(c => c.id === selected.value) ?? null

onMounted(draw)
watch(selected, draw)
</script>

<template>
  <div class="flex flex-col gap-5">

    <!-- Graph -->
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <canvas
        ref="canvasRef"
        style="width: 100%; height: auto; display: block;"
      />
    </div>

    <!-- Legend / selectors -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="c in CURVES"
        :key="c.id"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all"
        :style="selected === c.id
          ? { background: c.color, borderColor: c.color, color: '#fff' }
          : { background: 'transparent', borderColor: '#e5e7eb', color: '#374151' }"
        @click="toggle(c.id)"
      >
        {{ c.label }}
      </button>
    </div>

    <!-- Description panel -->
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0"
    >
      <div v-if="selectedCurve()" :key="selectedCurve()!.id" class="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span class="font-mono text-sm font-semibold" :style="{ color: selectedCurve()!.color }">{{ selectedCurve()!.label }}</span>
          <span class="text-xs font-medium text-text">— {{ selectedCurve()!.heading }}</span>
        </div>
        <p class="text-sm text-text-dim leading-relaxed">{{ selectedCurve()!.desc }}</p>
      </div>
      <div v-else class="text-center py-3">
        <span class="text-xs text-text-muted">Click a label to learn what it means</span>
      </div>
    </Transition>

  </div>
</template>
