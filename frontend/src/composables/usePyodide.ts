import { ref } from 'vue'
import type { TestCase } from '@/data/problems'

export interface TestResult {
  label: string
  passed: boolean
  actual: any
  expected: any
  error?: string
}

// Pyodide's first load downloads ~10MB WASM — give it plenty of runway.
// Once the worker signals ready, pending timers are reset to the tighter exec limit.
const COLD_START_TIMEOUT_MS = 45_000
const EXEC_TIMEOUT_MS = 8_000

const isReady = ref(false)
const isLoading = ref(false)

let worker: Worker | null = null
const pending = new Map<string, { resolve: (v: string) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>()

function createWorker(): Worker {
  isReady.value = false
  isLoading.value = true

  const w = new Worker('/pyodide.worker.js')

  w.onmessage = (e) => {
    const { type, id, result, error } = e.data
    if (type === 'ready') {
      isReady.value = true
      isLoading.value = false
      // Pyodide is loaded — reset every pending request to the tighter exec timeout
      pending.forEach(req => {
        clearTimeout(req.timer)
        req.timer = setTimeout(killAndReset, EXEC_TIMEOUT_MS)
      })
      return
    }
    if (type === 'error') {
      isLoading.value = false
      return
    }
    const req = pending.get(id)
    if (!req) return
    clearTimeout(req.timer)
    pending.delete(id)
    if (error) req.reject(new Error(error))
    else req.resolve(result)
  }

  w.onerror = () => {
    isLoading.value = false
    isReady.value = false
  }

  return w
}

function getWorker(): Worker {
  if (!worker) worker = createWorker()
  return worker
}

function killAndReset() {
  worker?.terminate()
  worker = null
  pending.forEach(req => {
    clearTimeout(req.timer)
    req.reject(new Error('Execution timed out after 8s — check for infinite loops or very slow code.'))
  })
  pending.clear()
  worker = createWorker()
}

function send(type: string, payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2)
    // Use the cold-start budget until Pyodide signals ready, then the timer
    // gets reset to EXEC_TIMEOUT_MS via the onmessage handler above.
    const timer = setTimeout(killAndReset, isReady.value ? EXEC_TIMEOUT_MS : COLD_START_TIMEOUT_MS)
    pending.set(id, { resolve, reject, timer })
    getWorker().postMessage({ id, type, payload })
  })
}

async function runPython(code: string): Promise<string> {
  return send('runPython', { code })
}

async function runTests(userCode: string, functionName: string, testCases: TestCase[], runnerSetup?: string): Promise<TestResult[]> {
  const raw = await send('runTests', { userCode, functionName, testCases, runnerSetup })
  return JSON.parse(raw) as TestResult[]
}

export function usePyodide() {
  getWorker()
  return { isReady, isLoading, loadPyodide: getWorker, runPython, runTests }
}
