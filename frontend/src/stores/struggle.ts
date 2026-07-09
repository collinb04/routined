import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StruggleContent } from '@/data/problems'

export type StruggleStep = 'commit' | 'chat' | 'revise' | 'done'

export type ApiMessage = { role: 'user' | 'assistant'; content: string }

export interface InsightResult {
  pass: boolean
  forced?: boolean
  feedback?: string
  attemptsRemaining?: number
}

export const useStruggleStore = defineStore('struggle', () => {
  // Meta
  const problemId = ref('')
  const targetInsight = ref('')
  const insightRubric = ref<string[]>([])
  const synthesisText = ref('')

  // Navigation
  const step = ref<StruggleStep>('commit')

  // Commitment form (shared by commit + revise steps)
  const strategyId = ref('')
  const timeComplexity = ref('')
  const spaceComplexity = ref('')
  const planSteps = ref<string[]>([])
  const stepOrderNote = ref<string | null>(null)

  // Chat
  const messages = ref<ApiMessage[]>([])
  const chatLoading = ref(false)

  // Insight evaluation
  const insightText = ref('')
  const insightResult = ref<InsightResult | null>(null)
  const evaluating = ref(false)

  function init(pid: string, content: StruggleContent, saved?: Record<string, any> | null) {
    problemId.value = pid
    targetInsight.value = content.targetInsight
    insightRubric.value = content.insightRubric

    const commitment = saved?.commitment
    step.value = (saved?.step as StruggleStep) ?? 'commit'
    strategyId.value = commitment?.strategyId ?? ''
    timeComplexity.value = commitment?.timeComplexity ?? ''
    spaceComplexity.value = commitment?.spaceComplexity ?? ''
    planSteps.value = commitment?.planSteps ?? []
    stepOrderNote.value = saved?.stepOrderNote ?? null
    messages.value = saved?.chatMessages ?? []
    insightText.value = saved?.insightText ?? ''
    insightResult.value = null
    chatLoading.value = false
    evaluating.value = false
    synthesisText.value = saved?.synthesisText ?? ''
  }

  async function submitCommit(): Promise<void> {
    const res = await fetch(`/api/problems/${problemId.value}/struggle/commit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        strategyId: strategyId.value,
        timeComplexity: timeComplexity.value,
        spaceComplexity: spaceComplexity.value,
        planSteps: planSteps.value,
        synthesisText: synthesisText.value,
        stepOrderNote: stepOrderNote.value,
      }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error((data as any).error || 'Commit failed')
    }
  }

  async function sendMessage(userText: string): Promise<string> {
    messages.value.push({ role: 'user', content: userText })
    chatLoading.value = true
    try {
      const res = await fetch(`/api/problems/${problemId.value}/struggle/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          messages: messages.value,
          targetInsight: targetInsight.value,
        }),
      })
      if (!res.ok) throw new Error('Chat request failed')
      const data = await res.json()
      messages.value.push({ role: 'assistant', content: data.content })
      return data.content as string
    } finally {
      chatLoading.value = false
    }
  }

  async function evaluateInsight(): Promise<InsightResult> {
    evaluating.value = true
    try {
      const res = await fetch(`/api/problems/${problemId.value}/struggle/evaluate-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          insight: insightText.value,
          insightRubric: insightRubric.value,
        }),
      })
      if (!res.ok) throw new Error('Evaluation failed')
      const result = await res.json() as InsightResult
      insightResult.value = result
      return result
    } finally {
      evaluating.value = false
    }
  }

  return {
    // state
    problemId, targetInsight, insightRubric, synthesisText,
    step,
    strategyId, timeComplexity, spaceComplexity, planSteps, stepOrderNote,
    messages, chatLoading,
    insightText, insightResult, evaluating,
    // actions
    init, submitCommit, sendMessage, evaluateInsight,
  }
})
