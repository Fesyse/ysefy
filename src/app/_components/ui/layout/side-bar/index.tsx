import { Menu, Settings } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/app/_components/ui/sheet"
import { Profile } from "./profile"
import { Separator } from "@/app/_components/ui/separator"
import { Input } from "@/app/_components/ui/input"
import { ThemeToggle } from "../theme-toggle"
import { ProfileForm } from "./profile/profile-form"
import { signOut } from "next-auth/react"

export const SideBar = () => {
  return (
    <aside className='flex justify-center gap-2'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            className='flex items-center justify-center p-1'
          >
            <Menu size={36} />
          </Button>
        </SheetTrigger>
        <SheetContent
          closeButton={true}
          className='flex w-44 flex-col  p-4'
          side='left'
        >
          <Profile />
          <Separator />
          <Sheet>
            <SheetTrigger asChild>
              <button className='flex items-center gap-2'>
                <Button
                  type='button'
                  size='icon'
                  z-index='-1'
                  className='p-1.5'
                  variant='outline'
                >
                  <Settings />
                </Button>
                <span className='-mt-1.5 text-xl opacity-95'>Settings</span>
              </button>
            </SheetTrigger>
            <SheetContent
              closeButton={true}
              className='flex w-96 flex-col p-4'
              side='left'
            >
              <SheetHeader>Profile Settings</SheetHeader>
              <ProfileForm />
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </SheetContent>
      </Sheet>
      <Input name='search' type='text' placeholder='Search...' />
    </aside>
  )
}
