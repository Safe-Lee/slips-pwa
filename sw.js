'use strict';
// Cache store name to save static resources
const CACHE_STATIC = 'static-cache-v3.6.241';
// Minimal set of files to cache to be a PWA
const FILES_TO_CACHE = [
    './',
    './favicon.ico',
    './favicon-16x16.png',
    './favicon-32x32.png',
    './mstile-150x150.png',
    './img/favicon-180.png',
    './img/favicon-192.png',
    './img/favicon-512.png',
    './index.html',
    './pwa.json',
    './style.css',
    './checklistLogic.js',
    './installAppBTN.js',
    './registerSW.js',
    './OpenSans-VariableFont_wdth,wght.ttf',
    './apple-touch-icon.png',
];

// FUNCS

/**
 * When a service worker is initially registered, pages won't use it until they next load. The claim() method causes
 * those pages to be controlled immediately.
 *
 * @param {ExtendableEvent} evt
 */
function onActivate(evt) {
    console.log(`SW: send 'claim' message to the clients.`);
    evt.waitUntil(
        self.clients.claim()
    );
}

/**
 * Return static resource from cache (if exists) or fetch from network.
 * @param {FetchEvent} evt
 */
function onFetch(evt) {
    // FUNCS
    async function cacheOrFetch(req) {
        const cache = await self.caches.open(CACHE_STATIC);
        const cachedResponse = await cache.match(req);
        return cachedResponse ?? await fetch(req);
    }

    // MAIN
    console.log(`SW: fetch '${evt.request}'.`);
    evt.respondWith(cacheOrFetch(evt.request));
}

/**
 * Load and store required static resources on installation.
 * @param {ExtendableEvent} evt
 */
function onInstall(evt) {
    // FUNCS
    async function cacheStaticFiles() {
        const cacheStat = await caches.open(CACHE_STATIC);
        // load all resources at the same time (parallel)
        await Promise.all(
            FILES_TO_CACHE.map(function (url) {
                return cacheStat.add(url).catch(function (reason) {
                    console.log(`'${url}' failed: ${String(reason)}`);
                });
            })
        );
    }

    // MAIN
    console.log(`SW: cache app shell on install.`);
    //  wait until all static files will be cached
    evt.waitUntil(cacheStaticFiles());
}

// MAIN
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('install', onInstall);