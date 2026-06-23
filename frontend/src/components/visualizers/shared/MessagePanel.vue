<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <div class="bg-surface rounded-xl px-4 py-3 text-sm text-text-dim leading-relaxed min-h-15 flex items-center">
    <Transition name="msg" mode="out-in">
      <span :key="message">{{ message }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.msg-enter-active,
.msg-leave-active {
  transition: opacity 0.12s ease;
}
.msg-enter-from,
.msg-leave-to {
  opacity: 0;
}
</style>
