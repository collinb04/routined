<template>
  <div class="relative min-h-screen bg-[#f5f5f2] flex flex-col items-center justify-center px-5 gap-6 overflow-hidden"
    style="background-image: radial-gradient(circle, #c8c8c4 1px, transparent 1px); background-size: 22px 22px;"
  >
    <!-- soft vignette to fade edges -->
    <div class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #f5f5f2 100%)" />

    <!-- Title above card -->
    <!-- Content above overlay -->
    <div class="relative z-10 flex flex-col items-center gap-6 w-full">
    <h1 class="text-6xl font-semibold tracking-tight text-text">Login</h1>

    <!-- Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/6 px-10 py-10 flex flex-col gap-6">

      <h2 class="text-[22px] font-bold text-text text-center">Welcome Back</h2>

      <button
        type="button"
        class="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-lg py-3 text-sm font-medium text-text hover:bg-[#f5f5f2] transition-colors"
        @click="continueWithGoogle"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1A11.997 11.997 0 0 0 12 24z"/>
          <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.26A11.997 11.997 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.1z"/>
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.62l4.01 3.1c.95-2.85 3.6-4.97 6.73-4.97z"/>
        </svg>
        Continue with Google
      </button>

      <div class="flex items-center gap-3">
        <div class="h-px flex-1 bg-gray-200" />
        <span class="text-[11px] text-text-muted uppercase tracking-wider">or</span>
        <div class="h-px flex-1 bg-gray-200" />
      </div>

      <form class="flex flex-col gap-3.5" @submit.prevent="submit" novalidate>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          class="w-full rounded-lg border px-5 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
          :class="submitted && errors.email
            ? 'border-red-300 bg-red-50/50 focus:ring-red-200'
            : 'border-gray-200 bg-white focus:ring-black/10'"
        />

        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            autocomplete="current-password"
            class="w-full rounded-lg border px-5 py-3 pr-11 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
            :class="submitted && errors.password
              ? 'border-red-300 bg-red-50/50 focus:ring-red-200'
              : 'border-gray-200 bg-white focus:ring-black/10'"
          />
          <button
            type="button"
            tabindex="-1"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
            @click="showPassword = !showPassword"
          >
            <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          </button>
        </div>

        <router-link to="/forgot-password" class="text-[12px] text-text-muted hover:text-text transition-colors self-end -mt-1.5">
          Forgot password?
        </router-link>

        <!-- Field errors -->
        <div v-if="submitted && (errors.email || errors.password)" class="flex flex-col gap-1 px-1">
          <p v-if="errors.email"    class="text-[12px] text-red-500">{{ errors.email }}</p>
          <p v-if="errors.password" class="text-[12px] text-red-500">{{ errors.password }}</p>
        </div>

        <p v-if="submitError" class="text-[12px] text-red-500 text-center">{{ submitError }}</p>

        <button
          type="submit"
          class="w-full bg-black text-white text-[13.5px] font-semibold py-3 rounded-lg hover:opacity-85 transition-opacity mt-1 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Signing in…' : 'Log In' }}
        </button>

      </form>

      <p class="text-center text-[13px] text-text-muted">
        Don't have an account?
        <router-link to="/signup" class="text-text font-semibold hover:underline">Create Account</router-link>
      </p>

    </div>
    </div><!-- /z-10 content wrapper -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/stores/auth'
import { authErrorMessage } from '@/lib/authErrors'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()
const auth0  = useAuth0()

function continueWithGoogle() {
  sessionStorage.setItem('authMode', 'login')
  auth0.loginWithRedirect({
    authorizationParams: { connection: 'google-oauth2' },
    appState: { target: '/login/callback' },
  })
}

const email        = ref('')
const password     = ref('')
const showPassword = ref(false)
const loading      = ref(false)
const submitted    = ref(false)
const submitError  = ref(typeof route.query.error === 'string' ? authErrorMessage(route.query.error) : '')

onMounted(() => {
  if (route.query.error) router.replace({ path: route.path })
})

const errors = reactive({ email: '', password: '' })

function validate() {
  errors.email    = ''
  errors.password = ''
  if (!email.value.trim())                                     errors.email    = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))  errors.email    = 'Enter a valid email address.'
  if (!password.value)                                         errors.password = 'Password is required.'
  return !errors.email && !errors.password
}

async function submit() {
  submitted.value   = true
  submitError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    router.push('/problems')
  } catch (e: any) {
    submitError.value = authErrorMessage(e.code)
  } finally {
    loading.value = false
  }
}
</script>
