<template>
  <div class="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <!-- Row -->
    <div class="flex items-center gap-5 px-6 py-5 cursor-pointer select-none" @click="open = !open">
      <!-- Avatar -->
      <div class="shrink-0 w-24 h-24 rounded-full bg-gray-100 border-blue-300 border-4 overflow-hidden">
        <img v-if="image" :src="image" :alt="name" class="w-full h-full object-cover" />
      </div>

      <!-- Name + Role -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <p class="font-semibold text-text text-xl">{{ name }}</p>
          <a
            v-if="linkedin"
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#0a66c2] hover:opacity-75 transition-opacity shrink-0"
            title="LinkedIn"
            @click.stop
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <p class="text-md text-text-muted mt-0.5">{{ role }}</p>
        <p class="text-sm text-text-muted mt-0.5">Interests: {{ interests }}</p>
      </div>

      <!-- Chevron -->
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="shrink-0 text-text-muted transition-transform duration-200"
        :class="open ? 'rotate-180' : ''"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>

    <!-- Bio Dropdown -->
    <div v-if="open" class="px-6 pb-6 pt-0">
      <div class="h-px bg-gray-100 mb-4" />
      <p class="text-sm text-text-dim leading-relaxed">{{ bio }}</p>

      <!-- Email -->
      <a
        v-if="email"
        :href="`mailto:${email}`"
        class="inline-flex items-center gap-2 mt-4 text-sm text-text-muted hover:text-text transition-colors"
        @click.stop
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
        {{ email }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  name:      { type: String, required: true },
  role:      { type: String, required: true },
  interests: { type: String, required: true },
  bio:       { type: String, required: true },
  image:     { type: String, default: '' },
  email:     { type: String, default: '' },
  linkedin:  { type: String, default: '' },
})

const open = ref(false)
</script>
