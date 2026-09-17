<script setup lang="ts">
import type { StruggleContent } from '@/data/problems'
import { useStruggleTutorStore, type ProblemContext } from '@/stores/struggleTutor'
import StruggleTutorChat from '@/components/StruggleTutorChat.vue'

const props = defineProps<{
  struggle?: StruggleContent
  problemId: string
  problemContext?: ProblemContext
  savedState?: Record<string, any> | null
  code?: string
  runError?: string | null
  embedded?: boolean
}>()

const store = useStruggleTutorStore()
store.init(props.problemId, props.savedState)
</script>

<template>
  <div class="flex flex-col h-full bg-white">
    <StruggleTutorChat
      :problem-context="problemContext"
      :struggle="struggle"
      :code="code"
      :run-error="runError"
      :embedded="embedded"
      class="flex-1 min-h-0"
    />
  </div>
</template>
