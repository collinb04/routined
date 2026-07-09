import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateXorPatterns(): ArrayFrame[] {
  const arr = [4, 1, 2, 1, 2]
  const frames: ArrayFrame[] = []
  const n = arr.length

  frames.push({
    step: 0, phase: 'init',
    message: `Every value appears twice except one. XOR every element together — a ^ a = 0, so duplicates cancel and only the unique value survives.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default') as CellKind[], windowRange: null,
  })

  let running = 0
  const seenAt: Record<number, number> = {}
  const cellStates: CellKind[] = arr.map(() => 'default')

  for (let i = 0; i < n; i++) {
    running ^= arr[i]
    if (arr[i] in seenAt) {
      const partner = seenAt[arr[i]]
      cellStates[partner] = 'eliminated'
      cellStates[i] = 'eliminated'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `arr[${i}] = ${arr[i]} — matches arr[${partner}]. running XOR = ${running} (they cancel: ${arr[i]} ^ ${arr[i]} = 0).`,
        array: [...arr], pointers: { i },
        highlights: [...cellStates] as CellKind[], windowRange: null,
      })
    } else {
      seenAt[arr[i]] = i
      cellStates[i] = 'active'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `arr[${i}] = ${arr[i]} — first time seen. running XOR = ${running}.`,
        array: [...arr], pointers: { i },
        highlights: [...cellStates] as CellKind[], windowRange: null,
      })
      cellStates[i] = 'default'
    }
  }

  const survivorIndex = arr.findIndex((v, idx) => cellStates[idx] !== 'eliminated')
  const finalStates = cellStates.map((s, idx) => (idx === survivorIndex ? 'match' : 'eliminated')) as CellKind[]
  frames.push({
    step: frames.length, phase: 'done',
    message: `Final running XOR = ${running}. Every paired value cancelled to 0 along the way — arr[${survivorIndex}] = ${arr[survivorIndex]} is the only one that didn't have a partner, so it's what survives.`,
    array: [...arr], pointers: { unique: survivorIndex },
    highlights: finalStates, windowRange: null,
  })

  return frames
}
