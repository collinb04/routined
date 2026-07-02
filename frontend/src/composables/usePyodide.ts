import { ref } from 'vue'
import type { TestCase } from '@/data/problems'

export interface TestResult {
  label: string
  passed: boolean
  actual: any
  expected: any
  error?: string
}

const TIMEOUT_MS = 5000

const isReady = ref(false)
const isLoading = ref(false)

let worker: Worker | null = null
const pending = new Map<string, { resolve: (v: string) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>()

function createWorker(): Worker {
  isReady.value = false
  isLoading.value = true

  const w = new Worker('/pyodide.worker.ts')

  w.onmessage = (e) => {
    const { type, id, result, error } = e.data
    if (type === 'ready') {
      isReady.value = true
      isLoading.value = false
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
    req.reject(new Error('Execution timed out after 5s — check for infinite loops.'))
  })
  pending.clear()
  worker = createWorker()
}

function send(type: string, payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2)
    const timer = setTimeout(killAndReset, TIMEOUT_MS)
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
