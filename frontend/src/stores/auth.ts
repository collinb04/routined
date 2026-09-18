import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_URL } from '@/lib/apiUrl'

interface User {
  sub: string
  email: string
  name?: string
  nickname?: string
  picture?: string
}

function mapError(body: { error?: string }, fallbackCode: string) {
  const msg = (body.error || '').toLowerCase()
  // Check "already exists" phrasing before the generic "invalid" catch-all —
  // Auth0's duplicate-signup wording can otherwise get misclassified.
  if (msg.includes('username') && (msg.includes('already') || msg.includes('taken'))) return 'auth/username-already-in-use'
  if (msg.includes('no account found')) return 'auth/social-account-not-found'
  if (msg.includes('already') || msg.includes('exists')) return 'auth/email-already-in-use'
  if (msg.includes('invalid or expired token')) return 'auth/social-token-invalid'
  if (msg.includes('wrong email or password') || msg.includes('invalid')) return 'auth/invalid-credential'
  if (msg.includes('weak') || msg.includes('password strength')) return 'auth/weak-password'
  return fallbackCode
}

export const useAuthStore = defineStore('auth', () => {
  const user       = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading  = ref(true)

  async function init() {
    try {
      const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      if (res.ok) {
        user.value       = await res.json()
        isAuthenticated.value = true
      }
    } catch {}
    isLoading.value = false
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
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
    const res = await fetch(`${API_URL}/auth/signup`, {
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
    await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
    user.value       = null
    isAuthenticated.value = false
  }

  async function forgotPassword(email: string) {
    await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
  }

  async function loginWithSocialToken(accessToken: string, mode: 'login' | 'signup') {
    const res = await fetch(`${API_URL}/auth/social`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ access_token: accessToken, mode }),
    })
    const body = await res.json()
    if (!res.ok) throw { code: mapError(body, 'auth/invalid-credential') }
    user.value       = body
    isAuthenticated.value = true
  }

  init()

  return { user, isAuthenticated, isLoading, init, login, signup, logout, forgotPassword, loginWithSocialToken }
})
