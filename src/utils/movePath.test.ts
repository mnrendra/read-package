import { basename, dirname, resolve } from 'path'

import movePath from './movePath'

describe('Test `movePath` util:', () => {
  it('Should return the file path in the parent directory!', () => {
    const base = basename(__filename)
    const dir = dirname(__filename)

    const received = movePath(__filename, '..')
    const expected = resolve(resolve(dir, '..'), base)

    expect(received).toBe(expected)
  })
})
