import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ContactListItem = ({ contact, onStartChat, index }) => {
  const formatLastSeen = (timestamp) => {
    if (contact.status === 'online') return 'Online'
    return `Last seen ${formatDistanceToNow(new Date(timestamp), { addSuffix: true })}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="flex items-center gap-3 p-4 hover:bg-surface-50 transition-colors border-b border-surface-100 last:border-b-0"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Avatar 
          src={contact.avatar} 
          alt={contact.name} 
          size="md"
          status={contact.status}
        />
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-surface-900 truncate">{contact.name}</h3>
        <p className="text-sm text-surface-600">{contact.phone}</p>
        <p className="text-xs text-surface-500">
          {formatLastSeen(contact.lastSeen)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onStartChat(contact)}
          className="text-primary hover:bg-primary/10"
        >
          <ApperIcon name="MessageCircle" size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-surface-500 hover:bg-surface-100"
        >
          <ApperIcon name="Phone" size={18} />
        </Button>
      </div>
    </motion.div>
  )
}

export default ContactListItem