import "@/styles/globals.css"

import { Comfortaa } from "next/font/google"

import { Providers } from "./_components/providers"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
})

export const metadata = {
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
