import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

const MessageBubble = ({ message, isOwnMessage, showTime = true }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <ApperIcon name="Check" size={14} className="text-surface-400" />
      case 'delivered':
        return (
          <div className="flex -space-x-1">
            <ApperIcon name="Check" size={14} className="text-surface-400" />
            <ApperIcon name="Check" size={14} className="text-surface-400" />
          </div>
        )
      case 'read':
        return (
          <div className="flex -space-x-1">
            <ApperIcon name="Check" size={14} className="text-primary" />
            <ApperIcon name="Check" size={14} className="text-primary" />
          </div>
        )
      default:
        return null
    }
  }

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-bubble shadow-sm ${
            isOwnMessage
              ? 'bg-primary text-white rounded-br-md'
              : 'bg-white text-surface-900 rounded-bl-md'
          } message-bubble`}
        >
          {message.type === 'image' && message.mediaUrl ? (
            <div className="mb-2">
              <img
                src={message.mediaUrl}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto"
                style={{ maxHeight: '200px' }}
              />
            </div>
          ) : null}
          
          <p className="text-sm break-words">{message.content}</p>
          
          {showTime && (
            <div className={`flex items-center justify-end gap-1 mt-1 ${
              isOwnMessage ? 'text-white/70' : 'text-surface-500'
            }`}>
              <span className="text-xs">
                {formatTime(message.timestamp)}
              </span>
              {isOwnMessage && getStatusIcon(message.status)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MessageBubble