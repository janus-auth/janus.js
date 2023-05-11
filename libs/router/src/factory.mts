import { notFoundRoute as defaultNotFoundRoute } from './notFound.route.mjs'
import { Handler, Route } from './route.mjs'
import { IncomingHttpHeaders, ServerHttp2Stream } from 'node:http2'

export const routerFactory = (
  routes: Route[],
  notFoundRoute = defaultNotFoundRoute,
): Handler => {
  const routerMap = new Map<string, Route>()

  for (const route of routes) {
    routerMap.set(route.path, route)
  }

  return async (stream: ServerHttp2Stream, headers: IncomingHttpHeaders) => {
    const path = headers[':path']?.split('?')[0] ?? '/'

    const route = routerMap.get(path) ?? notFoundRoute

    return await route.handler(stream, headers)
  }
}
