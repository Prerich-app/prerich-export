import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./components/Providers";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "../fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1f222b",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${satoshi.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <ServiceWorkerRegister />
        <link rel="manifest" href="/manifest.json" />
      </body>
    </html>
  );
};

export default RootLayout;
