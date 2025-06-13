import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ChatMessages from '@/components/organisms/ChatMessages'
import MessageInput from '@/components/molecules/MessageInput'
import CallInterface from '@/components/organisms/CallInterface'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { chatService } from '@/services'

const ChatDetailPage = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const [chat, setChat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  useEffect(() => {
    loadChat()
  }, [chatId])

  const loadChat = async () => {
    try {
      const result = await chatService.getById(chatId)
      if (result) {
        setChat(result)
        // Mark chat as read
        await chatService.markAsRead(chatId)
      } else {
        toast.error('Chat not found')
        navigate('/chats')
      }
    } catch (err) {
      toast.error('Failed to load chat')
      navigate('/chats')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate('/chats')
  }

const handleCall = async () => {
    try {
      await chatService.startCall(chatId, 'voice')
      setIsInCall(true)
      setIsMuted(false)
      setIsSpeakerOn(false)
      toast.success('Call started')
    } catch (error) {
      toast.error('Failed to start call')
    }
  }

  const handleVideoCall = async () => {
    try {
      await chatService.startCall(chatId, 'video')
      setIsInCall(true)
      setIsMuted(false)
      setIsSpeakerOn(false)
      toast.success('Video call started')
    } catch (error) {
      toast.error('Failed to start video call')
    }
  }

  const handleEndCall = async () => {
    try {
      await chatService.endCall(chatId)
      setIsInCall(false)
      setIsMuted(false)
      setIsSpeakerOn(false)
      toast.success('Call ended')
    } catch (error) {
      toast.error('Failed to end call')
    }
  }

  const handleToggleMute = async () => {
    try {
      await chatService.toggleMute(chatId)
      setIsMuted(!isMuted)
      toast.success(isMuted ? 'Unmuted' : 'Muted')
    } catch (error) {
      toast.error('Failed to toggle mute')
    }
  }

  const handleToggleSpeaker = async () => {
    try {
      await chatService.toggleSpeaker(chatId)
      setIsSpeakerOn(!isSpeakerOn)
      toast.success(isSpeakerOn ? 'Speaker off' : 'Speaker on')
    } catch (error) {
      toast.error('Failed to toggle speaker')
    }
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-500">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="MessageCircle" size={48} className="text-surface-300 mx-auto mb-4" />
          <p className="text-surface-500">Chat not found</p>
          <Button onClick={handleBack} variant="primary" className="mt-4">
            Back to Chats
          </Button>
        </div>
      </div>
    )
  }

return (
    <div className="h-full flex flex-col bg-background">
      {/* Call Interface Overlay */}
      {isInCall && chat && (
        <CallInterface
          contact={{
            name: chat.name,
            avatar: chat.avatar
          }}
          onEndCall={handleEndCall}
          onToggleMute={handleToggleMute}
          onToggleSpeaker={handleToggleSpeaker}
          isMuted={isMuted}
          isSpeakerOn={isSpeakerOn}
        />
      )}

      {/* Chat Header */}
      <header className="flex-shrink-0 bg-secondary text-white p-4 flex items-center gap-3">
        <Button
          onClick={handleBack}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <ApperIcon name="ArrowLeft" size={20} />
        </Button>
        
        <div className="flex items-center gap-3 flex-1">
          {chat.type === 'group' ? (
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ApperIcon name="Users" size={20} className="text-white" />
            </div>
          ) : (
            <Avatar src={chat.avatar} alt={chat.name} size="md" />
          )}
          
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">{chat.name}</h1>
            <p className="text-sm text-white/70">
              {chat.type === 'group' ? `${chat.participants.length} members` : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleCall}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            disabled={isInCall}
          >
            <ApperIcon name="Phone" size={20} />
          </Button>
          <Button
            onClick={handleVideoCall}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            disabled={isInCall}
          >
            <ApperIcon name="Video" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <ApperIcon name="MoreVertical" size={20} />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ChatMessages chatId={chatId} chatName={chat.name} />

      {/* Message Input */}
      <div className="flex-shrink-0">
        <MessageInput 
          onSendMessage={(content) => {
            // This is handled in ChatMessages component
            console.log('Send message:', content)
          }}
        />
      </div>
    </div>
  )
}

export default ChatDetailPage