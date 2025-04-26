// Generates a random array of the specified size and value range
export const generateRandomArray = (size, min, max) => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// Creates a deep copy of an array to avoid reference issues
export const cloneArray = (array) => {
  return [...array]
}

// Swap two elements in an array
export const swap = (array, i, j) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

// Helper function to create a step object for the animation
export const createStep = (array, comparing = [], swapping = [], sorted = []) => {
  return {
    array: [...array],
    comparing,
    swapping,
    sorted
  }
}

// Delay helper for sleep simulation (if needed)
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}