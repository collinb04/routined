<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import ProblemPanel from '@/components/ProblemPanel.vue'
import ChatArea from '@/components/ChatArea.vue'
import InputZone from '@/components/InputZone.vue'

const store = useSessionStore()
onMounted(() => store.initLens(0))
</script>

<template>
  <div class="grid h-screen overflow-hidden" style="grid-template-columns: 340px 1fr;">
    <ProblemPanel />
    <div class="flex flex-col h-screen overflow-hidden">
      <ChatArea />
      <InputZone />
    </div>
  </div>
</template>