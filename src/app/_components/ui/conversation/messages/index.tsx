import { type Message } from "@/interfaces/message.interface"
import { pusherClient } from "@/server/pusher"
import { useEffect, useState, type FC } from "react"

type TMessagesProps = {
  initialMessages: Message[]
  conversationId: string
}

export const Messages: FC<TMessagesProps> = ({
  initialMessages,
  conversationId,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  useEffect(() => {
    const event = `conversation:${conversationId}`
    pusherClient.subscribe(event)

    pusherClient.bind("add-message", (data: Message) => {
      setMessages(prev => [...prev, data])
    })

    return () => {
      pusherClient.unsubscribe(event)
    }
  }, [])

  return <div>Messages</div>
}
