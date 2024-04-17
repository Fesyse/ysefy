import { comfortaaVariable } from "@/app/layout"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { type FC } from "react"

type TConversationProps = {
  conversation: { id: string; createdAt: Date; name: string; imageUrl: string }
}

export const Conversation: FC<TConversationProps> = ({ conversation }) => {
  return (
    <Link href={`/app/${conversation.id}`} className='flex items-center'>
      <Image
        className='h-12 w-12 overflow-hidden rounded-full object-cover object-center'
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
