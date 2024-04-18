import { Separator } from "@/app/_components/ui/separator"
import { comfortaaVariable } from "@/app/layout"
import { cn } from "@/lib/utils"
import { api } from "@/trpc/server"
import Image from "next/image"
import { FC } from "react"

export const ConversationHeader: FC<{
  id: string
}> = async ({ id }) => {
  const conversation = (await api.conversations.getById({ id }))!
  return (
    <div className='grid gap-3'>
      <div className='flex items-center'>
        <Image
          className='h-12 w-12 overflow-hidden rounded-full object-cover object-center'
          width={48}
          height={48}
          src={conversation.imageUrl}
          alt={conversation.name}
        />
        <div className='ml-2'>
          <p
            className={cn(
              "font-comfortaa text-lg font-semibold",
              comfortaaVariable,
            )}
          >
            {conversation.name}
          </p>
          <p
            className={cn(
              "font-comfortaa text-sm opacity-65",
              comfortaaVariable,
            )}
          >
            {conversation._count.users} member's
          </p>
        </div>
      </div>
      <Separator className='w-[calc(100vw-(15rem+3rem))]' />
    </div>
  )
}
