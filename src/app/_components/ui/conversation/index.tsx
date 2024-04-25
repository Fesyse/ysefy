"use client"

import { FC, useState } from "react"
import { Messages } from "./messages"
import { type MessageWithUser } from "@/interfaces/message.interface"
import { CreateMessage } from "./messages/create-message"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

type TConversationProps = {
  conversationId: string
  initialMessages: MessageWithUser[]
}

export const Conversation: FC<TConversationProps> = ({
  conversationId,
  initialMessages,
}) => {
  const [messages, setMessages] = useState<MessageWithUser[]>(initialMessages)

  return (
    <section className='flex h-full flex-col'>
      <ScrollArea className='h-full py-2'>
        <Messages
          conversationId={conversationId}
          messages={messages}
          setMessages={setMessages}
        />
      </ScrollArea>
      <CreateMessage conversationId={conversationId} />
    </section>
  )
}
