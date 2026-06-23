import { ref, computed, watch, onUnmounted } from 'vue'
import type { Frame } from './types'

export function useFramePlayer(frames: Frame[]) {
  const index = ref(0)
  const playing = ref(false)
  const msPerStep = ref(1000)

  const current = computed(() => frames[index.value])
  const isFirst = computed(() => index.value === 0)
  const isLast  = computed(() => index.value === frames.length - 1)

  function next()  { if (!isLast.value)  index.value++ }
  function prev()  { if (!isFirst.value) index.value-- }
  function reset() { index.value = 0; playing.value = false }
  function goTo(i: number) {
    index.value = Math.max(0, Math.min(frames.length - 1, i))
  }

  let timer: ReturnType<typeof setInterval> | null = null

  function startTimer() {
    timer = setInterval(() => {
      if (isLast.value) { playing.value = false; return }
      next()
    }, msPerStep.value)
  }

  watch(playing, (v) => {
    if (timer) { clearInterval(timer); timer = null }
    if (v) startTimer()
  })

  watch(msPerStep, () => {
    if (!playing.value) return
    if (timer) clearInterval(timer)
    startTimer()
  })

  onUnmounted(() => { if (timer) clearInterval(timer) })

  return {
    index, current, isFirst, isLast,
    total: frames.length,
    playing, msPerStep,
    next, prev, reset, goTo,
  }
}
