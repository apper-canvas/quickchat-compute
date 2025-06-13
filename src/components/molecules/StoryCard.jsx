import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/components/atoms/Avatar'

const StoryCard = ({ story, index }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/status/${story.stories[0].id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex-shrink-0 cursor-pointer"
    >
      <div className="relative">
        <div className={`p-1 rounded-full ${
          story.viewedAll ? 'bg-surface-300' : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}>
          <Avatar 
            src={story.userAvatar} 
            alt={story.userName} 
            size="lg"
            className="border-2 border-white"
          />
        </div>
        
        {/* Story count indicator */}
        {story.stories.length > 1 && (
          <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {story.stories.length}
          </div>
        )}
      </div>
      
      <p className="text-xs text-center mt-2 truncate w-16">
        {story.userName}
      </p>
    </motion.div>
  )
}

export default StoryCard