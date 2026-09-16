# Dissect Phase Authoring Spec

This document defines how to author the Dissect (clue decoder) content for a Routined problem. When tasked with writing Dissect content, read this file and the target problem file — **nothing else**. Write the content directly into the problem file. Do not echo the generated content back in chat; reply with a one-line summary only.

---

## What Dissect is

Dissect trains users to read a problem the way an expert does: constraints, vocabulary, and output types are *signals* that narrow the solution space. Each clue isolates one signal and asks the user what it implies. The goal is pattern recognition, not solution recall — a clue should never require knowing the final algorithm to answer correctly.

---

## Interface

```ts
interface DissectClue {
  id: string;                    // kebab-case, describes the signal: 'constraint-complexity', 'output-structure'
  question: string;              // quotes or paraphrases the signal, then asks what it implies
  options: ClueOption[];         // exactly 4; exactly one isCorrect: true
  correctFeedback: string;       // shown on correct answer
  wrongFeedback: string[];       // per-attempt escalation, 1–3 entries (see Escalation)
  highlight?: ClueHighlight;     // OPTIONAL — powers the "Show in problem" reveal button
}

interface ClueOption {
  label: string;                 // short — under ~8 words
  isCorrect: boolean;
  feedback?: string;             // OPTIONAL misconception-specific feedback, shown on first miss of this option
}

interface ClueHighlight {
  location: 'description' | 'constraint';
  text?: string;                 // exact substring to wrap/highlight. Omit to highlight
                                  // the whole description block instead of a sub-phrase.
                                  // For 'constraint', text must exactly match one entry in constraints[].
}
```

**Feedback display logic** (for reference — implemented in the component, not authored):

1. Wrong answer, and the chosen option has `feedback` → show it.
2. Wrong answer, no option feedback (or repeat miss) → show `wrongFeedback[min(missCount - 1, wrongFeedback.length - 1)]`.
3. Correct answer → show `correctFeedback`.

---

## Authoring rules

### Clue selection

- **3–5 clues per problem.** Every clue must be a signal an expert would actually notice. Do not pad.
- Order clues in the sequence an expert reads the problem: constraints/input size first, then output type, then key vocabulary, then guarantees or special conditions.

### Question stems

- Open with one short sentence naming **why this category of signal matters** — what kind of reasoning it unlocks (efficiency, how much work is needed, which structure fits, what edge cases are ruled out). This orients the learner on *why they're being asked*, without giving away the answer to this specific clue.
- Then quote or closely paraphrase the signal as a direct question: `'We can understand how efficient we need to be based on the size constraint of the input. What does n ≤ 10,000 tell you?'`, `'The type of output you're asked for tells you how much of the problem you actually need to solve. The output is two indices, not values — what does that tell you?'`
- The question must be answerable from the signal alone. Never require the final solution.

### highlight (optional, but author it whenever the signal is quotable)

- Set `location: 'constraint'` with `text` set to the exact string from `constraints[]` when the clue is about a size/value bound.
- Set `location: 'description'` with `text` set to the exact substring (tag-free) from the problem's `description` when the clue is about output type, a guarantee, or specific wording. Omit `text` only when no single phrase captures it — then the whole description block highlights.
- `text` must match **exactly** (including punctuation/case) — the frontend does a literal substring search and silently no-ops if it doesn't find a match. Copy it directly from the `constraints`/`description` string, don't paraphrase.
- This powers the "Show in problem" button shown after a clue is solved; clues without `highlight` simply don't get that button — not a hard requirement, but skipping it degrades the experience.

### Options and distractors

