import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ContactListItem from '@/components/molecules/ContactListItem'
import SearchBar from '@/components/molecules/SearchBar'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import { contactService, chatService } from '@/services'

const ContactsList = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      )
      setFilteredContacts(filtered)
    } else {
      setFilteredContacts(contacts)
    }
  }, [contacts, searchQuery])

  const loadContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await contactService.getAll()
      setContacts(result)
    } catch (err) {
      setError(err.message || 'Failed to load contacts')
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleStartChat = async (contact) => {
    try {
      // Create or find existing chat
      const newChat = await chatService.create({
        participants: ['me', contact.id],
        type: 'individual',
        name: contact.name,
        avatar: contact.avatar
      })
      
      toast.success(`Started chat with ${contact.name}`)
      navigate(`/chat/${newChat.id}`)
    } catch (err) {
      toast.error('Failed to start chat')
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <SkeletonLoader className="h-12 rounded-lg" />
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
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
        onRetry={loadContacts}
      />
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-surface-100">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search contacts..."
        />
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto chat-scroll">
        <AnimatePresence>
          {filteredContacts.length === 0 ? (
            <EmptyState
              title="No contacts found"
              description={searchQuery ? "Try a different search term" : "Add contacts to start messaging"}
              actionLabel="Add Contact"
              onAction={() => toast.info('Contact management coming soon!')}
            />
          ) : (
            filteredContacts.map((contact, index) => (
              <ContactListItem 
                key={contact.id} 
                contact={contact} 
                onStartChat={handleStartChat}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ContactsList