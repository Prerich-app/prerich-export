"use client"

import { useState } from "react"
import { usePrivy, useLogin, useSolanaWallets } from "@privy-io/react-auth"

export const ExportButton = () => {
  const [isChecking, setIsChecking] = useState(false)
  const { ready, authenticated, logout } = usePrivy()
  const { exportWallet, wallets } = useSolanaWallets()

  const { login } = useLogin({
    onComplete: () => {
      setIsChecking(true)
      setTimeout(() => setIsChecking(false), 1000)
    },
  })

  const handleClick = async () => {
    if (!ready) return

    if (!authenticated) {
      login()
      return
    }

    if (authenticated && wallets[0]) {
      exportWallet()
    }
  }

  const getButtonText = () => {
    if (!ready) return "Loading..."
    if (!authenticated) return "Login & Export wallet"
    if (isChecking) return "Checking for wallet..."
    return "Export wallet"
  }

  const showButton = !ready || !authenticated || isChecking || wallets[0]

  return (
    <div className="flex gap-x-2 items-center sm:justify-center w-full">
      {showButton && (
        <button
          onClick={handleClick}
          disabled={!ready || isChecking}
          className="inline-flex font-semibold rounded-full cursor-pointer w-auto bg-accent px-6 py-2.5 sm:px-8 sm:py-3 text-sm text-white transition-colors hover:bg-accent/80 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          {getButtonText()}
        </button>
      )}

      {authenticated && !wallets[0] && !isChecking && <div className="text-pink-400 font-sm pr-1">No wallet to export</div>}

      {authenticated && (
        <button
          onClick={logout}
          disabled={!ready}
          className="inline-flex font-semibold rounded-full cursor-pointer w-auto bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 text-sm text-white transition-colors hover:bg-white/20 focus:outline-none disabled:opacity-50"
          type="button"
        >
          Logout
        </button>
      )}
    </div>
  )
}
