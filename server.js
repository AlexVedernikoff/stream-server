// stream-server/server.js
import http from 'node:http'

const TEXT = `Привет! Я стриминговый сервер.
Сейчас я буду отправлять этот текст по кусочкам,
чтобы ты увидел эффект печати в консоли браузера.
Надеюсь, тебе понравится! 🚀`

http
 .createServer(async (req, res) => {
  // CORS — чтобы браузер не блокировал запрос с другого порта
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') {
   res.writeHead(204)
   res.end()
   return
  }

  if (req.url === '/stream') {
   res.setHeader('Content-Type', 'text/plain; charset=utf-8')
   res.setHeader('Cache-Control', 'no-cache')

   const chunks = TEXT.match(/[\s\S]{1,3}/g) || []

   for (const chunk of chunks) {
    res.write(chunk)
    await new Promise((r) => setTimeout(r, 100))
   }

   res.end()
  } else {
   res.writeHead(404)
   res.end('Not found')
  }
 })
 .listen(3001, () => {
  console.log('🚀 Сервер: http://localhost:3001/stream')
 })
