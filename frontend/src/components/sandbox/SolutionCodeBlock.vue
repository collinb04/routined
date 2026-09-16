<script setup lang="ts">
import { ref } from 'vue'
import hljs from 'highlight.js/lib/core'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/vs2015.css'

hljs.registerLanguage('python', python)

const props = withDefaults(defineProps<{ code: string; language?: string }>(), {
  language: 'python',
})

const copied = ref(false)
let copyTimeout: ReturnType<typeof setTimeout> | null = null

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    return
  }
  copied.value = true
  if (copyTimeout) clearTimeout(copyTimeout)
  copyTimeout = setTimeout(() => { copied.value = false }, 1500)
}
</script>

<template>
  <div class="relative rounded-lg overflow-hidden" style="background:#1e1e1e">
    <button
      class="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
      :style="copied
        ? 'background:rgba(80,200,120,0.18);color:#7cd99a'
        : 'background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.55)'"
      :onmouseover="copied ? undefined : `this.style.background='rgba(255,255,255,0.16)';this.style.color='rgba(255,255,255,0.9)'`"
      :onmouseout="copied ? undefined : `this.style.background='rgba(255,255,255,0.08)';this.style.color='rgba(255,255,255,0.55)'`"
      @click="copyCode"
    >
      <svg v-if="!copied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
    <pre class="hljs m-0! p-4! text-[12.5px] leading-relaxed overflow-x-auto"><code v-html="hljs.highlight(code, { language }).value" class="font-mono" /></pre>
  </div>
</template>
