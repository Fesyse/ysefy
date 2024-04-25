import { Conversation } from "@/app/_components/ui/conversation"
import { Messages } from "@/app/_components/ui/conversation/messages"
import { CreateMessage } from "@/app/_components/ui/conversation/messages/create-message"
import { api } from "@/trpc/server"

export default async function Page({ params }: { params: { id: string } }) {
  const initialMessages = await api.message.getSome({
    conversationId: params.id,
  })
  return (
    <Conversation
      conversationId={params.id}
      initialMessages={initialMessages}
    />
  )
}
