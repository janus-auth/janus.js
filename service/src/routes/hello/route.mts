import { Route } from '@libs/router'

export const helloRoute: Route = {
  method: 'GET',
  path: '/',
  handler: async (stream, headers) => {
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 200,
    })
    stream.end('<h1>Hello World</h1>')
  },
}
