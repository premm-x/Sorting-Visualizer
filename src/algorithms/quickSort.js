import { cloneArray, swap, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {
  // Initialize animation steps array
  const steps = []
  // Clone the array to avoid modifying the original
  const auxArray = cloneArray(array)
  
  // Add initial state
  steps.push(createStep(auxArray))
  
  // Start quick sort
  quickSortHelper(auxArray, 0, auxArray.length - 1, steps)
  
  // Final state
  steps.push(createStep(auxArray, [], [], Array.from({ length: auxArray.length }, (_, i) => i)))
  
  return steps
}

// Quick sort helper function
function quickSortHelper(array, low, high, steps) {
  if (low < high) {
    // Find the partition index
    const pivotIndex = partition(array, low, high, steps)
    
    // Mark the pivot as sorted
    steps.push(createStep(array, [], [], [pivotIndex]))
    
    // Recursively sort elements before and after partition
    quickSortHelper(array, low, pivotIndex - 1, steps)
    quickSortHelper(array, pivotIndex + 1, high, steps)
  } else if (low === high) {
    // Single element is already sorted
    steps.push(createStep(array, [], [], [low]))
  }
}

// Partition function for quick sort
function partition(array, low, high, steps) {
  // Choose the rightmost element as pivot
  const pivot = array[high]
  
  // Show the pivot element
  steps.push(createStep(array, [high]))
  
  let i = low - 1
  
  // Compare all elements with pivot
  for (let j = low; j < high; j++) {
    // Add comparison step
    steps.push(createStep(array, [j, high]))
    
    if (array[j] <= pivot) {
      i++
      
      // Swap if needed
      if (i !== j) {
        steps.push(createStep(array, [i, j], [i, j]))
        swap(array, i, j)
        steps.push(createStep(array, [i, j], [i, j]))
      }
    }
  }
  
  // Place the pivot element at its correct position
  const pivotPosition = i + 1
  
  if (pivotPosition !== high) {
    steps.push(createStep(array, [pivotPosition, high], [pivotPosition, high]))
    swap(array, pivotPosition, high)
    steps.push(createStep(array, [pivotPosition, high], [pivotPosition, high]))
  }
  
  return pivotPosition
}