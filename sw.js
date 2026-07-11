// Service Worker Nuke Script
// Self-unregisters and clears all caches to resolve caching traps.
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(key => caches.delete(key)));
    })
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll())
    .then((clients) => {
      clients.forEach(client => {
        if (client.navigate) {
          client.navigate(client.url);
        }
      });
    })
  );
});
