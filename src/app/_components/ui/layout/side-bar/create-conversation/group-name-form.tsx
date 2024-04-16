import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/app/_components/ui/input"
import { Button } from "@/app/_components/ui/button"
import { useEffect, useRef, type FC } from "react"
import { motion } from "framer-motion"
import { type Session } from "next-auth"
import { useCreateConversationDialogStore } from "@/stores/create-conversation-dialog.store"

const formGroupNameSchema = z.object({
  name: z
    .string()
    .min(3, "Group name is too short.")
    .max(18, "Group name is too long."),
})

type TGroupNameForm = z.infer<typeof formGroupNameSchema>

export type TGroupFormsProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<"groupName" | "userList">>
  newGroupData: {
    name: string
    usersIds: string[]
  }
  setNewGroupData: React.Dispatch<
    React.SetStateAction<{
      name: string
      usersIds: string[]
    }>
  >
}

export const GroupNameForm: FC<TGroupFormsProps> = ({
  setNewGroupData,
  setCurrentTab,
  newGroupData,
}) => {
  const form = useForm<TGroupNameForm>({
    mode: "onSubmit",
    defaultValues: { name: newGroupData.name },
    resolver: zodResolver(formGroupNameSchema),
  })

  const { groupNameHeight, userListHeight, setGroupNameHeight } =
    useCreateConversationDialogStore()

  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (!formRef.current) return
    setGroupNameHeight(formRef.current.offsetHeight)
  }, [form.formState.errors])

  return (
    <motion.div
      key='groupName'
      transition={{
        duration: 0.25,
      }}
      initial={{
        height: userListHeight,
        filter: "blur(4px)",
        translateX: -250,
        opacity: 0,
      }}
      animate={{
        height: groupNameHeight,
        filter: "blur(0px)",
        translateX: 0,
        opacity: 1,
      }}
      exit={{
        height: userListHeight,
        filter: "blur(4px)",
        translateX: -250,
        opacity: 0,
        position: "absolute",
      }}
    >
      <Form {...form}>
        <form
          ref={formRef}
          className='flex flex-col gap-5'
          onSubmit={form.handleSubmit(data => {
            setNewGroupData(prev => ({ ...prev, name: data.name }))
            setCurrentTab("userList")
          })}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='New group name...'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-auto' type='submit'>
            Next
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
