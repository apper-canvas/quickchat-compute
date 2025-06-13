import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/components/atoms/Avatar'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const ChatListItem = ({ chat, index }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/chat/${chat.id}`)
  }

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  const getLastMessagePreview = (message) => {
    if (!message) return 'No messages yet'
    
    if (message.type === 'image') {
      return '📷 Photo'
    }
    
    return message.content.length > 40 
      ? `${message.content.substring(0, 40)}...` 
      : message.content
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-surface-50 transition-colors border-b border-surface-100 last:border-b-0"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {chat.type === 'group' ? (
          <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center">
            <ApperIcon name="Users" size={20} className="text-surface-500" />
          </div>
        ) : (
          <Avatar src={chat.avatar} alt={chat.name} size="md" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-surface-900 truncate">{chat.name}</h3>
          {chat.lastMessage && (
            <span className="text-xs text-surface-500 flex-shrink-0">
              {formatTime(chat.lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-surface-600 truncate">
            {getLastMessagePreview(chat.lastMessage)}
          </p>
          
          {chat.unreadCount > 0 && (
            <Badge variant="primary" size="xs" className="ml-2">
              {chat.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatListItem