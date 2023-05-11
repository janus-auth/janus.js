import { subtle } from 'node:crypto'

// TODO: sign the keys with a CA

export const keychainFactory = async () => {
  const ecdsa = await subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    false,
    ['sign', 'verify'],
  )

  return {
    ecdsa,
  }
}
