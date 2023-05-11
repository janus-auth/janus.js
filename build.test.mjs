import { buildHelper } from '@libs/build'

const external = []


buildHelper({
    name: 'tests',
    patterns: ['tests/**/*.{test,e2e}.ts'],
    outDir: 'tests',
    external,
})
