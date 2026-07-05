/**
 * Unit tests for struggle-schema.mjs
 * Run with: node scripts/test-struggle-schema.mjs
 */
import { validateStruggleContent, VALID_STRATEGY_IDS, VALID_COMPLEXITIES } from './struggle-schema.mjs'

let passed = 0
let failed = 0

function assert(label, condition) {
  if (condition) {
    console.log(`  ✓ ${label}`)
    passed++
  } else {
    console.error(`  ✗ ${label}`)
    failed++
  }
}

// ── Valid fixture ─────────────────────────────────────────────────────────────

const VALID = {
  options: [
    {
      strategyId: 'hash_map',
      viability: 'optimal',
      complexity: { time: 'O(n)', space: 'O(n)' },
      rationale: 'A hash map lets us look up the complement target - nums[i] in O(1).',
      planSteps: ['Initialize an empty hash map', 'Iterate through nums', 'Check if complement exists', 'Return indices'],
      socraticSeeds: ['What does each lookup cost without extra space?', 'Can you avoid the inner loop entirely?'],
    },
    {
      strategyId: 'nested_loops',
      viability: 'viable_suboptimal',
      complexity: { time: 'O(n²)', space: 'O(1)' },
      rationale: 'Check every pair but the O(n²) cost fails the n ≤ 10⁴ constraint in practice.',
      planSteps: ['Outer loop fixes i', 'Inner loop checks j > i', 'Return [i, j] when sum matches'],
      socraticSeeds: ['What is the cost of checking every pair?', 'Can you do this with only one pass?'],
    },
    {
      strategyId: 'two_pointers',
      viability: 'trap',
      complexity: { time: 'O(n log n)', space: 'O(log n)' },
      rationale: 'Two pointers require a sorted array; sorting destroys original indices which must be returned per the constraint.',
      planSteps: ['Sort the array', 'Set left and right pointers', 'Advance pointers', 'Return indices'],
      socraticSeeds: ['What does sorting change about the original indices?', 'What does the problem say to return?'],
    },
    {
      strategyId: 'sort_then_scan',
      viability: 'inapplicable',
      complexity: { time: 'O(n log n)', space: 'O(log n)' },
      rationale: 'Sorting then scanning loses index information needed by the return type.',
      planSteps: ['Sort with index tracking', 'Linear scan for target', 'Map back to original indices'],
      socraticSeeds: ['Why does losing the original order matter here?', 'What would you need to track to recover indices?'],
    },
  ],
  targetInsight: 'Storing each value in a hash map lets you answer "have I seen the complement?" in O(1) without a second scan.',
  insightRubric: [
    'Mentions the hash map enables O(1) complement lookup',
    'Explains why two passes or a second scan are eliminated',
  ],
}

// ── Test: valid fixture passes ────────────────────────────────────────────────

console.log('\nValid fixture:')
const validResult = validateStruggleContent(VALID)
assert('passes validation', !validResult.error)
assert('returns data', !!validResult.data)
assert('data has 4 options', validResult.data?.options.length === 4)

// ── Test: wrong number of options ─────────────────────────────────────────────

console.log('\nOption count:')
const tooFew = { ...VALID, options: VALID.options.slice(0, 3) }
assert('3 options fails (min 4)', !!validateStruggleContent(tooFew).error)

const manyOpts = [...VALID.options, {
  strategyId: 'binary_search',
  viability: 'inapplicable',
  complexity: { time: 'O(log n)', space: 'O(1)' },
  rationale: 'Binary search requires sorted input and does not find pairs.',
  planSteps: ['Step one', 'Step two', 'Step three'],
  socraticSeeds: ['When does binary search apply?', 'What does the sorted requirement mean?'],
}]
assert('5 options passes (max 5)', !validateStruggleContent({ ...VALID, options: manyOpts }).error)

