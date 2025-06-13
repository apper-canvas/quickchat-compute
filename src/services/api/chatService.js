import chatsData from '../mockData/chats.json'
import messagesData from '../mockData/messages.json'

// Simulated call state
let callState = {
  activeCall: null,
  isMuted: false,
  isSpeakerOn: false,
  startTime: null
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const chatService = {
  async getAll() {
    await delay(300)
    return [...chatsData]
  },

  async getById(id) {
    await delay(200)
    const chat = chatsData.find(c => c.id === id)
    return chat ? { ...chat } : null
  },

  async markAsRead(chatId) {
    await delay(100)
    const chatIndex = chatsData.findIndex(c => c.id === chatId)
    if (chatIndex !== -1) {
      chatsData[chatIndex].unreadCount = 0
    }
    return true
  },

  async getMessages(chatId) {
    await delay(200)
    const chatMessages = messagesData.filter(m => m.chatId === chatId)
    return [...chatMessages]
  },

  async sendMessage(chatId, content, type = 'text') {
    await delay(300)
    const newMessage = {
      id: `msg_${Date.now()}`,
      chatId,
      content,
      type,
      timestamp: new Date().toISOString(),
      senderId: 'user',
      senderName: 'You',
      isOwn: true
    }
    messagesData.push(newMessage)
    
    // Update chat's last message
    const chatIndex = chatsData.findIndex(c => c.id === chatId)
    if (chatIndex !== -1) {
      chatsData[chatIndex].lastMessage = content
      chatsData[chatIndex].timestamp = newMessage.timestamp
    }
    
    return { ...newMessage }
  },

  async startCall(chatId, type = 'voice') {
    await delay(300)
    callState.activeCall = {
      chatId,
      type,
      startTime: Date.now()
    }
    callState.isMuted = false
    callState.isSpeakerOn = false
    return { success: true, callId: `call_${Date.now()}` }
  },

  async endCall(chatId) {
    await delay(200)
    const duration = callState.startTime ? Date.now() - callState.startTime : 0
    callState.activeCall = null
    callState.isMuted = false
    callState.isSpeakerOn = false
    callState.startTime = null
    return { success: true, duration }
  },

  async toggleMute(chatId) {
    await delay(100)
    if (callState.activeCall?.chatId === chatId) {
      callState.isMuted = !callState.isMuted
      return { success: true, isMuted: callState.isMuted }
    }
    return { success: false, error: 'No active call' }
  },

  async toggleSpeaker(chatId) {
    await delay(100)
    if (callState.activeCall?.chatId === chatId) {
      callState.isSpeakerOn = !callState.isSpeakerOn
      return { success: true, isSpeakerOn: callState.isSpeakerOn }
    }
    return { success: false, error: 'No active call' }
  },

  async getCallState(chatId) {
    await delay(50)
    if (callState.activeCall?.chatId === chatId) {
      return {
        isActive: true,
        type: callState.activeCall.type,
        duration: callState.startTime ? Date.now() - callState.startTime : 0,
        isMuted: callState.isMuted,
        isSpeakerOn: callState.isSpeakerOn
      }
    }
    return { isActive: false }
  }
}
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