- Exactly 4 options, exactly 1 correct. Labels short enough to scan (< ~8 words).
- **De-spoil the correct option**: describe the *behavior* the technique gives you, never name the data structure or algorithm outright. Write `'Record each value as you see it, so a repeat is caught instantly'`, not `'A hash set tracking seen values'`. The same applies to distractors where naming the technique would give away the answer to a *later* clue in the same problem — describe what the option does, not what it's called. This keeps the clue testing reasoning about the signal rather than vocabulary recall.
- **Every distractor must represent a real misconception**, never filler. Draw from these misconception types:
  - **Wrong tool, right neighborhood** — a plausible but insufficient structure (a set when indices are needed)
  - **Destroys what you need** — an operation that discards required information (sorting when original indices must be returned)
  - **Over- or under-shooting the constraint** — misjudging what a bound rules out (O(log n) when you can't even read input in log n; "O(n²) is fine" at n = 10⁴)
  - **Ignoring the signal** — treating the clue as irrelevant ("input size doesn't matter")
  - **Doing unnecessary work** — missing what a guarantee lets you skip (collecting all pairs when exactly one exists)
- Randomize which position holds the correct answer across clues (don't always make it option 2).

### correctFeedback

- Confirm **why** it's right with a concrete detail — a number, a mechanism, a consequence. Not just "Correct!"
- 1–2 sentences. Example: `'10,000² ≈ 100 million operations — too slow in Python. You need a linear-time approach.'`

### wrongFeedback (escalation)

- 1–3 entries. Two is the sweet spot. Entry *i* is shown on miss *i + 1* onward (last entry repeats).
- **Entry 1**: a Socratic question that redirects attention to the signal. `'The output asks for indices. What structure lets you look up "I've seen this value — at what index?"'`
- **Entry 2** (if present): narrower — name the category of the answer without stating it. `'You need value → position. One structure does that lookup in O(1).'`
- **Never reveal the correct option.** With 4 options and wrong picks disabled, the user converges anyway; the hints exist to make the convergence a reasoning act.

### Option-level feedback (optional)

- If written, it must name the **specific misconception** the distractor represents and why it fails — not restate the escalation hint. Example: `'Sorting scrambles the original indices, which is exactly what you need to return.'`
- Skip it when the escalation hints cover the ground adequately. It is enrichment, not a requirement.

### Voice

- Second person, direct, concrete. Use real numbers from the problem's constraints.
- Banned: "Not quite!", "Good try!", "Think about it…" with no follow-through, exclamation-point cheerleading, and any feedback that would apply equally to every wrong answer.
- Each feedback string is 1–3 sentences. If it needs more, the clue is doing too much — split it.

---

## Gold-standard example (Two Sum)

Distractor variety, concrete numbers in feedback, Socratic escalation, and guarantee-reading are all modeled here. Match this register.

```ts
clues: [
  {
    id: 'constraint-complexity',
    question: 'We can understand how efficient we need to be based on the size constraint of the input. What does n ≤ 10,000 tell you?',
    options: [
      { label: 'O(n²) is fine',           isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations. Python handles roughly 10 million simple ops per second — that\'s 10 seconds for a single test case. Think about what the constraint is ruling out.' },
      { label: 'O(n) or better needed',    isCorrect: true  },
      { label: 'O(log n) is required',     isCorrect: false, feedback: 'O(log n) would be impressive, but you can\'t even read all the input in log n time. The constraint rules out slow solutions — not all solutions above linear.' },
      { label: 'Input size is irrelevant', isCorrect: false, feedback: 'Input size is always relevant. n ≤ 10,000 is a hint about what complexity is acceptable. Ask yourself: what happens to a nested loop when n hits its max?' },
    ],
    correctFeedback: '10,000² ≈ 100 million operations — too slow in Python. You need a linear-time approach.',
    wrongFeedback: [
      'Think about worst case: with n = 10,000, how many pairs would you check with two nested loops?',
      'A nested loop checks every pair — that\'s n² of them. What does the bound say about whether that finishes in time?',
    ],
    highlight: { location: 'constraint', text: 'n ≤ 10,000' },
  },
  {
    id: 'output-structure',
    question: 'The type of output you\'re asked for tells you how much of the problem you actually need to solve. The output is two indices, not values — what does that tell you?',
    options: [
      { label: 'Store values in a set',            isCorrect: false, feedback: 'A set tells you whether a value exists — but not where. The output requires indices. You need a structure that maps a value back to its position.' },
      { label: 'Map each value to its index',      isCorrect: true  },
      { label: 'Sort the array first',             isCorrect: false, feedback: 'Sorting scrambles the original indices, which is exactly what you need to return. You\'d lose the positions before you could find them.' },
      { label: 'Count occurrences of each number', isCorrect: false, feedback: 'Knowing how many times a value appears doesn\'t tell you where it is. The output needs index positions — think about what data structure gives you O(1) value-to-position lookup.' },
    ],
    correctFeedback: 'Exactly — you need to return where you found each number, not just that it exists. A hash map gives you O(1) value → index lookup.',
    wrongFeedback: [
      'The output asks for indices. What structure lets you look up "I\'ve seen this value — at what index?"',
      'You need value → position lookup, and you need it fast. One structure does that in O(1).',
    ],
    highlight: { location: 'description', text: 'indices of the two numbers' },
  },
  {
    id: 'one-solution-guarantee',
    question: 'Guarantees in a problem statement tell you what edge cases you can skip handling. Exactly one valid answer exists here — what does that tell you?',
    options: [
      { label: 'You must handle the no-solution case',     isCorrect: false, feedback: 'The problem explicitly guarantees a solution always exists. Handling the no-solution case would be dead code — the constraint is telling you what you can skip.' },
      { label: 'You can return as soon as you find a pair', isCorrect: true  },
      { label: 'You need to collect all valid pairs',      isCorrect: false, feedback: 'If exactly one answer exists, there\'s nothing to collect beyond the first hit. Gathering multiple pairs would just be extra work — the guarantee means you can stop early.' },
      { label: 'Sorting makes it easier to find',          isCorrect: false, feedback: 'Sorting isn\'t implied by uniqueness — it\'s a separate choice about structure. The "exactly one" guarantee is about how early you can stop, not about the order of elements.' },
    ],
    correctFeedback: 'Right — no ambiguity, no edge cases for missing solutions. The first valid pair you find is the answer.',
    wrongFeedback: [
      'The problem guarantees a solution always exists. What does that let you skip?',
      'Guarantees in problem statements are permissions. This one permits an early exit — from what?',
    ],
  },
],
```

---

## Authoring checklist (verify before finishing)

- [ ] 3–5 clues, ordered as an expert would read the problem
- [ ] Question stem opens with a one-sentence "why this signal matters" framing before the direct question
- [ ] Exactly 4 options per clue, exactly one correct, correct position varies across clues
- [ ] Correct option (and any distractor that would spoil a later clue) describes behavior, not the technique's name
- [ ] Every distractor maps to a named misconception type from this spec
- [ ] `wrongFeedback` has 1–3 entries; entry 1 is a Socratic redirect, later entries narrow without revealing
- [ ] No feedback string could apply to a different wrong answer unchanged
- [ ] Concrete numbers from the problem's actual constraints appear in complexity-related feedback
- [ ] `highlight` set on each clue where the signal is a quotable phrase, `text` copied exactly from `constraints`/`description`
- [ ] No banned phrases; every string is 1–3 sentences

---

## Task prompt template (for the human dispatching work)

```
Read docs/dissect-authoring.md and problems/<cluster>/<problem>.ts.
Write the Dissect clues per the spec, directly into that file.
Do not read any other files. Do not print the content in chat —
edit the file and reply with a one-line summary plus anything
from the checklist you could not satisfy.
```