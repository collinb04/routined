<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { usePyodide } from './composables/usePyodide'
const { loadPyodide } = usePyodide()

onMounted(() => loadPyodide())
</script>

<template>
  <NavBar />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <footer class="bg-[#f5f5f2] border-t border-gray-200 px-5 sm:px-[12.5%] py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 text-sm text-text-muted">
    <div class="flex flex-col">
      <RouterLink to="/">
        <span class="font-semibold text-text text-2xl">Routined</span>
      </RouterLink>
      <span>© 2026 Routined. All rights reserved.</span>
    </div>
    <div class="flex gap-6">
      <RouterLink to="/#problems" class="hover:text-text transition-colors">Problems</RouterLink>
      <RouterLink to="/pricing" class="hover:text-text transition-colors">Pricing</RouterLink>
      <a href="#" class="hover:text-text transition-colors">Get Started</a>
      <RouterLink to="/#contact" class="hover:text-text transition-colors">FAQs + Contact</RouterLink>
    </div>
  </footer>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>