import type { GridFrame, CellKind } from '@/composables/types'

const RAW = [
  ['1', '1', '0', '0'],
  ['1', '0', '0', '1'],
  ['0', '0', '1', '1'],
  ['0', '0', '0', '0'],
]

export function generateGridFloodFill(): GridFrame[] {
  const rows = RAW.length, cols = RAW[0].length
  const frames: GridFrame[] = []
  const highlights: CellKind[][] = RAW.map(row => row.map(v => (v === '1' ? 'default' : 'eliminated'))) as CellKind[][]

  frames.push({
    step: 0, phase: 'init',
    message: `1 = land, 0 = water. Counting islands: BFS from every unvisited land cell, marking everything reachable through it as one island.`,
    grid: RAW.map(row => [...row]), pointers: {}, highlights: highlights.map(row => [...row]),
  })

  const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false))
  let islandCount = 0

  for (let sr = 0; sr < rows; sr++) {
    for (let sc = 0; sc < cols; sc++) {
      if (RAW[sr][sc] !== '1' || visited[sr][sc]) continue
      islandCount++
      const queue: [number, number][] = [[sr, sc]]
      visited[sr][sc] = true
      highlights[sr][sc] = 'window'
      frames.push({
        step: frames.length, phase: 'compare',
        message: `Unvisited land at (${sr}, ${sc}) — start BFS. This begins island #${islandCount}.`,
        grid: RAW.map(row => [...row]), pointers: { start: [sr, sc] },
        highlights: highlights.map(row => [...row]),
      })

      while (queue.length) {
        const [r, c] = queue.shift()!
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = r + dr, nc = c + dc
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
          if (RAW[nr][nc] !== '1' || visited[nr][nc]) continue
          visited[nr][nc] = true
          highlights[nr][nc] = 'window'
          queue.push([nr, nc])
          frames.push({
            step: frames.length, phase: 'compare',
            message: `(${r}, ${c}) → neighbor (${nr}, ${nc}) is land and unvisited — add to island #${islandCount} and queue it.`,
            grid: RAW.map(row => [...row]), pointers: { cur: [r, c], next: [nr, nc] },
            highlights: highlights.map(row => [...row]),
          })
        }
      }

      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (highlights[r][c] === 'window') highlights[r][c] = 'match'
      frames.push({
        step: frames.length, phase: 'update',
        message: `Island #${islandCount} fully explored — no more unvisited land reachable from (${sr}, ${sc}).`,
        grid: RAW.map(row => [...row]), pointers: {}, highlights: highlights.map(row => [...row]),
      })
    }
  }

  frames.push({
    step: frames.length, phase: 'done',
    message: `${islandCount} islands total. Each cell is visited once — O(rows × cols) overall, same as a plain graph BFS/DFS.`,
    grid: RAW.map(row => [...row]), pointers: {}, highlights: highlights.map(row => [...row]),
  })

  return frames
}
