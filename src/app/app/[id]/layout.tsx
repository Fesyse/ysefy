import { ConversationHeader } from "@/app/_components/ui/conversation/header"
import type {
  ConversationWithCount,
  ConversationWithUsers,
} from "@/interfaces/conversation.interface"
import { api } from "@/trpc/server"
import { redirect } from "next/navigation"
import { type ReactNode } from "react"
import { z } from "zod"

export default async function Page({
  children,
  params,
}: {
  children: ReactNode
  params: { id: string }
}) {
  let conversation: (ConversationWithCount & ConversationWithUsers) | null =
    null
  try {
    z.string().cuid().parse(params.id)
    // check if user have access to this conversation
    // if not, redirect to not-found page
    const conversationAccessCheck =
      await api.conversations.isHaveAccessToConversation({
        conversationId: params.id,
      })
    if (!conversationAccessCheck) return redirect("/not-found")
    conversation = conversationAccessCheck
  } catch (_err) {
    return redirect("/not-found")
  }

  return (
    <div className='h-[calc(100vh-4rem*1.5)] pr-8'>
      <ConversationHeader conversation={conversation} id={params.id} />
      {children}
    </div>
  )
}
