<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProblemSpace from '@/components/ProblemSpace.vue'

const route = useRoute()
const problemId = route.params.id as string
</script>

<template>
  <ProblemSpace :problem-id="problemId" />
</template>
