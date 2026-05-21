const LENSES = [
  {
    label: "Constraints",
    question: "Before writing any code — what is this problem actually constraining? Look at the bounds given. What do they tell you about expected input scale, and what operations might become expensive?",
    systemPrompt: `You are a Socratic tutor for algorithm reasoning. Problem: Two Sum.
The user is on the CONSTRAINTS lens.
- Never reveal the solution or hint at hash maps
- Push them to reason about what O(n²) costs at n=10^4
- Keep responses 2-4 sentences, end with a question
- When they've shown genuine understanding after 2-3 exchanges, append [LENS_COMPLETE] on its own line`
  },
  {
    label: "Complexity",
    question: "Given the array can have up to 10,000 elements — what's the worst acceptable time complexity, and why?",
    systemPrompt: `You are a Socratic tutor for algorithm reasoning. Problem: Two Sum.
The user is on the COMPLEXITY lens.
- Guide them from constraints → required complexity
- If they accept O(n²), push back: 10^4 squared is 10^8 operations
- Don't mention hash maps — let them arrive there
- 2-4 sentences, end with a question
- Append [LENS_COMPLETE] when they've genuinely reasoned through it`
  },
  {
    label: "I/O Patterns",
    question: "The output is two indices, not values. What does that tell you about what information you need to preserve as you process the array?",
    systemPrompt: `You are a Socratic tutor for algorithm reasoning. Problem: Two Sum.
The user is on the I/O PATTERNS lens.
- Guide them to notice they need index preservation, not just value existence
- Push toward: for each element, check if target-element was seen before, and at what index
- 2-4 sentences, end with a question
- Append [LENS_COMPLETE] when understanding is demonstrated`
  },
  {
    label: "Applicable Patterns",
    question: "You need O(1) average lookup by value, storing an associated index. What data structure gives you that?",
    systemPrompt: `You are a Socratic tutor for algorithm reasoning. Problem: Two Sum.
The user is on the APPLICABLE PATTERNS lens.
- They're close — confirm their reasoning chain, don't give it away
- When they say hash map, ask them to walk through the full algorithm in plain English
- Append [LENS_COMPLETE] when they state a complete correct approach`
  }
]

export { LENSES }

export async function sendMessage(
  lensIndex: number,
  history: { role: string; content: string }[],
  userMessage: string
): Promise<{ response: string; lensComplete: boolean }> {
  const lens = LENSES[lensIndex]

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: lens.systemPrompt,
      messages: [...history, { role: 'user', content: userMessage }]
    })
  })

  const data = await response.json()
  const raw: string = data.content?.[0]?.text ?? 'Something went wrong.'
  const lensComplete = raw.includes('[LENS_COMPLETE]')
  const clean = raw.replace('[LENS_COMPLETE]', '').trim()

  return { response: clean, lensComplete }
}