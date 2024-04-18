import { ConversationHeader } from "@/app/_components/ui/conversation/conversation-header"
import { redirect } from "next/navigation"
import { type ReactNode } from "react"
import { z } from "zod"

export default function Page({
  children,
  params,
}: {
  children: ReactNode
  params: { id: string }
}) {
  try {
    z.string().cuid().parse(params.id)
  } catch (_err) {
    redirect("/not-found")
  }

  return (
    <div>
      <ConversationHeader id={params.id} />
      {children}
    </div>
  )
}
