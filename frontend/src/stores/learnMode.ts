import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_URL } from '@/lib/apiUrl'

export const useLearnModeStore = defineStore('learnMode', () => {
  const enabled = ref(false)
  const isLoaded = ref(false)

  async function load() {
    try {
      const res = await fetch(`${API_URL}/api/learn-mode`, { credentials: 'include' })
      if (res.ok) {
        const body = await res.json()
        enabled.value = !!body.learnMode
      }
    } catch {}
    isLoaded.value = true
  }

  async function setEnabled(value: boolean) {
    const previous = enabled.value
    enabled.value = value
    try {
      const res = await fetch(`${API_URL}/api/learn-mode`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ learnMode: value }),
      })
      if (!res.ok) throw new Error('failed to save')
    } catch {
      enabled.value = previous
    }
  }

  load()

  return { enabled, isLoaded, load, setEnabled }
})
