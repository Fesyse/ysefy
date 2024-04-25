import { type MessageWithUser } from "@/interfaces/message.interface"
import { pusherClient } from "@/server/pusher-client"
import { useCallback, useEffect, useRef, type FC } from "react"
import { Message } from "./message"
import { removeDublicatesFromMessages } from "@/utils/remove-dublicates-from-messages"

type TMessagesProps = {
  conversationId: string
  messages: MessageWithUser[]
  setMessages: React.Dispatch<React.SetStateAction<MessageWithUser[]>>
}

export const Messages: FC<TMessagesProps> = ({
  conversationId,
  messages,
  setMessages,
}) => {
  const playMessageNotificationSound = useCallback(() => {
    const audio = new Audio("/new-message-notification.wav")
    audio.play()
  }, [])

  // subscribe to new messages
  useEffect(() => {
    pusherClient.unsubscribe(conversationId)
    pusherClient.subscribe(conversationId)

    pusherClient.bind("new-message", (data: MessageWithUser) => {
      playMessageNotificationSound()
      setMessages(prev => removeDublicatesFromMessages([...prev, data]))
    })

    return () => {
      pusherClient.unsubscribe(conversationId)
    }
  }, [])

  return (
    <ul className='flex flex-col gap-3'>
      {messages.map((message, i) => (
        <Message
          isSameUserAsBefore={messages[i - 1]?.userId === message.userId}
          message={message}
          key={message.id}
        />
      ))}
    </ul>
  )
}
