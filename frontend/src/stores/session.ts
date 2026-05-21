import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { sendMessage, LENSES } from '@/api/tutor'

export type Message = {
  role: 'tutor' | 'user'
  content: string
  lensIndex: number
}

export const useSessionStore = defineStore('session', () => {
  const currentLens = ref(0)
  const lensCompleted = ref<boolean[]>([false, false, false, false])
  const messages = ref<Message[]>([])
  const conversationHistory = ref<{ role: string; content: string }[]>([])
  const isLoading = ref(false)

  const currentLensLabel = computed(() => LENSES[currentLens.value].label)
  const progressPercent = computed(() => (lensCompleted.value.filter(Boolean).length / 4) * 100)
  const allComplete = computed(() => lensCompleted.value.every(Boolean))

  function initLens(idx: number) {
    currentLens.value = idx
    conversationHistory.value = []
    const question = LENSES[idx].question
    messages.value.push({ role: 'tutor', content: question, lensIndex: idx })
  }

  async function submitMessage(userText: string) {
    if (isLoading.value || !userText.trim()) return

    messages.value.push({ role: 'user', content: userText, lensIndex: currentLens.value })
    conversationHistory.value.push({ role: 'user', content: userText })
    isLoading.value = true

    try {
      const { response, lensComplete } = await sendMessage(
        currentLens.value,
        conversationHistory.value.slice(0, -1),
        userText
      )

      messages.value.push({ role: 'tutor', content: response, lensIndex: currentLens.value })
      conversationHistory.value.push({ role: 'assistant', content: response })

      if (lensComplete) {
        lensCompleted.value[currentLens.value] = true
      }
    } finally {
      isLoading.value = false
    }
  }

  function advanceLens() {
    if (currentLens.value < 3) {
      initLens(currentLens.value + 1)
    }
  }

  return {
    currentLens,
    lensCompleted,
    messages,
    isLoading,
    currentLensLabel,
    progressPercent,
    allComplete,
    initLens,
    submitMessage,
    advanceLens
  }
})