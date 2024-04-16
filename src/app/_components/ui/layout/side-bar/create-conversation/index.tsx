"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import { Button } from "@/app/_components/ui/button"
import { Users2 } from "lucide-react"
import { useEffect, useState } from "react"
import { GroupGeneralForm } from "./group-general-form"
import { GroupUsersForm } from "./group-users-form"
import { AnimatePresence } from "framer-motion"
import { api } from "@/trpc/react"
import { useSession } from "next-auth/react"
import { useCreateConversationDialogStore } from "@/stores/create-conversation-dialog.store"
import { revalidatePathAction } from "@/actions/revalidate-path"

export const CreateConversation = () => {
  const [currentTab, setCurrentTab] = useState<"groupName" | "userList">(
    "groupName",
  )
  const [newGroupData, setNewGroupData] = useState<{
    name: string
    usersIds: string[]
    imageUrl: string
  }>({ name: "", usersIds: [], imageUrl: "" })
  const { mutate: createConversation } = api.conversations.create.useMutation()
  const { data: session } = useSession()
  const { isDialogOpen, setIsDialogOpen } = useCreateConversationDialogStore()

  const formProps = {
    newGroupData,
    setNewGroupData,
    setCurrentTab,
  }

  useEffect(() => {
    if (!session || newGroupData.usersIds.length === 0) return
    createConversation({
      name: newGroupData.name,
      usersIds: [session.user.id, ...newGroupData.usersIds],
      imageUrl: newGroupData.imageUrl,
    })
    setCurrentTab("groupName")
    setIsDialogOpen(false)

    revalidatePathAction("/")
  }, [newGroupData.usersIds])

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsDialogOpen(true)}
          className='flex items-center gap-2'
        >
          <Button
            type='button'
            size='icon'
            z-index='-1'
            className='p-1.5'
            variant='outline'
            asChild
          >
            <Users2 />
          </Button>
          <span className='-mt-1.5 text-xl opacity-95'>New group</span>
        </button>
      </DialogTrigger>
      <DialogContent
        onClose={() => {
          setCurrentTab("groupName")
          setIsDialogOpen(false)
        }}
        className='overflow-hidden sm:max-w-[425px]'
      >
        <DialogHeader>
          <DialogTitle>Create new group</DialogTitle>
          <DialogDescription>
            Fill in the information below to create a new group.
          </DialogDescription>
        </DialogHeader>
        <div className='overflow-hidden'>
          <AnimatePresence>
            {currentTab === "groupName" ? (
              <GroupGeneralForm {...formProps} />
            ) : (
              <GroupUsersForm {...formProps} />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
