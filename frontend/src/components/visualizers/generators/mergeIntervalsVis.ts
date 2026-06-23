import type { IntervalFrame, Interval, CellKind } from '@/composables/types'

export function generateMergeIntervalsVis(): IntervalFrame[] {
  const frames: IntervalFrame[] = []

  const intervals: Interval[] = [
    { id: 0, start: 1, end: 3 },
    { id: 1, start: 2, end: 6 },
    { id: 2, start: 8, end: 10 },
    { id: 3, start: 15, end: 18 },
  ]

  function f(
    step: number, phase: string, message: string,
    highlights: Record<number, CellKind>, merged: Interval[],
  ): IntervalFrame {
    return { step, phase, message, intervals, highlights, merged }
  }

  frames.push(f(0, 'init',
    `Sort by start, then sweep. If the next interval's start ≤ current end, they overlap — extend the end. Otherwise, output the current and move on.`,
    {}, []))

  frames.push(f(1, 'compare',
    `Already sorted. Take [1,3] as the active interval.`,
    { 0: 'active' }, []))

  frames.push(f(2, 'compare',
    `[2,6]: 2 ≤ 3 — overlaps. Extend end to max(3,6) = 6. Active interval: [1,6].`,
    { 0: 'active', 1: 'active' }, []))

  frames.push(f(3, 'compare',
    `[8,10]: 8 > 6 — no overlap. Output [1,6]. Active interval becomes [8,10].`,
    { 0: 'match', 1: 'match', 2: 'active' }, [{ id: 0, start: 1, end: 6 }]))

  frames.push(f(4, 'compare',
    `[15,18]: 15 > 10 — no overlap. Output [8,10]. Active interval becomes [15,18].`,
    { 0: 'eliminated', 1: 'eliminated', 2: 'match', 3: 'active' }, [
      { id: 0, start: 1, end: 6 },
      { id: 1, start: 8, end: 10 },
    ]))

  frames.push(f(5, 'done',
    `End of input — output [15,18]. Result: [[1,6], [8,10], [15,18]]. Sorting guarantees only adjacent intervals can overlap, so a single pass is enough. O(n log n) total.`,
    { 0: 'eliminated', 1: 'eliminated', 2: 'eliminated', 3: 'match' }, [
      { id: 0, start: 1, end: 6 },
      { id: 1, start: 8, end: 10 },
      { id: 2, start: 15, end: 18 },
    ]))

  return frames
}
