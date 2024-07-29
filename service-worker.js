// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/styles.css',
//         '/app.js',
//         '/manifest.json',
//         '/icon.png'
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
 

// complex advanced
const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tag') {
    event.waitUntil(syncData());
  }
});

function syncData() {
  return fetch('/sync-endpoint', {
    method: 'POST',
    body: JSON.stringify({ data: 'example data' })
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log('Data synced:', data);
  }).catch(error => {
    console.error('Sync failed:', error);
  });
}




// run command in this direcotory terminal npx http-server .
