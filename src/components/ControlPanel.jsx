import { useState , useEffect} from 'react'

function ControlPanel({
  isSorting,
  isPaused,
  startSorting,
  pauseSorting,
  resetArray,
  animationSpeed,
  setAnimationSpeed,
  arraySize,
  setArraySize,
  isCompleted
}) {
  const [showSettings, setShowSettings] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const handleArraySizeChange = (e) => {
    if (!isSorting) {
      setArraySize(Number(e.target.value))
    }
  }
  
  const handleSpeedChange = (e) => {
    setAnimationSpeed(Number(e.target.value))
  }
  
  // Calculate slider background fill
  const getSliderBackground = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100
    return `linear-gradient(to right, #3498db ${percentage}%, #334155 ${percentage}%)`
  }

  useEffect (()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  },[]);
  
  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4">

      <div className="flex flex-wrap gap-4 items-center justify-between">

        <div className="flex flex-wrap gap-3">
          <button
            onClick={isCompleted || (!isSorting || isPaused) ? startSorting : pauseSorting}
            className={`btn ${isPaused || !isSorting ? 'btn-primary' : 'btn-secondary'}`}
            disabled={isCompleted && !isPaused}
          >
            {isPaused ? 'Resume' : isSorting ? 'Pause' : 'Start Sorting'}
          </button>
          
          <button
            onClick={resetArray}
            className="btn btn-outline"
            disabled={isSorting && !isPaused}
          >
            Generate New Array
          </button>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </button>

      </div>
      
      {showSettings && (
        <div className="mt-4 border-t border-neutral-800 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="speed-slider" className="flex justify-between text-sm text-neutral-400 mb-2">
              Animation Speed
              <span className="text-neutral-300">{animationSpeed}%</span>
            </label>
            <input
              id="speed-slider"
              type="range"
              min="1"
              max="100"
              value={animationSpeed}
              onChange={handleSpeedChange}
              // disabled={isSorting}
              className="slider"
              style={{ background: getSliderBackground(animationSpeed, 1, 100) }}
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
          
          <div>
            <label htmlFor="size-slider" className="flex justify-between text-sm text-neutral-400 mb-2">
              Array Size
              <span className="text-neutral-300">{arraySize} elements</span>
            </label>
            <input
              id="size-slider"
              type="range"
              min="5"
              max={isMobile ? 100 : 200}
              value={arraySize}
              onChange={handleArraySizeChange}
              disabled={isSorting && !isPaused}
              className="slider"
              style={{ background: getSliderBackground(arraySize, 5, isMobile ? 100 : 200) }}
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>Few</span>
              <span>Many</span>
            </div>
          </div>
          
        </div>
      )}
      
    </div>
  )
}

export default ControlPanel