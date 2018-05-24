const CACHE_NAME = 'rk-components';
const cached = [
  'fonts/FiraCode-Regular.ttf',
  'fonts/FiraCode-Bold.eot',
  'fonts/FiraCode-Regular.eot',
  'fonts/FiraCode-Light.eot',
  'fonts/FiraCode-Bold.ttf',
  'fonts/FiraCode-Bold.woff',
  'fonts/FiraCode-Bold.woff2',
  'fonts/FiraCode-Medium.ttf',
  'fonts/FiraCode-Medium.woff',
  'fonts/FiraCode-Medium.woff2',
  'fonts/FiraCode-Medium.eot',
  'fonts/FiraCode-Regular.woff',
  'fonts/FiraCode-Regular.woff2',
  'fonts/FiraCode-Light.ttf',
  'fonts/FiraCode-Light.woff',
  'fonts/FiraCode-Light.woff2',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache Opened');
        return cache.addAll(cached);
      })
  );
});

// self.addEventListener('activate', () => {});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => (response || fetch(event.request)))
  );
});
