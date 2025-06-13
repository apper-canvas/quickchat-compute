import { motion } from 'framer-motion'
import Button from './Button'
import ApperIcon from '@/components/ApperIcon'

const EmptyState = ({ 
  title = 'Nothing here yet',
  description = 'Items will appear here when available',
  actionLabel,
  onAction,
  icon = 'Inbox'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4"
      >
        <ApperIcon name={icon} size={48} className="text-surface-300" />
      </motion.div>
      
      <h3 className="text-lg font-medium text-surface-900 mb-2">{title}</h3>
      <p className="text-surface-600 mb-6 max-w-sm">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}

export default EmptyState