import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { storyService } from '@/services'
import { formatDistanceToNow } from 'date-fns'

const StatusDetailPage = () => {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const [stories, setStories] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    loadStory()
  }, [storyId])

  useEffect(() => {
    if (stories.length > 0 && !paused) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentIndex < stories.length - 1) {
              setCurrentIndex(prev => prev + 1)
              return 0
            } else {
              navigate('/status')
              return prev
            }
          }
          return prev + 2 // 2% every 100ms = 5 seconds total
        })
      }, 100)

      return () => clearInterval(timer)
    }
  }, [currentIndex, stories.length, paused, navigate])

  const loadStory = async () => {
    try {
      const story = await storyService.getById(storyId)
      if (story) {
        const userStories = await storyService.getByUserId(story.userId)
        setStories(userStories)
        
        // Find current story index
        const index = userStories.findIndex(s => s.id === storyId)
        setCurrentIndex(index >= 0 ? index : 0)
        
        // Mark as viewed
        await storyService.addView(storyId, 'me')
      } else {
        toast.error('Story not found')
        navigate('/status')
      }
    } catch (err) {
      toast.error('Failed to load story')
      navigate('/status')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setProgress(0)
    } else {
      navigate('/status')
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  const handleClose = () => {
    navigate('/status')
  }

  const handleReply = () => {
    toast.info('Reply feature coming soon!')
  }

  if (loading) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading story...</p>
        </div>
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <ApperIcon name="Circle" size={48} className="mx-auto mb-4" />
          <p>Story not found</p>
          <Button onClick={handleClose} variant="secondary" className="mt-4">
            Back to Status
          </Button>
        </div>
      </div>
    )
  }

  const currentStory = stories[currentIndex]

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-4">
        {stories.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-50 flex items-center gap-3 p-4 text-white">
        <Avatar src={currentStory.userAvatar} alt={currentStory.userName} size="sm" />
        <div className="flex-1">
          <p className="font-medium">{currentStory.userName}</p>
          <p className="text-sm text-white/70">
            {formatDistanceToNow(new Date(currentStory.timestamp), { addSuffix: true })}
          </p>
        </div>
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      {/* Story Content */}
      <div 
        className="h-full flex items-center justify-center"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col items-center justify-center p-4"
          >
            {currentStory.mediaUrl && (
              <img
                src={currentStory.mediaUrl}
                alt="Story content"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
            {currentStory.content && (
              <div className="absolute bottom-32 left-0 right-0 p-6">
                <p className="text-white text-center text-lg bg-black/50 rounded-lg p-4">
                  {currentStory.content}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex">
        <div 
          className="flex-1 cursor-pointer"
          onClick={handlePrevious}
        />
        <div 
          className="flex-1 cursor-pointer"
          onClick={handleNext}
        />
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3">
        <div className="flex-1 bg-white/10 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Reply..."
            className="w-full bg-transparent text-white placeholder-white/70 outline-none"
            onFocus={handleReply}
          />
        </div>
        <Button
          onClick={handleReply}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ApperIcon name="Heart" size={20} />
        </Button>
        <Button
          onClick={handleReply}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ApperIcon name="Send" size={20} />
        </Button>
      </div>
    </div>
  )
}

export default StatusDetailPage