import { resolve } from 'path'
import readAsync from './readAsync'

describe('Test `readAsync` util!', () => {
  it('Should resolve as `undefined` when unable to read the file!', async () => {
    const received = await readAsync(resolve(__dirname, 'file.name'))
    const expected = undefined

    expect(received).toBe(expected)
  })

  it('Should resolve the file data as a `string` when able to read the file!', async () => {
    const received = await readAsync(__filename)
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
