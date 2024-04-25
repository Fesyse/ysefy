export interface Message {
  id: string
  createdAt: Date
  userId: string
  content: string
  conversationId: string
}

export interface MessageWithUser extends Message {
  user: {
    id: string
    name: string
    email: string
    emailVerified: Date | null
    image: string
  }
}
