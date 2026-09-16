# Solution Tab Authoring Spec

This document defines how to author the `solution` field for a Routined problem. When tasked with writing solution content, read this file and the target problem file — **nothing else**. Write the content directly into the problem file. Do not echo the generated content back in chat; reply with a one-line summary only.

---

## What the Solution tab is

The Solution tab (`activeLeftTab === 'solution'` in `ProblemSpace.vue`) is a **reveal**, not a puzzle. Unlike Dissect (which de-spoils option labels so the learner has to reason their way to the technique) and Struggle (which withholds `targetInsight` until the learner states it), the Solution tab names everything directly — approach names, code, the works. It's where a learner lands after Attack, to see the full arc from naive to optimal laid out plainly, plus where the pattern reappears elsewhere.

If `problem.solution` is absent, the tab renders a plain "Solution content isn't written for this problem yet." — there is no partial-content fallback, so a problem either has the whole block or none of it.

**Relationship to the other two content systems:**
- Struggle's `options[]` almost always includes a `trap` (a plausible-but-wrong strategy). Solution's `approaches[]` never does — it's the honest teaching arc (brute force → optimal), not a strategy menu with a booby trap in it.
- Struggle names strategies by canonical `strategyId` (`hash_set`, `nested_loops`, …); Solution's `approachName` is free text but should describe the same techniques in the same order, just in human words.
- `bruteHint`/`optimizeComplexity` (see `docs/problem-schema.md`) are a one-line teaser shown under Dissect. Solution is the full unpacking of the same arc those two fields tease.

---

## Interface

```ts
interface Problem {
  solution?: SolutionContent
}

interface SolutionContent {
  patternName: string          // one line: pattern name + when to reach for it
  approaches: Approach[]       // 2–4 entries, brute force → optimal, no traps
  comparisonTable: ComparisonRow[]  // exactly one row per approach, same order
  transferNote: string         // 2–4 sentences naming other problems that share this pattern
  retrievalCheck: string[]     // 2–3 questions testing transfer, not recall
}

interface Approach {
  approachName: string         // 1–3 words, names the technique directly
  oneLineIdea: string          // <10 words, the core mechanic
  subgoals: Subgoal[]          // exactly 3 — the approach broken into named moves
  code: string                 // runnable Python, bare function (see below)
  timeComplexity: string       // 'O(...) — <justification tied to this problem's variables>'
  spaceComplexity: string      // same format
  whenYouWouldActuallyUseThis: string  // one honest sentence — interview value or real tradeoff
}

interface Subgoal {
  label: string                // 2–4 word move name, echoed as a code comment
  explanation: string          // one clause elaborating the move
}

interface ComparisonRow {
  approach: string             // must exactly match an approachName
  time: string
  space: string
  structuralUnlock: string     // what changed to unlock this tier's speed, relative to the prior tier
}
```

---

## Authoring rules

### patternName

One sentence: `<Pattern name> — use when <condition>`. The condition should describe a recognizable problem *shape* (existence checks, range aggregation, two-ended search), not restate this specific problem's title.

> `'Existence-checking via hashing — use when you need to know whether you've seen a value before, not where or how many times'`

### approaches

- **2–4 entries**, ordered brute force → optimal. The last entry is always the optimal one — this ordering wins even if it means resequencing relative to `struggle.options` (see below).
- Draw from the **non-trap, non-inapplicable** entries of `struggle.options` (if the problem has a struggle block) — same techniques, human-readable names instead of `strategyId`s. Don't feel bound to struggle's listed order: resequence by sophistication (weakest → optimal) even if struggle lists the optimal one first. Solution and Struggle must never disagree on *which* approach is optimal, only possibly on presentation order.
- Every approach must be a **real, correct** way to solve the problem — Solution has no room for "here's a trap to avoid," or a technique that's outright broken (like a naive delimiter-join that fails the moment the delimiter appears in the data). That's Struggle's job to warn about, or simply not something Solution presents at all.

### approachName / oneLineIdea

- `approachName`: 1–3 words, names the technique plainly (`Brute force`, `Sort first`, `Hash set`, `Two pointers`). No de-spoiling here — this is a reveal tab.
- `oneLineIdea`: under 10 words, describes the mechanic, not the result. Good: `'Sort, then duplicates become adjacent'`. Bad: `'An efficient way to find duplicates'` (vague, no mechanic).

### subgoals

- **Exactly 3 per approach.** Each is `{ label, explanation }` where `label` is a short (2–4 word) name for a conceptual "move" within the approach, and `explanation` is one clause unpacking it.
- The three subgoals should tell a small story in order: *set up the invariant → do the core work → close it out*. For contains-duplicate's hash set approach: `Establish the invariant` → `Check-then-commit each element` → `Exploit O(1) membership`.
- **Each `label`, lowercased, should appear as an inline `#` comment in `code`** at the line implementing that move. This is what visually ties the narrative to the executable code in the UI — don't skip it.

### code

