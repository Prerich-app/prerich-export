"use client"

type WebkitMessageHandler = {
  postMessage?: (message: string) => void
}

interface WebkitWindow extends Window {
  webkit?: {
    messageHandlers?: {
      [key: string]: WebkitMessageHandler
    }
  }
  app?: {
    platform: "ios"
    environment: string
    allowedEnvironments?: string[]
  }
}

declare let window: WebkitWindow

const postMessage = (handler: string, message: string) => {
  if (typeof window === "undefined") return

  if (
    !window.webkit?.messageHandlers?.[handler]?.postMessage ||
    typeof window.webkit?.messageHandlers?.[handler]?.postMessage !== "function"
  ) {
    return
  }

  window.webkit.messageHandlers[handler].postMessage(message)
}

const createGetHandler =
  <I extends Record<string, unknown>, O = unknown>(event: string) =>
  (input: I) =>
    new Promise<O>((res, rej) => {
      if (typeof window === "undefined") {
        rej(new Error("This function can only be used in the browser"))
        return
      }

      const id = Date.now().toString()

      const resolve = (data: O) => {
        res(data)
        window.removeEventListener(event, handleEvent)
      }

      const reject = (e: unknown) => {
        rej(e)
        window.removeEventListener(event, handleEvent)
      }

      const handleEvent = (event: Event) => {
        if (!(event instanceof CustomEvent)) return

        try {
          const data = event.detail
          if (!data || typeof data !== "object") throw new Error("Invalid data")

          if (data.id !== id) {
            return
          }
          resolve(data.data)
        } catch (e) {
          reject(e)
          return
        }
      }

      try {
        const json = JSON.stringify({
          id,
          data: input,
        })

        window.addEventListener(event, handleEvent)

        postMessage(event, json)
      } catch (e) {
        reject(e)
      }
    })

const createPostHandler =
  <I extends Record<string, unknown>>(event: string) =>
  (input: I) => {
    const json = JSON.stringify({
      data: input,
    })

    postMessage(event, json)
  }

const getHandlers = {
  appsflyer: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    getUID: createGetHandler<{}, { uid: string }>("appsflyer-get-uid"),
  },
}

const postHandlers = {
  changeEnvironment: createPostHandler<{
    env: string
  }>("changeEnvironment"),
  branch: {
    setCustomerId: createPostHandler<{ customerId: string }>("branch-set-customer-id"),
  },
}

export const IOSApp = {
  get: getHandlers,
  post: postHandlers,
}

export const useIOSApp = () => {
  const app = typeof window !== "undefined" ? window.app : undefined
  const isActive = app?.platform === "ios"

  return {
    app,
    isActive,
    get: getHandlers,
    post: postHandlers,
  }
}
