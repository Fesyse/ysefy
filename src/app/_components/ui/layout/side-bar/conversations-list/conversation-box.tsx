import { comfortaaVariable } from "@/app/layout"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"

type TConversationBoxProps = {
  conversation: { id: string; createdAt: Date; name: string; imageUrl: string }
}

export const ConversationBox: FC<TConversationBoxProps> = ({
  conversation,
}) => {
  return (
    <Link href={`/app/${conversation.id}`} className='flex items-center'>
      <Image
        className='h-12 w-12 overflow-hidden rounded-full border border-solid border-border object-cover object-center p-1'
        width={48}
        height={48}
        src={conversation.imageUrl}
        alt={conversation.name}
      />
      <p
        className={cn(
          "ml-2 font-comfortaa text-lg font-semibold",
          comfortaaVariable,
        )}
      >
        {conversation.name}
      </p>
    </Link>
  )
}
