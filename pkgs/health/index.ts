import { Route } from '@modern/service/interfaces'

import { handler } from './handler'

export const healthRoute: Route = {
	path: '/health',
	handler,
}
