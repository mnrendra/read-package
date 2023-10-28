import { resolve } from 'path'
import read from './read'

describe('Test `read` async.', () => {
  it('Should resolve `undefined` when unable to read the file!', async () => {
    const received = await read(resolve(__dirname, 'file.name'))
    const expected = undefined

    expect(received).toBe(expected)
  })

  it('Should resolve the file data as a `string` when able to read the file!', async () => {
    const received = await read(__filename)
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
