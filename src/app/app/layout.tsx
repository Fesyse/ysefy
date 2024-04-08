import { type ReactNode } from "react"
import { SideBar } from "@/app/_components/ui/layout/side-bar"
import { Separator } from "@/app/_components/ui/separator"

export default function Page({ children }: { children: ReactNode }) {
  return (
    <main className='flex min-h-screen w-full gap-2.5'>
      <SideBar />
      <Separator orientation='vertical' className='h-[calc(100vh-1rem*2)]' />
      {children}
    </main>
  )
}
