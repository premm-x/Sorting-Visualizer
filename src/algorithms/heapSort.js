import { cloneArray, swap, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {
  // Initialize animation steps array
  const steps = []
  // Clone the array to avoid modifying the original
  const auxArray = cloneArray(array)
  const n = auxArray.length
  
  // Add initial state
  steps.push(createStep(auxArray))
  
  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(auxArray, n, i, steps)
  }
  
  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    steps.push(createStep(auxArray, [0, i], [0, i]))
    swap(auxArray, 0, i)
    steps.push(createStep(auxArray, [0, i], [0, i]))
    
    // Mark the element as sorted
    steps.push(createStep(auxArray, [], [], [i]))
    
    // Call heapify on the reduced heap
    heapify(auxArray, i, 0, steps)
  }
  
  // Mark the first element as sorted
  steps.push(createStep(auxArray, [], [], [0]))
  
  // Final state
  steps.push(createStep(auxArray, [], [], Array.from({ length: n }, (_, i) => i)))
  
  return steps
}

// To heapify a subtree rooted with node i
function heapify(array, n, i, steps) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2
  
  // Compare with left child
  if (left < n) {
    steps.push(createStep(array, [largest, left]))
    
    if (array[left] > array[largest]) {
      largest = left
    }
  }
  
  // Compare with right child
  if (right < n) {
    steps.push(createStep(array, [largest, right]))
    
    if (array[right] > array[largest]) {
      largest = right
    }
  }
  
  // If largest is not the root
  if (largest !== i) {
    // Swap
    steps.push(createStep(array, [i, largest], [i, largest]))
    swap(array, i, largest)
    steps.push(createStep(array, [i, largest], [i, largest]))
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, steps)
  }
}