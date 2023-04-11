import { ServerHttp2Stream, IncomingHttpHeaders } from 'node:http2'

export type Handler = (
	stream: ServerHttp2Stream,
	headers: IncomingHttpHeaders,
) => void

export type Route = {
	path: string
	handler: Handler
	permissions?: string[]
}

export { Router } from './router'

export { routerFactory } from './router'
export { notFoundRoute, notFoundHandler } from './notFound'
