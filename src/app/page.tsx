import { getServerAuthSession } from "@/server/auth"
import { api } from "@/trpc/server"
import Link from "next/link"
import { Button } from "./_components/ui/button"

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" })
  const session = await getServerAuthSession()

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='container flex flex-col items-center justify-center gap-12 px-4 py-16 '>
        <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
          Create <span className='text-[hsl(280,100%,70%)]'>T3</span> App
        </h1>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-2xl text-white'>
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-center text-2xl text-white'>
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href='/auth'
              className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
