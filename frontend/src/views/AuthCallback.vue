<template>
  <div class="min-h-screen bg-[#f5f5f2] flex items-center justify-center">
    <p class="text-sm text-text-muted">Signing you in…</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth0  = useAuth0()
const auth   = useAuthStore()

// By the time auth0-vue routes us here (via appState.target, set in
// loginWithRedirect), it has already finished processing the redirect
// internally — isAuthenticated/user are settled, no manual
// handleRedirectCallback() call needed (or wanted — racing our own call
// against the plugin's internal handling is what broke this last time).
onMounted(async () => {
  // Deliberately not removed after reading — if this mounts more than once
  // (e.g. a re-render), a second read must still see the same value. The
  // next real login/signup attempt always overwrites this via the button
  // click before this page is ever reached again, so there's no staleness
  // risk from leaving it.
  const mode = sessionStorage.getItem('authMode') === 'signup' ? 'signup' : 'login'
  const fallback = mode === 'signup' ? '/signup' : '/login'

  if (!auth0.isAuthenticated.value) {
    router.replace(fallback)
    return
  }

  try {
    const token = await auth0.getAccessTokenSilently()
    await auth.loginWithSocialToken(token, mode)
    router.replace('/problems')
  } catch (e: any) {
    router.replace({ path: fallback, query: { error: e?.code || 'auth/network-request-failed' } })
  }
})
</script>
