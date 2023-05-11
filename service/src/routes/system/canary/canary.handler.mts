import { Keychain } from '@libs/keychain'
import { Handler } from '@libs/router'

export const canaryHandlerFactory = (keychain: Keychain): Handler => {
  return async (stream, headers) => {
    stream.respond({
      'content-type': 'application/json; charset=utf-8',
      ':status': 200,
    })
    console.log({ keychain })
    stream.end('<h1>Canary</h1>')
  }
}
