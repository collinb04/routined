<template>
  <div class="bg-[#f5f5f2] min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-5 py-20">

    <div class="max-w-2xl w-full flex flex-col items-center gap-6 text-center">
      <!-- Heading -->
      <h1 class="text-4xl sm:text-[clamp(40px,5vw,60px)] font-medium leading-[1.1] tracking-tight text-text">
        Simple, transparent pricing.<br class="hidden sm:block" />
        <span class="text-text-muted font-light">Coming soon.</span>
      </h1>

      <!-- Subtext -->
      <p class="text-text-dim leading-relaxed max-w-md">
        We're still working out the details. Sign up below and we'll let you know the moment pricing goes live — early users get first access.
      </p>

      <!-- Waitlist -->
      <form class="flex w-full max-w-sm gap-2 mt-2" @submit.prevent>
        <input
          type="email"
          placeholder="you@example.com"
          class="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="submit"
          class="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-85 transition-opacity shrink-0"
        >
          Notify me
        </button>
      </form>

      <!-- Divider -->
      <div class="w-full max-w-md h-px bg-gray-200 my-2" />

      <!-- Preview cards (locked) -->
      <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="(tier, i) in tiers"
          :key="tier.name"
          class="bg-white border rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden select-none"
          :class="i === 1 ? 'border-black' : 'border-gray-200'"
        >
          <!-- Popular badge -->
          <span v-if="i === 1" class="absolute top-4 right-4 text-[9px] font-semibold uppercase tracking-widest text-text-muted bg-[#f5f5f2] px-2 py-0.5 rounded-full">
            Popular
          </span>

          <!-- Tier name + price blur -->
          <div class="flex flex-col gap-1 items-start">
            <p class="text-sm font-semibold text-text">{{ tier.name }}</p>
            <div class="h-7 w-20 rounded-md bg-gray-100 blur-sm" />
          </div>

          <!-- Feature lines (blurred) -->
          <div class="flex flex-col gap-2">
            <div v-for="j in tier.lines" :key="j"
              class="h-3 rounded-full bg-gray-100 blur-[2px]"
              :style="`width: ${tier.widths[j - 1]}%`"
            />
          </div>

          <!-- CTA blur -->
          <div class="mt-auto h-9 rounded-lg bg-gray-100 blur-sm" :class="i === 1 ? 'bg-gray-200' : ''" />
        </div>
      </div>

      <p class="text-xs text-text-muted">No credit card required. Unsubscribe any time.</p>

    </div>
  </div>
</template>

<script setup>
const tiers = [
  { name: 'Free',    lines: 3, widths: [70, 55, 80] },
  { name: 'Pro',     lines: 4, widths: [75, 60, 85, 50] },
  { name: 'Team',    lines: 4, widths: [65, 80, 55, 70] },
]
</script>
