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
  <div class="border-t border-border px-8 py-4 flex gap-3 items-end bg-white">
    <textarea
      v-model="input"
      placeholder="Think through it aloud..."
      :disabled="store.isLoading || store.allComplete"
      @keydown="handleKey"
      class="flex-1 bg-surface border border-border rounded-lg text-text text-sm leading-relaxed px-4 py-3 resize-none min-h-13 max-h-40 outline-none transition-colors placeholder:text-text-muted focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
    />
    <button
      @click="submit"
      :disabled="store.isLoading || store.allComplete"
      class="bg-black text-white text-sm font-semibold px-5 h-10.5 rounded-lg shrink-0 transition-opacity hover:opacity-85 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
    >
      Send
    </button>
  </div>
</template>
