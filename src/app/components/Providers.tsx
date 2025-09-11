"use client"

import type { ReactNode } from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana"
import { useMemo } from "react"
import { useIOSApp } from "../hooks/useIOSApp"

export const Providers = ({ children }: { children: ReactNode }) => {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const ios = useIOSApp()

  const loginMethods = useMemo(() => {
    const methods = new Set<"email" | "google" | "apple">(["email", "google", "apple"])
    if (ios.isActive) {
      methods.delete("google")
    }
    return Array.from(methods)
  }, [ios.isActive])

  if (!appId) {
    return <div>Configuration error</div>
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: "dark",
          walletChainType: "solana-only",
        },
        embeddedWallets: {
          showWalletUIs: false,
          solana: {
            createOnLogin: "off",
          },
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors({ shouldAutoConnect: false }),
          },
          walletConnect: {
            enabled: false,
          },
        },
        loginMethods,
        solanaClusters: [
          {
            name: "mainnet-beta",
            rpcUrl: "https://api.mainnet-beta.solana.com",
          },
        ],
      }}
    >
      {children}
    </PrivyProvider>
  )
}
