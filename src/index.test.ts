import { stubs } from '@tests'
import index from '.'

describe('Test the root `index`!', () => {
  it('Should return \'Hello, World!\' when given an empty argument!', () => {
    const result = index()
    expect(result).toBe(stubs.main.defaultValue())
  })
})
