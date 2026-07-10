<template>
  <div class="relative min-h-screen bg-[#f5f5f2] flex flex-col items-center justify-center px-5 gap-6 overflow-hidden"
    style="background-image: radial-gradient(circle, #c8c8c4 1px, transparent 1px); background-size: 22px 22px;"
  >
    <div class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #f5f5f2 100%)" />

    <div class="relative z-10 flex flex-col items-center gap-6 w-full">
    <h1 class="text-6xl font-semibold tracking-tight text-text">Reset Password</h1>

    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/6 px-10 py-10 flex flex-col gap-6">

      <template v-if="!sent">
        <h2 class="text-[22px] font-bold text-text text-center">Forgot your password?</h2>
        <p class="text-[13px] text-text-muted text-center -mt-3">
          Enter your email and we'll send you a link to reset it.
        </p>

        <form class="flex flex-col gap-3.5" @submit.prevent="submit" novalidate>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            class="w-full rounded-lg border px-5 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
            :class="submitted && error
              ? 'border-red-300 bg-red-50/50 focus:ring-red-200'
              : 'border-gray-200 bg-white focus:ring-black/10'"
          />
          <p v-if="submitted && error" class="text-[12px] text-red-500 px-1">{{ error }}</p>

          <button
            type="submit"
            class="w-full bg-black text-white text-[13.5px] font-semibold py-3 rounded-lg hover:opacity-85 transition-opacity mt-1 disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? 'Sending…' : 'Send reset link' }}
          </button>
        </form>
      </template>

      <template v-else>
        <h2 class="text-[22px] font-bold text-text text-center">Check your email</h2>
        <p class="text-[13px] text-text-muted text-center -mt-3">
          If an account exists for <span class="text-text font-medium">{{ email }}</span>, we've sent a link to reset your password.
        </p>
      </template>

      <p class="text-center text-[13px] text-text-muted">
        <router-link to="/login" class="text-text font-semibold hover:underline">Back to login</router-link>
      </p>

    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const email     = ref('')
const loading   = ref(false)
const submitted = ref(false)
const sent      = ref(false)
const error     = ref('')

async function submit() {
  submitted.value = true
  error.value = ''

  if (!email.value.trim()) {
    error.value = 'Email is required.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = 'Enter a valid email address.'
    return
  }

  loading.value = true
  try {
    await auth.forgotPassword(email.value.trim())
    sent.value = true
  } finally {
    loading.value = false
  }
}
</script>
