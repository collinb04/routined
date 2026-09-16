export default {
  id: 'restore-ip-addresses',
  title: 'Restore IP Addresses',
  difficulty: 'medium',
  description: 'Given a string <code>s</code> of digits only, return all possible valid IP addresses. A valid IP has four 0-255 octets (no leading zeros). Return in any order.',
  examples: [
    { input: 's = "25525511135"', output: '["255.255.11.135","255.255.111.35"]' },
    { input: 's = "0000"', output: '["0.0.0.0"]' },
  ],
  constraints: ['1 ≤ s.length ≤ 20', 's consists of digits only'],
  starterCode: `class Solution:
    def restore_ip_addresses(self, s):
        pass`,
  functionName: 'restore_ip_addresses_run',
  conceptId: 'backtracking',
  runnerSetup: `def restore_ip_addresses_run(s):
  return sorted(Solution().restore_ip_addresses(s))`,
  testCases: [
    { label: 'Two valid IPs', args: ['25525511135'], expected: ['255.255.11.135','255.255.111.35'] },
    { label: 'All zeros', args: ['0000'], expected: ['0.0.0.0'] },
    { label: 'Too short', args: ['1'], expected: [] },
  ],
  bruteHint: 'The brute-force approach generates every way to place three dots among the string\'s characters, producing every possible four-part split regardless of validity. Each split is only checked afterward, discarding the ones where any segment fails to be a valid octet. With up to 20 characters, that is roughly O(n^3) dot placements to generate before you even start validating. What changes if you reject an invalid or oversized segment the moment you choose it, instead of waiting until all four are picked?',
  optimizeComplexity: { time: 'O(1)', space: 'O(1)' },
  clues: [
    {
      id: 'constraint-structure',
      highlight: { location: 'constraint', text: '1 ≤ s.length ≤ 20' },
      question: 'Constraints that cap both the input length and the number of pieces you must produce often bound the search space to something small enough to explore directly. s.length ≤ 20 and a valid IP always has exactly 4 octets. What does this tell you about the search space?',
      options: [
        { label: 'Exponentially large — try every split of s', isCorrect: false, feedback: 'The search space is actually tiny. Each octet is 1–3 digits, and there are exactly 4 octets. At most 3 choices per octet × 4 octets = 81 possible splits — all enumerable in microseconds.' },
        { label: 'At most 3^4 = 81 total splits to check', isCorrect: true },
        { label: 'O(n²) — try all pairs of split points', isCorrect: false, feedback: 'O(n²) overcounts. You do not need to try all pairs of positions — each octet takes 1, 2, or 3 digits, and there are exactly 4 octets. That is at most 3^4 = 81 combinations regardless of string length.' },
        { label: 'O(n!) — digits can be rearranged freely', isCorrect: false, feedback: 'Digits are not rearranged — they must appear in their original order. You only decide where to place the three dots. That is a fixed 4-part split, not a permutation problem.' },
      ],
      correctFeedback: 'Each of the 4 octets takes 1, 2, or 3 digits — 3 choices each. That is at most 3^4 = 81 candidate splits. Backtracking over this tiny space is trivially fast regardless of s.length up to 20.',
      wrongFeedback: [
        'Each octet can be 1, 2, or 3 digits. How many total combinations are there across all 4 octets?',
        '3 choices per octet × 4 octets = 3^4 = 81 possible splits. That is the entire search space — very small.',
      ],
    },
    {
      id: 'octet-validity-signal',
      highlight: { location: 'description', text: '0-255 octets (no leading zeros)' },
      question: 'The precise validity rules spelled out in a problem\'s description tell you exactly what to check at each branch of your search. A valid octet is 0–255 with no leading zeros. What two conditions must you check for each segment?',
      options: [
        { label: 'Value ≤ 255 only', isCorrect: false, feedback: 'Value ≤ 255 is necessary but not sufficient. "00", "01", "001" are all ≤ 255 but contain leading zeros, which are invalid. You must also reject any multi-digit segment starting with "0".' },
        { label: 'Value ≤ 255 and no leading zeros', isCorrect: true },
        { label: 'Segment is exactly 3 digits', isCorrect: false, feedback: 'Valid octets can be 1, 2, or 3 digits — "0", "25", "255" are all valid. Requiring exactly 3 digits would reject most valid IPs.' },
        { label: 'Segment contains only odd digits', isCorrect: false, feedback: 'Digit parity is irrelevant to IP address validity. The octet must be a decimal value 0–255 with no leading zeros — digit content beyond that does not matter.' },
      ],
      correctFeedback: 'Two checks: int(segment) ≤ 255, and if len(segment) > 1 then segment[0] != "0". Together these accept "0", "25", "255" and reject "256", "00", "01".',
      wrongFeedback: [
        'The test case "0000" → ["0.0.0.0"]. What makes "0" valid but "00" invalid?',
        '"0" is valid (single zero). "00" has a leading zero and is invalid. Check: len(segment) > 1 and segment[0] == "0" → reject. Also reject any segment where int(segment) > 255.',
      ],
    },
    {
      id: 'four-octet-constraint',
      highlight: { location: 'description', text: 'four 0-255 octets' },
      question: 'A fixed target count for how many pieces you must produce usually defines your base case for stopping the search. A valid IP has exactly 4 octets. How do you use this to prune your backtracking?',
      options: [
        { label: 'Stop when the string is exhausted', isCorrect: false, feedback: 'Exhausting the string is one condition, but not the only one. You also need exactly 4 octets. Stopping at exhaustion without checking the count might accept partial IPs or reject valid ones.' },
        { label: 'Accept only when 4 octets are placed and the full string is used', isCorrect: true },
        { label: 'Stop after placing 3 octets — the fourth is the remainder', isCorrect: false, feedback: 'The fourth octet as the remainder is a valid optimization, but you still need to validate it (≤ 255, no leading zeros). Treating the remainder as automatically valid misses that check.' },
        { label: 'Prune when any octet exceeds 3 digits', isCorrect: false, feedback: 'An octet longer than 3 digits would exceed 255 and be invalid — that is a valid pruning condition. But the "exactly 4 octets" constraint is the more fundamental one: accept only when count == 4 and position == len(s).' },
      ],
      correctFeedback: 'At each recursive call, if you have 4 octets and the current position equals len(s), you have a valid IP — add it to results. If you have 4 octets but haven\'t consumed all of s, the split is invalid. If you exhaust s with fewer than 4 octets, also invalid.',
      wrongFeedback: [
        'What two things must be true simultaneously for a split to be a valid IP?',
        'Exactly 4 parts placed AND all characters of s consumed. Either condition alone is insufficient — check both at the base case.',
      ],
    },
    {
      id: 'remaining-length-pruning',
      question: 'Once you know the minimum and maximum length each remaining piece can take, you can compute early whether a partial solution is still feasible before continuing. With k octets still to place and r digits remaining, what early-exit conditions can you add?',
      options: [
        { label: 'Continue regardless — validity is checked at the base case', isCorrect: false, feedback: 'Waiting for the base case misses obvious pruning. If r > 3*k, there are too many digits to fit in k octets (max 3 digits each). If r < k, there are too few (min 1 digit each). Both are dead ends you can prune immediately.' },
        { label: 'Prune when remaining digits cannot fit in remaining octets', isCorrect: true },
        { label: 'Only prune when r > 12', isCorrect: false, feedback: 'r > 12 is a special case of the general condition. The tighter bound is r > 3*k (too many digits for k octets) or r < k (too few digits for k octets). Both must be checked as you recurse.' },
        { label: 'Prune when the current octet value is 0', isCorrect: false, feedback: '"0" is a valid single-digit octet (see test case "0000" → ["0.0.0.0"]). Pruning on zero values would incorrectly reject valid IPs.' },
      ],
      correctFeedback: 'Two pruning conditions: if remaining digits > 3 × remaining octets, impossible to fit. If remaining digits < remaining octets, not enough digits for one per octet. Both let you skip entire branches early.',
      wrongFeedback: [
        'If you have 2 octets left but 8 digits remaining, can you form a valid IP? What if you have 2 octets left but 1 digit remaining?',
        'r > 3*k means too many digits (each octet holds at most 3). r < k means too few digits (each octet needs at least 1). Prune both cases immediately.',
      ],
    },
  ],
  solutionCode: `class Solution:
    def restore_ip_addresses(self, s):
        n = len(s)
        result = []
        path = []

        def valid(seg):
            if len(seg) > 1 and seg[0] == '0':
                return False
            return int(seg) <= 255

        def backtrack(start):
            if len(path) == 4:
                if start == n:
                    result.append('.'.join(path))
                return
            remaining_parts = 4 - len(path)
            remaining_chars = n - start
            if remaining_chars > remaining_parts * 3 or remaining_chars < remaining_parts:
                return
            for length in range(1, 4):
                if start + length > n:
                    break
                seg = s[start:start + length]
                if valid(seg):
                    path.append(seg)
                    backtrack(start + length)
                    path.pop()

        backtrack(0)
        return result`,
  solutionComplexity: { time: 'O(1)', space: 'O(1)' },
  solutionCaveat: 'The feasibility prune (<code>remaining_chars &gt; remaining_parts * 3</code> or <code>&lt; remaining_parts</code>) runs <code>before</code> the octet-length loop even starts trying candidates — this catches doomed branches immediately, rather than letting the search place a few more octets only to fail the final length check once <code>path</code> reaches length 4.',
  solutionExplanation: 'Since a valid octet is always 1 to 3 digits and an IP always has exactly 4 octets, the entire search space is bounded to at most 3⁴ = 81 candidate splits regardless of how long <code>s</code> is — trying each possible next-octet length and validating it immediately (both the ≤255 check and the no-leading-zero rule) prunes invalid branches the instant they\'re created rather than after building a complete invalid split. A result is only recorded when both conditions hold simultaneously: exactly 4 octets have been chosen <code>and</code> every character of <code>s</code> has been consumed — either alone would accept malformed addresses that either skip trailing digits or terminate too early.',
}
