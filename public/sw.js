self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      } catch (_error) {
        // Best-effort cleanup for stale local caches.
      }

      await self.registration.unregister();

      const windowClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        client.navigate(client.url);
      }
    })(),
  );
});

self.addEventListener('fetch', () => {
  // No runtime caching. This worker exists only to clean up stale registrations.
});
