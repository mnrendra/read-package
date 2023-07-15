import { resolve } from 'path'
import readSync from './readSync'

describe('Test `readSync` util!', () => {
  it('Should return `undefined` when unable to read the file!', () => {
    const received = readSync(resolve(__dirname, 'file.name'))
    const expected = undefined

    expect(received).toBe(expected)
  })

  it('Should return the file data as a `string` when able to read the file!', () => {
    const received = readSync(__filename)
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
