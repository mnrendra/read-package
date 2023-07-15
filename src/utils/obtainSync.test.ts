import obtainSync from './obtainSync'

describe('Test `obtainSync` util!', () => {
  it('Should throw an error when unable to obtain the file!', () => {
    const received = (): void => { obtainSync('any.file') }
    const expected = Error('Unable to obtain the file data!')

    expect(received).toThrow(expected)
  })

  it('Should return the file data as a `string` when able to obtain the file!', () => {
    const received = obtainSync('package.json')
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
