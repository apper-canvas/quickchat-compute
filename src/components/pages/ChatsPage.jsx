import ChatList from '@/components/organisms/ChatList'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'

const ChatsPage = () => {
  return (
    <div className="h-full bg-background relative">
      <ChatList />
      
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute bottom-6 right-6"
      >
        <Button
          variant="primary"
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="MessageCircle" size={24} />
        </Button>
      </motion.div>
    </div>
  )
}

export default ChatsPage