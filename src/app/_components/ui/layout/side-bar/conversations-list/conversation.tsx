import Image from "next/image"
import { type FC } from "react"

type TConversationProps = {
  conversation: { id: string; createdAt: Date; name: string; image?: string }
}

const Conversation: FC<TConversationProps> = ({ conversation }) => {
  return (
    <div className=''>
      {conversation.image ? (
        <Image src={conversation.image} alt={conversation.name}></Image>
      ) : (
        <div></div>
      )}
    </div>
  )
}
