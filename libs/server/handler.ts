import { Handler } from './index'
import { Router } from '@libs/router'

export const mainHandlerFactory =
	(router: Router): Handler =>
	async (stream, headers) => {
		const path = headers[':path'] ?? ''

		let matchedRoute = router.find(path)
		console.log('Serving route: ', matchedRoute.path)
		matchedRoute.handler(stream, headers)
	}
