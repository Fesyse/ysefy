"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { Loader } from "@/app/_components/ui/loader"

export const Profile = () => {
  const user = useSession().data?.user

  if (!user) return <Loader />

  return (
    <div className='flex flex-col justify-start gap-2'>
      <Image
        src={user.image}
        alt={user.name}
        className='overflow-hidden rounded-full border-border'
        width={60}
        height={60}
      />
      <div>
        <div className='text-xl font-semibold'>{user.name}</div>
        <div className='overflow-hidden text-ellipsis text-sm text-foreground/50'>
          {user.email}
        </div>
      </div>
    </div>
  )
}
