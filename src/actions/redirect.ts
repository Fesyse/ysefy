"use server"
import { type RedirectType, redirect } from "next/navigation"

export const redirectAction = async (url: string, type?: RedirectType) =>
  redirect(url, type)
