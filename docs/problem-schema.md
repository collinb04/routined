# Problem Schema Conventions

Covers two `Problem` fields that aren't part of Dissect (`docs/dissect-authoring.md`) or Struggle (`docs/struggle-authoring.md`) content: `starterCode`/`runnerSetup`, and `bruteHint`/`optimizeComplexity`. As of the contains-duplicate calibration pass, all 312 problems follow this convention — treat it as settled, not a proposal.

---

## starterCode / runnerSetup

**All problems present starter code the way real LeetCode does**: a free function becomes a method on `class Solution`; a genuine design problem (state that persists across calls — `MinStack`, `LRUCache`, `Trie`, `Codec`, `Twitter`, …) keeps its own class name, not `Solution`.

```ts
starterCode: `class Solution:
    def contains_duplicate(self, nums):
        pass`,
functionName: 'contains_duplicate',
runnerSetup: 'contains_duplicate = Solution().contains_duplicate',
```

The test runner always calls a plain top-level function named `functionName`. `runnerSetup` is Python source executed after the user's code, and its job is to make sure that name resolves — usually by binding it straight to the class method (`NAME = Solution().NAME`).

### Which class name to use

- **A free function** (the LeetCode signature has no persisted state) → `class Solution:`.
- **A design problem** (LeetCode's own signature is a class — `MinStack`, `LRUCache`, `Codec`, `Trie`, `Twitter`, `TimeMap`, `FreqStack`, `MedianFinder`, `BSTIterator`, `WordDictionary`) → keep that real class name. Do not wrap it in `Solution`.
- **A tree/list problem** that needs a `TreeNode`/`ListNode`/`Node` helper → the helper class stays a plain top-level class exactly as LeetCode defines it; only the actual solution function gets wrapped in `class Solution:` below it:

```ts
starterCode: `class TreeNode:
  def __init__(self, val=0, left=None, right=None):
      self.val = val
      self.left = left
      self.right = right

class Solution:
    def invert_tree(self, root):
        pass`,
```

### runnerSetup adapters

Many problems already use `runnerSetup` for something other than the class binding — normalizing output for comparison (`sorted([sorted(t) for t in result])`), disabling a builtin to force a manual implementation (sorting problems disable `sorted()`/`list.sort()`), or converting array input into a linked structure before calling the user's function. When one of these already exists, the class-binding requirement folds into it rather than replacing it: every bare call to the user's function name inside `runnerSetup` becomes `Solution().the_name(...)` (or, for the "redefine the same top-level name" pattern, `_orig_name = Solution().the_name`). See `frontend/src/data/problems/linear/3sum.ts` (output-normalizing adapter) or `frontend/src/data/problems/linked/reverse-linked-list.ts` (array→linked-list adapter + self-redefinition) for worked examples.

A bare `import` needed by the starter code (`import heapq`, `import math`) stays at module level, above `class Solution:` — it is never indented into the class body.

---

## bruteHint / optimizeComplexity / optimizeHint

Both are optional fields shown in a collapsible "Hints" section under Dissect, independent of the clue cards.

```ts
interface Problem {
  bruteHint?: string
  optimizeHint?: string                              // legacy — prefer optimizeComplexity on new/updated problems
  optimizeComplexity?: { time: string; space: string } // preferred
}
```

- **`bruteHint`**: a short paragraph (2–4 sentences) walking through the brute-force approach and naming its complexity — enough to orient someone who's stuck, not a step-by-step solution. Voice matches Dissect: second person, concrete, no cheerleading.
- **`optimizeComplexity`**: the target time/space complexity of the optimal solution, e.g. `{ time: 'O(n)', space: 'O(n)' }`. Use the same `ComplexityClass` strings as `docs/struggle-authoring.md`. This is what the UI renders under "Recommended Complexity" — prefer it over `optimizeHint` for any problem you touch.
- **`optimizeHint`**: legacy free-text hint naming the optimal technique without complexity numbers. Still rendered as a fallback when `optimizeComplexity` is absent, but don't add new instances of it — convert to `optimizeComplexity` when you're already editing a problem's hints.

---

## Reference implementation

`frontend/src/data/problems/linear/contains-duplicate.ts` is the calibration example for all three (starterCode/runnerSetup, bruteHint, optimizeComplexity) alongside Dissect's `highlight` field and Struggle's `struggle` block.
