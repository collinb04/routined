export default {
  id: 'asteroid-collision',
  title: 'Asteroid Collision',
  difficulty: 'medium',
  description: 'Asteroids move in a row: positive = right, negative = left. When two collide, the smaller explodes; equal-sized ones both explode. Return the final state after all collisions.',
  examples: [
    { input: 'asteroids = [5,10,-5]', output: '[5,10]', explanation: '-5 and 10 collide; 10 survives.' },
    { input: 'asteroids = [8,-8]', output: '[]', explanation: 'Both same size; both explode.' },
    { input: 'asteroids = [10,2,-5]', output: '[10]', explanation: '-5 and 2 collide; -5 wins. -5 and 10 collide; 10 wins.' },
  ],
  constraints: ['2 ≤ asteroids.length ≤ 10⁴', '-1000 ≤ asteroids[i] ≤ 1000', 'asteroids[i] ≠ 0'],
  starterCode: `class Solution:
    def asteroid_collision(self, asteroids):
        pass`,
  runnerSetup: 'asteroid_collision = Solution().asteroid_collision',
  functionName: 'asteroid_collision',
  conceptId: 'stack',
  testCases: [
    { label: 'One survives', args: [[5,10,-5]], expected: [5,10] },
    { label: 'Both explode', args: [[8,-8]], expected: [] },
    { label: '10 survives', args: [[10,2,-5]], expected: [10] },
    { label: 'No collision', args: [[1,2,3]], expected: [1,2,3] },
  ],
  bruteHint: 'The brute-force approach simulates collisions literally: scan the array for the first place a positive asteroid sits immediately before a negative one, resolve that single collision, then restart the scan from the beginning, since removing asteroids can create a brand-new adjacent pair anywhere earlier in the array. Each full rescan costs O(n), and a chain reaction can force you to rescan up to O(n) times, giving roughly O(n²) time overall. At asteroids.length up to 10⁴, what happens to all that repeated rescanning once one collision triggers a cascade of new ones?',
  optimizeComplexity: { time: 'O(n)', space: 'O(n)' },
  clues: [
    {
      id: 'collision-condition',
      question: 'Understanding exactly when a collision can happen tells you what access pattern your traversal needs. A collision only happens when a positive asteroid is immediately followed by a negative one. What does this tell you about processing order?',
      options: [
        { label: 'Process all negatives first', isCorrect: false, feedback: 'Processing negatives first ignores the spatial relationship — a left-moving asteroid can only hit what is directly to its left, not everything in the array.' },
        { label: 'Each new asteroid may conflict with the last surviving one', isCorrect: true },
        { label: 'Sort by absolute value before processing', isCorrect: false, feedback: 'Sorting destroys position order, and collision depends entirely on which asteroid is to the left of which.' },
        { label: 'Scan inward from both ends of the array', isCorrect: false, feedback: 'Collisions only happen rightward — a left-moving asteroid hits the nearest surviving asteroid to its left, not whatever is at the far right end.' },
      ],
      correctFeedback: 'Exactly — each incoming asteroid may destroy the most recently surviving one. You need a structure that gives you instant access to the last survivor, which is why a stack fits.',
      wrongFeedback: [
        'Think about what "to the left" means here. Which asteroid does a left-moving asteroid encounter first?',
        'The most recently seen asteroid is the immediate neighbor. What structure gives you O(1) access to the last element you added?',
      ],
      highlight: { location: 'description', text: 'positive = right, negative = left' },
    },
    {
      id: 'output-structure',
      question: 'The shape of the output tells you what you must preserve while processing, not just what you must compute. The output is the surviving asteroids in their original order. This means you need to…',
      options: [
        { label: 'Store survivors in an unordered collection', isCorrect: false, feedback: 'An unordered collection loses order and cannot store duplicates — two asteroids of the same size can coexist if they move the same direction.' },
        { label: 'Return a count, not the asteroids themselves', isCorrect: false, feedback: 'The problem asks for the actual surviving asteroids in order, not just how many survived.' },
        { label: 'Preserve insertion order of survivors', isCorrect: true },
        { label: 'Sort the result before returning', isCorrect: false, feedback: 'The problem asks for survivors in their original relative order. Sorting would rearrange them.' },
      ],
      correctFeedback: 'Right — you need to maintain the relative order of asteroids that were never destroyed. A stack built left-to-right naturally preserves that order.',
      wrongFeedback: [
        'The output examples show asteroids in their original relative positions. What does your data structure need to preserve?',
        'You need order-preserving storage where removal happens from the top. One structure does both.',
      ],
      highlight: { location: 'description', text: 'Return the final state after all collisions.' },
    },
    {
      id: 'equal-size-rule',
      question: 'Precise wording in a problem statement often hides a branch your logic can\'t skip. "Equal-sized asteroids both explode." What does this add to your collision logic?',
      options: [
        { label: 'A third branch: mutual destruction', isCorrect: true },
        { label: 'Nothing — handle it the same as smaller wins', isCorrect: false, feedback: 'If the stack top equals the incoming asteroid in absolute value, both must be removed. Treating it like a normal win would leave one survivor incorrectly.' },
        { label: 'Only possible when array has even length', isCorrect: false, feedback: 'Equal-size collisions can happen anywhere in the array regardless of total length.' },
        { label: 'Means you should use absolute values throughout', isCorrect: false, feedback: 'Sign determines direction, which is essential for deciding whether a collision even occurs. Dropping signs too early loses that information.' },
      ],
      correctFeedback: 'You need three outcomes: incoming wins (pop stack top), stack top wins (discard incoming), or tie (pop stack top and discard incoming). Missing the tie branch produces wrong output for cases like [8,-8].',
      wrongFeedback: [
        'Walk through [8,-8]: after the collision, what should remain? Does your current logic produce that?',
        'There are three possible outcomes when two asteroids meet. What happens when they are exactly equal in size?',
      ],
      highlight: { location: 'description', text: 'equal-sized ones both explode' },
    },
    {
      id: 'constraint-complexity',
      question: 'Size and value bounds tell you how much work you can afford to do per element. asteroids.length ≤ 10⁴ and each asteroid has absolute value ≤ 1000. What complexity is acceptable?',
      options: [
        { label: 'O(n²) is fine at n = 10⁴', isCorrect: false, feedback: 'At n = 10,000, O(n²) is 100 million operations — feasible but tight. More importantly, a linear stack pass naturally fits this problem without needing quadratic work.' },
        { label: 'O(n log n) required', isCorrect: false, feedback: 'O(n log n) would imply sorting, which destroys position order. The bound allows linear time and the problem structure supports it.' },
        { label: 'O(n) is sufficient and natural', isCorrect: true },
        { label: 'Input size is irrelevant here', isCorrect: false, feedback: 'Input size always informs algorithm choice. At n = 10⁴, even O(n²) squeaks by, but the single-pass stack solution is clearly O(n).' },
      ],
      correctFeedback: 'Each asteroid is pushed and popped at most once, giving O(n) time. A single left-to-right pass with a stack handles all collision chains without revisiting elements.',
      wrongFeedback: [
        'Think about how many times each asteroid can be pushed onto and popped from the stack over the entire pass.',
        'Each asteroid enters and leaves the stack at most once. What does that say about total operations across the whole array?',
      ],
      highlight: { location: 'constraint', text: '2 ≤ asteroids.length ≤ 10⁴' },
    },
  ],
  solutionCode: `class Solution:
    def asteroid_collision(self, asteroids):
        stack = []
        for a in asteroids:
            alive = True
            while alive and a < 0 and stack and stack[-1] > 0:
                if stack[-1] < -a:
                    stack.pop()
                    continue
                elif stack[-1] == -a:
                    stack.pop()
                alive = False
            if alive:
                stack.append(a)
        return stack`,
  solutionComplexity: { time: 'O(n)', space: 'O(n)' },
  solutionCaveat: 'The inner <code>while</code> can pop several asteroids off the stack for a single incoming one — a left-mover can destroy an entire chain of smaller right-movers — but each asteroid is still only ever pushed once and popped at most once, so the total work across the whole pass stays O(n).',
  solutionExplanation: 'A stack naturally holds "asteroids that have survived so far, left to right" — the only one a new asteroid can possibly collide with is whatever is on top. An incoming right-mover (positive) can never collide with anything already on the stack, so it just gets pushed; an incoming left-mover only collides while the top of the stack is a smaller right-mover, and the three-way comparison against <code>-a</code> (pop and keep checking, pop and stop, or stop without popping) covers every outcome the problem describes, including the tie case where both explode.',
}
