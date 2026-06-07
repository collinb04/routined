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
  <div class="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-4 scrollbar-thin">
    <div
      v-for="(msg, i) in store.messages"
      :key="i"
      class="flex flex-col gap-1 max-w-2xl"
      :class="msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'"
    >
      <div
        class="text-[11px] font-semibold uppercase tracking-wider"
        :class="msg.role === 'tutor' ? 'text-black' : 'text-text-muted'"
      >
        {{ msg.role === 'tutor' ? 'Routined' : 'You' }}
      </div>
      <div
        class="text-sm leading-relaxed px-4 py-3 border border-border"
        :class="msg.role === 'user'
          ? 'bg-surface-raised text-text rounded-[10px_10px_2px_10px]'
          : 'bg-surface text-text-dim rounded-[10px_10px_10px_2px]'"
      >
        {{ msg.content }}
      </div>
    </div>

    <div v-if="store.isLoading" class="self-start items-start flex flex-col gap-1 max-w-2xl">
      <div class="text-[11px] font-semibold uppercase tracking-wider text-black">Routined</div>
      <div class="text-sm px-4 py-3 bg-surface border border-border rounded-[10px_10px_10px_2px] text-text-muted italic">
        thinking...
      </div>
    </div>

    <div v-if="store.lensCompleted[store.currentLens] && !store.allComplete" class="self-center mt-2">
      <button
        @click="store.advanceLens()"
        class="bg-black/10 border border-accent text-black text-sm font-medium px-5 py-2.5 rounded-lg transition-colors hover:bg-black/20 cursor-pointer"
      >
        Continue to next lens →
      </button>
    </div>

    <div v-if="store.allComplete" class="self-center mt-2 px-6 py-3.5 bg-green/10 border border-green/30 text-green text-sm font-medium rounded-lg">
      Walkthrough complete. You reasoned your way there.
    </div>

    <div ref="bottomEl" />
  </div>
</template>
