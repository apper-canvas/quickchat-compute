import chatData from '../mockData/chats.json'
import messageService from './messageService'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ChatService {
  constructor() {
    this.chats = [...chatData]
  }

  async getAll() {
    await delay(200)
    // Get latest messages for each chat
    const chatsWithMessages = await Promise.all(
      this.chats.map(async (chat) => {
        const messages = await messageService.getByChatId(chat.id)
        const lastMessage = messages.sort((a, b) => b.timestamp - a.timestamp)[0] || null
        return {
          ...chat,
          lastMessage,
          unreadCount: messages.filter(msg => msg.status !== 'read' && msg.senderId !== 'me').length
        }
      })
    )
    
    // Sort by last message timestamp
    return chatsWithMessages.sort((a, b) => {
      const aTime = a.lastMessage?.timestamp || 0
      const bTime = b.lastMessage?.timestamp || 0
      return bTime - aTime
    })
  }

  async getById(id) {
    await delay(200)
    const chat = this.chats.find(chat => chat.id === id)
    if (!chat) return null
    
    const messages = await messageService.getByChatId(id)
    const lastMessage = messages.sort((a, b) => b.timestamp - a.timestamp)[0] || null
    
    return {
      ...chat,
      lastMessage,
      unreadCount: messages.filter(msg => msg.status !== 'read' && msg.senderId !== 'me').length
    }
  }

  async create(chatData) {
    await delay(300)
    const newChat = {
      id: Date.now().toString(),
      unreadCount: 0,
      type: 'individual',
      ...chatData
    }
    this.chats.push(newChat)
    return { ...newChat }
  }

  async update(id, data) {
    await delay(200)
    const chatIndex = this.chats.findIndex(chat => chat.id === id)
    if (chatIndex === -1) {
      throw new Error('Chat not found')
    }
    this.chats[chatIndex] = { ...this.chats[chatIndex], ...data }
    return { ...this.chats[chatIndex] }
  }

  async delete(id) {
    await delay(200)
    const chatIndex = this.chats.findIndex(chat => chat.id === id)
    if (chatIndex === -1) {
      throw new Error('Chat not found')
    }
    this.chats.splice(chatIndex, 1)
    return { success: true }
  }

  async markAsRead(chatId) {
    await delay(100)
    const messages = await messageService.getByChatId(chatId)
    const unreadMessages = messages.filter(msg => msg.status !== 'read' && msg.senderId !== 'me')
    
    await Promise.all(
      unreadMessages.map(msg => messageService.updateStatus(msg.id, 'read'))
    )
    
    return { success: true }
  }
}

export default new ChatService()