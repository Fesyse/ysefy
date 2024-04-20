"use server"
import { revalidatePath } from "next/cache"

export const revalidatePathAction = async (
  ...args: [originalPath: string, type?: "layout" | "page"]
) => revalidatePath(...args)
