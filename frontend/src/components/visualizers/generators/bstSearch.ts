import type { TreeFrame, TreeNode, CellKind } from '@/composables/types'

// BST [4, 2, 6, 1, 3, 5, 7] — search for target=5.
// Demonstrates the BST property: at each node, half the tree is eliminated.
export function generateBstSearch(target = 5): TreeFrame[] {
  const nodes: TreeNode[] = [
    { id: 0, val: 4, left: 1,    right: 2    },
    { id: 1, val: 2, left: 3,    right: 4    },
    { id: 2, val: 6, left: 5,    right: 6    },
    { id: 3, val: 1, left: null, right: null },
    { id: 4, val: 3, left: null, right: null },
    { id: 5, val: 5, left: null, right: null },
    { id: 6, val: 7, left: null, right: null },
  ]

  const frames: TreeFrame[] = []

  function hl(
    activeId: number | null,
    visited: number[],
    matchId: number | null = null,
  ): Record<number, CellKind> {
    return Object.fromEntries(
      nodes.map(n => [
        n.id,
        n.id === matchId  ? 'match'      :
        n.id === activeId ? 'active'     :
        visited.includes(n.id) ? 'eliminated' :
        'default',
      ]),
    )
  }

  frames.push({
    step: 0, phase: 'init',
    message: `Balanced BST containing [1–7]. BST property: every node's left subtree holds smaller values, right subtree holds larger values. This structure makes search O(log n) — we eliminate half the tree at each step. Searching for ${target}...`,
    nodes,
    highlights: hl(null, []),
  })

  let cur: number | null = 0
  const visited: number[] = []

  while (cur !== null) {
    const node = nodes.find(n => n.id === cur)!

    if (node.val === target) {
      frames.push({
        step: frames.length, phase: 'done',
        message: `Found ${target}! Path taken: ${[...visited, cur].map(id => nodes[id].val).join(' → ')}. Only ${frames.length} comparison${frames.length !== 1 ? 's' : ''} needed — O(log n = log₂7 ≈ 3) for a balanced BST.`,
        nodes,
        highlights: hl(null, visited, cur),
      })
      return frames
    }

    if (target < node.val) {
      frames.push({
        step: frames.length, phase: 'compare',
        message: `${target} < ${node.val} — go left. The entire right subtree (all values > ${node.val}) can be ignored. Each step eliminates roughly half the remaining nodes.`,
        nodes,
        highlights: hl(cur, visited),
      })
      visited.push(cur)
      cur = node.left
    } else {
      frames.push({
        step: frames.length, phase: 'compare',
        message: `${target} > ${node.val} — go right. The entire left subtree (all values < ${node.val}) can be ignored. Each step eliminates roughly half the remaining nodes.`,
        nodes,
        highlights: hl(cur, visited),
      })
      visited.push(cur)
      cur = node.right
    }

    if (cur === null) {
      frames.push({
        step: frames.length, phase: 'done',
        message: `${target} is not in the tree. The search path narrowed until hitting a null child — the value simply doesn't exist here.`,
        nodes,
        highlights: Object.fromEntries(nodes.map(n => [n.id, 'eliminated' as CellKind])),
      })
    }
  }

  return frames
}
