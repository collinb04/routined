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
  <div class="session-layout">
    <ProblemPanel />
    <div class="session-main">
      <ChatArea />
      <InputZone />
    </div>
  </div>
</template>