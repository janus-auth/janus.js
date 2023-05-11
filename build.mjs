import { buildHelper } from '@libs/build'

buildHelper({
    name: 'janus-service',
    entryPoints: ['service/src/index.mts'],
    outDir: 'app/src',
    external: [],
})
