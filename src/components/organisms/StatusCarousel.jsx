import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import StoryCard from '@/components/molecules/StoryCard'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { storyService } from '@/services'

const StatusCarousel = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await storyService.getAll()
      setStories(result)
    } catch (err) {
      setError(err.message || 'Failed to load stories')
      toast.error('Failed to load stories')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <SkeletonLoader className="w-16 h-16 rounded-full mb-2" />
              <SkeletonLoader className="w-16 h-3" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorState 
          message={error}
          onRetry={loadStories}
        />
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-surface-100">
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* My Status */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <div className="relative">
              <Avatar size="lg" />
              <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                <ApperIcon name="Plus" size={14} />
              </div>
            </div>
            <p className="text-xs text-center mt-2 truncate w-16">My Status</p>
          </motion.div>

          {/* Stories */}
          {stories.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <EmptyState
                title="No status updates"
                description="Be the first to share a status"
                icon="Circle"
              />
            </div>
          ) : (
            stories.map((story, index) => (
              <StoryCard 
                key={story.userId} 
                story={story} 
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default StatusCarousel