
    const assets = [
  "/enchiridion/index.html",
  "/enchiridion/favicons/yandex-browser-manifest.json",
  "/enchiridion/favicons/yandex-browser-50x50.png",
  "/enchiridion/favicons/mstile-70x70.png",
  "/enchiridion/favicons/mstile-310x310.png",
  "/enchiridion/favicons/mstile-310x150.png",
  "/enchiridion/favicons/mstile-150x150.png",
  "/enchiridion/favicons/mstile-144x144.png",
  "/enchiridion/favicons/manifest.webmanifest",
  "/enchiridion/favicons/icon.svg",
  "/enchiridion/favicons/favicon.ico",
  "/enchiridion/favicons/favicon-48x48.png",
  "/enchiridion/favicons/favicon-32x32.png",
  "/enchiridion/favicons/favicon-16x16.png",
  "/enchiridion/favicons/browserconfig.xml",
  "/enchiridion/favicons/apple-touch-startup-image-828x1792.png",
  "/enchiridion/favicons/apple-touch-startup-image-750x1334.png",
  "/enchiridion/favicons/apple-touch-startup-image-640x1136.png",
  "/enchiridion/favicons/apple-touch-startup-image-2796x1290.png",
  "/enchiridion/favicons/apple-touch-startup-image-2778x1284.png",
  "/enchiridion/favicons/apple-touch-startup-image-2732x2048.png",
  "/enchiridion/favicons/apple-touch-startup-image-2688x1242.png",
  "/enchiridion/favicons/apple-touch-startup-image-2556x1179.png",
  "/enchiridion/favicons/apple-touch-startup-image-2532x1170.png",
  "/enchiridion/favicons/apple-touch-startup-image-2436x1125.png",
  "/enchiridion/favicons/apple-touch-startup-image-2388x1668.png",
  "/enchiridion/favicons/apple-touch-startup-image-2266x1488.png",
  "/enchiridion/favicons/apple-touch-startup-image-2224x1668.png",
  "/enchiridion/favicons/apple-touch-startup-image-2208x1242.png",
  "/enchiridion/favicons/apple-touch-startup-image-2160x1640.png",
  "/enchiridion/favicons/apple-touch-startup-image-2160x1620.png",
  "/enchiridion/favicons/apple-touch-startup-image-2048x2732.png",
  "/enchiridion/favicons/apple-touch-startup-image-2048x1536.png",
  "/enchiridion/favicons/apple-touch-startup-image-1792x828.png",
  "/enchiridion/favicons/apple-touch-startup-image-1668x2388.png",
  "/enchiridion/favicons/apple-touch-startup-image-1668x2224.png",
  "/enchiridion/favicons/apple-touch-startup-image-1640x2160.png",
  "/enchiridion/favicons/apple-touch-startup-image-1620x2160.png",
  "/enchiridion/favicons/apple-touch-startup-image-1536x2048.png",
  "/enchiridion/favicons/apple-touch-startup-image-1488x2266.png",
  "/enchiridion/favicons/apple-touch-startup-image-1334x750.png",
  "/enchiridion/favicons/apple-touch-startup-image-1290x2796.png",
  "/enchiridion/favicons/apple-touch-startup-image-1284x2778.png",
  "/enchiridion/favicons/apple-touch-startup-image-1242x2688.png",
  "/enchiridion/favicons/apple-touch-startup-image-1242x2208.png",
  "/enchiridion/favicons/apple-touch-startup-image-1179x2556.png",
  "/enchiridion/favicons/apple-touch-startup-image-1170x2532.png",
  "/enchiridion/favicons/apple-touch-startup-image-1136x640.png",
  "/enchiridion/favicons/apple-touch-startup-image-1125x2436.png",
  "/enchiridion/favicons/apple-touch-icon.png",
  "/enchiridion/favicons/apple-touch-icon-precomposed.png",
  "/enchiridion/favicons/apple-touch-icon-76x76.png",
  "/enchiridion/favicons/apple-touch-icon-72x72.png",
  "/enchiridion/favicons/apple-touch-icon-60x60.png",
  "/enchiridion/favicons/apple-touch-icon-57x57.png",
  "/enchiridion/favicons/apple-touch-icon-180x180.png",
  "/enchiridion/favicons/apple-touch-icon-167x167.png",
  "/enchiridion/favicons/apple-touch-icon-152x152.png",
  "/enchiridion/favicons/apple-touch-icon-144x144.png",
  "/enchiridion/favicons/apple-touch-icon-120x120.png",
  "/enchiridion/favicons/apple-touch-icon-114x114.png",
  "/enchiridion/favicons/apple-touch-icon-1024x1024.png",
  "/enchiridion/favicons/android-chrome-96x96.png",
  "/enchiridion/favicons/android-chrome-72x72.png",
  "/enchiridion/favicons/android-chrome-512x512.png",
  "/enchiridion/favicons/android-chrome-48x48.png",
  "/enchiridion/favicons/android-chrome-384x384.png",
  "/enchiridion/favicons/android-chrome-36x36.png",
  "/enchiridion/favicons/android-chrome-256x256.png",
  "/enchiridion/favicons/android-chrome-192x192.png",
  "/enchiridion/favicons/android-chrome-144x144.png",
  "/enchiridion/cdn/water.system.min.css",
  "/enchiridion/cdn/water.light.min.css",
  "/enchiridion/cdn/water.dark.min.css",
  "/enchiridion/assets/index-DqtuABNI.js",
  "/enchiridion/assets/index-D0n3z4i2.css",
  "/enchiridion/"
];
    const CACHE_NAME = 'v2025-08-20T04:12:01.249Z';

    self.addEventListener('install', event => {
        self.skipWaiting();
        event.waitUntil(
            caches.open(CACHE_NAME).then(async cache => {
                for(const asset of assets) {
                    try {
                        await cache.add(asset);
                    } catch (e) {
                        console.error('❌ Failed to cache:', asset, e);
                    }
                }
            })
        );
    });

    self.addEventListener('fetch', event => {
        event.respondWith(
            caches.match(event.request).then(response => {
                if(response) return response;
                return fetch(event.request).catch(() => {
                    if(event.request.mode === 'navigate') {
                        return caches.match('/enchiridion/index.html');
                    }
                });
            })
        );
    });

    self.addEventListener('activate', event => {
        self.clients.claim();
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        );
    });
