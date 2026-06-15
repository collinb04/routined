<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import ProblemSpace from '@/components/ProblemSpace.vue'

const store = useSessionStore()

onMounted(() => store.initLens(0))
</script>

<template>
  <ProblemSpace />
</template>
