// Mock API responses for development
import { User, Profile, Match, Message } from '../types'

// Simulate network delay
const delay = (ms: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms))

// Mock data
const MOCK_USERS: (User & { profile: Profile })[] = [
  {
    id: '1',
    email: 'sarah@college.edu',
    name: 'Sarah Johnson',
    profile: {
      id: 'p1',
      userId: '1',
      bio: 'Psychology major, loves hiking and coffee ☕',
      avatarUrl: undefined,
      age: 20,
      interests: ['Music', 'Books', 'Nature'],
      photos: [],
    },
  },
  {
    id: '2',
    email: 'mike@college.edu',
    name: 'Mike Chen',
    profile: {
      id: 'p2',
      userId: '2',
      bio: 'Computer Science student, gamer and foodie 🎮',
      avatarUrl: undefined,
      age: 22,
      interests: ['Gaming', 'Technology', 'Food'],
      photos: [],
    },
  },
  {
    id: '3',
    email: 'emma@college.edu',
    name: 'Emma Davis',
    profile: {
      id: 'p3',
      userId: '3',
      bio: 'Art student who loves painting and traveling ✈️',
      avatarUrl: undefined,
      age: 19,
      interests: ['Art', 'Travel', 'Photography'],
      photos: [],
    },
  },
]

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    userA: 'current-user',
    userB: '1',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'm2',
    userA: 'current-user',
    userB: '2',
    createdAt: '2024-01-14T15:30:00Z',
  },
]

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg1',
    roomId: 'm1',
    senderId: '1',
    content: 'Hey! How was your day?',
    createdAt: '2024-01-15T14:30:00Z',
  },
  {
    id: 'msg2',
    roomId: 'm1',
    senderId: 'current-user',
    content: 'It was great! Just finished my psychology exam',
    createdAt: '2024-01-15T14:32:00Z',
  },
  {
    id: 'msg3',
    roomId: 'm1',
    senderId: '1',
    content: 'How do you think it went?',
    createdAt: '2024-01-15T14:33:00Z',
  },
]

// Mock API functions
export const mockApi = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      await delay(1500)
      if (email.includes('error')) {
        throw new Error('Invalid credentials')
      }
      return {
        user: { id: 'current-user', email, name: 'Current User' },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      }
    },

    register: async (data: {
      email: string
      password: string
      name: string
    }) => {
      await delay(2000)
      return {
        user: { id: 'new-user', email: data.email, name: data.name },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      }
    },

    refreshToken: async (refreshToken: string) => {
      await delay(500)
      return {
        token: 'mock-jwt-token-refreshed-' + Date.now(),
        refreshToken: 'mock-refresh-token-refreshed-' + Date.now(),
      }
    },

    me: async () => {
      await delay(800)
      return {
        id: 'current-user',
        email: 'user@college.edu',
        name: 'Current User',
      }
    },
  },

  // Profile endpoints
  profile: {
    get: async (userId: string) => {
      await delay(1000)
      const user = MOCK_USERS.find(u => u.id === userId)
      if (!user) throw new Error('Profile not found')
      return user.profile
    },

    update: async (userId: string, data: Partial<Profile>) => {
      await delay(1200)
      const user = MOCK_USERS.find(u => u.id === userId)
      if (!user) throw new Error('Profile not found')

      const updated = { ...user.profile, ...data }
      return updated
    },
  },

  // Discover endpoints
  discover: {
    feed: async () => {
      await delay(1500)
      // Return profiles excluding current user and already matched users
      return MOCK_USERS.map(u => u.profile).slice(0, 3)
    },

    like: async (profileId: string) => {
      await delay(800)
      const isMatch = Math.random() > 0.5 // 50% chance of match
      return {
        profileId,
        isMatch,
        matchId: isMatch ? 'new-match-' + Date.now() : null,
      }
    },

    pass: async (profileId: string) => {
      await delay(500)
      return { profileId, action: 'passed' }
    },
  },

  // Matches endpoints
  matches: {
    list: async () => {
      await delay(1000)
      return MOCK_MATCHES.map(match => {
        const otherUserId =
          match.userA === 'current-user' ? match.userB : match.userA
        const otherUser = MOCK_USERS.find(u => u.id === otherUserId)
        const lastMessage = MOCK_MESSAGES.filter(
          m => m.roomId === match.id
        ).sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]

        return {
          ...match,
          otherUser: otherUser || null,
          lastMessage: lastMessage || null,
          unreadCount: Math.floor(Math.random() * 3),
        }
      })
    },

    messages: async (matchId: string) => {
      await delay(800)
      return MOCK_MESSAGES.filter(m => m.roomId === matchId)
    },
  },

  // Chat endpoints
  chat: {
    sendMessage: async (roomId: string, content: string) => {
      await delay(600)
      const message: Message = {
        id: 'msg-' + Date.now(),
        roomId,
        senderId: 'current-user',
        content,
        createdAt: new Date().toISOString(),
      }
      MOCK_MESSAGES.push(message)
      return message
    },

    // Simulate receiving messages (would be WebSocket in real app)
    simulateIncomingMessage: (roomId: string) => {
      const responses = [
        'That sounds great!',
        'I agree!',
        'What do you think about that?',
        'Interesting perspective',
        "Let me know when you're free",
        '😊',
      ]

      setTimeout(
        () => {
          const message: Message = {
            id: 'incoming-' + Date.now(),
            roomId,
            senderId: 'other-user',
            content: responses[Math.floor(Math.random() * responses.length)],
            createdAt: new Date().toISOString(),
          }
          MOCK_MESSAGES.push(message)
          // In real app, this would emit via WebSocket
          console.log('Simulated incoming message:', message)
        },
        2000 + Math.random() * 3000
      )
    },
  },
}
