import Image from "next/image"
import { type FC } from "react"

export const User: FC<{
  user: {
    id: string
    name: string
    email: string
    emailVerified: Date | null
    image: string
  }
}> = ({ user }) => {
  return (
    <li className='flex items-center gap-1.5'>
      <Image
        className='overflow-hidden rounded-full border border-solid border-border object-cover object-center p-0.5'
        src={user.image}
        alt={user.name}
        width={40}
        height={40}
      />
      <div className='flex flex-col'>
        <p className='max-w-36 truncate text-sm'>{user.name}</p>
        <p className='max-w-36 truncate text-xs opacity-50'>{user.email}</p>
      </div>
    </li>
  )
}
