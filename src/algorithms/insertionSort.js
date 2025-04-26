import { cloneArray, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {
  // Initialize animation steps array
  const steps = []
  // Clone the array to avoid modifying the original
  const auxArray = cloneArray(array)
  const n = auxArray.length
  
  // Add initial state
  steps.push(createStep(auxArray))
  
  // Mark first element as sorted
  steps.push(createStep(auxArray, [], [], [0]))
  
  // Insertion sort algorithm with animation steps
  for (let i = 1; i < n; i++) {
    const key = auxArray[i]
    let j = i - 1
    
    // Add step showing the current element to be inserted
    steps.push(createStep(auxArray, [i]))
    
    while (j >= 0 && auxArray[j] > key) {
      // Add step showing comparison
      steps.push(createStep(auxArray, [j, j + 1], [j, j + 1]))
      
      // Shift elements
      auxArray[j + 1] = auxArray[j]
      
      // Add step after shift
      steps.push(createStep(auxArray, [j, j + 1], [j, j + 1]))
      
      j--
    }
    
    // Place the key at the correct position
    auxArray[j + 1] = key
    
    // Add step after insertion
    steps.push(createStep(auxArray, [j + 1]))
    
    // Mark elements up to i as sorted
    steps.push(createStep(auxArray, [], [], Array.from({ length: i + 1 }, (_, idx) => idx)))
  }
  
  // Final state
  steps.push(createStep(auxArray, [], [], Array.from({ length: n }, (_, i) => i)))
  
  return steps
}