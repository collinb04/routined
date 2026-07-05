/**
 * Zod schemas for StruggleContent validation.
 * Used by the batch generator and its tests.
 */
import { z } from 'zod'

export const VALID_STRATEGY_IDS = [
  'nested_loops', 'hash_set', 'hash_map', 'sort_then_scan', 'two_pointers',
  'sliding_window', 'binary_search', 'binary_search_per_element', 'monotonic_stack',
  'heap', 'prefix_sums', 'bfs', 'dfs', 'dp_memoization', 'dp_tabulation',
  'greedy', 'counting_sort', 'bit_manipulation', 'union_find', 'backtracking',
]

export const VALID_COMPLEXITIES = [
  'O(1)', 'O(log n)', 'O(√n)', 'O(n)', 'O(n log n)',
  'O(n²)', 'O(n³)', 'O(2ⁿ)', 'O(n!)', 'O(V + E)', 'O(n · m)', 'O(n · target)',
]

export const StrategyOptionSchema = z.object({
  strategyId: z.enum(VALID_STRATEGY_IDS),
  viability: z.enum(['optimal', 'viable_suboptimal', 'trap', 'inapplicable']),
  complexity: z.object({
    time: z.enum(VALID_COMPLEXITIES),
    space: z.enum(VALID_COMPLEXITIES),
  }),
  rationale: z.string().min(20).max(400),
  planSteps: z.array(z.string().min(5).max(200)).min(3).max(6),
  socraticSeeds: z.array(z.string().min(20).max(300)).min(2).max(3),
})

export const StruggleContentSchema = z.object({
  options: z
    .array(StrategyOptionSchema)
    .min(4)
    .max(5)
    .refine(opts => opts.filter(o => o.viability === 'optimal').length === 1, {
      message: 'Exactly one option must be optimal',
    })
    .refine(opts => opts.filter(o => o.viability === 'trap').length === 1, {
      message: 'Exactly one option must be trap',
    })
    .refine(
      opts => new Set(opts.map(o => o.strategyId)).size === opts.length,
      { message: 'Each strategy may appear at most once' }
    ),
  targetInsight: z.string().min(20).max(300),
  insightRubric: z.array(z.string().min(10).max(200)).min(2).max(3),
})

/** Validate a raw parsed object. Returns { data } on success, { error } on failure. */
export function validateStruggleContent(raw) {
  const result = StruggleContentSchema.safeParse(raw)
  if (result.success) return { data: result.data }
  return { error: result.error.format() }
}
