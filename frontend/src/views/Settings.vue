<template>
  <div class="bg-[#f5f5f2] min-h-[calc(100vh-4rem)] flex flex-col items-center px-5 py-16">
    <div class="max-w-lg w-full flex flex-col gap-6">

      <RouterLink to="/profile" class="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text transition-colors w-fit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Profile
      </RouterLink>

      <h1 class="text-2xl font-semibold tracking-tight text-text">Settings</h1>

      <!-- Account -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
        <p class="text-[11px] font-medium font-mono uppercase tracking-widest  text-text-muted">Account</p>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-text-muted">Name</label>
          <div class="px-3.5 py-2.5 rounded-lg bg-[#f5f5f2] text-sm text-text">{{ auth.user?.name || '—' }}</div>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-medium text-text-muted">Email</label>
          <div class="px-3.5 py-2.5 rounded-lg bg-[#f5f5f2] text-sm text-text">{{ auth.user?.email || '—' }}</div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-text">Log out</p>
          <p class="text-xs text-text-muted mt-0.5">End your session on this device.</p>
        </div>
        <button
          class="text-sm font-medium text-red-500 border border-gray-200 hover:bg-red-500 hover:text-white hover:border-red-500 active:bg-red-600 active:border-red-600 rounded-lg px-4 py-2 transition-colors shrink-0"
          @click="handleLogout"
        >
          Log out
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth   = useAuthStore()
const auth0  = useAuth0()

async function handleLogout() {
  await auth.logout()
  if (auth0.isAuthenticated.value) {
    auth0.logout({ logoutParams: { returnTo: window.location.origin } })
  } else {
    router.push('/')
  }
}
</script>
