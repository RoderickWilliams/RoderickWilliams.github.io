const CACHE='portfolio-media-20261029-about-removed-v1';
const LIMIT=80;
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('portfolio-media-')&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('range')||!['image','font'].includes(request.destination))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE),hit=await cache.match(request);
  if(hit)return hit;
  const response=await fetch(request);
  if(response.ok){
   const copy=response.clone();
   event.waitUntil((async()=>{try{
    await cache.put(request,copy);
    const keys=await cache.keys();
    await Promise.all(keys.slice(0,Math.max(0,keys.length-LIMIT)).map(key=>cache.delete(key)));
   }catch(error){/* Storage pressure must never block the page. */}})());
  }
  return response;
 })());
});
