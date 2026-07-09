import type { GridFrame, CellKind } from '@/composables/types'

export function generateMatrixRotate(): GridFrame[] {
  const n = 3
  let grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const frames: GridFrame[] = []
  const blank = (): CellKind[][] => Array.from({ length: n }, () => Array(n).fill('default')) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `Rotate this 3×3 matrix 90° clockwise, in place. Two steps: transpose, then reverse each row.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  // Transpose, one swap at a time
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      const hl = blank()
      hl[r][c] = 'active'
      hl[c][r] = 'active'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `Swap grid[${r}][${c}] = ${grid[r][c]} with grid[${c}][${r}] = ${grid[c][r]}.`,
        grid: grid.map(row => [...row]), pointers: {}, highlights: hl,
      })
      const tmp = grid[r][c]
      grid[r][c] = grid[c][r]
      grid[c][r] = tmp
      const hl2 = blank()
      hl2[r][c] = 'match'
      hl2[c][r] = 'match'
      frames.push({
        step: frames.length, phase: 'update',
        message: `Swapped. grid[${r}][${c}] = ${grid[r][c]}, grid[${c}][${r}] = ${grid[c][r]}.`,
        grid: grid.map(row => [...row]), pointers: {}, highlights: hl2,
      })
    }
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Transpose complete — rows and columns are swapped. Now reverse each row.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: blank(),
  })

  // Reverse each row
  for (let r = 0; r < n; r++) {
    grid[r].reverse()
    const hl = blank()
    for (let c = 0; c < n; c++) hl[r][c] = 'window'
    frames.push({
      step: frames.length, phase: 'update',
      message: `Reverse row ${r}: [${grid[r].join(', ')}].`,
      grid: grid.map(row => [...row]), pointers: {}, highlights: hl,
    })
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `Rotated 90° clockwise, entirely in place — no second matrix allocated.`,
    grid: grid.map(row => [...row]), pointers: {}, highlights: grid.map(row => row.map(() => 'match')) as CellKind[][],
  })

  return frames
}
