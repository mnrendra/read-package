import validateData from './validateData'

describe('Test `validateData` util!', () => {
  it('Should return `false` when the given value is not a stringed object!', () => {
    const received = validateData('')
    const expected = false

    expect(received).toBe(expected)
  })

  it('Should return `false` when the given value is a stringed object but include `{ "name": "@mnrendra/read-package" }`!', () => {
    const received = validateData('{ "name": "@mnrendra/read-package" }')
    const expected = false

    expect(received).toBe(expected)
  })

  it('Should return `true` when the given value is a stringed object and exclude `{ "name": "@mnrendra/read-package" }`!', () => {
    const received = validateData('{}')
    const expected = true

    expect(received).toBe(expected)
  })
})
