importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js')

let pyodide = null

const initPromise = loadPyodide({
  indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
}).then(p => {
  pyodide = p
  self.postMessage({ type: 'ready' })
}).catch(err => {
  self.postMessage({ type: 'error', message: err.message })
})

self.onmessage = async (e) => {
  await initPromise
  const { id, type, payload } = e.data

  try {
    if (type === 'runPython') {
      pyodide.runPython('import sys, io\nsys.stdout = io.StringIO()')
      pyodide.runPython(payload.code)
      const output = pyodide.runPython('sys.stdout.getvalue()')
      self.postMessage({ id, result: output })
    } else if (type === 'runTests') {
      const { userCode, functionName, testCases, runnerSetup } = payload
      const testDataJson = JSON.stringify(
        testCases.map(tc => ({ label: tc.label, args: tc.args, expected: tc.expected }))
      )
      const runner = `
import sys, io, json as __json
sys.stdout = io.StringIO()

${userCode}

${runnerSetup || ''}

__test_data = __json.loads(${JSON.stringify(testDataJson)})
__results = []
for __t in __test_data:
    try:
        __out = ${functionName}(*__t['args'])
        __exp = __t['expected']
        __passed = __out == __exp
        __results.append({'label': __t['label'], 'passed': __passed, 'actual': __out, 'expected': __exp})
    except Exception as __e:
        __results.append({'label': __t['label'], 'passed': False, 'actual': None, 'expected': __t['expected'], 'error': str(__e)})

print(__json.dumps(__results, default=str))
`
      pyodide.runPython('import sys, io\nsys.stdout = io.StringIO()')
      pyodide.runPython(runner)
      const output = pyodide.runPython('sys.stdout.getvalue()')
      self.postMessage({ id, result: output })
    }
  } catch (err) {
    self.postMessage({ id, error: err.message })
  }
}
