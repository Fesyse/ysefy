import { getServerAuthSession } from "@/server/auth"
import Link from "next/link"

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <main className='flex min-h-screen w-full p-4'>
      {!session ? (
        <Link
          href='/auth'
          className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
        >
          Sign in
        </Link>
      ) : (
        <div>{JSON.stringify(session.user)}</div>
      )}
    </main>
  )
}
