<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProblemSpace from '@/components/ProblemSpace.vue'

const route = useRoute()
const problemId = computed(() => route.params.id as string)
</script>

<template>
  <ProblemSpace :key="problemId" :problem-id="problemId" />
</template>
