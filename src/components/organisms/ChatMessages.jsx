import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MessageBubble from '@/components/molecules/MessageBubble'
import TypingIndicator from '@/components/molecules/TypingIndicator'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import { messageService } from '@/services'

const ChatMessages = ({ chatId, chatName }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (chatId) {
      loadMessages()
    }
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await messageService.getByChatId(chatId)
      setMessages(result)
    } catch (err) {
      setError(err.message || 'Failed to load messages')
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (content) => {
    try {
      // Optimistic update
      const tempMessage = {
        id: `temp-${Date.now()}`,
        chatId,
        senderId: 'me',
        content,
        timestamp: Date.now(),
        status: 'sending',
        type: 'text'
      }
      
      setMessages(prev => [...prev, tempMessage])
      scrollToBottom()

      // Send message
      const newMessage = await messageService.create({
        chatId,
        senderId: 'me',
        content
      })

      // Replace temp message with real one
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempMessage.id ? newMessage : msg
        )
      )

      // Simulate typing response (for demo purposes)
      setTimeout(() => {
        setTyping(true)
        setTimeout(async () => {
          setTyping(false)
          
          // Simulate response message
          const responseMessage = await messageService.create({
            chatId,
            senderId: chatId, // Assume chatId is the other person's ID for demo
            content: "Thanks for your message! 😊"
          })
          
          setMessages(prev => [...prev, responseMessage])
        }, 2000)
      }, 1000)

    } catch (err) {
      toast.error('Failed to send message')
      // Remove temp message on error
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')))
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className="max-w-xs space-y-2">
              <SkeletonLoader className="h-16 rounded-bubble" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <ErrorState 
          message={error}
          onRetry={loadMessages}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto chat-scroll p-4" style={{ backgroundColor: '#F0F2F5' }}>
      <AnimatePresence>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              title="No messages yet"
              description="Start the conversation by sending a message"
              icon="MessageCircle"
            />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === 'me'}
              />
            ))}
            
            {typing && (
              <TypingIndicator userName={chatName} />
            )}
          </>
        )}
      </AnimatePresence>
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages