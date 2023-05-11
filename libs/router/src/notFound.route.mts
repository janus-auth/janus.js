import { Route } from './route.mjs'

export const notFoundRoute: Route = {
  method: 'GET',
  path: '*',
  handler: async (stream, headers) => {
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 404,
    })
    stream.end('<h1>Route not found</h1>')
  },
}
