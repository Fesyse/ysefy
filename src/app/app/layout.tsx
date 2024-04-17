import { type ReactNode } from "react"
import { SideBar } from "@/app/_components/ui/layout/side-bar"
import { Separator } from "@/app/_components/ui/separator"

export default function Page({ children }: { children: ReactNode }) {
  return (
    <main className='grid min-h-screen w-full grid-cols-[15rem_1fr] gap-4'>
      <div className='flex gap-4'>
        <SideBar />
        <Separator orientation='vertical' className='h-[calc(100vh-1rem*2)]' />
      </div>
      {children}
    </main>
  )
}
