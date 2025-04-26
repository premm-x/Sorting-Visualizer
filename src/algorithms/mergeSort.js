import { cloneArray, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {
  // Initialize animation steps array
  const steps = []
  // Clone the array to avoid modifying the original
  const auxArray = cloneArray(array)
  
  // Add initial state
  steps.push(createStep(auxArray))
  
  // Run merge sort
  mergeSortHelper(auxArray, 0, auxArray.length - 1, steps)
  
  // Final state
  steps.push(createStep(auxArray, [], [], Array.from({ length: auxArray.length }, (_, i) => i)))
  
  return steps
}

// Merge sort helper function
function mergeSortHelper(array, start, end, steps) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2)
    
    // Recursively sort first and second halves
    mergeSortHelper(array, start, mid, steps)
    mergeSortHelper(array, mid + 1, end, steps)
    
    // Merge the sorted halves
    merge(array, start, mid, end, steps)
  }
}

// Merge function
function merge(array, start, mid, end, steps) {
  // Create temporary arrays
  const leftSize = mid - start + 1
  const rightSize = end - mid
  
  const leftArray = array.slice(start, mid + 1)
  const rightArray = array.slice(mid + 1, end + 1)
  
  let i = 0, j = 0, k = start
  
  // Merge the temp arrays back into the main array
  while (i < leftSize && j < rightSize) {
    // Add comparison step
    steps.push(createStep(array, [start + i, mid + 1 + j]))
    
    if (leftArray[i] <= rightArray[j]) {
      steps.push(createStep(array, [start + i, mid + 1 + j], [k]))
      array[k] = leftArray[i]
      i++
    } else {
      steps.push(createStep(array, [start + i, mid + 1 + j], [k]))
      array[k] = rightArray[j]
      j++
    }
    
    // Add step after placement
    steps.push(createStep(array, [], [k]))
    k++
  }
  
  // Copy the remaining elements of left array
  while (i < leftSize) {
    steps.push(createStep(array, [], [k]))
    array[k] = leftArray[i]
    steps.push(createStep(array, [], [k]))
    i++
    k++
  }
  
  // Copy the remaining elements of right array
  while (j < rightSize) {
    steps.push(createStep(array, [], [k]))
    array[k] = rightArray[j]
    steps.push(createStep(array, [], [k]))
    j++
    k++
  }
  
  // Mark the merged section as sorted
  const sortedIndices = Array.from({ length: end - start + 1 }, (_, idx) => start + idx)
  steps.push(createStep(array, [], [], sortedIndices))
}