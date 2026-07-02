<template>
  <div class="relative min-h-screen bg-[#f5f5f2] flex flex-col items-center justify-center px-5 py-12 gap-6 overflow-hidden"
    style="background-image: radial-gradient(circle, #c8c8c4 1px, transparent 1px); background-size: 22px 22px;"
  >
    <div class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #f5f5f2 100%)" />

    <div class="relative z-10 flex flex-col items-center gap-6 w-full">
    <h1 class="text-6xl font-semibold tracking-tight text-text">Sign Up</h1>

    <div class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/6 px-10 py-10 flex flex-col gap-6">

      <h2 class="text-[22px] font-bold text-text text-center">Create Your Account</h2>

      <!-- Form -->
      <form class="flex flex-col gap-3.5" @submit.prevent="submit" novalidate>

        <input
          v-model="fields.name"
          type="text"
          placeholder="Username"
          autocomplete="username"
          class="w-full rounded-lg border px-5 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
          :class="submitted && errors.name ? 'border-red-300 bg-red-50/50 focus:ring-red-200' : 'border-gray-200 bg-white focus:ring-black/10'"
        />

        <input
          v-model="fields.email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          class="w-full rounded-lg border px-5 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
          :class="submitted && errors.email ? 'border-red-300 bg-red-50/50 focus:ring-red-200' : 'border-gray-200 bg-white focus:ring-black/10'"
        />

        <div class="relative">
          <input
            v-model="fields.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            autocomplete="new-password"
            class="w-full rounded-lg border px-5 py-3 pr-11 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
            :class="submitted && errors.password ? 'border-red-300 bg-red-50/50 focus:ring-red-200' : 'border-gray-200 bg-white focus:ring-black/10'"
          />
          <button type="button" tabindex="-1"
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

        <!-- Password requirements -->
        <div v-if="fields.password" class="grid grid-cols-2 gap-x-3 gap-y-1 px-1 py-0.5">
          <div
            v-for="req in requirements" :key="req.label"
            class="flex items-center gap-1.5 text-[11.5px] transition-colors duration-200"
            :class="req.met ? 'text-green-600' : 'text-text-muted'"
          >
            <svg v-if="req.met" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 opacity-40">
              <circle cx="12" cy="12" r="9"/>
            </svg>
            {{ req.label }}
          </div>
        </div>

        <div class="relative">
          <input
            v-model="fields.confirm"
            :type="showConfirm ? 'text' : 'password'"
            placeholder="Confirm Password"
            autocomplete="new-password"
            class="w-full rounded-lg border px-5 py-3 pr-11 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all"
            :class="fields.confirm && fields.confirm === fields.password
              ? 'border-green-400 bg-white focus:ring-green-200'
              : fields.confirm && fields.confirm !== fields.password
                ? 'border-red-300 bg-red-50/50 focus:ring-red-200'
                : 'border-gray-200 bg-white focus:ring-black/10'"
          />
          <button type="button" tabindex="-1"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
            @click="showConfirm = !showConfirm"
          >
            <svg v-if="!showConfirm" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>
            </svg>
          </button>
        </div>

        <!-- Match indicator -->
        <div v-if="fields.confirm" class="flex items-center gap-1.5 px-1 text-[11.5px] transition-colors duration-200"
          :class="fields.confirm === fields.password ? 'text-green-600' : 'text-red-500'">
          <svg v-if="fields.confirm === fields.password" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <svg v-else width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
          {{ fields.confirm === fields.password ? 'Passwords match' : 'Passwords don\'t match' }}
        </div>

        <!-- All errors -->
        <div v-if="submitted && anyError" class="flex flex-col gap-0.5 px-1">
          <p v-if="errors.name"     class="text-[12px] text-red-500">{{ errors.name }}</p>
          <p v-if="errors.email"    class="text-[12px] text-red-500">{{ errors.email }}</p>
          <p v-if="errors.password" class="text-[12px] text-red-500">{{ errors.password }}</p>
          <p v-if="errors.confirm"  class="text-[12px] text-red-500">{{ errors.confirm }}</p>
        </div>

        <p v-if="submitError" class="text-[12px] text-red-500 text-center">{{ submitError }}</p>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-black text-white text-[13.5px] font-semibold py-3 rounded-lg hover:opacity-85 transition-opacity mt-1 disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Creating account…' : 'Create account' }}
        </button>

      </form>

      <!-- Login link -->
      <p class="text-center text-[13.5px] text-text-muted -mt-2">
        Already have an account?
        <router-link to="/login" class="text-text font-semibold hover:underline">Sign in</router-link>
      </p>

    </div>
    </div><!-- /z-10 content wrapper -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authErrorMessage } from '@/lib/authErrors'

const router = useRouter()
const auth   = useAuthStore()

const showPassword = ref(false)
const showConfirm  = ref(false)
const loading      = ref(false)
const submitted    = ref(false)
const submitError  = ref('')

const fields = reactive({ name: '', email: '', password: '', confirm: '' })
const errors = reactive({ name: '', email: '', password: '', confirm: '' })

const anyError = computed(() => Object.values(errors).some(e => e))

const requirements = computed(() => [
  { label: '8+ characters',      met: fields.password.length >= 8 },
  { label: 'Uppercase letter',   met: /[A-Z]/.test(fields.password) },
  { label: 'Lowercase letter',   met: /[a-z]/.test(fields.password) },
  { label: 'Number',             met: /[0-9]/.test(fields.password) },
  { label: 'Special character',  met: /[^A-Za-z0-9]/.test(fields.password) },
])

const allRequirementsMet = computed(() => requirements.value.every(r => r.met))

function validate() {
  errors.name = errors.email = errors.password = errors.confirm = ''

  if (!fields.name.trim())
    errors.name = 'Username is required.'
  else if (fields.name.trim().length < 3)
    errors.name = 'Username must be at least 3 characters.'

  if (!fields.email.trim())
    errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address.'

  if (!fields.password)
    errors.password = 'Password is required.'
  else if (!allRequirementsMet.value)
    errors.password = 'Password must meet all requirements.'

  if (!fields.confirm)
    errors.confirm = 'Please confirm your password.'
  else if (fields.confirm !== fields.password)
    errors.confirm = 'Passwords do not match.'

  return !errors.name && !errors.email && !errors.password && !errors.confirm
}

async function submit() {
  submitted.value   = true
  submitError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await auth.signup(fields.email.trim(), fields.password, fields.name.trim())
    router.push('/problems')
  } catch (e: any) {
    submitError.value = authErrorMessage(e.code)
  } finally {
    loading.value = false
  }
}
</script>
