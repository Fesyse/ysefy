"use client"

import { type FC } from "react"
import { Button } from "@/app/_components/ui/button"

type TConversationProps = {
  conversationId: string
}

export const Conversation: FC<TConversationProps> = ({ conversationId }) => {
  return (
    <div>
      Conversation id: {conversationId}
      <Button>Test</Button>
    </div>
  )
}
