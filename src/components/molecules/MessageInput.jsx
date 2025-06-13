import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="p-4 bg-white border-t border-surface-200">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-surface-500 hover:bg-surface-100 flex-shrink-0"
        >
          <ApperIcon name="Paperclip" size={20} />
        </Button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 rounded-3xl border border-surface-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Emoji Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 text-surface-500 hover:bg-surface-100"
          >
            <ApperIcon name="Smile" size={20} />
          </Button>
        </div>

        {/* Send Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="icon"
            disabled={!message.trim() || disabled}
            className="w-12 h-12 rounded-full flex-shrink-0"
          >
            <ApperIcon name="Send" size={20} />
          </Button>
        </motion.div>
      </form>
    </div>
  )
}

export default MessageInput