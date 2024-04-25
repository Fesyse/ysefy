import { MessageWithUser } from "@/interfaces/message.interface"
import Image from "next/image"
import { type FC } from "react"
import { formatDate } from "@/utils/format-date"

type TMessageProps = {
  message: MessageWithUser
  isSameUserAsBefore: boolean
}

export const Message: FC<TMessageProps> = ({ message, isSameUserAsBefore }) => {
  return (
    <div className='flex gap-2'>
      <div className='w-10'>
        {isSameUserAsBefore ? null : (
          <Image
            src={message.user.image}
            alt={message.user.name}
            className='overflow-hidden rounded-full'
            width={40}
            height={40}
          />
        )}
      </div>
      <div className='font-comfortaa'>
        {isSameUserAsBefore ? null : (
          <div className='flex items-center gap-1.5'>
            <div className='text-sm'>{message.user.name}</div>
            <div className='mt-0.5 text-xs opacity-50'>
              {formatDate(message.createdAt)}
            </div>
          </div>
        )}
        <div className='mt-2 leading-3'>{message.content}</div>
      </div>
    </div>
  )
}
