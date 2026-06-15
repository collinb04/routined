<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-[12.5%] py-4 transition-all duration-300"
    :class="scrolled ? 'bg-[#f5f5f2]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'"
  >
    <div class="flex items-center gap-2">
      <RouterLink to="/" class="flex items-center gap-0.5 cursor-pointer transition-all duration-150 hover:opacity-75 hover:scale-[0.97] active:scale-95">
        <img src="/favicon.ico" class="w-7 h-7" alt="Routined" />
        <span class="text-xl font-bold text-text tracking-tight" style="font-family: 'Raleway', sans-serif;">Routined</span>
      </RouterLink>
      <span class="hidden sm:inline text-[9px] font-semibold uppercase tracking-wider text-black px-1 py-px rounded">beta</span>
      <div class="ml-10 hidden md:flex items-center gap-4">
        <template v-for="link in links" :key="link.label">
          <!-- Link with dropdown -->
          <div
            v-if="link.dropdown"
            class="relative"
            @mouseenter="clearDropdownTimer(); openDropdown = link.label"
            @mouseleave="scheduleCloseDropdown()"
          >
            <button
              class="relative pb-0.5 text-[15px] font-medium tracking-tight text-muted hover:text-foreground flex items-center gap-1
                     after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full
                     after:origin-left after:scale-x-0 after:bg-current after:transition-transform
                     after:duration-200 hover:after:scale-x-100 cursor-default"
            >
              {{ link.label }}
              <svg
                class="w-3.5 h-3.5 mt-px transition-transform duration-200"
                :class="openDropdown === link.label ? 'rotate-180' : ''"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <!-- Dropdown panel -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="openDropdown === link.label"
                class="absolute top-full left-1/2 -translate-x-1/2 mt-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-max min-w-[480px]"
              >
                <!-- Arrow notch -->
                <div class="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-t border-gray-100 rotate-45" />

                <div
                  class="grid gap-1"
                  :style="`grid-template-columns: repeat(${link.dropdown.columns ?? 2}, minmax(0, 1fr))`"
                >
                  <a
                    v-for="item in link.dropdown.items"
                    :key="item.label"
                    :href="item.to"
                    class="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#f5f5f2] transition-colors group"
                  >
                    <span class="mt-0.5 text-gray-400 group-hover:text-gray-600 transition-colors" v-html="item.icon" />
                    <div>
                      <p class="text-sm font-semibold text-text group-hover:text-black transition-colors">{{ item.label }}</p>
                      <p class="text-xs text-text-muted leading-relaxed mt-0.5">{{ item.description }}</p>
                    </div>
                  </a>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Plain link -->
          <a
            v-else
            :href="link.to"
            class="relative pb-0.5 text-[15px] font-medium tracking-tight text-muted hover:text-foreground
                   after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full
                   after:origin-left after:scale-x-0 after:bg-current after:transition-transform
                   after:duration-200 hover:after:scale-x-100 hover:cursor-default"
          >
            {{ link.label }}
          </a>
        </template>
      </div>
    </div>

    <!-- Desktop CTA -->
    <a href="#"
      class="
        hidden md:inline-flex items-center
        relative text-sm font-medium text-black
        px-4 py-1.5 rounded-lg
        bg-[#f5f5f2]
        border border-black
        shadow-[0_4px_0_0_#000]
        transition-all duration-100
        hover:shadow-[0_2px_0_0_#000] hover:translate-y-0.5
        hover:bg-white
        active:shadow-none active:translate-y-1
      "
    >
      Get started
    </a>

    <!-- Hamburger button -->
    <button
      class="md:hidden flex flex-col justify-center gap-1.25 w-8 h-8"
      @click="mobileOpen = !mobileOpen"
      aria-label="Toggle menu"
    >
      <span class="block w-5 h-[1.5px] bg-black transition-all duration-200 origin-center"
        :class="mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''" />
      <span class="block w-5 h-[1.5px] bg-black transition-all duration-200"
        :class="mobileOpen ? 'opacity-0 scale-x-0' : ''" />
      <span class="block w-5 h-[1.5px] bg-black transition-all duration-200 origin-center"
        :class="mobileOpen ? '-rotate-45 translate-y-[-6.5px]' : ''" />
    </button>
  </header>

  <!-- Mobile menu -->
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="mobileOpen"
      class="md:hidden fixed inset-x-0 top-14.25 z-40 bg-[#f5f5f2]/75 border-b border-black backdrop-blur-md px-5 py-5 flex flex-col gap-1"
    >
      <template v-for="link in links" :key="link.label">
        <template v-if="link.dropdown">
          <div class="pt-2 pb-1">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-1">{{ link.label }}</p>
            <div class="flex flex-col">
              <a
                v-for="item in link.dropdown.items"
                :key="item.label"
                :href="item.to"
                class="py-2 text-[15px] font-medium text-text hover:translate-x-1.5"
                @click="mobileOpen = false"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        </template>
        <a
          v-else
          :href="link.to"
          class="py-2.5 text-[15px] font-medium text-text"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
      </template>
      <a
        href="#"
        class="mt-3 text-center text-sm font-medium text-black border border-black hover:bg-white shadow-[0_3px_0_0_#000] rounded-lg px-4 py-2.5 transition-all duration-100 hover:shadow-[0_1px_0_0_#000] hover:translate-y-0.5 active:shadow-none active:translate-y-1"
        @click="mobileOpen = false"
      >
        Get started
      </a>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const openDropdown = ref(null)
const mobileOpen = ref(false)
let dropdownTimer = null

function scheduleCloseDropdown() {
  dropdownTimer = setTimeout(() => { openDropdown.value = null }, 300)
}

function clearDropdownTimer() {
  clearTimeout(dropdownTimer)
}

const links = [
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  {
    label: 'About',
    dropdown: {
      columns: 2,
      items: [
        {
          label: 'Our Mission',
          description: 'Why we built Routined and what drives us',
          to: '/#about',
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 8v4l3 3"/></svg>',
        },
        {
          label: 'The Team',
          description: 'Meet the people building the product',
          to: '/about',
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        },
        {
          label: 'Blog',
          description: 'Thoughts on learning, interviews, and DSA',
          to: '/blog',
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>',
        },
        {
          label: 'Contact',
          description: 'Questions, partnerships, or just say hi',
          to: '/#contact',
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        },
      ],
    },
  },
]

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
