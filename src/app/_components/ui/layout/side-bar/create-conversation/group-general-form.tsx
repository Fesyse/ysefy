import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useCreateConversationDialogStore } from "@/stores/create-conversation-dialog.store"
import { UploadDropzone } from "@/app/_components/ui/upload-dropzone"
import { toast } from "sonner"

const formGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Group name is too short.")
    .max(18, "Group name is too long."),
  imageUrl: z.string().url(),
})

type TGroupNameForm = z.infer<typeof formGroupSchema>

export type TGroupFormProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<"groupName" | "userList">>
  newGroupData: {
    name: string
    usersIds: string[]
    imageUrl: string
  }
  setNewGroupData: React.Dispatch<
    React.SetStateAction<{
      name: string
      usersIds: string[]
      imageUrl: string
    }>
  >
}

export const GroupGeneralForm: FC<TGroupFormProps> = ({
  setNewGroupData,
  setCurrentTab,
  newGroupData,
}) => {
  const form = useForm<TGroupNameForm>({
    mode: "onSubmit",
    defaultValues: { name: newGroupData.name, imageUrl: newGroupData.imageUrl },
    resolver: zodResolver(formGroupSchema),
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
            setNewGroupData(prev => ({
              ...prev,
              name: data.name,
              imageUrl: data.imageUrl,
            }))
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
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group image</FormLabel>
                <FormControl>
                  <UploadDropzone
                    endpoint='conversationImageUploader'
                    onClientUploadComplete={file => {
                      toast.success("Group image uploaded successfully.")
                      field.onChange(file[0]?.url)
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(
                        "Failed uploading group image. Please try again later.",
                        { description: `Error: ${error.message}` },
                      )
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Choose your group name and avatar for it.
          </FormDescription>
          <Button className='mt-auto' type='submit'>
            Next
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
