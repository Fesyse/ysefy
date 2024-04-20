export interface Conversation {
  id: string
  createdAt: Date
  imageUrl: string
  name: string
  ownerId: string
}

export interface ConversationWithCount extends Conversation {
  _count: {
    messages: number
    users: number
  }
}

export interface ConversationWithUsers extends Conversation {
  users: {
    id: string
    name: string
    email: string
    emailVerified: Date | null
    image: string
  }[]
}
