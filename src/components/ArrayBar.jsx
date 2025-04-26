import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function ArrayBar({ value, index, maxValue, isComparing, isSwapping, isSorted, total }) {
  // Calculate height percentage based on maximum value
  const heightPercentage = (value / maxValue) * 100

  let barColor = 'bg-primary'
  if (isSorted) {
    barColor = 'bg-sorted'
  } else if (isComparing) {
    barColor = 'bg-comparing'
  } else if (isSwapping) {
    barColor = 'bg-secondary'
  }

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate width based on total number of bars
  let barWidth;

  if (!isMobile) {
    barWidth = total <= 20 ? 'w-8' :
      total <= 50 ? 'w-2' :
        total <= 100 ? 'w-1' : 'w-px'
  } else {
    barWidth = total <= 20 ? 'w-[12px]' :
      total <= 50 ? 'w-[3px]' :
        total <= 70 ? 'w-[1px]':
          total <= 80 ? 'w-[0.5px]' : total <= 100 ? 'w-[0.2px]': 'w-px'
  }

  // Show value for small arrays
  const showValue = total <= 20

  return (
    <motion.div
      className={`${barColor} ${barWidth} rounded-t-sm relative flex-shrink-0 flex flex-col-reverse items-center`}
      style={{ height: `${heightPercentage}%` }}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: `${heightPercentage}%`,
        backgroundColor: isComparing ? '#e74c3c' :
          isSwapping ? '#9b59b6' :
            isSorted ? '#27ae60' : '#3498db'
      }}
      transition={{
        height: { type: 'spring', stiffness: 300, damping: 17 },
        backgroundColor: { duration: 0.2 }
      }}
      layout="position"
    >
      {showValue && (
        <span className="text-[10px] font-mono absolute -top-5 text-neutral-100">
          {value}
        </span>
      )}
    </motion.div>
  )
}

export default ArrayBar