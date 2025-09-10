import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import Script from "next/script"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "./components/Providers"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "../fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "Prerich has shut down - export your wallet",
  description:
    "Prerich has officially shut down as of September 15, 2025. Log in to export your wallet data for use in other applications.",
  openGraph: {
    type: "website",
    title: "Prerich has shut down - export your wallet",
    description:
      "Prerich has officially shut down as of September 15, 2025. Log in to export your wallet data for use in other applications.",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${satoshi.variable} antialiased bg-[#2A3EF4]`} suppressHydrationWarning>
        <Script id="cache-cleaner" strategy="beforeInteractive" src="/scripts/cache-cleaner.js" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
