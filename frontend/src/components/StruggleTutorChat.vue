<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStruggleTutorStore, type ProblemContext } from '@/stores/struggleTutor'
import type { StruggleContent } from '@/data/problems'

const props = defineProps<{
  problemContext?: ProblemContext
  struggle?: StruggleContent
  code?: string
  runError?: string | null
  embedded?: boolean
}>()

const store = useStruggleTutorStore()

const INTRO_MESSAGE = "Ask anything — get stuck, narrow down an approach, or pressure-test a plan."

const messages = computed(() => store.messages)
const loading = computed(() => store.loading)

const chatInput = ref('')
const chatScrollEl = ref<HTMLElement | null>(null)

async function scrollToBottom() {
  await nextTick()
  if (chatScrollEl.value) chatScrollEl.value.scrollTop = chatScrollEl.value.scrollHeight
}

watch(() => messages.value.length, scrollToBottom)

async function sendChatMessage(text?: string) {
  const msg = (text ?? chatInput.value).trim()
  if (!msg || loading.value) return
  chatInput.value = ''
  try {
    await store.sendMessage(msg, props.problemContext, props.struggle, props.code, props.runError, props.embedded)
    scrollToBottom()
  } catch {
    // error already reflected in store via re-thrown failures on next attempt
  }
}

function autoResize(e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}
</script>

<template>
  <div class="flex flex-col h-full bg-white">

    <!-- Messages -->
    <div ref="chatScrollEl" class="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f5f5f2]">
      <!-- Static intro bubble, styled as the bot's opening message (client-side only — never sent/persisted) -->
      <div class="flex items-end gap-2 justify-start">
        <div class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5c-3.3 0-5.8 2.2-5.8 5.5v4.3c0 1 .4 1.9 1.1 2.6l1 1v2.1c0 1.1.9 2 2 2h3.4c1.1 0 2-.9 2-2v-2.1l1-1c.7-.7 1.1-1.6 1.1-2.6V8c0-3.3-2.5-5.5-5.8-5.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.2 9.5h11.6M9.3 14.6h5.4M9 15.3v3.4M15 15.3v3.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="9.3" cy="10.7" r="1.1" fill="#ef4444"/><circle cx="14.7" cy="10.7" r="1.1" fill="#ef4444"/></svg></div>
        <div class="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed bg-white text-text-dim shadow-sm rounded-2xl rounded-bl-sm border border-gray-100">{{ INTRO_MESSAGE }}</div>
      </div>

      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex items-end gap-2"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          v-if="msg.role === 'assistant'"
          class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"
        ><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5c-3.3 0-5.8 2.2-5.8 5.5v4.3c0 1 .4 1.9 1.1 2.6l1 1v2.1c0 1.1.9 2 2 2h3.4c1.1 0 2-.9 2-2v-2.1l1-1c.7-.7 1.1-1.6 1.1-2.6V8c0-3.3-2.5-5.5-5.8-5.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.2 9.5h11.6M9.3 14.6h5.4M9 15.3v3.4M15 15.3v3.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="9.3" cy="10.7" r="1.1" fill="#ef4444"/><circle cx="14.7" cy="10.7" r="1.1" fill="#ef4444"/></svg></div>
        <div
          class="max-w-[80%] px-4 py-2.5 text-sm leading-relaxed"
          :class="msg.role === 'user'
            ? 'bg-black text-white rounded-2xl rounded-br-sm'
            : 'bg-white text-text-dim shadow-sm rounded-2xl rounded-bl-sm border border-gray-100'"
        >{{ msg.content }}</div>
        <div
          v-if="msg.role === 'user'"
          class="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mb-0.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="text-text-muted">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="loading" class="flex items-end gap-2 justify-start">
        <div class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.5c-3.3 0-5.8 2.2-5.8 5.5v4.3c0 1 .4 1.9 1.1 2.6l1 1v2.1c0 1.1.9 2 2 2h3.4c1.1 0 2-.9 2-2v-2.1l1-1c.7-.7 1.1-1.6 1.1-2.6V8c0-3.3-2.5-5.5-5.8-5.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.2 9.5h11.6M9.3 14.6h5.4M9 15.3v3.4M15 15.3v3.4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><circle cx="9.3" cy="10.7" r="1.1" fill="#ef4444"/><circle cx="14.7" cy="10.7" r="1.1" fill="#ef4444"/></svg></div>
        <div class="px-4 py-3 bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
          <div class="flex gap-1 items-center">
            <span class="typing-dot" style="animation-delay: 0ms" />
            <span class="typing-dot" style="animation-delay: 150ms" />
            <span class="typing-dot" style="animation-delay: 300ms" />
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
      <div class="flex items-end gap-2 bg-surface rounded-xl border border-border px-3 py-2">
        <textarea
          v-model="chatInput"
          class="flex-1 resize-none text-sm text-text-dim bg-transparent outline-none leading-relaxed"
          style="max-height: 120px; min-height: 20px"
          placeholder="Type your message…"
          rows="1"
          @input="autoResize"
          @keydown.enter.exact.prevent="sendChatMessage()"
        />
        <button
          class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white shrink-0 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!chatInput.trim() || loading"
          @click="sendChatMessage()"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M12 19V5m-7 7 7-7 7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typing-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--color-text-muted, #6b7280);
  opacity: 0.4;
  animation: typing-bounce 1.2s infinite ease-in-out;
}

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 0.8; }
}
</style>
