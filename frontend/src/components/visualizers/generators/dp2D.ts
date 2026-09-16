import type { GridFrame, CellKind } from '@/composables/types'

// Unique Paths: a hiker on an m×n grid can only move right or down.
// dp[r][c] = number of distinct paths from the top-left to (r, c). Matches
// the "hiker on a grid" analogy 2D DP is introduced with — a second
// dimension of state, same recurrence idea as 1D DP.
export function generateDp2D(): GridFrame[] {
  const rows = 3, cols = 4
  const frames: GridFrame[] = []
  const grid: (string | number)[][] = Array.from({ length: rows }, () => Array(cols).fill('·'))
  const blank = (): CellKind[][] => Array.from({ length: rows }, () => Array(cols).fill('default')) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `A hiker starts at the top-left of a ${rows}×${cols} grid and can only move right or down. dp[r][c] = number of distinct paths to reach (r, c). Fill the first row and column first — there's only one way to reach any of those cells.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  for (let c = 0; c < cols; c++) {
    grid[0][c] = 1
    const cellHl = blank(); cellHl[0][c] = 'window'
    frames.push({
      step: frames.length, phase: 'update',
      message: `dp[0][${c}] = 1 — the only way to reach it is moving right the whole way from the start.`,
      grid: grid.map(row => [...row]), pointers: { cur: [0, c] }, highlights: cellHl,
    })
  }
  for (let r = 1; r < rows; r++) {
    grid[r][0] = 1
    const cellHl = blank(); cellHl[r][0] = 'window'
    frames.push({
      step: frames.length, phase: 'update',
      message: `dp[${r}][0] = 1 — the only way to reach it is moving down the whole way from the start.`,
      grid: grid.map(row => [...row]), pointers: { cur: [r, 0] }, highlights: cellHl,
    })
  }

  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      const fromTop = grid[r - 1][c] as number
      const fromLeft = grid[r][c - 1] as number
      const cmpHl = blank()
      cmpHl[r - 1][c] = 'active'
      cmpHl[r][c - 1] = 'active'
      cmpHl[r][c] = 'window'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `dp[${r}][${c}] is only reachable from above (${fromTop}) or from the left (${fromLeft}) — every path passes through exactly one of those two cells.`,
        grid: grid.map(row => [...row]), pointers: { cur: [r, c] }, highlights: cmpHl,
      })

      grid[r][c] = fromTop + fromLeft
      const isDone = r === rows - 1 && c === cols - 1
      const doneHl = blank(); doneHl[r][c] = 'match'
      frames.push({
        step: frames.length, phase: isDone ? 'done' : 'update',
        message: isDone
          ? `dp[${r}][${c}] = ${fromTop} + ${fromLeft} = ${grid[r][c]}. There are ${grid[r][c]} distinct paths from the top-left to the bottom-right. Same recurrence as 1D DP — just one more dimension of state.`
          : `dp[${r}][${c}] = ${fromTop} + ${fromLeft} = ${grid[r][c]}.`,
        grid: grid.map(row => [...row]), pointers: { cur: [r, c] }, highlights: doneHl,
      })
    }
  }

  return frames
}
