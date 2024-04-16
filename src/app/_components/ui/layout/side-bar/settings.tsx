import { Settings as SettingsIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/app/_components/ui/sheet"
import { ProfileForm } from "./profile/profile-form"

export const Settings = () => {
  return (
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
            <SettingsIcon />
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
  )
}
