import { Route } from '@libs/router'

import { handler } from './handler'

export const healthRoute: Route = {
	path: '/health',
	handler,
}