- For a **regular problem**: runnable Python as a **bare top-level function** using the method name from `starterCode`'s `class Solution:` — `def contains_duplicate(nums):`, not the `class Solution:` wrapper, and not necessarily the harness's `functionName` if that field names a wrapper used only for output normalization (e.g. `group_anagrams_run`) rather than the actual algorithm. The Solution tab is reference code meant to read cleanly on its own, independent of both the runner's class-binding convention and any harness-only wrapper (see `docs/problem-schema.md`).
- For a **design problem** (the ones that keep their own class name in `starterCode` — `MinStack`, `Codec`, `Trie`, …): present the real class with all its methods, exactly as named in `starterCode`. A bare function doesn't make sense when the problem is inherently stateful across multiple calls.
- Keep it short enough to read at a glance — this is not the place for defensive input validation or edge-case handling beyond what the algorithm itself requires. That said, don't let brevity introduce an actual correctness bug (e.g. an encoding scheme that silently conflates two different inputs) — verify anything non-obvious actually round-trips or handles the stated edge cases before treating it as "reference code."
- Inline comments are sparse and map 1:1 to `subgoals` labels (see above) — don't add narration beyond that.

### timeComplexity / spaceComplexity

- Format: `'O(...) — <clause tying the bound to this problem's actual variables>'`.
- The justification clause must reference concrete quantities from *this* problem (array length, string length, value range), not restate the Big-O in words.
- Use the same complexity notation conventions as `docs/struggle-authoring.md` / `docs/problem-schema.md`.

> `'O(n) — one O(1) average-case check and insert per element'`
> `'O(1) extra if sorting in place, O(n) if the language\'s sort isn\'t in-place'`

### whenYouWouldActuallyUseThis

- One sentence of honest, practical framing — not a restatement of the complexity. For a dominated approach: why you'd still say it out loud in an interview, or a real constraint under which it's the right call (memory pressure, needing the array sorted anyway, needing to mutate in place). For the optimal approach: why it's the default choice in practice.
- Never write "this is worse, avoid it" with no reason — there is always a reason it's worth knowing, name it.

### comparisonTable

- **Exactly one row per approach, same order, `approach` field matching `approachName` verbatim** — the UI keys rows by this string.
- `structuralUnlock` is the most important field here: it names what *changed* to unlock this tier's speed relative to the previous tier, not just its own complexity restated. For the first (brute-force) row this is typically `'None — ...'` since there's no prior tier to compare against.

> `{ approach: 'Sort first', time: 'O(n log n)', space: 'O(1)–O(n)', structuralUnlock: 'Reordering collapses "anywhere" into "adjacent", shrinking the check from all pairs to neighbors' }`

### transferNote

- 2–4 sentences. Name **2–3 other Routined problems** where the *same underlying pattern* (not this exact solution) reappears, each with a short parenthetical naming the specific question that pattern answers in that problem.
- Close with a one-sentence general heuristic: when should a learner reach for this pattern again, independent of any specific problem?

> `'The check-then-commit shape reappears anywhere you need existence or frequency tracking: Two Sum (have I seen the complement?), Longest Substring Without Repeating Characters (have I seen this char in the current window?), and Subarray Sum Equals K (have I seen this prefix sum before?). Whenever a problem asks "has this happened before" rather than "where" or "how many", hashing is the first pattern to reach for.'`

### retrievalCheck

- **2–3 questions.** Each poses a hypothetical variation on the problem's constraints (streaming input, a changed output requirement, a tighter/looser bound) and asks the learner which approach still works, or what they'd need to swap.
- These test **transfer**, not recall — a learner who only memorized the optimal approach's steps should still have to think to answer one. Every question must be answerable using only the approaches already covered above; don't introduce a technique that was never discussed.
- Not restatements of `whenYouWouldActuallyUseThis` — those explain tradeoffs, these probe whether the learner can apply the reasoning to a new twist.

---

## Gold-standard example (Contains Duplicate)

