import validSkippedStacks from '@tests/stubs/validSkippedStacks'

import validateSkippedStacks from './validateSkippedStacks'

describe('Test `validateSkippedStacks` util:', () => {
  it('Should return the default value when given an empty argument!', () => {
    const received = validateSkippedStacks()
    const expected = validSkippedStacks()

    expect(received).toEqual(expected)
  })

  it('Should return the default value with additional `skippedStacks` when given a `skippedStacks` option with a string!', () => {
    const received = validateSkippedStacks('any')
    const expected = [...validSkippedStacks(), 'any']

    expect(received).toEqual(expected)
  })

  it('Should return the default value with additional `skippedStacks` when given a `skippedStacks` option with a list of strings!', () => {
    const received = validateSkippedStacks(['any'])
    const expected = [...validSkippedStacks(), 'any']

    expect(received).toEqual(expected)
  })
})
