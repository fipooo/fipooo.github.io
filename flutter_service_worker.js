'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "33d3997bd153fcac9956b57a53bb3bc0",
"/": "33d3997bd153fcac9956b57a53bb3bc0",
"images/whatsthat4.png": "09b2ea88c6927aa7fddc4c9f7e2493c6",
"images/whatsthat2.png": "13d1af1495347708faaa4c98117f4e05",
"images/whatsthat3.png": "95156f08705dbd80e05e2b64bac8c0ef",
"images/whatsthat1.png": "6b7ef3238910014df98bcd36642fa9a7",
"images/game3.png": "482da20d1de0a94c898b541ffbf54b28",
"images/luxsure1.png": "fff0136b3da63094ab89e42939bee833",
"images/game1.png": "a333b22a552a8f55afb175e520f708ee",
"images/luxsure2.png": "cbd226f97d61bae3fe9ca71a7c103b3a",
"images/shop1.png": "ee8d6ec7ce11443685d0ffe21868ace3",
"images/shop2.png": "3fed2324368a9689978c7d1f02816a6e",
"images/shop3.png": "86be5ffcb5c3e90c2e268ba82c71cc3f",
"images/shop4.png": "4d0cc547eb5a7b5989b38e99387cabf1",
"images/gmae2.png": "4488b06391c3d0a7b8cb7f64c296f22c",
"images/howwell3.png": "79b53a321d763995743485aba21420c2",
"images/air1.png": "809013b0debe49a96af9b0beab36ea7b",
"images/howwell2.png": "037223655d3e9f69873697072bc8a955",
"images/marsz1.png": "44df0a4a1c40cb17dbffe42edf508294",
"images/marsz3.png": "2e4130495b4e1208e283320d76381229",
"images/air2.png": "ee5608ef24e39e48f8a8851b09b61a60",
"images/howwell1.png": "ac378a4643809c42e52d90f1f7a2ab62",
"images/marsz2.png": "45c52e0b2eb63851ef6778c64196a9b2",
"main.dart.js": "ecbceeaa923108dc32fd81dec2a5777a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a83bbbd9d23ea4d752fbcd44cdc544fa",
"assets/AssetManifest.json": "9b7e12998f29436199ccf1020ec533dc",
"assets/NOTICES": "5e458df53cc4d7027d1f88129144c3e5",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/whatsthat4.png": "09b2ea88c6927aa7fddc4c9f7e2493c6",
"assets/assets/images/whatsthat2.png": "13d1af1495347708faaa4c98117f4e05",
"assets/assets/images/whatsthat3.png": "95156f08705dbd80e05e2b64bac8c0ef",
"assets/assets/images/whatsthat1.png": "6b7ef3238910014df98bcd36642fa9a7",
"assets/assets/images/game3.png": "482da20d1de0a94c898b541ffbf54b28",
"assets/assets/images/luxsure1.png": "fff0136b3da63094ab89e42939bee833",
"assets/assets/images/game1.png": "a333b22a552a8f55afb175e520f708ee",
"assets/assets/images/luxsure2.png": "cbd226f97d61bae3fe9ca71a7c103b3a",
"assets/assets/images/shop1.png": "ee8d6ec7ce11443685d0ffe21868ace3",
"assets/assets/images/shop2.png": "3fed2324368a9689978c7d1f02816a6e",
"assets/assets/images/shop3.png": "86be5ffcb5c3e90c2e268ba82c71cc3f",
"assets/assets/images/shop4.png": "4d0cc547eb5a7b5989b38e99387cabf1",
"assets/assets/images/gmae2.png": "4488b06391c3d0a7b8cb7f64c296f22c",
"assets/assets/images/howwell3.png": "79b53a321d763995743485aba21420c2",
"assets/assets/images/air1.png": "809013b0debe49a96af9b0beab36ea7b",
"assets/assets/images/howwell2.png": "037223655d3e9f69873697072bc8a955",
"assets/assets/images/marsz1.png": "44df0a4a1c40cb17dbffe42edf508294",
"assets/assets/images/marsz3.png": "2e4130495b4e1208e283320d76381229",
"assets/assets/images/air2.png": "ee5608ef24e39e48f8a8851b09b61a60",
"assets/assets/images/howwell1.png": "ac378a4643809c42e52d90f1f7a2ab62",
"assets/assets/images/marsz2.png": "45c52e0b2eb63851ef6778c64196a9b2"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
