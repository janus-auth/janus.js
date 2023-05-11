import { canaryHandlerFactory } from './canary.handler.mjs'
import { Keychain } from '@libs/keychain'
import { Route } from '@libs/router'

export const canaryRouteFactory = (keychain: Keychain): Route => {
  const canaryHandler = canaryHandlerFactory(keychain)
  return {
    method: 'GET',
    path: '/canary',
    handler: canaryHandler
  }
}
