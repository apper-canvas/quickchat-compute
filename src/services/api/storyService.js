import storyData from '../mockData/stories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class StoryService {
  constructor() {
    this.stories = [...storyData]
  }

  async getAll() {
    await delay(200)
    // Filter stories from last 24 hours and group by user
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000)
    const recentStories = this.stories.filter(story => story.timestamp > twentyFourHoursAgo)
    
    // Group by userId
    const grouped = recentStories.reduce((acc, story) => {
      if (!acc[story.userId]) {
        acc[story.userId] = []
      }
      acc[story.userId].push(story)
      return acc
    }, {})
    
    // Convert to array and sort by latest story
    return Object.values(grouped)
      .map(userStories => ({
        userId: userStories[0].userId,
        userName: userStories[0].userName,
        userAvatar: userStories[0].userAvatar,
        stories: userStories.sort((a, b) => b.timestamp - a.timestamp),
        latestTimestamp: Math.max(...userStories.map(s => s.timestamp)),
        viewedAll: userStories.every(s => s.views.includes('me'))
      }))
      .sort((a, b) => b.latestTimestamp - a.latestTimestamp)
  }

  async getById(id) {
    await delay(200)
    return this.stories.find(story => story.id === id) || null
  }

  async getByUserId(userId) {
    await delay(200)
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000)
    return this.stories
      .filter(story => story.userId === userId && story.timestamp > twentyFourHoursAgo)
      .sort((a, b) => a.timestamp - b.timestamp)
  }

  async create(storyData) {
    await delay(300)
    const newStory = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      views: [],
      ...storyData
    }
    this.stories.push(newStory)
    return { ...newStory }
  }

  async addView(storyId, viewerId) {
    await delay(100)
    const storyIndex = this.stories.findIndex(story => story.id === storyId)
    if (storyIndex === -1) {
      throw new Error('Story not found')
    }
    
    if (!this.stories[storyIndex].views.includes(viewerId)) {
      this.stories[storyIndex].views.push(viewerId)
    }
    
    return { ...this.stories[storyIndex] }
  }

  async delete(id) {
    await delay(200)
    const storyIndex = this.stories.findIndex(story => story.id === id)
    if (storyIndex === -1) {
      throw new Error('Story not found')
    }
    this.stories.splice(storyIndex, 1)
    return { success: true }
  }
}

export default new StoryService()