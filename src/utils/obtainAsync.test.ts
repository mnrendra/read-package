import { join } from 'path'
import obtainAsync from './obtainAsync'

import readAsync from '@tests/mocks/readAsync'
import { unmock } from '@tests/utils'

jest.mock('./readAsync')

describe('Test `obtainAsync` util!', () => {
  describe('By mocking `readAsync` to resolve empty json string!', () => {
    beforeAll(() => {
      readAsync.mockResolvedValue('{}')
    })

    afterAll(() => {
      unmock(readAsync, join(__dirname, 'readAsync'))
    })

    it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
      const received = await obtainAsync('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `readAsync` to resolve non-json string!', () => {
    beforeAll(() => {
      readAsync.mockResolvedValue('')
    })

    afterAll(() => {
      unmock(readAsync, join(__dirname, 'readAsync'))
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
      const received = obtainAsync('package.json')
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('Without mocking `readAsync`!', () => {
    it('Should throw an error when unable to obtain the file!', async () => {
      const received = obtainAsync('any.file')
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
      const received = obtainAsync('package.json')
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })
  })
})
