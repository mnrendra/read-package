import obtainAsync from './obtainAsync'

describe('Test `obtainAsync` util!', () => {
  it('Should throw an error when unable to obtain the file!', async () => {
    const received = obtainAsync('any.file')
    const expected = Error('Unable to obtain the file data!')

    await expect(received).rejects.toThrow(expected)
  })

  it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
    const received = await obtainAsync('package.json')
    const expected = expect.any(String)

    expect(received).toEqual(expected)
  })
})
