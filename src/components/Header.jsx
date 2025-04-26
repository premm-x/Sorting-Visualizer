import { useContext } from 'react'
import AlgorithmSelector from './AlgorithmSelector'
import AlgorithmContext from '../context/AlgorithmContext'

function Header() {
  const { currentAlgorithm } = useContext(AlgorithmContext)
  
  return (
    <header className="bg-neutral-900 border-b border-neutral-800 py-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
              Sorting Visualizer
            </h1>
          </div>
          
          <div className="w-full md:w-auto">
            <AlgorithmSelector />
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-neutral-800 px-3 py-1 rounded-md">
              <span className="text-xs font-mono text-neutral-400">Time Complexity:</span>
              <span className="text-xs font-mono text-primary-light">{currentAlgorithm.timeComplexity}</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  )
}

export default Header