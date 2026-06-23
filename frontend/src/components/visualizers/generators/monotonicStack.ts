import type { StackFrame } from '@/composables/types'

// Next Greater Element: for each element, find the next element to its right that is larger.
// Result -1 means no greater element exists to the right.
export function generateMonotonicStack(
  nums: number[] = [4, 2, 6, 1, 5],
): StackFrame[] {
  const frames: StackFrame[] = []
  const n = nums.length
  const result: (number | null)[] = new Array(n).fill(null)
  const stack: number[] = [] // holds indices

  function snap(currentIndex: number, poppingIndices: number[] = []): StackFrame {
    return {
      step: frames.length,
      phase: poppingIndices.length > 0 ? 'update' : 'compare',
      message: '',
      array: [...nums],
      currentIndex,
      stack: [...stack],
      result: [...result],
      poppingIndices: [...poppingIndices],
    }
  }

  frames.push({
    ...snap(-1),
    phase: 'init',
    message: `Next Greater Element: for each number, find the first larger number to its right. We use a stack to track candidates — elements waiting to find their answer. We process left to right, popping from the stack whenever the current element is greater.`,
  })

  for (let i = 0; i < n; i++) {
    const popped: number[] = []

    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop()!
      result[idx] = nums[i]
      popped.push(idx)
    }

    if (popped.length > 0) {
      const resolved = popped.map(idx => `${nums[idx]}→${nums[i]}`).join(', ')
      frames.push({
        ...snap(i, popped),
        phase: 'update',
        message: `nums[${i}] = ${nums[i]} is greater than the stack's top element${popped.length > 1 ? 's' : ''}. Pop ${popped.map(idx => nums[idx]).join(', ')} — their Next Greater Element is ${nums[i]}. (${resolved})`,
      })
    }

    stack.push(i)

    const isDone = i === n - 1
    frames.push({
      ...snap(i),
      phase: isDone ? 'done' : 'compare',
      message: isDone
        ? `Push ${nums[i]} onto the stack. No elements remain — anything still on the stack has no greater element to its right (result = −1). All answers found in O(n): each element is pushed and popped at most once.`
        : `Push ${nums[i]} onto the stack. It hasn't found its Next Greater Element yet — it waits there until a larger value comes along from the right.`,
    })

    if (isDone) {
      while (stack.length > 0) {
        result[stack.pop()!] = -1
      }
    }
  }

  return frames
}
