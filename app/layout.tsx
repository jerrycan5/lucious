import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BankingProvider } from "@/lib/banking-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "P&G Employees Credit Union",
  description: "Your trusted financial partner since 1948",
  icons: {
    icon: "data:,", // Empty data URL to remove favicon
  },
    generator: ''
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={inter.className}>
        <BankingProvider>{children}</BankingProvider>
      </body>
    </html>
  )
}
