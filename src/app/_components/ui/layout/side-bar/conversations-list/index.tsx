import { api } from "@/trpc/server"
import { Conversation } from "./conversation"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

export const ConversationsList = async () => {
  const conversations = await api.conversations.getAll()

  return (
    <ScrollArea className='my-4 h-[calc(100vh-5rem)]'>
      <div className='grid gap-4'>
        {[
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
          ...conversations,
        ].map(conversation => (
          <div key={conversation.id}>
            <Conversation conversation={conversation} key={conversation.id} />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
