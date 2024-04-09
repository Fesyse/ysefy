import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"

export const ConversationsList = async () => {
  const conversations = await api.conversations.getAll()
  return (
    <div>
      {conversations.map(conversation => (
        <div key={conversation.id}></div>
      ))}
    </div>
  )
}
