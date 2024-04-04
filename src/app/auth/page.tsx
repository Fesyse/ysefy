import type { Metadata } from "next"
import { Separator } from "../_components/ui/separator"
import { SignInButtons } from "./sign-in-buttons"
export const metadata: Metadata = {
  title: "Authentication",
}

export default function Page() {
  return (
    <div className='flex flex-col gap-3 rounded-xl border border-border px-40 py-8'>
      <h1 className='text-center text-4xl font-bold'>Sign In</h1>
      <div className='relative my-4 flex flex-col items-center justify-center'>
        <Separator />
        <p className='absolute left-1/2 top-1/2 -mt-0.5 w-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background px-3.5 text-center text-sm'>
          with
        </p>
      </div>
      <SignInButtons />
    </div>
  )
}
