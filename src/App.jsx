import { useState } from 'react'
import Header from './components/Header'
import SortingVisualizer from './components/SortingVisualizer'
import Footer from './components/Footer'
import AlgorithmContext from './context/AlgorithmContext'
import { ALGORITHMS } from './constants/algorithmConstants'

function App() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState(ALGORITHMS[0])
  
  return (
    <AlgorithmContext.Provider value={{ currentAlgorithm, setCurrentAlgorithm }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <SortingVisualizer />
        </main>
        {/* <Footer /> */}
      </div>
    </AlgorithmContext.Provider>
  )
}

export default App