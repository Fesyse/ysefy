import { ServerCrash } from "lucide-react"

import { Button } from "@/app/_components/ui/button"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='flex items-center gap-4'>
        <ServerCrash size={50} />
        <div className='text-5xl font-bold tracking-tighter'>404</div>
        <ServerCrash size={50} />
      </div>
      <div className='text-3xl'>Page with this URL was not found.</div>
      <Button asChild={true} variant='outline'>
        <Link href='/app'>Go to home page</Link>
      </Button>
    </div>
  )
}
