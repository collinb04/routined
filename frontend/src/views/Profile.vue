<template>
  <div class="bg-[#f5f5f2] min-h-[calc(100vh-4rem)] flex flex-col items-center px-5 py-16">
    <div class="max-w-lg w-full flex flex-col gap-6">

      <!-- Profile card -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-black text-white text-xl font-semibold flex items-center justify-center shrink-0">
          {{ userInitial }}
        </div>
        <div class="flex flex-col min-w-0">
          <p class="text-lg font-semibold text-text truncate">{{ auth.user?.name || 'Account' }}</p>
          <p class="text-sm text-text-muted truncate">{{ auth.user?.email }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
        <RouterLink
          to="/settings"
          class="flex items-center gap-3 px-5 py-4 text-sm font-medium text-text hover:bg-[#f5f5f2] transition-colors border-b border-gray-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted shrink-0">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span class="flex-1">Settings</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted shrink-0">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </RouterLink>
        <RouterLink
          to="/feedback"
          class="flex items-center gap-3 px-5 py-4 text-sm font-medium text-text hover:bg-[#f5f5f2] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted shrink-0">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span class="flex-1">Feedback Library</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted shrink-0">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const userInitial = computed(() => {
  const name  = auth.user?.name
  const email = auth.user?.email
  return (name?.[0] ?? email?.[0] ?? '?').toUpperCase()
})
</script>
