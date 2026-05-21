<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { watch, ref, nextTick } from 'vue'
const store = useSessionStore()
const bottomEl = ref<HTMLElement>()

watch(() => store.messages.length, async () => {
  await nextTick()
  bottomEl.value?.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <div class="chat-area">
    <div
      v-for="(msg, i) in store.messages"
      :key="i"
      class="message"
      :class="msg.role"
    >
      <div class="msg-label">{{ msg.role === 'tutor' ? 'Routined' : 'You' }}</div>
      <div class="msg-text">{{ msg.content }}</div>
    </div>

    <div v-if="store.isLoading" class="message tutor loading">
      <div class="msg-label">Routined</div>
      <div class="msg-text">thinking...</div>
    </div>

    <div v-if="store.lensCompleted[store.currentLens] && !store.allComplete" class="advance-prompt">
      <button @click="store.advanceLens()">
        Continue to next lens →
      </button>
    </div>

    <div v-if="store.allComplete" class="completion-banner">
      Walkthrough complete. You reasoned your way there.
    </div>

    <div ref="bottomEl" />
  </div>
</template>