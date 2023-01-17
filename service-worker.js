const cacheName = "images-slider-v1";
const appShellFiles = [
    "index.html",
    "range.js",
    "range.css",
    "icons/icon-16.png",
    "icons/icon-32.png",
    "icons/icon-192.png",
    "icons/icon-512.png",
    "images/images-slider.png",
    "images/screenshot1.png",
    "images/screenshot2.png"
];
self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[Service Worker] Caching all: app shell and content");
        await cache.addAll(appShellFiles);
    })());
});
self.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request,response.clone());
        return response;
    })());
});