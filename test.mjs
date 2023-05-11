import { default as crypto, subtle } from 'node:crypto'

const { webcrypto } = crypto

console.log({ webcrypto })

const key = await subtle.generateKey(
    {
        name: 'ECDSA',
        namedCurve: 'P-384',
    },
    false, // Key is stored in the trusted platform module, making it inaccessible from ram
    ['sign', 'verify'],
)

console.log({ key })
