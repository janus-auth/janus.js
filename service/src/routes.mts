import { keychainFactory } from './keychain.mjs'
import { helloRoute } from '@routes/hello'
import { canaryRouteFactory } from '@routes/system'
import { routerFactory } from '@libs/router'

const keychain = await keychainFactory()

const canaryRoute = await canaryRouteFactory(keychain)

export const routes = [helloRoute, canaryRoute]

export const routeHandler = routerFactory(routes)
