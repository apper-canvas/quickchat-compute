import messageData from '../mockData/messages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class MessageService {
  constructor() {
    this.messages = [...messageData]
  }

  async getAll() {
    await delay(200)
    return [...this.messages]
  }

  async getByChatId(chatId) {
    await delay(200)
    return this.messages.filter(message => message.chatId === chatId)
  }

  async getById(id) {
    await delay(200)
    return this.messages.find(message => message.id === id) || null
  }

  async create(messageData) {
    await delay(300)
    const newMessage = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: 'sent',
      type: 'text',
      ...messageData
    }
    this.messages.push(newMessage)
    
    // Simulate delivery after 1 second
    setTimeout(() => {
      this.updateStatus(newMessage.id, 'delivered')
    }, 1000)
    
    return { ...newMessage }
  }

  async updateStatus(id, status) {
    await delay(100)
    const messageIndex = this.messages.findIndex(msg => msg.id === id)
    if (messageIndex !== -1) {
      this.messages[messageIndex].status = status
      return { ...this.messages[messageIndex] }
    }
    throw new Error('Message not found')
  }

  async delete(id) {
    await delay(200)
    const messageIndex = this.messages.findIndex(message => message.id === id)
    if (messageIndex === -1) {
      throw new Error('Message not found')
    }
    this.messages.splice(messageIndex, 1)
    return { success: true }
  }

  // Real-time typing simulation
  simulateTyping(chatId, senderId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ chatId, senderId, typing: false })
      }, 2000)
    })
  }
}

export default new MessageService()