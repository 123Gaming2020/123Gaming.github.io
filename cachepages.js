const cacheName = 'v1';

const filesToCache = [
   './index.html',
   './googleb06a000c8c2fc325.html',
];
self.addEventListener('activate', event => {
  console.log('worker : activate');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('new worker activated');
    })
  );
});

self.addEventListener('install', e => {
  console.log('worker : install');
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});
self.addEventListener('fetch', e => {
  console.log('worker : fetch', e.request);
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});
