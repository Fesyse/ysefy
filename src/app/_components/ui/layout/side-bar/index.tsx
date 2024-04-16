import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/app/_components/ui/sheet"
import { Profile } from "./profile"
import { Separator } from "@/app/_components/ui/separator"
import { Input } from "@/app/_components/ui/input"
import { ThemeToggle } from "../theme-toggle"
import { ConversationsList } from "./conversations-list"
import { Settings } from "./settings"
import { Menu } from "lucide-react"
import { CreateConversation } from "./create-conversation"

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
          className='flex w-48 flex-col  p-4'
          side='left'
        >
          <Profile />
          <Separator />
          <CreateConversation />
          <Settings />
          <ThemeToggle />
        </SheetContent>
      </Sheet>
      <div className='flex flex-col items-stretch'>
        <Input name='search' type='text' placeholder='Search...' />
        <ConversationsList />
      </div>
    </aside>
  )
}
