<script setup lang="ts">
import { useFramePlayer } from '@/composables/useFramePlayer'
import { generateTwoPointers } from './generators/twoPointers'
import { generateSlidingWindow } from './generators/slidingWindow'
import { generateSlidingWindowVariable } from './generators/slidingWindowVariable'
import { generateBinarySearch } from './generators/binarySearch'
import { generateFastSlow } from './generators/fastSlow'
import { generateDynamicProgramming } from './generators/dynamicProgramming'
import { generateMonotonicStack } from './generators/monotonicStack'
import { generateBubbleSort } from './generators/bubbleSort'
import { generateInsertionSort } from './generators/insertionSort'
import { generateMergeSort } from './generators/mergeSort'
import { generateQuickSort } from './generators/quickSort'
import { generateBucketSort } from './generators/bucketSort'
import { generateBstSearch } from './generators/bstSearch'
import { generateHeapExtract } from './generators/heapExtract'
import { generateArrayAccess } from './generators/arrayAccess'
import { generatePythonListOps } from './generators/pythonListOps'
import { generateLinkedListInsert } from './generators/linkedListInsert'
import { generateStackQueueOps } from './generators/stackQueueOps'
import { generateHashMapLookup } from './generators/hashMapLookup'
import { generateGraphBfs } from './generators/graphBfs'
import { generateRecursionTree } from './generators/recursionTree'
import { generateGreedyCoins } from './generators/greedyCoins'
import { generateBacktrackingTree } from './generators/backtrackingTree'
import { generateMergeIntervalsVis } from './generators/mergeIntervalsVis'
import { generateBfsDfsTraversal } from './generators/bfsDfsTraversal'
import { generateDfsTraversal } from './generators/dfsTraversal'
import { generateTopoSort } from './generators/topoSort'
import { generateUnionFindOps } from './generators/unionFindOps'
import ArrayRenderer from './renderers/ArrayRenderer.vue'
import TreeRenderer from './renderers/TreeRenderer.vue'
import StackRenderer from './renderers/StackRenderer.vue'
import LinkedListRenderer from './renderers/LinkedListRenderer.vue'
import GraphRenderer from './renderers/GraphRenderer.vue'
import IntervalRenderer from './renderers/IntervalRenderer.vue'
import UnionFindRenderer from './renderers/UnionFindRenderer.vue'
import FrameControls from './shared/FrameControls.vue'
import MessagePanel from './shared/MessagePanel.vue'
import type {
  Frame, ArrayFrame, StackFrame, TreeFrame,
  LinkedListFrame, GraphFrame, IntervalFrame, UnionFindFrame,
} from '@/composables/types'

const props = defineProps<{ pattern: string }>()

type RendererKind = 'array' | 'stack' | 'tree' | 'list' | 'graph' | 'interval' | 'union-find'

const PATTERNS: Record<string, { frames: Frame[]; renderer: RendererKind }> = {
  'two-pointers':       { frames: generateTwoPointers(),        renderer: 'array' },
  'sliding-window':          { frames: generateSlidingWindow(),         renderer: 'array' },
  'sliding-window-variable': { frames: generateSlidingWindowVariable(), renderer: 'array' },
  'binary-search':      { frames: generateBinarySearch(),       renderer: 'array' },
  'fast-slow':          { frames: generateFastSlow(),           renderer: 'array' },
  'dynamic-programming':{ frames: generateDynamicProgramming(), renderer: 'array' },
  'monotonic-stack':    { frames: generateMonotonicStack(),     renderer: 'stack' },
  'sort-bubble':        { frames: generateBubbleSort(),         renderer: 'array' },
  'sort-insertion':     { frames: generateInsertionSort(),      renderer: 'array' },
  'sort-merge':         { frames: generateMergeSort(),          renderer: 'array' },
  'sort-quicksort':     { frames: generateQuickSort(),          renderer: 'array' },
  'sort-bucket':        { frames: generateBucketSort(),         renderer: 'array' },
  'bst-search':         { frames: generateBstSearch(),          renderer: 'tree'  },
  'heap-extract':       { frames: generateHeapExtract(),        renderer: 'tree'  },
  'array-access':       { frames: generateArrayAccess(),        renderer: 'array' },
  'python-list':        { frames: generatePythonListOps(),      renderer: 'array' },
  'linked-list-insert': { frames: generateLinkedListInsert(),   renderer: 'list'  },
  'stack-queue':        { frames: generateStackQueueOps(),      renderer: 'array' },
  'hash-map':           { frames: generateHashMapLookup(),      renderer: 'array' },
  'graph-bfs':          { frames: generateGraphBfs(),           renderer: 'graph' },
  'recursion-tree':     { frames: generateRecursionTree(),      renderer: 'tree'  },
  'greedy-coins':       { frames: generateGreedyCoins(),        renderer: 'array' },
  'backtracking-tree':  { frames: generateBacktrackingTree(),   renderer: 'tree'  },
  'merge-intervals':    { frames: generateMergeIntervalsVis(),  renderer: 'interval' },
  'bfs-dfs':            { frames: generateBfsDfsTraversal(),    renderer: 'tree'  },
  'dfs':                { frames: generateDfsTraversal(),        renderer: 'tree'  },
  'topo-sort':          { frames: generateTopoSort(),           renderer: 'graph' },
  'union-find':         { frames: generateUnionFindOps(),       renderer: 'union-find' },
}

const config = PATTERNS[props.pattern]
const frames = config?.frames ?? []
const renderer = config?.renderer ?? 'array'

const {
  index, current, isFirst, isLast, total,
  playing, msPerStep,
  next, prev, reset,
} = useFramePlayer(frames)
</script>

<template>
  <div v-if="frames.length" class="flex flex-col gap-3">
    <ArrayRenderer      v-if="renderer === 'array'"       :frame="(current as ArrayFrame)" />
    <StackRenderer      v-else-if="renderer === 'stack'"      :frame="(current as StackFrame)" />
    <TreeRenderer       v-else-if="renderer === 'tree'"       :frame="(current as TreeFrame)"  />
    <LinkedListRenderer v-else-if="renderer === 'list'"       :frame="(current as LinkedListFrame)" />
    <GraphRenderer      v-else-if="renderer === 'graph'"      :frame="(current as GraphFrame)" />
    <IntervalRenderer   v-else-if="renderer === 'interval'"   :frame="(current as IntervalFrame)" />
    <UnionFindRenderer  v-else-if="renderer === 'union-find'" :frame="(current as UnionFindFrame)" />
    <MessagePanel :message="current.message" />
    <FrameControls
      :index="index"
      :total="total"
      :is-first="isFirst"
      :is-last="isLast"
      :playing="playing"
      :ms-per-step="msPerStep"
      @prev="prev()"
      @next="next()"
      @reset="reset()"
      @toggle-play="playing = !playing"
      @set-speed="ms => (msPerStep = ms)"
    />
  </div>
</template>
