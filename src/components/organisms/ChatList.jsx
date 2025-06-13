import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ChatListItem from '@/components/molecules/ChatListItem'
import SearchBar from '@/components/molecules/SearchBar'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import { chatService } from '@/services'

const ChatList = () => {
  const [chats, setChats] = useState([])
  const [filteredChats, setFilteredChats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chat.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredChats(filtered)
    } else {
      setFilteredChats(chats)
    }
  }, [chats, searchQuery])

  const loadChats = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await chatService.getAll()
      setChats(result)
    } catch (err) {
      setError(err.message || 'Failed to load chats')
      toast.error('Failed to load chats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <SkeletonLoader className="h-12 rounded-lg" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <SkeletonLoader className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonLoader className="h-4 w-3/4" />
                <SkeletonLoader className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={loadChats}
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-surface-100">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search chats..."
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto chat-scroll">
        <AnimatePresence>
          {filteredChats.length === 0 ? (
            <EmptyState
              title="No chats found"
              description={searchQuery ? "Try a different search term" : "Start a conversation with your contacts"}
              actionLabel="View Contacts"
              onAction={() => window.history.pushState(null, '', '/contacts')}
            />
          ) : (
            filteredChats.map((chat, index) => (
              <ChatListItem 
                key={chat.id} 
                chat={chat} 
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ChatList