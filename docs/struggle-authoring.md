# Struggle & Optimize Phase Authoring Spec

This document defines how to author the Struggle & Optimize phase content for a Routined problem. When tasked with writing struggle content, read this file and the target problem file — **nothing else**. Write the content directly into the problem file. Do not echo the generated content back in chat; reply with a one-line summary only.

---

## What Struggle & Optimize is

This phase has three steps:

1. **Commit** — the learner picks a strategy from a short menu, predicts time and space complexity, and orders the plan steps in what they believe is correct execution order.
2. **Socratic critique** — a live Claude conversation argues with the commitment without revealing the optimal approach. The learner can click seed chips or type freely.
3. **Revise** — the learner re-commits (possibly to a different strategy) and writes a short paragraph naming the key structural insight in their own words. A rubric-gated evaluator must pass before they advance to Attack.

**Two hard rules (enforced in backend):**
- Commitment must precede chat — the backend returns 400 if a learner skips straight to chat.
- The learner states the insight — the AI never reveals it verbatim. The `targetInsight` is used only server-side to build the "do not state this" instruction.

---

## Interface

```ts
interface StruggleContent {
  options: StrategyOption[]    // 4–5 entries
  targetInsight: string        // one sentence naming the structural property that unlocks the optimal approach
  insightRubric: string[]      // 2–3 checkable criteria for the evaluate-insight endpoint
}

interface StrategyOption {
  strategyId: string           // must be one of the 20 canonical IDs in strategies.ts
  viability: Viability         // 'optimal' | 'viable_suboptimal' | 'trap' | 'inapplicable'
  complexity: {
    time: string               // one of the 12 ComplexityClass values
    space: string
  }
  rationale: string            // 1–2 sentences; must reference a concrete property of THIS problem
  planSteps: string[]          // 3–6 steps in correct execution order (frontend scrambles at render)
  socraticSeeds: string[]      // 2–3 questions — NOT statements, must NOT contain the answer
}
```

### Valid strategyId values
`nested_loops`, `hash_set`, `hash_map`, `sort_then_scan`, `two_pointers`, `sliding_window`, `binary_search`, `binary_search_per_element`, `monotonic_stack`, `heap`, `prefix_sums`, `bfs`, `dfs`, `dp_memoization`, `dp_tabulation`, `greedy`, `counting_sort`, `bit_manipulation`, `union_find`, `backtracking`

### Valid complexity strings
`O(1)`, `O(log n)`, `O(√n)`, `O(n)`, `O(n log n)`, `O(n²)`, `O(n³)`, `O(2ⁿ)`, `O(n!)`, `O(V + E)`, `O(n · m)`, `O(n · target)`

---

## Authoring rules

### options array

- **4–5 entries total.** Every entry must have a different `strategyId`.
- **Exactly one `optimal`.** This is the canonical best approach. Its `planSteps` represent the definitive execution blueprint.
- **Exactly one `trap`.** A plausible strategy that fails for a reason tied to a *specific* constraint of this problem. The `rationale` must name that constraint explicitly.
- The remaining entries are `viable_suboptimal` (correct but not optimal) or `inapplicable` (doesn't apply to this problem type at all).
- Include at least one `viable_suboptimal` so learners have something correct to discover before finding the optimal.

### rationale

- 1–2 sentences. Must reference a **concrete property of this problem**: sortedness, value bounds, uniqueness guarantee, size limits, output type.
- Must not be generic complexity talk ("this is slower because it's O(n²)").
- For the trap: name the specific constraint it violates.

### planSteps

- **3–6 steps.** Write them in correct execution order — the frontend scrambles them before showing to the learner.
- Each step is an imperative verb phrase, 5–200 characters.
- Required only for `optimal` in practice, but include them for `viable_suboptimal` too; skip or write generic steps for `trap` / `inapplicable`.

### socraticSeeds

- **2–3 seeds per option.** These are chip buttons the learner can click to start the Socratic conversation.
- Must be **questions** ending in `?`, not statements.
- Must NOT contain the answer or name the optimal strategy.
- Focus on probing the weakness or interesting property of that option's approach.
- Good seed: `"What happens to the original indices if you sort first?"`
- Bad seed: `"You should use a hash map instead."` (statement, reveals answer)

### targetInsight

- One sentence, plain language.
- Names the structural property of the problem that makes the optimal approach work — not a strategy name.
- Example: `"The complement needed to complete each sum is deterministic, so you can answer 'have I seen it?' in O(1) using the values already visited as keys."`
- This string is passed to the Claude system prompt server-side with the instruction "never state this verbatim." It is never shown in the UI.

### insightRubric

- **2–3 criteria.** Each must be checkable by Claude reading a 2–4 sentence learner paragraph.
- Write them as factual checkpoints: `"Mentions that the hash map enables O(1) complement lookup"`.
- The learner passes when all criteria are satisfied. After 2 failures the system forces a pass.
- Criteria must be independent — failing one should be possible while passing another.

---

## Complexity grading rules

When authoring, assign the exact `ComplexityClass` string that describes the **tight** bound:

| Strategy | Typical time | Notes |
|---|---|---|
| nested_loops (pairs) | O(n²) | |
| hash_map / hash_set single pass | O(n) | |
| sort_then_scan | O(n log n) | sorting dominates |
| two_pointers on sorted | O(n) | after sort: O(n log n) total |
| binary_search | O(log n) | per query |
| binary_search_per_element | O(n log n) | n queries × O(log n) |
| sliding_window | O(n) | |
| prefix_sums | O(n) | build + query |
| dp_memoization / dp_tabulation | O(n · target) | for knapsack-style |
| bfs / dfs | O(V + E) | |
| greedy | O(n log n) | with sort; O(n) if pre-sorted |

Use `O(n · m)` when there are two independent dimensions (e.g., matrix row × column).

---

## Gold-standard example (Two Sum)

```ts
struggle: {
  options: [
    {
      strategyId: 'hash_map',
      viability: 'optimal',
      complexity: { time: 'O(n)', space: 'O(n)' },
      rationale: 'A hash map stores value → index as we scan, letting us check whether target − nums[i] has already been seen in O(1) — a single pass with no inner loop.',
      planSteps: [
        'Initialize an empty hash map',
        'Iterate through nums with index i',
        'Compute complement = target − nums[i]',
        'If complement is in the map, return [map[complement], i]',
        'Otherwise store nums[i] → i in the map',
      ],
      socraticSeeds: [
        'What does it cost to find the complement without extra memory?',
        'If you\'ve already seen a value, where is that information stored?',
      ],
    },
    {
      strategyId: 'nested_loops',
      viability: 'viable_suboptimal',
      complexity: { time: 'O(n²)', space: 'O(1)' },
      rationale: 'Checking every pair guarantees correctness but costs O(n²) time — borderline slow at n = 10⁴ in Python.',
      planSteps: [
        'Outer loop: fix i from 0 to n − 2',
        'Inner loop: check j from i + 1 to n − 1',
        'Return [i, j] when nums[i] + nums[j] === target',
      ],
      socraticSeeds: [
        'What is the cost of checking every pair when n = 10,000?',
        'Is there a way to eliminate the inner loop entirely?',
      ],
    },
    {
      strategyId: 'two_pointers',
      viability: 'trap',
      complexity: { time: 'O(n log n)', space: 'O(log n)' },
      rationale: 'Two pointers require a sorted array, but sorting destroys the original indices — and the problem requires returning original indices, not values.',
      planSteps: [
        'Sort the array',
        'Set left = 0, right = n − 1',
        'Advance pointers based on sum vs target',
        'Return when sum matches',
      ],
      socraticSeeds: [
        'What does sorting change about the positions of elements?',
        'The problem asks you to return what, exactly?',
      ],
    },
    {
      strategyId: 'hash_set',
      viability: 'viable_suboptimal',
      complexity: { time: 'O(n)', space: 'O(n)' },
      rationale: 'A hash set tracks seen values in O(1), but it does not store indices — a second pass (or a two-pass variant) is needed to recover them, adding code complexity for no performance gain over hash_map.',
      planSteps: [
        'First pass: store all values in a set',
        'Second pass: for each nums[i], check if complement is in set',
        'Return indices when found',
      ],
      socraticSeeds: [
        'A set tells you if a value exists — but what does it not tell you?',
        'How would you recover the index after finding the complement?',
      ],
    },
  ],
  targetInsight: 'Each element\'s complement is fixed by the target, so you can answer "have I seen target − nums[i]?" in O(1) by keeping already-seen values in a hash map keyed by value.',
  insightRubric: [
    'Mentions that the complement (target − current value) can be computed and looked up in O(1)',
    'Identifies that storing value → index in a hash map eliminates the need for a second scan or inner loop',
  ],
},
```

---

## Authoring checklist (verify before finishing)

- [ ] 4–5 options, each with a distinct `strategyId` from the canonical list
- [ ] Exactly one `optimal`, exactly one `trap`
- [ ] Trap's `rationale` names the specific constraint it violates
- [ ] Every `rationale` references a concrete property of this problem (not generic)
- [ ] `planSteps` in correct execution order (3–6 steps)
- [ ] 2–3 `socraticSeeds` per option — questions only, no answers or strategy names
- [ ] `targetInsight` is one sentence naming a structural property (not a strategy)
- [ ] `insightRubric` has 2–3 independently checkable criteria
- [ ] All `strategyId` and `complexity` values are from the canonical lists above

---

## Task prompt template

```
Read docs/struggle-authoring.md and frontend/src/data/problems/<cluster>/<problem>.ts.
Write the struggle block per the spec, directly into that file.
Do not read any other files. Do not print the content in chat —
edit the file and reply with a one-line summary plus any checklist
items you could not satisfy.
```
