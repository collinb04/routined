<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between px-[12.5%] py-4 transition-all duration-300"
    :class="scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'"
  >
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-0.5 cursor-pointer transition-all duration-150 hover:opacity-75 hover:scale-[0.97] active:scale-95">
        <span class="text-xl font-bold text-text tracking-tight" style="font-family: 'Raleway', sans-serif;">Routined</span>
      </div>
      <span class="text-[9px] font-semibold uppercase tracking-wider text-black px-1 py-px rounded">beta</span>
      <div class="ml-10 space-x-4">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative pb-0.5 text-[15px] font-medium tracking-tight text-muted hover:text-foreground
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full
                after:origin-left after:scale-x-0 after:bg-current after:transition-transform
                after:duration-200 hover:after:scale-x-100 hover:cursor-default"
          active-class="text-foreground after:scale-x-100"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
    <a    href="#"
      class="
        relative text-sm font-medium text-black
        px-4 py-1.5 rounded-lg
        bg-white
        border border-black
        shadow-[0_4px_0_0_#000]
        transition-all duration-100
        hover:shadow-[0_2px_0_0_#000] hover:translate-y-0.5
        active:shadow-none active:translate-y-1 
      "
    >
      Get started
    </a>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'Product', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About',   to: '/about'   },
]

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>


// img src="/favicon.ico" class="w-7 h-7" alt="Routined" 