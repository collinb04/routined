export interface TestCase {
  label: string
  args: any[]
  expected: any
}

export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface ClueOption {
  label: string
  isCorrect: boolean
  feedback?: string
}

export interface ClueCard {
  id: string
  question: string
  options: ClueOption[]
  correctFeedback: string
  wrongFeedback: string[]
}

export type Viability = 'optimal' | 'viable_suboptimal' | 'trap' | 'inapplicable'

export interface StrategyOption {
  strategyId: string
  viability: Viability
  complexity: { time: string; space: string }
  rationale: string
  planSteps: string[]
  socraticSeeds: string[]
}

export interface StruggleContent {
  options: StrategyOption[]
  targetInsight: string
  insightRubric: string[]
}

export interface Problem {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  description: string
  examples: Example[]
  constraints: string[]
  starterCode: string
  functionName: string
  testCases: TestCase[]
  conceptId: string
  runnerSetup?: string
  clues?: ClueCard[]
  struggle?: StruggleContent
  bruteSeedMessage?: string
  optimizeSeedMessage?: string
  bruteHint?: string
  optimizeHint?: string
}


import containsDuplicate from './linear/contains-duplicate'
import validPalindrome from './linear/valid-palindrome'
import twoSumIi from './linear/two-sum-ii'
import maxAverageSubarray from './linear/max-average-subarray'
import rangeSumQuery from './linear/range-sum-query'
import validParentheses from './linear/valid-parentheses'
import nextGreaterElement from './linear/next-greater-element'
import bubbleSort from './sorted-search/bubble-sort'
import insertionSort from './sorted-search/insertion-sort'
import mergeSort from './sorted-search/merge-sort'
import binarySearch from './sorted-search/binary-search'
import twoSum from './lookup/two-sum'
import removeLinkedListElements from './linked/remove-linked-list-elements'
import linkedListCycle from './linked/linked-list-cycle'
import reverseLinkedList from './linked/reverse-linked-list'
import climbingStairs from './optimization/climbing-stairs'
import maxDepthTree from './recursive/max-depth-tree'
import meetingRooms from './lookup/meeting-rooms'
import kokoEatingBananas from './sorted-search/koko-eating-bananas'
import fibonacciNumber from './recursive/fibonacci-number'
import levelOrderTraversal from './recursive/level-order-traversal'
import subsets from './recursive/subsets'
import assignCookies from './recursive/assign-cookies'
import findPathInGraph from './graph/find-path-in-graph'
import courseSchedule from './graph/course-schedule'
import connectedComponents from './graph/connected-components'
import kthLargestStream from './ordered/kth-largest-stream'
import topKFrequent from './ordered/top-k-frequent'
import uniquePaths from './optimization/unique-paths'
import longestPalindromicSubseq from './optimization/longest-palindromic-subseq'
import partitionEqualSubset from './optimization/partition-equal-subset'
import singleNumber from './bitwise/single-number'
import numberOf1Bits from './bitwise/number-of-1-bits'
import countingBits from './bitwise/counting-bits'
import reverseBits from './bitwise/reverse-bits'
import missingNumber from './bitwise/missing-number'
import sumOfTwoIntegers from './bitwise/sum-of-two-integers'
import reverseInteger from './bitwise/reverse-integer'
import singleNumberIi from './bitwise/single-number-ii'
import rotateImage from './sorted-search/rotate-image'
import spiralMatrix from './sorted-search/spiral-matrix'
import setMatrixZeroes from './sorted-search/set-matrix-zeroes'
import happyNumber from './sorted-search/happy-number'
import plusOne from './sorted-search/plus-one'
import powerXN from './sorted-search/power-x-n'
import multiplyStrings from './sorted-search/multiply-strings'
import romanToInteger from './sorted-search/roman-to-integer'
import integerToRoman from './sorted-search/integer-to-roman'
import countPrimes from './sorted-search/count-primes'
import detectSquares from './sorted-search/detect-squares'
import mergeSortedArray from './sorted-search/merge-sorted-array'
import sortAnArray from './sorted-search/sort-an-array'
import largestNumber from './sorted-search/largest-number'
import hIndex from './sorted-search/h-index'
import wiggleSortIi from './sorted-search/wiggle-sort-ii'
import maximumGap from './sorted-search/maximum-gap'
import runningSum1dArray from './linear/running-sum-1d-array'
import findPivotIndex from './linear/find-pivot-index'
import rangeSumQueryImmutable from './linear/range-sum-query-immutable'
import contiguousArray from './linear/contiguous-array'
import maximumSubarraySumOneDeletion from './linear/maximum-subarray-sum-one-deletion'
import countOfRangeSum from './linear/count-of-range-sum'
import validPalindromeIi from './linear/valid-palindrome-ii'
import longestPalindromicSubsequence from './linear/longest-palindromic-subsequence'
import reverseWordsInString from './linear/reverse-words-in-string'
import stringToIntegerAtoi from './linear/string-to-integer-atoi'
import isSubsequence from './linear/is-subsequence'
import longestCommonPrefix from './linear/longest-common-prefix'
import findFirstOccurrenceString from './linear/find-first-occurrence-string'
import minimumAddMakeParenthesesValid from './linear/minimum-add-make-parentheses-valid'
import encodeDecodeStrings from './linear/encode-decode-strings'
import zigzagConversion from './linear/zigzag-conversion'
import countAndSay from './linear/count-and-say'
import textJustification from './linear/text-justification'
import implementTrie from './recursive/implement-trie'
import designAddSearchWords from './recursive/design-add-search-words'
import replaceWords from './recursive/replace-words'
import longestWordInDictionary from './recursive/longest-word-in-dictionary'
import wordSearchIi from './recursive/word-search-ii'
import mergeIntervals from './lookup/merge-intervals'
import insertInterval from './lookup/insert-interval'
import nonOverlappingIntervals from './lookup/non-overlapping-intervals'
import meetingRoomsIi from './lookup/meeting-rooms-ii'
import minimumArrowsBurstBalloons from './lookup/minimum-arrows-burst-balloons'
import intervalListIntersections from './lookup/interval-list-intersections'
import myCalendarI from './lookup/my-calendar-i'
import jumpGame from './recursive/jump-game'
import jumpGameIi from './recursive/jump-game-ii'
import gasStation from './recursive/gas-station'
import handOfStraights from './recursive/hand-of-straights'
import partitionLabels from './recursive/partition-labels'
import validParenthesisString from './recursive/valid-parenthesis-string'
import candy from './recursive/candy'
import boatsToSavePeople from './recursive/boats-to-save-people'
import lemonadeChange from './recursive/lemonade-change'
import mergeTripletsFormTarget from './recursive/merge-triplets-form-target'
import nextGreaterElementIi from './linear/next-greater-element-ii'
import onlineStockSpan from './linear/online-stock-span'
import sumOfSubarrayMinimums from './linear/sum-of-subarray-minimums'
import _132Pattern from './linear/132-pattern'
import removeDuplicateLetters from './linear/remove-duplicate-letters'
import removeKDigits from './linear/remove-k-digits'
import maximumWidthRamp from './linear/maximum-width-ramp'
import maximumSubarray from './linear/maximum-subarray'
import subarraySumEqualsK from './linear/subarray-sum-equals-k'
import moveZeroes from './linear/move-zeroes'
import findAllDuplicatesInArray from './linear/find-all-duplicates-in-array'
import firstMissingPositive from './linear/first-missing-positive'
import pascalsTriangle from './linear/pascals-triangle'
import bestTimeBuySellStockIi from './linear/best-time-buy-sell-stock-ii'
import rotateArray from './linear/rotate-array'
import nextPermutation from './linear/next-permutation'
import squaresSortedArray from './linear/squares-sorted-array'
import sortArrayByParity from './linear/sort-array-by-parity'
import _3sumClosest from './linear/3sum-closest'
import maxKSumPairs from './linear/max-k-sum-pairs'
import _4sum from './linear/4sum'
import minimumLengthAfterDeleting from './linear/minimum-length-after-deleting'
import maxConsecutiveOnesIii from './linear/max-consecutive-ones-iii'
import minimumSizeSubarraySum from './linear/minimum-size-subarray-sum'
import fruitIntoBaskets from './linear/fruit-into-baskets'
import countNumberNiceSubarrays from './linear/count-number-nice-subarrays'
import grumpyBookstoreOwner from './linear/grumpy-bookstore-owner'
import substringConcatenationAllWords from './linear/substring-concatenation-all-words'
import decodeString from './linear/decode-string'
import basicCalculatorIi from './linear/basic-calculator-ii'
import simplifyPath from './linear/simplify-path'
import asteroidCollision from './linear/asteroid-collision'
import basicCalculator from './linear/basic-calculator'
import scoreOfParentheses from './linear/score-of-parentheses'
import findMinRotatedSortedArrayIi from './sorted-search/find-min-rotated-sorted-array-ii'
import capacityShipPackages from './sorted-search/capacity-ship-packages'
import findKClosestElements from './sorted-search/find-k-closest-elements'
import splitArrayLargestSum from './sorted-search/split-array-largest-sum'
import searchRotatedSortedArrayIi from './sorted-search/search-rotated-sorted-array-ii'
import minimumSpeedArriveOnTime from './sorted-search/minimum-speed-arrive-on-time'
import palindromeLinkedList from './linked/palindrome-linked-list'
import middleOfLinkedList from './linked/middle-of-linked-list'
import sortList from './linked/sort-list'
import flattenMultilevelDoublyLinkedList from './linked/flatten-multilevel-doubly-linked-list'
import pathSum from './recursive/path-sum'
import symmetricTree from './recursive/symmetric-tree'
import binaryTreeZigzagLevelOrder from './recursive/binary-tree-zigzag-level-order'
import convertSortedArrayToBst from './recursive/convert-sorted-array-to-bst'
import deleteNodeInBst from './recursive/delete-node-in-bst'
import lowestCommonAncestorBinaryTree from './recursive/lowest-common-ancestor-binary-tree'
import countCompleteTreeNodes from './recursive/count-complete-tree-nodes'
import verticalOrderTraversal from './recursive/vertical-order-traversal'
import allNodesDistanceK from './recursive/all-nodes-distance-k'
import flattenBinaryTreeToLinkedList from './recursive/flatten-binary-tree-to-linked-list'
import reorganizeString from './ordered/reorganize-string'
import kPairsSmallestSums from './ordered/k-pairs-smallest-sums'
import minimumCostConnectSticks from './ordered/minimum-cost-connect-sticks'
import ipo from './ordered/ipo'
import maximumFrequencyStack from './ordered/maximum-frequency-stack'
import combinationSumIii from './recursive/combination-sum-iii'
import combinations from './recursive/combinations'
import restoreIpAddresses from './recursive/restore-ip-addresses'
import wordBreakIi from './recursive/word-break-ii'
import nQueensIi from './recursive/n-queens-ii'
import sudokuSolver from './recursive/sudoku-solver'
import _01Matrix from './graph/01-matrix'
import shortestPathBinaryMatrix from './graph/shortest-path-binary-matrix'
import allPathsSourceToTarget from './graph/all-paths-source-to-target'
import numberOfProvinces from './graph/number-of-provinces'
import isGraphBipartite from './graph/is-graph-bipartite'
import evaluateDivision from './graph/evaluate-division'
import accountsMerge from './graph/accounts-merge'
import findEventualSafeStates from './graph/find-eventual-safe-states'
import snakesAndLadders from './graph/snakes-and-ladders'
import minimumHeightTrees from './graph/minimum-height-trees'
import detonateMaximumBombs from './graph/detonate-maximum-bombs'
import networkDelayTime from './graph/network-delay-time'
import minCostConnectAllPoints from './graph/min-cost-connect-all-points'
import swimInRisingWater from './graph/swim-in-rising-water'
import cheapestFlightsKStops from './graph/cheapest-flights-k-stops'
import reconstructItinerary from './graph/reconstruct-itinerary'
import criticalConnectionsNetwork from './graph/critical-connections-network'
import findCitySmallestNeighbors from './graph/find-city-smallest-neighbors'
import pathWithMaxProbability from './graph/path-with-max-probability'
import deleteAndEarn from './optimization/delete-and-earn'
import minimumCostForTickets from './optimization/minimum-cost-for-tickets'
import perfectSquares from './optimization/perfect-squares'
import nthTribonacciNumber from './optimization/nth-tribonacci-number'
import jumpGameIii from './optimization/jump-game-iii'
import arithmeticSlices from './optimization/arithmetic-slices'
import numberLongestIncreasingSubsequence from './optimization/number-longest-increasing-subsequence'
import integerBreak from './optimization/integer-break'
import uniquePathsIi from './optimization/unique-paths-ii'
import longestCommonSubsequence from './optimization/longest-common-subsequence'
import bestTimeBuySellStockCooldown from './optimization/best-time-buy-sell-stock-cooldown'
import coinChangeIi from './optimization/coin-change-ii'
import targetSum from './optimization/target-sum'
import interleavingString from './optimization/interleaving-string'
import longestIncreasingPathMatrix from './optimization/longest-increasing-path-matrix'
import distinctSubsequences from './optimization/distinct-subsequences'
import editDistance from './optimization/edit-distance'
import burstBalloons from './optimization/burst-balloons'
import regularExpressionMatching from './optimization/regular-expression-matching'
import stoneGame from './optimization/stone-game'
import openTheLock from './graph/open-the-lock'
import minimumGeneticMutation from './graph/minimum-genetic-mutation'
import keysAndRooms from './graph/keys-and-rooms'
import numberOperationsMakeNetworkConnected from './graph/number-operations-make-network-connected'
import frogJump from './optimization/frog-jump'
import maximumTotalImportanceRoads from './graph/maximum-total-importance-roads'
import bestTimeBuySellStockIii from './optimization/best-time-buy-sell-stock-iii'
import bestTimeBuySellStockIv from './optimization/best-time-buy-sell-stock-iv'
import minimumTapsOpenWaterGarden from './optimization/minimum-taps-open-water-garden'
import maximumLengthRepeatedSubarray from './optimization/maximum-length-repeated-subarray'
import countNumberOfTeams from './optimization/count-number-of-teams'
import dominoTrominoTiling from './optimization/domino-tromino-tiling'
import houseRobberIii from './optimization/house-robber-iii'
import pathSumIi from './recursive/path-sum-ii'
import populatingNextRightPointers from './recursive/populating-next-right-pointers'
import sumRootToLeafNumbers from './recursive/sum-root-to-leaf-numbers'
import binarySearchTreeIterator from './recursive/binary-search-tree-iterator'
import trimBinarySearchTree from './recursive/trim-binary-search-tree'
import recoverBinarySearchTree from './recursive/recover-binary-search-tree'
import smallestRangeKLists from './ordered/smallest-range-k-lists'
import minimumCostTreeLeafValues from './linear/minimum-cost-tree-leaf-values'
import continuousSubarraySum from './linear/continuous-subarray-sum'
import findAllNumbersDisappeared from './linear/find-all-numbers-disappeared'
import sortColors from './linear/sort-colors'
import majorityElement from './linear/majority-element'
import maxSumRectangleNoLargerK from './linear/max-sum-rectangle-no-larger-k'
import numberOfSubarraysBoundedMax from './linear/number-of-subarrays-bounded-max'
import maximumSum3NonOverlapping from './linear/maximum-sum-3-non-overlapping'
import checkIfArrayPairsDivisibleByK from './linear/check-if-array-pairs-divisible-by-k'
import validAnagram from './linear/valid-anagram'
import groupAnagrams from './linear/group-anagrams'
import productOfArrayExceptSelf from './linear/product-of-array-except-self'
import validSudoku from './linear/valid-sudoku'
import longestConsecutiveSequence from './linear/longest-consecutive-sequence'
import _3sum from './linear/3sum'
import containerWithMostWater from './linear/container-with-most-water'
import trappingRainWater from './linear/trapping-rain-water'
import bestTimeToBuyAndSellStock from './linear/best-time-to-buy-and-sell-stock'
import longestSubstringWithoutRepeatingChars from './linear/longest-substring-without-repeating-chars'
import longestRepeatingCharacterReplacement from './linear/longest-repeating-character-replacement'
import permutationInString from './linear/permutation-in-string'
import minimumWindowSubstring from './linear/minimum-window-substring'
import slidingWindowMaximum from './linear/sliding-window-maximum'
import minStack from './linear/min-stack'
import evaluateReversePolishNotation from './linear/evaluate-reverse-polish-notation'
import generateParentheses from './linear/generate-parentheses'
import dailyTemperatures from './linear/daily-temperatures'
import carFleet from './linear/car-fleet'
import largestRectangleInHistogram from './linear/largest-rectangle-in-histogram'
import searchA2dMatrix from './sorted-search/search-a-2d-matrix'
import findMinimumInRotatedSortedArray from './sorted-search/find-minimum-in-rotated-sorted-array'
import searchInRotatedSortedArray from './sorted-search/search-in-rotated-sorted-array'
import timeBasedKeyValueStore from './sorted-search/time-based-key-value-store'
import medianOfTwoSortedArrays from './sorted-search/median-of-two-sorted-arrays'
import mergeTwoSortedLists from './linked/merge-two-sorted-lists'
import reorderList from './linked/reorder-list'
import removeNthNodeFromEnd from './linked/remove-nth-node-from-end'
import addTwoNumbers from './linked/add-two-numbers'
import findTheDuplicateNumber from './linked/find-the-duplicate-number'
import lruCache from './linked/lru-cache'
import mergeKSortedLists from './linked/merge-k-sorted-lists'
import reverseNodesInKGroup from './linked/reverse-nodes-in-k-group'
import copyListWithRandomPointer from './linked/copy-list-with-random-pointer'
import invertBinaryTree from './recursive/invert-binary-tree'
import diameterOfBinaryTree from './recursive/diameter-of-binary-tree'
import balancedBinaryTree from './recursive/balanced-binary-tree'
import sameTree from './recursive/same-tree'
import subtreeOfAnotherTree from './recursive/subtree-of-another-tree'
import lowestCommonAncestorOfBst from './recursive/lowest-common-ancestor-of-bst'
import binaryTreeRightSideView from './recursive/binary-tree-right-side-view'
import countGoodNodesInBinaryTree from './recursive/count-good-nodes-in-binary-tree'
import validateBinarySearchTree from './recursive/validate-binary-search-tree'
import kthSmallestElementInBst from './recursive/kth-smallest-element-in-bst'
import constructTreeFromPreorderInorder from './recursive/construct-tree-from-preorder-inorder'
import binaryTreeMaximumPathSum from './recursive/binary-tree-maximum-path-sum'
import serializeAndDeserializeBinaryTree from './recursive/serialize-and-deserialize-binary-tree'
import lastStoneWeight from './ordered/last-stone-weight'
import kClosestPointsToOrigin from './ordered/k-closest-points-to-origin'
import kthLargestElementInArray from './ordered/kth-largest-element-in-array'
import taskScheduler from './ordered/task-scheduler'
import designTwitter from './ordered/design-twitter'
import findMedianFromDataStream from './ordered/find-median-from-data-stream'
import combinationSum from './recursive/combination-sum'
import permutations from './recursive/permutations'
import subsetsIi from './recursive/subsets-ii'
import combinationSumIi from './recursive/combination-sum-ii'
import wordSearch from './recursive/word-search'
import palindromePartitioning from './recursive/palindrome-partitioning'
import letterCombinationsOfPhone from './recursive/letter-combinations-of-phone'
import nQueens from './recursive/n-queens'
import numberOfIslands from './graph/number-of-islands'
import maxAreaOfIsland from './graph/max-area-of-island'
import cloneGraph from './graph/clone-graph'
import pacificAtlanticWaterFlow from './graph/pacific-atlantic-water-flow'
import surroundedRegions from './graph/surrounded-regions'
import rottingOranges from './graph/rotting-oranges'
import wallsAndGates from './graph/walls-and-gates'
import courseScheduleIi from './graph/course-schedule-ii'
import redundantConnection from './graph/redundant-connection'
import numberOfConnectedComponents from './graph/number-of-connected-components'
import graphValidTree from './graph/graph-valid-tree'
import wordLadder from './graph/word-ladder'
import minCostClimbingStairs from './optimization/min-cost-climbing-stairs'
import houseRobber from './optimization/house-robber'
import houseRobberIi from './optimization/house-robber-ii'
import longestPalindromicSubstring from './optimization/longest-palindromic-substring'
import palindromicSubstrings from './optimization/palindromic-substrings'
import decodeWays from './optimization/decode-ways'
import coinChange from './optimization/coin-change'
import maximumProductSubarray from './optimization/maximum-product-subarray'
import wordBreak from './optimization/word-break'
import longestIncreasingSubsequence from './optimization/longest-increasing-subsequence'

