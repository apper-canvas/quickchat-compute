import StatusCarousel from '@/components/organisms/StatusCarousel'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const StatusPage = () => {
  const handleCreateStatus = () => {
    toast.info('Status creation coming soon!')
  }

  return (
    <div className="h-full bg-background relative">
      <StatusCarousel />
      
      {/* Recent Updates Section */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Recent Updates</h2>
        
        <div className="text-center py-12">
          <ApperIcon name="Circle" size={48} className="text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">No recent updates</h3>
          <p className="text-surface-600 mb-6">Status updates from your contacts will appear here</p>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="absolute bottom-6 right-6"
      >
        <Button
          onClick={handleCreateStatus}
          variant="primary"
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Camera" size={24} />
        </Button>
      </motion.div>
    </div>
  )
}

export default StatusPage