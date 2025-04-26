import { cloneArray, swap, createStep } from '../utils/arrayUtils'

export const getAnimationSteps = (array) => {

  const steps = []

  const auxArray = cloneArray(array)
  const n = auxArray.length

  steps.push(createStep(auxArray))


  for (let i = 0; i < n - 1; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {

      steps.push(createStep(auxArray, [j, j + 1]))

      if (auxArray[j] > auxArray[j + 1]) {

        steps.push(createStep(auxArray, [j, j + 1], [j, j + 1]))

        swap(auxArray, j, j + 1)

        steps.push(createStep(auxArray, [j, j + 1], [j, j + 1]))

        swapped = true
      }
    }

    steps.push(createStep(auxArray, [], [], [n - i - 1]))

    if (!swapped) {
      const remainingSorted = Array.from({ length: n - i - 1 }, (_, idx) => idx)
      steps.push(createStep(auxArray, [], [], remainingSorted))
      break
    }
  }

  steps.push(createStep(auxArray, [], [], Array.from({ length: n }, (_, i) => i)))

  return steps
}