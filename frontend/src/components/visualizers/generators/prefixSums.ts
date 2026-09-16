import type { ArrayFrame, CellKind } from '@/composables/types'

// Prefix sums: build a running total in place, once, so any range-sum
// query afterward is a single subtraction instead of a fresh loop.
export function generatePrefixSums(): ArrayFrame[] {
  const nums = [4, 2, 5, 1, 3, 6]
  const n = nums.length
  const prefix = [...nums]
  const frames: ArrayFrame[] = []

  frames.push({
    step: 0, phase: 'init',
    message: `nums = [${nums.join(', ')}]. Build a running total in place: prefix[i] = prefix[i-1] + nums[i]. One O(n) pass, done once — then every range-sum query becomes O(1).`,
    array: [...prefix], pointers: { i: 0 },
    highlights: prefix.map((_, i) => (i === 0 ? 'active' : 'default')) as CellKind[],
    windowRange: null,
  })

  for (let i = 1; i < n; i++) {
    const before = prefix[i]
    prefix[i] = prefix[i - 1] + prefix[i]
    frames.push({
      step: frames.length, phase: 'update',
      message: `prefix[${i}] = prefix[${i - 1}] + nums[${i}] = ${prefix[i - 1]} + ${before} = ${prefix[i]}.`,
      array: [...prefix], pointers: { i },
      highlights: prefix.map((_, k) => (k === i ? 'active' : k < i ? 'window' : 'default')) as CellKind[],
      windowRange: null,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Prefix array built: [${prefix.join(', ')}]. prefix[i] now holds the sum of nums[0..i].`,
    array: [...prefix], pointers: {},
    highlights: prefix.map(() => 'match') as CellKind[],
    windowRange: null,
  })

  // Query phase — sum of nums[l..r] via prefix[r] - prefix[l-1]
  const l = 2, r = 4
  const bruteForce = nums.slice(l, r + 1).reduce((a, b) => a + b, 0)

  frames.push({
    step: frames.length, phase: 'compare',
    message: `Query: sum of nums[${l}..${r}]. Brute force loops over ${r - l + 1} elements every time. Instead: prefix[${r}] − prefix[${l - 1}].`,
    array: [...prefix], pointers: { r, 'l−1': l - 1 },
    highlights: prefix.map((_, i) => (i === r || i === l - 1 ? 'active' : 'eliminated')) as CellKind[],
    windowRange: [l, r],
  })

  frames.push({
    step: frames.length, phase: 'done',
    message: `prefix[${r}] − prefix[${l - 1}] = ${prefix[r]} − ${prefix[l - 1]} = ${prefix[r] - prefix[l - 1]}. Matches summing nums[${l}..${r}] directly (${bruteForce}) — but this took O(1), no matter how wide the range.`,
    array: [...prefix], pointers: { r, 'l−1': l - 1 },
    highlights: prefix.map((_, i) => (i === r || i === l - 1 ? 'match' : 'eliminated')) as CellKind[],
    windowRange: [l, r],
  })

  return frames
}
