"use client"

import { Input } from "@/app/_components/ui/input"
import { api } from "@/trpc/react"
import { type FC } from "react"
import { Button } from "@/app/_components/ui/button"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"

type TCreateMessageProps = {
  conversationId: string
}

export const CreateMessage: FC<TCreateMessageProps> = ({ conversationId }) => {
  const { handleSubmit, register } = useForm<{ content: string }>({
    defaultValues: {
      content: "",
    },
    mode: "onSubmit",
  })
  const { mutate: createMessage, reset } = api.message.create.useMutation()
  return (
    <form
      onSubmit={handleSubmit(({ content }) => {
        createMessage({ content, conversationId })
        reset()
      })}
    >
      <div className='flex gap-3'>
        <Input
          placeholder='Type your message here...'
          {...register("content")}
        />
        <Button variant='outline' type='submit' size='icon' className='p-1.5'>
          <Send />
        </Button>
      </div>
    </form>
  )
}
