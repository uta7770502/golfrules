const CACHE_NAME = "3tap-rules-v1";
const urlsToCache = [
  "index.html",
  "rules.html",
  "rule.html",
  "favorites.html",
  "css/style.css",
  "js/main.js",
  "rules.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
