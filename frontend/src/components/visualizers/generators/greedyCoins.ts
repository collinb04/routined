import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateGreedyCoins(): ArrayFrame[] {
  const coins = [25, 10, 5, 1]
  const target = 41
  const frames: ArrayFrame[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `Make ${target}¢ with the fewest coins from [25, 10, 5, 1]. Greedy: always take the largest denomination that still fits.`,
    array: [...coins], pointers: {},
    highlights: coins.map(() => 'default' as CellKind),
    windowRange: null,
  })

  const chosen: number[] = []
  const tooLarge: number[] = []
  let remaining = target

  for (let i = 0; i < coins.length && remaining > 0; ) {
    if (coins[i] <= remaining) {
      remaining -= coins[i]
      chosen.push(i)
      frames.push({
        step: frames.length, phase: remaining === 0 ? 'done' : 'update',
        message: remaining === 0
          ? `Take ${coins[i]}¢. Done — ${chosen.length} coins: ${chosen.map(k => coins[k] + '¢').join(' + ')} = ${target}¢. Greedy works here because the denominations divide evenly into each other. It fails for arbitrary denominations — that requires DP.`
          : `${coins[i]}¢ ≤ ${remaining + coins[i]}¢ remaining — take it. ${remaining}¢ left.`,
        array: [...coins], pointers: {},
        highlights: coins.map((_, k) =>
          chosen.includes(k) ? 'match' : tooLarge.includes(k) ? 'eliminated' : k === i ? 'active' : 'default',
        ) as CellKind[],
        windowRange: null,
      })
    } else {
      tooLarge.push(i)
      frames.push({
        step: frames.length, phase: 'compare',
        message: `${coins[i]}¢ > ${remaining}¢ — too large. Try the next.`,
        array: [...coins], pointers: {},
        highlights: coins.map((_, k) =>
          chosen.includes(k) ? 'match' : tooLarge.includes(k) ? 'eliminated' : k === i ? 'window' : 'default',
        ) as CellKind[],
        windowRange: null,
      })
      i++
    }
  }

  return frames
}
