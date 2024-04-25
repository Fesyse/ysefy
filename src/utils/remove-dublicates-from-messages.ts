import { type MessageWithUser } from "@/interfaces/message.interface"

export const removeDublicatesFromMessages = (messages: MessageWithUser[]) => {
  return messages.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
}
