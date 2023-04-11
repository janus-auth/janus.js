import {buildHelper} from '@libs/build'

const external = [
    `@js-temporal/polyfill`
]


await buildHelper({
    name: 'main',
    entryPoints: ['svcs/auth-service/server.ts'],
    external,
})


