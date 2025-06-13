import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'

const CallInterface = ({ 
  contact, 
  onEndCall, 
  onToggleMute, 
  onToggleSpeaker,
  isMuted = false,
  isSpeakerOn = false 
}) => {
  const [duration, setDuration] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate call connection after 2 seconds
    const connectTimer = setTimeout(() => {
      setIsConnected(true)
    }, 2000)

    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    let interval
    if (isConnected) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isConnected])

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-secondary z-50 flex flex-col items-center justify-between p-8 text-white"
      >
        {/* Call Status */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: isConnected ? 1 : [1, 1.05, 1] }}
            transition={{ repeat: isConnected ? 0 : Infinity, duration: 2 }}
            className="mb-8"
          >
            <Avatar 
              src={contact.avatar} 
              alt={contact.name} 
              size="xl"
              className="w-32 h-32 border-4 border-white/20"
            />
          </motion.div>

          <h2 className="text-2xl font-semibold mb-2">{contact.name}</h2>
          <p className="text-lg text-white/70 mb-1">
            {isConnected ? formatDuration(duration) : 'Connecting...'}
          </p>
          <p className="text-sm text-white/50">
            {isConnected ? 'Voice call' : 'Calling...'}
          </p>
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Mute Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onToggleMute}
              variant="ghost"
              size="icon"
              className={`w-16 h-16 rounded-full ${
                isMuted 
                  ? 'bg-error text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ApperIcon 
                name={isMuted ? 'MicOff' : 'Mic'} 
                size={24} 
              />
            </Button>
          </motion.div>

          {/* End Call Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onEndCall}
              variant="danger"
              size="icon"
              className="w-20 h-20 rounded-full bg-error text-white hover:bg-error/80"
            >
              <ApperIcon name="PhoneOff" size={28} />
            </Button>
          </motion.div>

          {/* Speaker Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onToggleSpeaker}
              variant="ghost"
              size="icon"
              className={`w-16 h-16 rounded-full ${
                isSpeakerOn 
                  ? 'bg-primary text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ApperIcon 
                name={isSpeakerOn ? 'Volume2' : 'VolumeX'} 
                size={24} 
              />
            </Button>
          </motion.div>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <ApperIcon name="Plus" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <ApperIcon name="MessageSquare" size={20} />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CallInterface