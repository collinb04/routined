<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { usePyodide } from './composables/usePyodide'
import { useAuthStore } from './stores/auth'

const { loadPyodide } = usePyodide()
const auth = useAuthStore()

onMounted(() => loadPyodide())
</script>

<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column;">
    <template v-if="auth.isLoading">
      <div style="min-height: 100vh;" />
    </template>
    <template v-else>
      <NavBar />
      <main style="flex: 1;">
      <RouterView v-slot="{ Component }">
        <Transition name="reveal" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
      </main>
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
  </div>
</template>

<style>
.reveal-enter-active {
  transition: all 0.7s ease-out;
}
.reveal-leave-active {
  transition: all 0.15s ease-in;
}
.reveal-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.reveal-leave-to {
  opacity: 0;
}
</style>