import { motion } from 'framer-motion'
import Button from './Button'
import ApperIcon from '@/components/ApperIcon'

const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry,
  title = 'Oops!',
  actionLabel = 'Try Again'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
      >
        <ApperIcon name="AlertCircle" size={48} className="text-error mb-4" />
      </motion.div>
      
      <h3 className="text-lg font-semibold text-surface-900 mb-2">{title}</h3>
      <p className="text-surface-600 mb-6 max-w-sm">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={16} />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}

export default ErrorState