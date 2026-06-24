<script setup lang="ts">
import { computed } from 'vue'

export interface TestResult {
  label: string
  passed: boolean
  actual: any
  expected: any
  error?: string
}

const props = defineProps<{ results: TestResult[] }>()

const passed = computed(() => props.results.filter(r => r.passed).length)
const total = computed(() => props.results.length)
const allPassed = computed(() => passed.value === total.value)
const progress = computed(() => Math.round((passed.value / total.value) * 100))

function display(val: any): string {
  if (val === null || val === undefined) return 'None'
  if (typeof val === 'boolean') return val ? 'True' : 'False'
  if (Array.isArray(val)) return `[${val.map(display).join(', ')}]`
  return String(val)
}
</script>

<template>
  <div class="flex flex-col h-full" style="font-family:'Cascadia Code','Fira Code',Consolas,monospace">

    <!-- Summary -->
    <div class="px-4 pt-4 pb-3 flex flex-col gap-2.5 shrink-0">
      <div class="flex items-center justify-between">
        <span class="text-[13px] font-semibold" :style="allPassed ? 'color:#4ade80' : 'color:#f87171'">
          {{ passed }}/{{ total }} passed
        </span>
        <span v-if="allPassed" class="text-[11px]" style="color:#4ade80">All tests passing ✓</span>
        <span v-else class="text-[11px]" style="color:rgba(255,255,255,0.3)">{{ total - passed }} failing</span>
      </div>
      <!-- Progress bar -->
      <div class="rounded-full overflow-hidden h-1" style="background:rgba(255,255,255,0.07)">
        <div
          class="h-full rounded-full transition-all duration-500"
          :style="`width:${progress}%;background:${allPassed ? '#4ade80' : '#f87171'}`"
        />
      </div>
    </div>

    <!-- Divider -->
    <div style="height:1px;background:rgba(255,255,255,0.06)" />

    <!-- Results list -->
    <div class="flex flex-col overflow-y-auto flex-1">
      <div
        v-for="(result, i) in results"
        :key="i"
        class="flex flex-col gap-2 px-4 py-3"
        :style="i < results.length - 1 ? 'border-bottom:1px solid rgba(255,255,255,0.04)' : ''"
      >
        <!-- Row header -->
        <div class="flex items-center gap-2.5">
          <!-- Status dot -->
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
            :style="result.passed
              ? 'background:rgba(74,222,128,0.15)'
              : 'background:rgba(248,113,113,0.15)'"
          >
            <svg v-if="result.passed" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </div>
          <span class="text-[12px] font-medium" style="color:#d4d4d4">{{ result.label }}</span>
        </div>

        <!-- Error message -->
        <div v-if="result.error" class="ml-6.5 text-[11px] px-2.5 py-1.5 rounded" style="background:rgba(248,113,113,0.08);color:#f87171;border-left:2px solid rgba(248,113,113,0.4)">
          {{ result.error }}
        </div>

        <!-- Diff on fail -->
        <div v-else-if="!result.passed" class="ml-6.5 flex flex-col gap-1 text-[11px]">
          <div class="flex items-baseline gap-2">
            <span class="shrink-0 w-14" style="color:rgba(255,255,255,0.25)">expected</span>
            <span class="px-1.5 py-0.5 rounded" style="background:rgba(74,222,128,0.08);color:#4ade80">{{ display(result.expected) }}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="shrink-0 w-14" style="color:rgba(255,255,255,0.25)">received</span>
            <span class="px-1.5 py-0.5 rounded" style="background:rgba(248,113,113,0.08);color:#f87171">{{ display(result.actual) }}</span>
          </div>
        </div>

        <!-- Output on pass -->
        <div v-else class="ml-6.5 text-[11px]">
          <span style="color:rgba(255,255,255,0.2)">→ </span>
          <span style="color:rgba(255,255,255,0.35)">{{ display(result.actual) }}</span>
        </div>

      </div>
    </div>

  </div>
</template>
