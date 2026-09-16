<script setup lang="ts">
import { ref } from 'vue'
import type { StruggleContent } from '@/data/problems'
import { useStruggleTutorStore, type TutorGoal, type ProblemContext } from '@/stores/struggleTutor'
import StruggleTutorChat from '@/components/StruggleTutorChat.vue'

const props = defineProps<{
  struggle?: StruggleContent
  problemId: string
  problemContext?: ProblemContext
  savedState?: Record<string, any> | null
  embedded?: boolean
}>()

const store = useStruggleTutorStore()
store.init(props.problemId, props.savedState)

const TABS: Array<{ id: TutorGoal; label: string }> = [
  { id: 'explore', label: 'Explore' },
  { id: 'identify', label: 'Identify' },
  { id: 'approach', label: 'Approach' },
]

const activeTab = ref<TutorGoal>('explore')
</script>

<template>
  <div class="flex flex-col h-full bg-white">
    <div class="shrink-0 flex border-b border-gray-100 px-4 pt-2.5 gap-0.5">
      <button
        v-for="tab in TABS"
        :key="tab.id"
        class="px-3 py-2 text-[13px] font-medium transition-colors border-b-2 -mb-px"
        :class="activeTab === tab.id
          ? 'text-text border-black'
          : 'text-text-muted border-transparent hover:text-text'"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <StruggleTutorChat
      :key="activeTab"
      :goal="activeTab"
      :problem-context="problemContext"
      :struggle="struggle"
      :embedded="embedded"
      class="flex-1 min-h-0"
    />
  </div>
</template>
