import { stubs } from '@tests'
import main from './main'

describe('Test the `main` feature!', () => {
  it('Should return \'Hello, World!\' when given an empty argument!', () => {
    const result = main()
    expect(result).toBe(stubs.main.defaultValue())
  })
})
