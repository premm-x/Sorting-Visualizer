import { useContext } from 'react'
import AlgorithmContext from '../context/AlgorithmContext'
import { ALGORITHMS } from '../constants/algorithmConstants'

function AlgorithmSelector() {
  const { currentAlgorithm, setCurrentAlgorithm } = useContext(AlgorithmContext)
  
  const handleAlgorithmChange = (e) => {
    const selected = ALGORITHMS.find(algo => algo.id === e.target.value)
    if (selected) {
      setCurrentAlgorithm(selected)
    }
  }
  
  return (
    <div className="w-full">
      <select
        value={currentAlgorithm.id}
        onChange={handleAlgorithmChange}
        className="w-full bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      >
        {ALGORITHMS.map(algorithm => (
          <option key={algorithm.id} value={algorithm.id}>
            {algorithm.name}
          </option>
        ))}
        
      </select>
    </div>
  )
}

export default AlgorithmSelector