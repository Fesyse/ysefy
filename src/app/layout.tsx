import "@/styles/globals.css"

import { Comfortaa } from "next/font/google"

import { Providers } from "./_components/providers"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
})

const comfortaaVariable = comfortaa.variable

const metadata = {
  title: {
    default: "YseFy",
    template: "%s | YseFy",
  },
  description: "An chat app to hang out",
  icons: "/favicon.ico",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`font-sans ${comfortaa.className}`}>
        <Providers>
          <div className='m-4 flex h-screen w-full items-center justify-center overflow-hidden'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}

export { metadata, comfortaaVariable }