export const PROBLEMS: Problem[] = [
  containsDuplicate,
  validPalindrome,
  twoSumIi,
  maxAverageSubarray,
  rangeSumQuery,
  validParentheses,
  nextGreaterElement,
  bubbleSort,
  insertionSort,
  mergeSort,
  binarySearch,
  twoSum,
  removeLinkedListElements,
  linkedListCycle,
  reverseLinkedList,
  climbingStairs,
  maxDepthTree,
  meetingRooms,
  kokoEatingBananas,
  fibonacciNumber,
  levelOrderTraversal,
  subsets,
  assignCookies,
  findPathInGraph,
  courseSchedule,
  connectedComponents,
  kthLargestStream,
  topKFrequent,
  uniquePaths,
  longestPalindromicSubseq,
  partitionEqualSubset,
  singleNumber,
  numberOf1Bits,
  countingBits,
  reverseBits,
  missingNumber,
  sumOfTwoIntegers,
  reverseInteger,
  singleNumberIi,
  rotateImage,
  spiralMatrix,
  setMatrixZeroes,
  happyNumber,
  plusOne,
  powerXN,
  multiplyStrings,
  romanToInteger,
  integerToRoman,
  countPrimes,
  detectSquares,
  mergeSortedArray,
  sortAnArray,
  largestNumber,
  hIndex,
  wiggleSortIi,
  maximumGap,
  runningSum1dArray,
  findPivotIndex,
  rangeSumQueryImmutable,
  contiguousArray,
  maximumSubarraySumOneDeletion,
  countOfRangeSum,
  validPalindromeIi,
  longestPalindromicSubsequence,
  reverseWordsInString,
  stringToIntegerAtoi,
  isSubsequence,
  longestCommonPrefix,
  findFirstOccurrenceString,
  minimumAddMakeParenthesesValid,
  encodeDecodeStrings,
  zigzagConversion,
  countAndSay,
  textJustification,
  implementTrie,
  designAddSearchWords,
  replaceWords,
  longestWordInDictionary,
  wordSearchIi,
  mergeIntervals,
  insertInterval,
  nonOverlappingIntervals,
  meetingRoomsIi,
  minimumArrowsBurstBalloons,
  intervalListIntersections,
  myCalendarI,
  jumpGame,
  jumpGameIi,
  gasStation,
  handOfStraights,
  partitionLabels,
  validParenthesisString,
  candy,
  boatsToSavePeople,
  lemonadeChange,
  mergeTripletsFormTarget,
  nextGreaterElementIi,
  onlineStockSpan,
  sumOfSubarrayMinimums,
  _132Pattern,
  removeDuplicateLetters,
  removeKDigits,
  maximumWidthRamp,
  maximumSubarray,
  subarraySumEqualsK,
  moveZeroes,
  findAllDuplicatesInArray,
  firstMissingPositive,
  pascalsTriangle,
  bestTimeBuySellStockIi,
  rotateArray,
  nextPermutation,
  squaresSortedArray,
  sortArrayByParity,
  _3sumClosest,
  maxKSumPairs,
  _4sum,
  minimumLengthAfterDeleting,
  maxConsecutiveOnesIii,
  minimumSizeSubarraySum,
  fruitIntoBaskets,
  countNumberNiceSubarrays,
  grumpyBookstoreOwner,
  substringConcatenationAllWords,
  decodeString,
  basicCalculatorIi,
  simplifyPath,
  asteroidCollision,
  basicCalculator,
  scoreOfParentheses,
  findMinRotatedSortedArrayIi,
  capacityShipPackages,
  findKClosestElements,
  splitArrayLargestSum,
  searchRotatedSortedArrayIi,
  minimumSpeedArriveOnTime,
  palindromeLinkedList,
  middleOfLinkedList,
  sortList,
  flattenMultilevelDoublyLinkedList,
  pathSum,
  symmetricTree,
  binaryTreeZigzagLevelOrder,
  convertSortedArrayToBst,
  deleteNodeInBst,
  lowestCommonAncestorBinaryTree,
  countCompleteTreeNodes,
  verticalOrderTraversal,
  allNodesDistanceK,
  flattenBinaryTreeToLinkedList,
  reorganizeString,
  kPairsSmallestSums,
  minimumCostConnectSticks,
  ipo,
  maximumFrequencyStack,
  combinationSumIii,
  combinations,
  restoreIpAddresses,
  wordBreakIi,
  nQueensIi,
  sudokuSolver,
  _01Matrix,
  shortestPathBinaryMatrix,
  allPathsSourceToTarget,
  numberOfProvinces,
  isGraphBipartite,
  evaluateDivision,
  accountsMerge,
  findEventualSafeStates,
  snakesAndLadders,
  minimumHeightTrees,
  detonateMaximumBombs,
  networkDelayTime,
  minCostConnectAllPoints,
  swimInRisingWater,
  cheapestFlightsKStops,
  reconstructItinerary,
  criticalConnectionsNetwork,
  findCitySmallestNeighbors,
  pathWithMaxProbability,
  deleteAndEarn,
  minimumCostForTickets,
  perfectSquares,
  nthTribonacciNumber,
  jumpGameIii,
  arithmeticSlices,
  numberLongestIncreasingSubsequence,
  integerBreak,
  uniquePathsIi,
  longestCommonSubsequence,
  bestTimeBuySellStockCooldown,
  coinChangeIi,
  targetSum,
  interleavingString,
  longestIncreasingPathMatrix,
  distinctSubsequences,
  editDistance,
  burstBalloons,
  regularExpressionMatching,
  stoneGame,
  openTheLock,
  minimumGeneticMutation,
  keysAndRooms,
  numberOperationsMakeNetworkConnected,
  frogJump,
  maximumTotalImportanceRoads,
  bestTimeBuySellStockIii,
  bestTimeBuySellStockIv,
  minimumTapsOpenWaterGarden,
  maximumLengthRepeatedSubarray,
  countNumberOfTeams,
  dominoTrominoTiling,
  houseRobberIii,
  pathSumIi,
  populatingNextRightPointers,
  sumRootToLeafNumbers,
  binarySearchTreeIterator,
  trimBinarySearchTree,
  recoverBinarySearchTree,
  smallestRangeKLists,
  minimumCostTreeLeafValues,
  continuousSubarraySum,
  findAllNumbersDisappeared,
  sortColors,
  majorityElement,
  maxSumRectangleNoLargerK,
  numberOfSubarraysBoundedMax,
  maximumSum3NonOverlapping,
  checkIfArrayPairsDivisibleByK,
  validAnagram,
  groupAnagrams,
  productOfArrayExceptSelf,
  validSudoku,
  longestConsecutiveSequence,
  _3sum,
  containerWithMostWater,
  trappingRainWater,
  bestTimeToBuyAndSellStock,
  longestSubstringWithoutRepeatingChars,
  longestRepeatingCharacterReplacement,
  permutationInString,
  minimumWindowSubstring,
  slidingWindowMaximum,
  minStack,
  evaluateReversePolishNotation,
  generateParentheses,
  dailyTemperatures,
  carFleet,
  largestRectangleInHistogram,
  searchA2dMatrix,
  findMinimumInRotatedSortedArray,
  searchInRotatedSortedArray,
  timeBasedKeyValueStore,
  medianOfTwoSortedArrays,
  mergeTwoSortedLists,
  reorderList,
  removeNthNodeFromEnd,
  addTwoNumbers,
  findTheDuplicateNumber,
  lruCache,
  mergeKSortedLists,
  reverseNodesInKGroup,
  copyListWithRandomPointer,
  invertBinaryTree,
  diameterOfBinaryTree,
  balancedBinaryTree,
  sameTree,
  subtreeOfAnotherTree,
  lowestCommonAncestorOfBst,
  binaryTreeRightSideView,
  countGoodNodesInBinaryTree,
  validateBinarySearchTree,
  kthSmallestElementInBst,
  constructTreeFromPreorderInorder,
  binaryTreeMaximumPathSum,
  serializeAndDeserializeBinaryTree,
  lastStoneWeight,
  kClosestPointsToOrigin,
  kthLargestElementInArray,
  taskScheduler,
  designTwitter,
  findMedianFromDataStream,
  combinationSum,
  permutations,
  subsetsIi,
  combinationSumIi,
  wordSearch,
  palindromePartitioning,
  letterCombinationsOfPhone,
  nQueens,
  numberOfIslands,
  maxAreaOfIsland,
  cloneGraph,
  pacificAtlanticWaterFlow,
  surroundedRegions,
  rottingOranges,
  wallsAndGates,
  courseScheduleIi,
  redundantConnection,
  numberOfConnectedComponents,
  graphValidTree,
  wordLadder,
  minCostClimbingStairs,
  houseRobber,
  houseRobberIi,
  longestPalindromicSubstring,
  palindromicSubstrings,
  decodeWays,
  coinChange,
  maximumProductSubarray,
  wordBreak,
  longestIncreasingSubsequence,
] as Problem[]

export function problemForConcept(conceptId: string): Problem | undefined {
  return PROBLEMS.find(p => p.conceptId === conceptId)
}
