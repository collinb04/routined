import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StruggleContent } from '@/data/problems'
import type { ApiMessage } from '@/stores/struggle'

export type TutorGoal = 'explore' | 'identify' | 'approach'

export interface ProblemContext {
  description?: string
  examples?: Array<{ input: string; output: string; explanation?: string }>
  constraints?: string[]
}

export const useStruggleTutorStore = defineStore('struggleTutor', () => {
  const problemId = ref('')
  const exploreMessages = ref<ApiMessage[]>([])
  const identifyMessages = ref<ApiMessage[]>([])
  const approachMessages = ref<ApiMessage[]>([])
  const exploreLoading = ref(false)
  const identifyLoading = ref(false)
  const approachLoading = ref(false)

  function init(pid: string, saved?: Record<string, any> | null) {
    problemId.value = pid
    exploreMessages.value = saved?.exploreMessages ?? []
    identifyMessages.value = saved?.identifyMessages ?? []
    approachMessages.value = saved?.approachMessages ?? []
    exploreLoading.value = false
    identifyLoading.value = false
    approachLoading.value = false
  }

  function messagesFor(goal: TutorGoal) {
    if (goal === 'explore') return exploreMessages
    if (goal === 'identify') return identifyMessages
    return approachMessages
  }

  function loadingFor(goal: TutorGoal) {
    if (goal === 'explore') return exploreLoading
    if (goal === 'identify') return identifyLoading
    return approachLoading
  }

  // Home page's embedded example problem is not a real, signed-in session —
  // it should look and behave exactly like the real problem space, with the
  // one exception that it never reaches the real (costed) AI tutor backend.
  const DEMO_REPLY = "This is for demo purposes only — sign up to chat with the real Struggle & Optimize tutor on any problem."

  async function sendMessage(
    goal: TutorGoal,
    userText: string,
    problemContext?: ProblemContext,
    struggle?: StruggleContent,
    demoMode = false,
  ): Promise<string> {
    const messages = messagesFor(goal)
    const loading = loadingFor(goal)
    messages.value.push({ role: 'user', content: userText })
    loading.value = true
    if (demoMode) {
      // Brief delay so the typing indicator reads the same as a real reply.
      await new Promise(r => setTimeout(r, 500))
      messages.value.push({ role: 'assistant', content: DEMO_REPLY })
      loading.value = false
      return DEMO_REPLY
    }
    try {
      const res = await fetch(`/api/problems/${problemId.value}/struggle/tutor-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          goal,
          messages: messages.value,
          problemContext,
          options: struggle?.options,
          targetInsight: struggle?.targetInsight,
        }),
      })
      if (!res.ok) throw new Error('Tutor chat request failed')
      const data = await res.json()
      messages.value.push({ role: 'assistant', content: data.content })
      return data.content as string
    } finally {
      loading.value = false
    }
  }

  return {
    problemId, exploreMessages, identifyMessages, approachMessages,
    exploreLoading, identifyLoading, approachLoading,
    messagesFor, loadingFor,
    init, sendMessage,
  }
})
