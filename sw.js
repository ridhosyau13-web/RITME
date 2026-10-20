const C='ritme-v1',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;
if(q.mode=='navigate'){e.respondWith(fetch(q).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put('index.html',cp));return n}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(n=>{if(n.ok||n.type=='opaque'){const cp=n.clone();caches.open(C).then(c=>c.put(q,cp))}return n})))});
