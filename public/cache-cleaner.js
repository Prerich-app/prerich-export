;(async function cacheCleaner() {
  try {
    const CLEARED_KEY = "prerich_cache_cleared"

    if (localStorage.getItem(CLEARED_KEY)) {
      return
    }

    const isPWA =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        "standalone" in window.navigator ||
        document.referrer.includes("android-app://"))

    if (!isPWA) {
      return
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map((reg) => reg.unregister()))
    }

    if ("caches" in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((name) => caches.delete(name)))
    }

    if ("sessionStorage" in window) {
      sessionStorage.clear()
    }

    if ("indexedDB" in window && indexedDB.databases) {
      const databases = await indexedDB.databases()
      await Promise.all(
        databases.map((db) => {
          if (db.name) {
            return new Promise((resolve) => {
              const deleteReq = indexedDB.deleteDatabase(db.name)
              deleteReq.onsuccess = deleteReq.onerror = () => resolve()
            })
          }
        })
      )
    }

    localStorage.setItem(CLEARED_KEY, "true")
  } catch (error) {
    console.log("Cache cleaner error:", error)
  }
})()
