import { api } from "@/trpc/server"
import { ConversationBox } from "./conversation-box"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

export const ConversationsList = async () => {
  const conversations = await api.conversations.getAll()

  return (
    <ScrollArea className='my-4 h-[calc(100vh-5rem)]'>
      <ul className='grid gap-4'>
        {conversations.map(conversation => (
          <ConversationBox conversation={conversation} key={conversation.id} />
        ))}
      </ul>
    </ScrollArea>
  )
}
