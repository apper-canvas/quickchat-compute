import contactData from '../mockData/contacts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ContactService {
  constructor() {
    this.contacts = [...contactData]
  }

  async getAll() {
    await delay(200)
    return [...this.contacts].sort((a, b) => a.name.localeCompare(b.name))
  }

  async getById(id) {
    await delay(200)
    return this.contacts.find(contact => contact.id === id) || null
  }

  async search(query) {
    await delay(200)
    if (!query) return this.getAll()
    
    const searchTerm = query.toLowerCase()
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm)
    )
  }

  async create(contactData) {
    await delay(300)
    const newContact = {
      id: Date.now().toString(),
      status: 'offline',
      lastSeen: Date.now(),
      ...contactData
    }
    this.contacts.push(newContact)
    return { ...newContact }
  }

  async update(id, data) {
    await delay(200)
    const contactIndex = this.contacts.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
      throw new Error('Contact not found')
    }
    this.contacts[contactIndex] = { ...this.contacts[contactIndex], ...data }
    return { ...this.contacts[contactIndex] }
  }

  async delete(id) {
    await delay(200)
    const contactIndex = this.contacts.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
      throw new Error('Contact not found')
    }
    this.contacts.splice(contactIndex, 1)
return { success: true }
  }
}

export const contactService = new ContactService()