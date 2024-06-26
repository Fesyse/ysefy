"use client"

import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Button } from "../_components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { toast } from "sonner"

export const SignInButtons = () => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <Button
        variant='outline'
        className='flex h-16 gap-3'
        onClick={async () => {
          await signIn("github")
          toast.success("Successfuly signed in!")
        }}
      >
        <span className='text-xl font-medium'>Github</span>
        <GitHubLogoIcon className='h-10 w-10' />
      </Button>
      <Button
        variant='outline'
        className='flex h-16 gap-3'
        onClick={async () => {
          await signIn("discord")
          toast.success("Successfuly signed in!")
        }}
      >
        <span className='text-xl font-medium'>Discord</span>
        <DiscordLogoIcon className='h-10 w-10' />
      </Button>
    </div>
  )
}
