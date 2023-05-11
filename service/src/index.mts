import { routeHandler } from './routes.mjs'
import { readFile } from 'node:fs/promises'
import { createSecureServer, createServer } from 'node:http2'
import { env } from 'node:process'

const isProd = env.NODE_ENV === 'production'
const port = Number(env.PORT) || 8443

const server = isProd
  ? createServer()
  : createSecureServer({
      key: await readFile('localhost-privkey.pem'),
      cert: await readFile('localhost-cert.pem'),
    })

server.on('error', (err) => console.error(err))

server.on('stream', async (stream, headers) => {
  await routeHandler(stream, headers)
})

server.listen(port)
