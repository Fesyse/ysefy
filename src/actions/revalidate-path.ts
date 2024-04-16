"use server"
import { revalidatePath } from "next/cache"

export const revalidatePathAction = (
  ...args: [originalPath: string, type?: "layout" | "page"]
) => revalidatePath(...args)
