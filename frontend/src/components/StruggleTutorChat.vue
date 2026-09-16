<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStruggleTutorStore, type TutorGoal, type ProblemContext } from '@/stores/struggleTutor'
import type { StruggleContent } from '@/data/problems'

const props = defineProps<{
  goal: TutorGoal
  problemContext?: ProblemContext
  struggle?: StruggleContent
  embedded?: boolean
}>()

const store = useStruggleTutorStore()

const SUBTITLES: Record<TutorGoal, string> = {
  explore: 'No approach in mind yet? Talk through the problem itself.',
  identify: "Not sure which technique fits? Let's narrow it down.",
  approach: 'Have a plan? Describe it and get it pressure-tested.',
}

const STARTER_CHIPS: Record<TutorGoal, string[]> = {
  explore: [
    "I don't know where to start — can you help me break this down?",
    'Can we walk through an example together?',
  ],
  identify: [
    'What should I be paying attention to in this problem?',
    "I have a couple of ideas but I'm not sure which fits — can you help?",
  ],
  approach: [
    "Here's the approach I'm thinking of — can you pressure-test it?",
    'What complexity should I expect from my plan?',
  ],
}

const messages = computed(() => {
  if (props.goal === 'explore') return store.exploreMessages
  if (props.goal === 'identify') return store.identifyMessages
  return store.approachMessages
})

const loading = computed(() => {
  if (props.goal === 'explore') return store.exploreLoading
  if (props.goal === 'identify') return store.identifyLoading
  return store.approachLoading
})

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
    await store.sendMessage(props.goal, msg, props.problemContext, props.struggle, props.embedded)
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

    <div class="shrink-0 px-4 py-2.5 border-b border-gray-100 bg-surface">
      <span class="text-[12px] text-text-muted">{{ SUBTITLES[goal] }}</span>
    </div>

    <!-- Messages -->
    <div ref="chatScrollEl" class="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f5f5f2]">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        class="flex items-end gap-2"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          v-if="msg.role === 'assistant'"
          class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5"
        >R</div>
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
        <div class="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0 mb-0.5">R</div>
        <div class="px-4 py-3 bg-white rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
          <div class="flex gap-1 items-center">
            <span class="typing-dot" style="animation-delay: 0ms" />
            <span class="typing-dot" style="animation-delay: 150ms" />
            <span class="typing-dot" style="animation-delay: 300ms" />
          </div>
        </div>
      </div>
    </div>

    <!-- Starter chips -->
    <div
      v-if="messages.length === 0"
      class="shrink-0 px-4 pb-2 pt-1 bg-[#f5f5f2] flex flex-wrap gap-1.5"
    >
      <button
        v-for="chip in STARTER_CHIPS[goal]"
        :key="chip"
        class="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] text-text-dim hover:border-accent/40 hover:text-accent transition-colors"
        :disabled="loading"
        @click="sendChatMessage(chip)"
      >{{ chip }}</button>
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
