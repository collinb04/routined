import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StruggleContent } from '@/data/problems'
import type { ApiMessage } from '@/stores/struggle'
import { API_URL } from '@/lib/apiUrl'

export interface ProblemContext {
  description?: string
  examples?: Array<{ input: string; output: string; explanation?: string }>
  constraints?: string[]
}

export const useStruggleTutorStore = defineStore('struggleTutor', () => {
  const problemId = ref('')
  const messages = ref<ApiMessage[]>([])
  const loading = ref(false)

  function init(pid: string, saved?: Record<string, any> | null) {
    problemId.value = pid
    messages.value = saved?.messages ?? []
    loading.value = false
  }

  // Home page's embedded example problem is not a real, signed-in session —
  // it should look and behave exactly like the real problem space, with the
  // one exception that it never reaches the real (costed) AI tutor backend.
  const DEMO_REPLY = "This is for demo purposes only — sign up to chat with the real Struggle & Optimize tutor on any problem."

  async function sendMessage(
    userText: string,
    problemContext?: ProblemContext,
    struggle?: StruggleContent,
    code?: string,
    runError?: string | null,
    demoMode = false,
  ): Promise<string> {
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
      const res = await fetch(`${API_URL}/api/problems/${problemId.value}/struggle/tutor-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          messages: messages.value,
          problemContext,
          options: struggle?.options,
          targetInsight: struggle?.targetInsight,
          code,
          runError,
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
    problemId, messages, loading,
    init, sendMessage,
  }
})