const sixOpts = [...manyOpts, {
  strategyId: 'heap',
  viability: 'inapplicable',
  complexity: { time: 'O(n log n)', space: 'O(n)' },
  rationale: 'A heap does not directly solve the two-sum complement lookup.',
  planSteps: ['Build heap', 'Extract min', 'Check sum'],
  socraticSeeds: ['What does a heap optimize?'],
}]
assert('6 options fails (max 5)', !!validateStruggleContent({ ...VALID, options: sixOpts }).error)

// ── Test: exactly one optimal ─────────────────────────────────────────────────

console.log('\nViability constraints:')
const twoOptimal = VALID.options.map((o, i) =>
  i === 1 ? { ...o, viability: 'optimal' } : o
)
assert('two optimal fails', !!validateStruggleContent({ ...VALID, options: twoOptimal }).error)

const noOptimal = VALID.options.map(o => ({ ...o, viability: 'inapplicable' }))
assert('no optimal fails', !!validateStruggleContent({ ...VALID, options: noOptimal }).error)

// ── Test: exactly one trap ────────────────────────────────────────────────────

const noTrap = VALID.options.map(o =>
  o.viability === 'trap' ? { ...o, viability: 'inapplicable' } : o
)
assert('no trap fails', !!validateStruggleContent({ ...VALID, options: noTrap }).error)

// ── Test: duplicate strategyIds ───────────────────────────────────────────────

console.log('\nDuplicate strategyId:')
const dupIds = VALID.options.map((o, i) =>
  i === 3 ? { ...o, strategyId: 'hash_map' } : o
)
assert('duplicate strategyId fails', !!validateStruggleContent({ ...VALID, options: dupIds }).error)

// ── Test: invalid strategyId ──────────────────────────────────────────────────

console.log('\nInvalid values:')
const badStrategy = VALID.options.map((o, i) =>
  i === 0 ? { ...o, strategyId: 'not_a_real_strategy' } : o
)
assert('unknown strategyId fails', !!validateStruggleContent({ ...VALID, options: badStrategy }).error)

// ── Test: invalid complexity ──────────────────────────────────────────────────

const badComplexity = VALID.options.map((o, i) =>
  i === 0 ? { ...o, complexity: { time: 'O(n^2)', space: 'O(n)' } } : o
)
assert('O(n^2) (wrong format) fails', !!validateStruggleContent({ ...VALID, options: badComplexity }).error)

// ── Test: planSteps bounds ────────────────────────────────────────────────────

console.log('\nPlan step bounds:')
const twoSteps = VALID.options.map((o, i) =>
  i === 0 ? { ...o, planSteps: ['Only one step', 'Only two steps'] } : o
)
assert('2 planSteps fails (min 3)', !!validateStruggleContent({ ...VALID, options: twoSteps }).error)

const sevenSteps = VALID.options.map((o, i) =>
  i === 0 ? { ...o, planSteps: ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(s => `Step ${s} here`) } : o
)
assert('7 planSteps fails (max 6)', !!validateStruggleContent({ ...VALID, options: sevenSteps }).error)

// ── Test: socraticSeeds bounds ────────────────────────────────────────────────

console.log('\nSocratic seed bounds:')
const oneChip = VALID.options.map((o, i) =>
  i === 0 ? { ...o, socraticSeeds: ['Only one question?'] } : o
)
assert('1 socraticSeed fails (min 2)', !!validateStruggleContent({ ...VALID, options: oneChip }).error)

const fourChips = VALID.options.map((o, i) =>
  i === 0 ? { ...o, socraticSeeds: ['Q1?', 'Q2?', 'Q3?', 'Q4?'] } : o
)
assert('4 socraticSeeds fails (max 3)', !!validateStruggleContent({ ...VALID, options: fourChips }).error)

// ── Test: targetInsight length ────────────────────────────────────────────────

console.log('\nField length:')
assert('short targetInsight fails', !!validateStruggleContent({ ...VALID, targetInsight: 'Too short' }).error)

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${passed + failed} tests — ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