```ts
solution: {
  patternName: 'Existence-checking via hashing — use when you need to know whether you\'ve seen a value before, not where or how many times',
  approaches: [
    {
      approachName: 'Brute force',
      oneLineIdea: 'Compare every pair of elements',
      subgoals: [
        { label: 'Define the check', explanation: 'A duplicate exists if any two distinct indices hold equal values' },
        { label: 'Exhaust the pairs', explanation: 'Nested loop over all index pairs i < j' },
        { label: 'Short-circuit on first hit', explanation: 'Return true immediately, don\'t wait to finish scanning' },
      ],
      code: `def contains_duplicate(nums):
    n = len(nums)
    for i in range(n):              # exhaust the pairs
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True          # short-circuit
    return False`,
      timeComplexity: 'O(n²) — n counts array length, and each element is compared against every later element',
      spaceComplexity: 'O(1) — no auxiliary structure, only loop indices',
      whenYouWouldActuallyUseThis: 'Never in production for large n, but it\'s the right first thing to say out loud in an interview — it proves you understand the problem before you reach for a data structure',
    },
    {
      approachName: 'Sort first',
      oneLineIdea: 'Sort, then duplicates become adjacent',
      subgoals: [
        { label: 'Change the representation', explanation: 'Sorting turns "anywhere in the array" into "adjacent in the array" — the search space collapses from all pairs to neighbors' },
        { label: 'Scan for the collapsed case', explanation: 'A single pass checking nums[i] == nums[i-1] now catches every duplicate' },
        { label: 'Account for the sort cost', explanation: 'The complexity win is now bounded by the sort, not the scan' },
      ],
      code: `def contains_duplicate(nums):
    nums.sort()                      # change the representation
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:    # scan the collapsed case
            return True
    return False`,
      timeComplexity: 'O(n log n) — dominated by the sort; the scan afterward is O(n)',
      spaceComplexity: 'O(1) extra if sorting in place, O(n) if the language\'s sort isn\'t in-place',
      whenYouWouldActuallyUseThis: 'When you\'re memory-constrained and can mutate the input array, or when you already need it sorted for a later step',
    },
    {
      approachName: 'Hash set',
      oneLineIdea: 'Track seen values, check membership before inserting',
      subgoals: [
        { label: 'Establish the invariant', explanation: 'The set always holds exactly the distinct values seen so far' },
        { label: 'Check-then-commit each element', explanation: 'Before adding a value, check if it\'s already present — that check IS the duplicate detection' },
        { label: 'Exploit O(1) membership', explanation: 'This only works because hash set lookup doesn\'t depend on how many elements are already in it' },
      ],
      code: `def contains_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:                 # check-then-commit
            return True
        seen.add(x)                   # establish the invariant
    return False`,
      timeComplexity: 'O(n) — one O(1) average-case check and insert per element',
      spaceComplexity: 'O(n) — worst case (no duplicates) stores every element',
      whenYouWouldActuallyUseThis: 'The default choice whenever n is large and you\'re not memory-constrained — this is the one to reach for first in practice',
    },
  ],
  comparisonTable: [
    { approach: 'Brute force', time: 'O(n²)', space: 'O(1)', structuralUnlock: 'None — still checking every pair, just haven\'t changed the representation' },
    { approach: 'Sort first', time: 'O(n log n)', space: 'O(1)–O(n)', structuralUnlock: 'Reordering collapses "anywhere" into "adjacent", shrinking the check from all pairs to neighbors' },
    { approach: 'Hash set', time: 'O(n)', space: 'O(n)', structuralUnlock: 'Trades space for O(1) membership — you never re-derive "have I seen this", you just ask a structure that remembers' },
  ],
  transferNote: 'The check-then-commit shape reappears anywhere you need existence or frequency tracking: Two Sum (have I seen the complement?), Longest Substring Without Repeating Characters (have I seen this char in the current window?), and Subarray Sum Equals K (have I seen this prefix sum before?). Whenever a problem asks "has this happened before" rather than "where" or "how many", hashing is the first pattern to reach for.',
  retrievalCheck: [
    'If the problem instead asked for the index of the first duplicate pair, which approach\'s data structure would you swap out, and for what?',
    'If nums were a stream you couldn\'t re-scan (values arrive one at a time, no going back), which of these three approaches still works at all?',
    'If you needed to find values that appear more than twice, what would you swap the set for, and what new field would you check on each lookup?',
  ],
},
```

---

## Authoring checklist (verify before finishing)

- [ ] `patternName` names a general pattern and when to reach for it, not just this problem's title
- [ ] 2–4 `approaches`, ordered brute force → optimal, last one is optimal
- [ ] No trap approaches — every entry is a genuinely correct way to solve the problem
- [ ] Approaches mirror the non-trap `struggle.options` order/techniques, if a struggle block exists
- [ ] Each approach has exactly 3 `subgoals`, telling a set-up → core-work → close-out story
- [ ] Every subgoal `label`, lowercased, appears as an inline comment in that approach's `code`
- [ ] `code` is a bare top-level function (matches `functionName`), not `class Solution:`-wrapped
- [ ] `timeComplexity`/`spaceComplexity` justification clauses reference this problem's actual variables
- [ ] `whenYouWouldActuallyUseThis` gives a real reason, never a bare "avoid this"
- [ ] `comparisonTable` has exactly one row per approach, same order, `approach` matches `approachName` verbatim
- [ ] Each `structuralUnlock` names what changed relative to the prior tier, not just its own complexity
- [ ] `transferNote` names 2–3 other problems sharing the pattern, each with why, plus a closing heuristic
- [ ] 2–3 `retrievalCheck` questions test transfer to a hypothetical twist, not recall of what was just read
- [ ] All apostrophes inside single-quoted strings are escaped (`\'`)

---

## Task prompt template

```
Read docs/solution-authoring.md and frontend/src/data/problems/<cluster>/<problem>.ts.
Write the solution block per the spec, directly into that file.
Do not read any other files. Do not print the content in chat —
edit the file and reply with a one-line summary plus any checklist
items you could not satisfy.
```
