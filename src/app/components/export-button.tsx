"use client"

import { usePrivy, useLogin, useSolanaWallets } from "@privy-io/react-auth"

export const ExportButton = () => {
  const { ready, authenticated, user, logout } = usePrivy()
  const { exportWallet } = useSolanaWallets()

  const { login } = useLogin()

  const handleClick = async () => {
    if (!ready) return

    if (!authenticated) {
      login()
      return
    }

    if (user) exportWallet()
  }

  const getButtonText = () => {
    if (!ready) return "Loading..."
    if (!authenticated) return "Login & Export wallet"

    return "Export wallet"
  }

  return (
    <div className="flex gap-x-2 items-center sm:justify-center w-full">
      <button
        onClick={handleClick}
        disabled={!ready}
        className="inline-flex font-semibold rounded-full cursor-pointer items-center gap-x-2 justify-center w-auto bg-accent px-6 py-2.5 sm:px-8 sm:py-3 text-sm text-white transition-colors hover:bg-accent/80 focus:outline-none"
        type="button"
      >
        {!ready && (
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {getButtonText()}
      </button>
      {authenticated && (
        <button
          onClick={logout}
          disabled={!ready}
          className="inline-flex font-semibold rounded-full cursor-pointer w-auto bg-white/10 px-6 py-2.5 sm:px-8 sm:py-3 text-sm text-white transition-colors hover:bg-white/20 focus:outline-none"
          type="button"
        >
          Logout
        </button>
      )}
    </div>
  )
}
