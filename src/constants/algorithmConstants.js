import * as bubbleSort from '../algorithms/bubbleSort'
import * as selectionSort from '../algorithms/selectionSort'
import * as insertionSort from '../algorithms/insertionSort'
import * as mergeSort from '../algorithms/mergeSort'
import * as quickSort from '../algorithms/quickSort'
import * as heapSort from '../algorithms/heapSort'

export const ALGORITHMS = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    algorithm: bubbleSort.getAnimationSteps,
    description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    bestCase: 'O(n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    algorithm: selectionSort.getAnimationSteps,
    description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist. The algorithm finds the minimum element from the unsorted sublist and moves it to the sorted sublist.',
    timeComplexity: 'O(n²)',
    bestCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    algorithm: insertionSort.getAnimationSteps,
    description: 'A simple sorting algorithm that builds the final sorted array one element at a time. It is efficient for small datasets or mostly-sorted arrays.',
    timeComplexity: 'O(n²)',
    bestCase: 'O(n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    algorithm: mergeSort.getAnimationSteps,
    description: 'An efficient, divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    algorithm: quickSort.getAnimationSteps,
    description: 'A highly efficient sorting algorithm that uses the divide-and-conquer strategy. It works by selecting a pivot element and partitioning the array around the pivot.',
    timeComplexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(log n)'
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    algorithm: heapSort.getAnimationSteps,
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure. It builds a max-heap first, then repeatedly extracts the maximum element.',
    timeComplexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(1)'
  }
]