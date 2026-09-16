importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js')

// Common stdlib modules/names available with no explicit import needed —
// matches the convenience of judges like NeetCode's, so a missing `import`
// is never the reason a correct solution fails. Runs before every user
// snippet (both raw runPython and the runTests harness) so it's uniform
// no matter which entry point invoked it. Problem starterCode must NOT
// surface any of these as visible imports — that would hint at the
// intended approach (e.g. `import heapq` gives away "use a heap").
// NOTE: bisect.bisect / bisect.insort are themselves aliases for the
// *_right variants — importing those bare names would rebind `bisect` from
// the module to a function, breaking any code (this codebase's solutionCode
// included) that calls bisect.bisect_left(...) module-qualified. Only the
// unambiguous bisect_left/right and insort_left/right are re-exported bare.
const COMMON_IMPORTS_PREAMBLE = `
import math, re, random, string, heapq, bisect, itertools, functools, collections
from collections import defaultdict, deque, Counter, OrderedDict, namedtuple
from typing import List, Dict, Optional, Tuple, Set, Any, Union, Callable, Iterable, Iterator
from heapq import heappush, heappop, heapify, heapreplace, nlargest, nsmallest
from bisect import bisect_left, bisect_right, insort_left, insort_right
from itertools import permutations, combinations, combinations_with_replacement, product, accumulate, chain, groupby
from functools import lru_cache, reduce, cmp_to_key
from math import inf, ceil, floor, sqrt, gcd, comb, factorial
`

let pyodide = null

const initPromise = loadPyodide({
  indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
  fullStdLib: false,
}).then((p) => {
  pyodide = p
  self.postMessage({ type: 'ready' })
}).catch((err) => {
  self.postMessage({ type: 'error', message: err.message })
})

self.onmessage = async (e) => {
  await initPromise
  const { id, type, payload } = e.data

  try {
    if (type === 'runPython') {
      const { code } = payload
      pyodide.runPython(`import sys, io\nsys.stdout = io.StringIO()\n${COMMON_IMPORTS_PREAMBLE}`)
      pyodide.runPython(code)
      const output = pyodide.runPython('sys.stdout.getvalue()')
      self.postMessage({ id, result: output })
    } else if (type === 'runTests') {
      const { userCode, functionName, testCases, runnerSetup } = payload
      const testDataJson = JSON.stringify(
        testCases.map((tc) => ({ label: tc.label, args: tc.args, expected: tc.expected }))
      )
      const runner = `
import sys, io, json as __json
sys.stdout = io.StringIO()

${userCode}

${runnerSetup ?? ''}

__test_data = __json.loads(${JSON.stringify(testDataJson)})
__results = []
for __t in __test_data:
    try:
        __out = ${functionName}(*__t['args'])
        __exp = __t['expected']
        __out_norm = __json.loads(__json.dumps(__out, default=str))
        __passed = __out_norm == __exp
        __results.append({'label': __t['label'], 'passed': __passed, 'actual': __out_norm, 'expected': __exp})
    except Exception as __e:
        __results.append({'label': __t['label'], 'passed': False, 'actual': None, 'expected': __t['expected'], 'error': str(__e)})

print(__json.dumps(__results, default=str))
`
      pyodide.runPython(`import sys, io\nsys.stdout = io.StringIO()\n${COMMON_IMPORTS_PREAMBLE}`)
      pyodide.runPython(runner)
      const output = pyodide.runPython('sys.stdout.getvalue()')
      self.postMessage({ id, result: output })
    }
  } catch (err) {
    self.postMessage({ id, error: err.message })
  }
}
