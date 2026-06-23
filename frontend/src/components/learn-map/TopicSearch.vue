<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { CLUSTERS } from '@/data/clusters'

interface SearchItem {
  id: string
  label: string
  groupLabel: string
  groupColor: string
  isNew: boolean
}

const props = defineProps<{
  modelValue: boolean
  flatSections: { id: string; label: string; category: string; categoryId: string }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  navigate: [sectionId: string]
}>()

const query = ref('')
const selectedIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

// Build unified search index from clusters + any legacy sections not in clusters
const clusterItems = computed<SearchItem[]>(() => {
  const items: SearchItem[] = []
  for (const cluster of CLUSTERS) {
    for (const concept of cluster.concepts) {
      items.push({
        id: concept.id,
        label: concept.label,
        groupLabel: cluster.label,
        groupColor: cluster.color,
        isNew: concept.isNew ?? false,
      })
    }
  }
  return items
})

const clusterConceptIds = computed(() => new Set(clusterItems.value.map(i => i.id)))

// Static pages as search items
const staticItems: SearchItem[] = [
  { id: '__intro',       label: 'Intro',                      groupLabel: 'Pages', groupColor: '#6b7280', isNew: false },
  { id: '__guide',       label: 'Guide to Learning',           groupLabel: 'Pages', groupColor: '#6b7280', isNew: false },
  { id: '__career-prep', label: 'Career Prep',                 groupLabel: 'Pages', groupColor: '#6b7280', isNew: false },
  { id: '__map',         label: 'Structure of Learning (map)', groupLabel: 'Pages', groupColor: '#6b7280', isNew: false },
]

// Legacy sections not covered by clusters
const legacyItems = computed<SearchItem[]>(() =>
  props.flatSections
    .filter(s => !clusterConceptIds.value.has(s.id))
    .map(s => ({
      id: s.id,
      label: s.label,
      groupLabel: s.category,
      groupColor: '#6b7280',
      isNew: false,
    }))
)

const allItems = computed<SearchItem[]>(() => [
  ...staticItems,
  ...clusterItems.value,
  ...legacyItems.value,
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return allItems.value
  return allItems.value.filter(
    item =>
      item.label.toLowerCase().includes(q) ||
      item.groupLabel.toLowerCase().includes(q)
  )
})

// Reset index when filtered list changes
watch(filtered, () => { selectedIndex.value = 0 })

// Focus input when opened
watch(() => props.modelValue, async (open) => {
  if (open) {
    query.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
})

function close() { emit('update:modelValue', false) }

function select(item: SearchItem) {
  if (item.isNew) return
  close()
  if (item.id.startsWith('__')) {
    // static page navigation — emit with the page key
    emit('navigate', item.id)
  } else {
    emit('navigate', item.id)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, filtered.value.length - 1)
    scrollToSelected()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollToSelected()
  } else if (e.key === 'Enter') {
    const item = filtered.value[selectedIndex.value]
    if (item) select(item)
  } else if (e.key === 'Escape') {
    close()
  }
}

const listEl = ref<HTMLElement | null>(null)
function scrollToSelected() {
  nextTick(() => {
    const el = listEl.value?.querySelector(`[data-idx="${selectedIndex.value}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  })
}

// Cmd+K / Ctrl+K to open from anywhere
function globalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    emit('update:modelValue', true)
  }
}
onMounted(() => window.addEventListener('keydown', globalKeydown))
onUnmounted(() => window.removeEventListener('keydown', globalKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px]" @click="close" />

        <!-- Panel -->
        <div
          class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          style="max-height: 70vh"
        >
          <!-- Search input -->
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted shrink-0">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref="inputEl"
              v-model="query"
              placeholder="Jump to any topic..."
              class="flex-1 text-sm text-text bg-transparent outline-none placeholder:text-text-muted"
              @keydown="onKeydown"
            />
            <kbd class="text-[10px] text-text-muted bg-[#f5f5f2] border border-gray-200 rounded px-1.5 py-0.5 shrink-0">esc</kbd>
          </div>

          <!-- Results list -->
          <div ref="listEl" class="overflow-y-auto flex-1">
            <div v-if="filtered.length === 0" class="px-4 py-8 text-center text-sm text-text-muted">
              No results for "{{ query }}"
            </div>

            <div v-else class="py-1.5">
              <button
                v-for="(item, i) in filtered"
                :key="item.id"
                :data-idx="i"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                :class="[
                  i === selectedIndex ? 'bg-[#f5f5f2]' : 'hover:bg-[#f5f5f2]/60',
                  item.isNew ? 'opacity-45 cursor-default' : 'cursor-pointer',
                ]"
                @mouseenter="selectedIndex = i"
                @click="select(item)"
              >
                <!-- Cluster color dot -->
                <span
                  class="w-2 h-2 rounded-full shrink-0"
                  :style="{ background: item.groupColor }"
                />

                <!-- Label -->
                <span class="flex-1 text-sm text-text">{{ item.label }}</span>

                <!-- Group tag -->
                <span class="text-[11px] text-text-muted shrink-0">{{ item.groupLabel }}</span>

                <!-- Soon badge -->
                <span v-if="item.isNew" class="text-[10px] text-text-muted/50 bg-[#f5f5f2] border border-gray-100 rounded px-1.5 py-0.5 shrink-0">soon</span>

                <!-- Enter hint on selected -->
                <kbd
                  v-if="i === selectedIndex && !item.isNew"
                  class="text-[10px] text-text-muted bg-white border border-gray-200 rounded px-1.5 py-0.5 shrink-0"
                >↵</kbd>
              </button>
            </div>
          </div>

          <!-- Footer hint -->
          <div class="flex items-center gap-4 px-4 py-2.5 border-t border-gray-100 bg-[#f5f5f2]/50">
            <div class="flex items-center gap-1.5 text-[10px] text-text-muted">
              <kbd class="bg-white border border-gray-200 rounded px-1 py-0.5">↑</kbd>
              <kbd class="bg-white border border-gray-200 rounded px-1 py-0.5">↓</kbd>
              <span>navigate</span>
            </div>
            <div class="flex items-center gap-1.5 text-[10px] text-text-muted">
              <kbd class="bg-white border border-gray-200 rounded px-1.5 py-0.5">↵</kbd>
              <span>open</span>
            </div>
            <div class="ml-auto flex items-center gap-1.5 text-[10px] text-text-muted">
              <kbd class="bg-white border border-gray-200 rounded px-1 py-0.5">⌘</kbd>
              <kbd class="bg-white border border-gray-200 rounded px-1 py-0.5">K</kbd>
              <span>to open anywhere</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
