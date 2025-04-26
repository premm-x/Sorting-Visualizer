import { cloneArray, swap, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {
  // Initialize animation steps array
  const steps = []
  // Clone the array to avoid modifying the original
  const auxArray = cloneArray(array)
  const n = auxArray.length
  
  // Add initial state
  steps.push(createStep(auxArray))
  
  // Selection sort algorithm with animation steps
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    
    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      // Add step showing comparison
      steps.push(createStep(auxArray, [minIndex, j]))
      
      if (auxArray[j] < auxArray[minIndex]) {
        minIndex = j
      }
    }
    
    // If minimum element is not at the expected position, swap
    if (minIndex !== i) {
      // Add step showing the swap
      steps.push(createStep(auxArray, [i, minIndex], [i, minIndex]))
      
      // Perform the swap
      swap(auxArray, i, minIndex)
      
      // Add step after swap
      steps.push(createStep(auxArray, [i, minIndex], [i, minIndex]))
    }
    
    // Mark the element as sorted
    steps.push(createStep(auxArray, [], [], [i]))
  }
  
  // Mark the last element as sorted
  steps.push(createStep(auxArray, [], [], [n - 1]))
  
  // Final state
  steps.push(createStep(auxArray, [], [], Array.from({ length: n }, (_, i) => i)))
  
  return steps
}