import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  sub: string
  email: string
  name?: string
  nickname?: string
  picture?: string
}

function mapError(body: { error?: string }, fallbackCode: string) {
  const msg = (body.error || '').toLowerCase()
  if (msg.includes('wrong email or password') || msg.includes('invalid')) return 'auth/invalid-credential'
  if (msg.includes('already') || msg.includes('exists')) return 'auth/email-already-in-use'
  if (msg.includes('weak') || msg.includes('password strength')) return 'auth/weak-password'
  return fallbackCode
}

export const useAuthStore = defineStore('auth', () => {
  const user       = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading  = ref(true)

  async function init() {
    try {
      const res = await fetch('/auth/me', { credentials: 'include' })
      if (res.ok) {
        user.value       = await res.json()
        isAuthenticated.value = true
      }
    } catch {}
    isLoading.value = false
  }

  async function login(email: string, password: string) {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    const body = await res.json()
    if (!res.ok) throw { code: mapError(body, 'auth/invalid-credential') }
    user.value       = body
    isAuthenticated.value = true
  }

  async function signup(email: string, password: string, name: string) {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    })
    const body = await res.json()
    if (!res.ok) throw { code: mapError(body, 'auth/email-already-in-use') }
    user.value       = body
    isAuthenticated.value = true
  }

  async function logout() {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' })
    user.value       = null
    isAuthenticated.value = false
  }

  init()

  return { user, isAuthenticated, isLoading, init, login, signup, logout }
})
