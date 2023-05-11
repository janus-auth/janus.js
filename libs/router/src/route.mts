import { IncomingHttpHeaders, ServerHttp2Stream } from 'node:http2'

export type Handler = (
  stream: ServerHttp2Stream,
  headers: IncomingHttpHeaders,
) => Promise<void>

export type Route = {
  method: string
  path: string
  handler: Handler
  timeout?: number
  abortSignal?: AbortSignal
}
