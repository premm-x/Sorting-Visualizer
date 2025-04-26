import { motion } from 'framer-motion'

function AlgorithmInfo({ algorithm, currentStep, totalSteps }) {
  const progress = totalSteps > 0 ? Math.min(Math.floor((currentStep / (totalSteps - 1)) * 100), 100) : 0

  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4 h-full">
      <h3 className="text-xl font-bold text-primary mb-2">{algorithm.name}</h3>

      {totalSteps > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-neutral-400">Progress</span>
            <span className="text-xs font-mono">{progress}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 15 }}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-neutral-300 mb-1">Time Complexity</h4>
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">Best Case:</span>
              <span className="text-sm font-mono text-primary-light">{algorithm.bestCase}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">Average Case:</span>
              <span className="text-sm font-mono text-primary-light">{algorithm.timeComplexity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">Worst Case:</span>
              <span className="text-sm font-mono text-primary-light">{algorithm.worstCase}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-400">Space:</span>
              <span className="text-sm font-mono text-primary-light">{algorithm.spaceComplexity}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-neutral-300 mb-1">Description</h4>
          <p className="text-sm text-neutral-400 leading-relaxed">{algorithm.description}</p>
        </div>

        <div className="border-t border-neutral-800 pt-3 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-comparing rounded-full mr-2"></div>
            <span className="text-xs text-neutral-400">Comparing</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
            <span className="text-xs text-neutral-400">Swapping</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-sorted rounded-full mr-2"></div>
            <span className="text-xs text-neutral-400">Sorted</span>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default AlgorithmInfo