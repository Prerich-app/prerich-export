/* eslint-disable @typescript-eslint/no-unused-vars */

// Take control immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Delete all old caches
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // Unregister old service workers
      await self.registration.unregister();

      // Take over all pages immediately
      await self.clients.claim();
    })()
  );
});

// No fetch handler -> everything goes directly to the network
