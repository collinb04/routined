#!/usr/bin/env node
/**
 * Struggle & Optimize batch content generator
 *
 * Usage:
 *   node generate-struggle.mjs --dry-run [--problem <id>]
 *     Generate one problem synchronously (non-batch) for prompt iteration.
 *
 *   node generate-struggle.mjs
 *     Submit all problems lacking a struggle block as a single Anthropic Batch job.
 *     Polls until complete, then writes results into the problem files.
 *
 * Env:
 *   ANTHROPIC_API_KEY   required
 *   BATCH_ID            set to resume a previously-submitted batch
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { validateStruggleContent, VALID_STRATEGY_IDS } from './struggle-schema.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROBLEMS_DIR = join(__dirname, '../frontend/src/data/problems')
const STRATEGIES_PATH = join(__dirname, '../frontend/src/data/strategies.ts')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCluster(filePath) {
  const parts = filePath.split('/')
  return parts[parts.length - 2]
}

function loadProblemFile(filePath) {
  const src = readFileSync(filePath, 'utf8')
  return src
}

function hasStruggle(src) {
  return /struggle\s*:/.test(src)
}

/** Walk the problems directory and collect all .ts files (excluding index.ts). */
function collectProblemFiles() {
  const clusters = readdirSync(PROBLEMS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  const files = []
  for (const cluster of clusters) {
    const clusterDir = join(PROBLEMS_DIR, cluster)
    const entries = readdirSync(clusterDir).filter(f => f.endsWith('.ts'))
    for (const entry of entries) {
      files.push({ filePath: join(clusterDir, entry), cluster })
    }
  }
  return files
}

/** Extract problem metadata from TypeScript source for the prompt. */
function extractProblemMeta(src) {
  const idMatch = src.match(/id:\s*['"`]([^'"`]+)['"`]/)
  const titleMatch = src.match(/title:\s*['"`]([^'"`]+)['"`]/)
  const descMatch = src.match(/description:\s*['"`]([^'"`]+)['"`]|description:\s*`([\s\S]*?)`/)
  const constraintsMatch = src.match(/constraints:\s*\[([^\]]+)\]/)

  return {
    id: idMatch?.[1] ?? 'unknown',
    title: titleMatch?.[1] ?? 'Unknown',
    description: (descMatch?.[1] ?? descMatch?.[2] ?? '').replace(/<[^>]+>/g, ''),
    constraints: constraintsMatch?.[1]
      ?.split(',')
      .map(s => s.trim().replace(/^['"`]|['"`]$/g, ''))
      .filter(Boolean) ?? [],
  }
}

/** Build the generation prompt for a single problem. */
function buildPrompt(meta, cluster) {
  const strategyList = VALID_STRATEGY_IDS.map(id => `  - ${id}`).join('\n')
  const complexityOptions = [
    'O(1)', 'O(log n)', 'O(√n)', 'O(n)', 'O(n log n)',
    'O(n²)', 'O(n³)', 'O(2ⁿ)', 'O(n!)', 'O(V + E)', 'O(n · m)', 'O(n · target)',
  ].join(', ')

  return `You are authoring Struggle & Optimize phase content for the Routined DSA learning platform.

## Problem
Title: ${meta.title}
Cluster: ${cluster}
Description: ${meta.description}
Constraints:
${meta.constraints.map(c => `  - ${c}`).join('\n')}

## Strategy taxonomy (use ONLY these ids)
${strategyList}

## Complexity options (use ONLY these strings)
${complexityOptions}

## Task
Produce a JSON object with this exact shape:

{
  "options": [          // 4–5 entries
    {
      "strategyId":    string,  // from taxonomy above
      "viability":     "optimal" | "viable_suboptimal" | "trap" | "inapplicable",
      "complexity": {
        "time":        string,  // from complexity options above
        "space":       string   // from complexity options above
      },
      "rationale":     string,  // 1–2 sentences, MUST reference a concrete property of THIS problem
      "planSteps":     string[], // 3–6 steps, correct execution order
      "socraticSeeds": string[]  // 2–3 questions (not statements), must NOT contain the answer
    }
  ],
  "targetInsight":  string, // one sentence, plain language, names the structural property that unlocks the optimal approach
  "insightRubric":  string[] // 2–3 criteria a human grader can check from a short paragraph
}

## Hard constraints
- Exactly ONE option must have viability "optimal".
- Exactly ONE option must have viability "trap". The trap must be plausible-looking but fail for a reason tied to a SPECIFIC constraint of this problem; the rationale must name that constraint explicitly.
- Every rationale must reference a concrete property of THIS problem (sortedness, value bounds, uniqueness guarantees, size limits), not generic complexity talk.
- socraticSeeds must be questions, not statements, and must NOT contain the answer or name the optimal strategy.
- targetInsight is ONE sentence naming the structural property that unlocks the optimal approach.
- insightRubric criteria must be checkable from a learner's short paragraph (2–4 sentences).
- planSteps are in correct order (the frontend scrambles them at render time — store them correctly here).
- Use ONLY strategyId values from the taxonomy and ONLY complexity strings from the options list.

Output ONLY the JSON object, no markdown fences, no explanation.`
}

/** Insert struggle block into the TypeScript source string. */
function insertStruggleBlock(src, struggle) {
  const json = JSON.stringify(struggle, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? '  struggle: ' + line : '  ' + line))
    .join('\n')

  // Insert before closing `}` of the export default object
  const lastBrace = src.lastIndexOf('}')
  if (lastBrace === -1) throw new Error('Could not find closing brace in problem file')

  // Find the last non-whitespace before the closing brace
  const before = src.slice(0, lastBrace).trimEnd()
  const after = src.slice(lastBrace)

  const sep = before.endsWith(',') ? '\n' : ',\n'
  return before + sep + json + '\n' + after
}

// ── Dry run (single problem, synchronous) ────────────────────────────────────

async function dryRun(targetId) {
  const files = collectProblemFiles()
  let target = null

  if (targetId) {
    target = files.find(f => {
      const src = loadProblemFile(f.filePath)
      return extractProblemMeta(src).id === targetId
    })
    if (!target) {
      console.error(`Problem not found: ${targetId}`)
      process.exit(1)
    }
  } else {
    // Pick first problem without struggle
    target = files.find(f => !hasStruggle(loadProblemFile(f.filePath)))
    if (!target) {
      console.log('All problems already have struggle content.')
      return
    }
  }

  const src = loadProblemFile(target.filePath)
  const meta = extractProblemMeta(src)
  console.log(`\nDry run: generating struggle content for "${meta.title}" (${meta.id})`)
  console.log(`File: ${target.filePath}\n`)

  const prompt = buildPrompt(meta, target.cluster)
  console.log('--- PROMPT ---')
  console.log(prompt)
  console.log('\n--- GENERATING ---')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].text.trim()
  console.log('\n--- RAW OUTPUT ---')
  console.log(raw)

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (e) {
    console.error('\nFailed to parse JSON:', e.message)
    return
  }

  const { data, error } = validateStruggleContent(parsed)
  if (error) {
    console.error('\nValidation failed:')
    console.error(JSON.stringify(error, null, 2))
    return
  }

  console.log('\n--- VALIDATION PASSED ---')
  console.log('Options:', data.options.map(o => `${o.strategyId} (${o.viability})`).join(', '))
  console.log('Target insight:', data.targetInsight)

  const updated = insertStruggleBlock(src, data)
  writeFileSync(target.filePath, updated, 'utf8')
  console.log(`\nWritten to ${target.filePath}`)
}

// ── Batch mode ───────────────────────────────────────────────────────────────

async function runBatch() {
  const files = collectProblemFiles()
  const pending = files.filter(f => !hasStruggle(loadProblemFile(f.filePath)))

  if (pending.length === 0) {
    console.log('All problems already have struggle content.')
    return
  }
  console.log(`Submitting batch for ${pending.length} problems...`)

  // Build batch requests
  const requests = pending.map(({ filePath, cluster }) => {
    const src = loadProblemFile(filePath)
    const meta = extractProblemMeta(src)
    return {
      custom_id: meta.id,
      params: {
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages: [{ role: 'user', content: buildPrompt(meta, cluster) }],
      },
    }
  })

  // Submit batch
  const batch = await client.messages.batches.create({ requests })
  console.log(`Batch submitted: ${batch.id}`)
  console.log(`Poll with: BATCH_ID=${batch.id} node generate-struggle.mjs --poll`)

  // Save batch ID for resumption
  writeFileSync(join(__dirname, '.batch-id'), batch.id, 'utf8')
}

async function pollBatch(batchId) {
  console.log(`Polling batch ${batchId}...`)

  // Wait until complete
  while (true) {
    const batch = await client.messages.batches.retrieve(batchId)
    const { processing, succeeded, errored, canceled, expired } = batch.request_counts
    console.log(`  Processing: ${processing} | Succeeded: ${succeeded} | Errored: ${errored}`)

    if (batch.processing_status === 'ended') break
    await new Promise(r => setTimeout(r, 30_000))
  }

  // Collect results
  const files = collectProblemFiles()
  const fileIndex = new Map()
  for (const f of files) {
    const src = loadProblemFile(f.filePath)
    const meta = extractProblemMeta(src)
    fileIndex.set(meta.id, f)
  }

  let written = 0, skipped = 0, failed = 0

  for await (const result of await client.messages.batches.results(batchId)) {
    const problemId = result.custom_id
    const fileInfo = fileIndex.get(problemId)
    if (!fileInfo) { console.warn(`No file found for ${problemId}`); skipped++; continue }

    if (result.result.type !== 'succeeded') {
      console.error(`FAILED ${problemId}: ${result.result.error?.type}`)
      failed++
      continue
    }

    const raw = result.result.message.content[0].text.trim()
    let parsed
    try { parsed = JSON.parse(raw) } catch (e) {
      console.error(`PARSE ERROR ${problemId}: ${e.message}`)
      failed++
      continue
    }

    const { data, error } = validateStruggleContent(parsed)
    if (error) {
      console.error(`VALIDATION FAILED ${problemId}:`)
      console.error(JSON.stringify(error, null, 2))
      failed++
      continue
    }

    const src = loadProblemFile(fileInfo.filePath)
    if (hasStruggle(src)) { skipped++; continue }

    const updated = insertStruggleBlock(src, data)
    writeFileSync(fileInfo.filePath, updated, 'utf8')
    written++
    console.log(`  ✓ ${problemId}`)
  }

  console.log(`\nDone. Written: ${written} | Skipped: ${skipped} | Failed: ${failed}`)
}

// ── Entry point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const isPoll = args.includes('--poll')
const problemIdx = args.indexOf('--problem')
const targetProblem = problemIdx !== -1 ? args[problemIdx + 1] : undefined

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY is required')
  process.exit(1)
}

if (isDryRun) {
  dryRun(targetProblem).catch(e => { console.error(e); process.exit(1) })
} else if (isPoll) {
  const batchId = process.env.BATCH_ID
    ?? ((() => { try { return readFileSync(join(__dirname, '.batch-id'), 'utf8').trim() } catch { return null } })())
  if (!batchId) { console.error('BATCH_ID required for --poll'); process.exit(1) }
  pollBatch(batchId).catch(e => { console.error(e); process.exit(1) })
} else {
  runBatch().catch(e => { console.error(e); process.exit(1) })
}
