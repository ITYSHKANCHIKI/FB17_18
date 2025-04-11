const CACHE_NAME = "my-notes-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/index.css",
  "/vite.svg",
  "/manifest.json",
];
// Установка SW: сохраняем файлы в кэш
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // активируем сразу
});
// Активация: удаляем старые версии кэша
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
        )
      )
  );
});
// Fetch: перехватываем запросы
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
