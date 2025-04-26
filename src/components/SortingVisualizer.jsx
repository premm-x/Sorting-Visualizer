import { useState, useEffect, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArrayBar from './ArrayBar'
import ControlPanel from './ControlPanel'
import AlgorithmContext from '../context/AlgorithmContext'
import { generateRandomArray } from '../utils/arrayUtils'
import AlgorithmInfo from './AlgorithmInfo'

function SortingVisualizer() {
  const { currentAlgorithm } = useContext(AlgorithmContext)
  const [array, setArray] = useState([])
  const [animationSpeed, setAnimationSpeed] = useState(50)
  const [arraySize, setArraySize] = useState(50)
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sortingSteps, setSortingSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  //state
  const [comparingIndices, setComparingIndices] = useState([])
  const [swappingIndices, setSwappingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  
  // References for animation control
  const animationTimeoutRef = useRef(null)
  const sortingCompleted = useRef(false)
  const previousAlgorithm = useRef(currentAlgorithm)
  
  useEffect(() => {
    resetArray()
  }, [arraySize])
  
  // Effect to handle algorithm changes during sorting
  useEffect(() => {
    if (isSorting && !isPaused && previousAlgorithm.current !== currentAlgorithm) {
      // Save current array state
      const currentArrayState = [...array]
      
      // Reset animation state
      clearAnimationTimeout()
      setCurrentStep(0)
      setSortingSteps([])
      setComparingIndices([])
      setSwappingIndices([])
      setSortedIndices([])
      
      // Generate new sorting steps with current array state
      const newSteps = currentAlgorithm.algorithm(currentArrayState)
      setSortingSteps(newSteps)
      
      // Start animation with new algorithm
      runAnimation(newSteps, 0)
    }
    previousAlgorithm.current = currentAlgorithm
  }, [currentAlgorithm])
  
  // Reset the array with new random values
  const resetArray = () => {
    clearAnimationTimeout()
    setIsSorting(false)
    setIsPaused(false)
    setCurrentStep(0)
    setSortingSteps([])
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    sortingCompleted.current = false
    
    const newArray = generateRandomArray(arraySize, 5, 500)
    setArray(newArray)
  }
  
  // Clear any ongoing animation timeout
  const clearAnimationTimeout = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
  }
  
  // Calculate animation delay based on speed
  const getAnimationDelay = () => {
    // Convert speed (1-100) to delay (1000ms-1ms) using exponential scale
    const minDelay = 1
    const maxDelay = 1000
    const speedFactor = (100 - animationSpeed) / 100 // Invert so higher speed = lower delay
    return Math.max(minDelay, Math.floor(minDelay + (maxDelay - minDelay) * Math.pow(speedFactor, 2)))
  }
  
  // Start sorting process
  const startSorting = async () => {
    if (isSorting && !isPaused) return
    
    // If paused, resume from current step
    if (isPaused) {
      setIsPaused(false)
      runAnimation()
      return
    }
    
    // Start new sorting
    setIsSorting(true)
    sortingCompleted.current = false
    setCurrentStep(0)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    
    // Generate sorting steps
    const steps = currentAlgorithm.algorithm([...array])
    setSortingSteps(steps)
    
    // Start animation
    runAnimation(steps, 0)
  }
  
  // Pause sorting animation
  const pauseSorting = () => {
    setIsPaused(true)
    clearAnimationTimeout()
  }
  
  // Run the sorting animation
  const runAnimation = (steps = sortingSteps, step = currentStep) => {
    if (!steps || steps.length === 0 || step >= steps.length) return
    
    // Set current step data
    setCurrentStep(step)
    const { array: newArray, comparing, swapping, sorted } = steps[step]
    
    setArray([...newArray])
    setComparingIndices(comparing || [])
    setSwappingIndices(swapping || [])
    
    // Accumulate sorted indices
    if (sorted && sorted.length > 0) {
      setSortedIndices(prev => [...new Set([...prev, ...sorted])])
    }
    
    // Check if sorting is completed
    if (step === steps.length - 1) {
      setTimeout(() => {
        // Mark all as sorted when done
        setSortedIndices(Array.from({ length: array.length }, (_, i) => i))
        sortingCompleted.current = true
        setIsSorting(false)
      }, 500)
      return
    }
    
    // Schedule next animation step with dynamic delay
    const delay = getAnimationDelay()
    animationTimeoutRef.current = setTimeout(() => {
      runAnimation(steps, step + 1)
    }, delay)
  }
  
  // Calculate the maximum array value for scaling
  const maxArrayValue = Math.max(...array)
  
  return (
    <div className="flex flex-col gap-8">
      <ControlPanel 
        isSorting={isSorting}
        isPaused={isPaused}
        startSorting={startSorting}
        pauseSorting={pauseSorting}
        resetArray={resetArray}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        arraySize={arraySize}
        setArraySize={setArraySize}
        isCompleted={sortingCompleted.current}
      />
      
      <div className="flex flex-col-reverse md:flex-row gap-4">

        <div className="md:w-1/4">
          <AlgorithmInfo 
            algorithm={currentAlgorithm} 
            currentStep={currentStep}
            totalSteps={sortingSteps.length}
          />
        </div>
        
        <div className="flex-1 bg-neutral-900 p-3 pt-6 rounded-lg border border-neutral-800 flex items-end justify-center overflow-auto">
          <AnimatePresence mode="wait"  >
            <div className="flex items-end h-[300px] md:h-full w-full gap-1">
              {array.map((value, index) => {
                // Determine bar state for coloring
                const isComparing = comparingIndices.includes(index)
                const isSwapping = swappingIndices.includes(index)
                const isSorted = sortedIndices.includes(index)
                
                return (
                  <ArrayBar
                    key={`${index}-${value}`}
                    value={value}
                    index={index}
                    maxValue={maxArrayValue}
                    isComparing={isComparing}
                    isSwapping={isSwapping}
                    isSorted={isSorted}
                    total={array.length}
                  />
                )

              })}
            </div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}

export default SortingVisualizer