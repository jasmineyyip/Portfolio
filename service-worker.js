const CACHE_NAME = 'site-static-v1'; // Increment this version as needed
const ASSETS = [
    '/index.html',
    '/css/style.css',
    '/js/script.js'
];

// Install event - caches assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching shell assets');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate event - cleans up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event - serves assets from cache or fetches from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request);
        })
    );
});