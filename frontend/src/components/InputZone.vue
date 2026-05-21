<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
const store = useSessionStore()
const input = ref('')

function submit() {
  if (!input.value.trim() || store.isLoading) return
  store.submitMessage(input.value.trim())
  input.value = ''
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    submit()
  }
}
</script>

<template>
  <div class="input-zone">
    <textarea
      v-model="input"
      placeholder="Think through it aloud..."
      :disabled="store.isLoading || store.allComplete"
      @keydown="handleKey"
    />
    <button @click="submit" :disabled="store.isLoading || store.allComplete">
      Send
    </button>
  </div>
</template>