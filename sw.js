// Tf-Assistent Service Worker
// Strategie: Network-first — bei bestehender Internetverbindung wird
// immer die aktuelle Version geladen und der Cache aktualisiert.
// Nur ohne Verbindung greift der zuletzt gespeicherte Stand.

const CACHE_NAME = 'tf-app-cache';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
