import type { ArrayFrame, CellKind } from '@/composables/types'

// Bucket sort with 3 buckets: low / mid / high thirds of the value range.
export function generateBucketSort(nums: number[] = [4, 1, 7, 2, 6, 3, 5]): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const arr = [...nums]
  const n = arr.length

  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const range = max - min + 1
  const k = 3
  const bucketSize = range / k

  function bucketOf(v: number): number {
    return Math.min(Math.floor((v - min) / bucketSize), k - 1)
  }

  const BUCKET_KINDS: CellKind[] = ['window', 'active', 'eliminated']

  frames.push({
    step: 0, phase: 'init',
    message: `Starting array: [${arr.join(', ')}]. Bucket sort distributes elements into value-range buckets, sorts each bucket independently, then concatenates. Works best when values are roughly uniform — each bucket gets O(n/k) elements on average.`,
    array: [...arr], pointers: {}, highlights: arr.map(() => 'default'), windowRange: null,
  })

  const low = arr.filter(v => bucketOf(v) === 0).sort((a, b) => a - b)
  const mid = arr.filter(v => bucketOf(v) === 1).sort((a, b) => a - b)
  const high = arr.filter(v => bucketOf(v) === 2).sort((a, b) => a - b)

  const bucketRanges = [
    `${min}–${Math.floor(min + bucketSize - 1)}`,
    `${Math.floor(min + bucketSize)}–${Math.floor(min + 2 * bucketSize - 1)}`,
    `${Math.floor(min + 2 * bucketSize)}–${max}`,
  ]

  frames.push({
    step: frames.length, phase: 'compare',
    message: `Distribute into 3 buckets by value range: Bucket 0 (${bucketRanges[0]}) → [${low.join(', ')}], Bucket 1 (${bucketRanges[1]}) → [${mid.join(', ')}], Bucket 2 (${bucketRanges[2]}) → [${high.join(', ')}]. Light blue = low, blue = mid, faded = high.`,
    array: [...arr], pointers: {},
    highlights: arr.map(v => BUCKET_KINDS[bucketOf(v)]),
    windowRange: null,
  })

  for (let b = 0; b < k; b++) {
    const bucket = [low, mid, high][b]
    if (bucket.length === 0) continue
    const otherHighlights: CellKind[] = arr.map(v => {
      const bkt = bucketOf(v)
      if (bkt < b) return 'match'
      if (bkt === b) return BUCKET_KINDS[b]
      return 'default'
    })
    frames.push({
      step: frames.length, phase: 'update',
      message: `Sort Bucket ${b} (${bucketRanges[b]}): [${bucket.join(', ')}]. With only ${bucket.length} element${bucket.length > 1 ? 's' : ''}, a simple sort like insertion sort is O(k) here — tiny cost.`,
      array: [...arr], pointers: {}, highlights: otherHighlights, windowRange: null,
    })
  }

  const sorted = [...low, ...mid, ...high]

  frames.push({
    step: frames.length, phase: 'update',
    message: `Concatenate buckets in order: [${low.join(', ')}] + [${mid.join(', ')}] + [${high.join(', ')}] = [${sorted.join(', ')}]. No comparisons needed across buckets — their order is determined by which bucket they're in.`,
    array: sorted, pointers: {},
    highlights: sorted.map((v) => BUCKET_KINDS[bucketOf(v)]),
    windowRange: null,
  })

  frames.push({
    step: frames.length, phase: 'done',
    message: `Sorted! O(n + k) time when distribution is uniform — far better than O(n log n) comparison-based sorts. The catch: only works for data that fits naturally into a bounded value range.`,
    array: sorted, pointers: {}, highlights: sorted.map(() => 'match'), windowRange: null,
  })
  return frames
}
