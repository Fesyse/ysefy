import { Separator } from "@/app/_components/ui/separator"
import { comfortaaVariable } from "@/app/layout"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { type FC } from "react"
import type {
  ConversationWithCount,
  ConversationWithUsers,
} from "@/interfaces/conversation.interface"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import { UsersRound } from "lucide-react"
import { User } from "./user"
import { ScrollArea } from "@/app/_components/ui/scroll-area"

export const ConversationHeader: FC<{
  id: string
  conversation: ConversationWithCount & ConversationWithUsers
}> = async ({ id, conversation }) => {
  return (
    <div className='grid gap-3'>
      <Dialog>
        <DialogTrigger>
          <div className='flex items-center'>
            <Image
              className='h-12 w-12 overflow-hidden rounded-full border border-solid border-border object-cover object-center p-1'
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
              <p className='text-left font-comfortaa text-sm opacity-65'>
                {conversation._count.users} member's
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='w-72'>
          <div className='flex items-center justify-start gap-2'>
            <Image
              src={conversation.imageUrl}
              alt={conversation.name}
              className='overflow-hidden rounded-full border border-border p-1'
              width={64}
              height={64}
            />
            <div>
              <p className='text-xl font-semibold'>{conversation.name}</p>
              <p className='font-comfortaa text-sm opacity-65'>
                {conversation._count.users} member's
              </p>
            </div>
          </div>
          <Separator />
          <div className='flex items-center gap-4'>
            <UsersRound />
            {conversation._count.users} Members
          </div>

          <ScrollArea className='max-h-60'>
            <div className='flex flex-col gap-2'>
              {conversation.users.map(user => (
                <User key={user.id} user={user} />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Separator className='w-[calc(100vw-(15rem+3rem))]' />
    </div>
  )
}
