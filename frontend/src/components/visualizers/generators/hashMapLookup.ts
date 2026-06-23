import type { ArrayFrame, CellKind } from '@/composables/types'

export function generateHashMapLookup(): ArrayFrame[] {
  const frames: ArrayFrame[] = []
  const BUCKETS = 5
  const keys = [5, 11, 7, 3, 14]
  let buckets = Array(BUCKETS).fill(0)

  frames.push({
    step: 0, phase: 'init',
    message: `${BUCKETS} buckets, indexed 0–4. Hash function: key % ${BUCKETS}. Insert and lookup both use the same function — the work is done once, not per element.`,
    array: [...buckets], pointers: {},
    highlights: buckets.map(() => 'default' as CellKind),
    windowRange: null,
  })

  const filled: number[] = []
  for (const key of keys) {
    const bucket = key % BUCKETS
    buckets = [...buckets]
    buckets[bucket] = key
    filled.push(bucket)
    frames.push({
      step: frames.length, phase: 'update',
      message: `insert(${key}): ${key} % ${BUCKETS} = ${bucket} → bucket[${bucket}]. O(1).`,
      array: [...buckets], pointers: { bucket },
      highlights: buckets.map((_, i) =>
        i === bucket ? 'active' : filled.includes(i) ? 'match' : 'default',
      ) as CellKind[],
      windowRange: null,
    })
  }

  const lookupKey = 7
  const lookupBucket = lookupKey % BUCKETS
  frames.push({
    step: frames.length, phase: 'compare',
    message: `lookup(${lookupKey}): ${lookupKey} % ${BUCKETS} = ${lookupBucket}. Jump straight to bucket[${lookupBucket}] — no scan.`,
    array: [...buckets], pointers: { bucket: lookupBucket },
    highlights: buckets.map((_, i) =>
      i === lookupBucket ? 'active' : 'eliminated',
    ) as CellKind[],
    windowRange: null,
  })

  frames.push({
    step: frames.length, phase: 'done',
    message: `Found ${lookupKey} at bucket[${lookupBucket}] — one hash computation. Average-case O(1). Worst case is O(n) if all keys hash to the same bucket, which is why hash function quality matters.`,
    array: [...buckets], pointers: { bucket: lookupBucket },
    highlights: buckets.map((_, i) =>
      i === lookupBucket ? 'match' : 'eliminated',
    ) as CellKind[],
    windowRange: null,
  })

  return frames
}
