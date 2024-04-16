import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form"
import { useForm } from "react-hook-form"
import { Button } from "@/app/_components/ui/button"
import { useCallback, useEffect, useRef, useState, type FC } from "react"
import { type TGroupFormsProps } from "./group-name-form"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import MultiSelectFormField, {
  type MultiSelectFormFieldProps,
} from "@/app/_components/ui/multi-select"
import { api } from "@/trpc/react"
import debounce from "lodash.debounce"
import Image from "next/image"
import { useCreateConversationDialogStore } from "@/stores/create-conversation-dialog.store"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  usersIds: z.array(z.string()).min(1),
})

export const GroupUsersForm: FC<TGroupFormsProps> = ({
  newGroupData,
  setCurrentTab,
  setNewGroupData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    defaultValues: { usersIds: newGroupData.usersIds },
    resolver: zodResolver(formSchema),
  })

  const { data: users, mutate: searchUsers } =
    api.user.findManyBySubstring.useMutation()

  const { groupNameHeight, userListHeight, setUserListHeight } =
    useCreateConversationDialogStore()

  const pushUsersToSelect = useCallback(
    debounce((e: React.KeyboardEvent<HTMLInputElement>) => {
      // @ts-expect-error
      if (e.target.value.length > 0) searchUsers({ substring: e.target.value })
    }, 500),
    [],
  )

  const [usersSelect, setUsersSelect] = useState<
    MultiSelectFormFieldProps["options"]
  >([])

  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (!formRef.current) return
    setUserListHeight(formRef.current.offsetHeight)
  }, [form.getValues("usersIds")])

  useEffect(() => {
    if (!users) return
    setUsersSelect(prev => {
      const newUsersSelect = [
        ...prev,
        ...users.map(user => ({
          label: user.name,
          value: user.id,
          image: (
            <Image
              className='mr-1.5 overflow-hidden rounded-full'
              src={user.image}
              alt={user.name}
              width={24}
              height={24}
            />
          ),
        })),
      ]
      return newUsersSelect.filter(
        (user, index) =>
          newUsersSelect.findIndex(u => u.value === user.value) === index,
      )
    })
  }, [users])

  return (
    <motion.div
      key='userList'
      transition={{
        duration: 0.25,
      }}
      initial={{
        height: groupNameHeight,
        filter: "blur(4px)",
        translateX: 250,
        opacity: 0,
      }}
      animate={{
        height: userListHeight,
        filter: "blur(0px)",
        translateX: 0,
        opacity: 1,
      }}
      exit={{
        height: groupNameHeight,
        filter: "blur(4px)",
        translateX: 250,
        opacity: 0,
        position: "absolute",
      }}
    >
      <Form {...form}>
        <form
          ref={formRef}
          className='flex flex-col gap-5'
          onSubmit={form.handleSubmit(data => {
            setNewGroupData(prev => ({ ...prev, usersIds: data.usersIds }))
          })}
        >
          <FormField
            name='usersIds'
            render={({ field }) => (
              <FormItem>
                <MultiSelectFormField
                  options={usersSelect}
                  onValueChange={field.onChange}
                  onInput={pushUsersToSelect}
                  defaultValue={field.value}
                  placeholder='Search for users'
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>Choose users you want to add in.</FormDescription>
          <div className='flex gap-4'>
            <Button
              onClick={() => setCurrentTab("groupName")}
              className='p-1'
              variant='outline'
              size='icon'
            >
              <ArrowLeft />
            </Button>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
