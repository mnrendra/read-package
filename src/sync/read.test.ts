import { resolve } from 'path'

import read from './read'

describe('Test `read` sync:', () => {
  it('Should return `undefined` when unable to read the file!', () => {
    const received = read(resolve(__dirname, 'file.name'))
    const expected = undefined

    expect(received).toBe(expected)
  })

  it('Should return the file data as a `string` when able to read the file!', () => {
    const received = read(__filename)
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
