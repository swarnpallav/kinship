export type UserId = string

export type User = {
  id: UserId
  email: string
  name: string
  picture?: string
}

export type Profile = {
  id: string
  userId: UserId
  bio?: string
  avatarUrl?: string
  age?: number
  interests?: string[]
  photos?: string[]
}

export type Match = {
  id: string
  userA: UserId
  userB: UserId
  createdAt: string
}

export type Message = {
  id: string
  roomId: string
  senderId: UserId
  content: string
  createdAt: string
}

export type AuthResponse = {
  user: User
  token: string
  refreshToken: string
}

export type MatchWithDetails = Match & {
  otherUser: (User & { profile: Profile }) | null
  lastMessage: Message | null
  unreadCount: number
}

export type NotificationType = 'match' | 'message' | 'like' | 'general'

export type NotificationData = {
  type: NotificationType
  userId?: string
  matchId?: string
  messageId?: string
  title: string
  body: string
}
