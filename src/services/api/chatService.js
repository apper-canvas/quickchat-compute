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