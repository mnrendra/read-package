import { resolve } from 'path'
import initPath from './initPath'

describe('Test `initPath` util!', () => {
  it('Should return the file path in the current directory!', () => {
    const received = initPath('any.file')
    const expected = resolve(__dirname, 'any.file')

    expect(received).toBe(expected)
  })
})
