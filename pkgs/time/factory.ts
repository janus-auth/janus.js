import { Handler } from '@svcs/auth-service'
import { ServerHttp2Stream } from 'node:http2'
import { handler } from './handler'

export const factory: Handler = () => {
	return handler
}
