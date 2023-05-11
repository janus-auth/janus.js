import { keychainFactory } from './keychain.mjs'
import { routerFactory } from '@libs/router'
import { helloRoute } from '@routes/hello'
import { canaryRouteFactory } from '@routes/system'

const keychain = await keychainFactory()

const canaryRoute = await canaryRouteFactory(keychain)

export const routes = [helloRoute, canaryRoute]

export const routeHandler = routerFactory(routes)
