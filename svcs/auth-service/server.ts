import { serverFactory } from '@libs/server'

import config from './config.json' assert { type: 'json' }
import { router } from './routes'

console.log({ config })

const server = serverFactory(router)

server.listen(3000)
