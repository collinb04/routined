import type { GridFrame, CellKind } from '@/composables/types'

export function generateGridMultiPass(): GridFrame[] {
  const grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const rows = grid.length, cols = grid[0].length
  const frames: GridFrame[] = []
  const blank = (): CellKind[][] => Array.from({ length: rows }, () => Array(cols).fill('default')) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `Build a 2D prefix sum. A single sweep can't accumulate in two directions at once — split it into a row-wise pass, then a column-wise pass over the result.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  // Pass 1: row-wise running sums
  const rowSums = grid.map(row => [...row])
  for (let r = 0; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      rowSums[r][c] = rowSums[r][c] + rowSums[r][c - 1]
    }
    const hl = blank()
    for (let c = 0; c < cols; c++) hl[r][c] = 'active'
    frames.push({
      step: frames.length, phase: 'update',
      message: `Pass 1 (row-wise): row ${r} becomes [${rowSums[r].join(', ')}] — each cell is the running sum from the start of its row.`,
      grid: rowSums.map(row => [...row]), pointers: {}, highlights: hl,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Pass 1 complete — every cell now holds its row's running sum. Pass 2 accumulates those down each column.`,
    grid: rowSums.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  // Pass 2: column-wise running sums over the row-sum grid
  const full = rowSums.map(row => [...row])
  for (let c = 0; c < cols; c++) {
    for (let r = 1; r < rows; r++) {
      full[r][c] = full[r][c] + full[r - 1][c]
    }
    const hl = blank()
    for (let r = 0; r < rows; r++) hl[r][c] = 'window'
    frames.push({
      step: frames.length, phase: 'update',
      message: `Pass 2 (column-wise): column ${c} becomes [${full.map(row => row[c]).join(', ')}] — now the running sum reaches down the column too.`,
      grid: full.map(row => [...row]), pointers: {}, highlights: hl,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `full[r][c] now holds the sum of every original cell in the rectangle from (0,0) to (r,c) — any rectangle sum is four O(1) lookups away. Two O(rows × cols) passes, still linear overall.`,
    grid: full.map(row => [...row]), pointers: {}, highlights: full.map(row => row.map(() => 'match')) as CellKind[][],
  })

  return frames
}
