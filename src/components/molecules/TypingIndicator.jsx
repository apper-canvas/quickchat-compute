import { motion } from 'framer-motion'

const TypingIndicator = ({ userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex justify-start mb-4"
    >
      <div className="max-w-xs">
        <div className="bg-white text-surface-900 px-4 py-2 rounded-bubble rounded-bl-md shadow-sm">
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-surface-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-surface-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-surface-400 rounded-full typing-dot"></div>
            </div>
          </div>
        </div>
        <p className="text-xs text-surface-500 mt-1 px-2">
          {userName} is typing...
        </p>
      </div>
    </motion.div>
  )
}

export default TypingIndicator