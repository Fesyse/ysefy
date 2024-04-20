import { MessageCircleMore } from "lucide-react"

export default function Home() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center text-2xl'>
      <div className='flex flex-col items-center justify-center gap-2 rounded-2xl border  border-solid border-border p-8'>
        <MessageCircleMore strokeWidth={1.25} size={56} />
        Select your group and start messaging.
      </div>
    </main>
  )
}
