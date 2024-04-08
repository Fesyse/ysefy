"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/_components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import { useSession } from "next-auth/react"
import { Loader } from "@/app/_components/ui/loader"
import { api } from "@/trpc/server"

export const formUpdateUserSchema = z.object({
  name: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" }),
      z
        .string()
        .max(12, { message: "Username must be at most 12 characters long" }),
    ])
    .optional()
    .transform(e => (e === "" ? undefined : e)),
  email: z
    .union([
      z.string().length(0),
      z.string().email({ message: "Email must be valid" }),
    ])
    .optional()
    .transform(e => (e === "" ? undefined : e)),
})

export type TUpdateUserForm = z.infer<typeof formUpdateUserSchema>

export const ProfileForm = () => {
  const { data: session, update: updateUser } = useSession()
  const user = session?.user

  if (!user) return <Loader />

  const form = useForm<TUpdateUserForm>({
    mode: "onSubmit",
    resolver: zodResolver(formUpdateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  return (
    <Form {...form}>
      <form
        className='grid gap-3'
        onSubmit={form.handleSubmit(async (newRawUser: TUpdateUserForm) => {
          const newUser = await api.user.update({ ...newRawUser, id: user.id })
          await updateUser({ name: newUser.name, email: newUser.email })
        })}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Your username...' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Your email...' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Save changes</Button>
      </form>
    </Form>
  )
}
