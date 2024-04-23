import { Conversation } from "@/app/_components/ui/conversation"

export default function Page({ params }: { params: { id: string } }) {
  return <Conversation conversationId={params.id} />
}
