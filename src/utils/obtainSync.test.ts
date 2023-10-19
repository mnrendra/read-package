import { join } from 'path'
import obtainSync from './obtainSync'

import readSync from '@tests/mocks/readSync'
import { unmock } from '@tests/utils'

jest.mock('./readSync')

describe('Test `obtainSync` util!', () => {
  describe('By mocking `readSync` to return empty json string!', () => {
    beforeAll(() => {
      readSync.mockReturnValue('{}')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'readSync'))
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = obtainSync('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `readSync` to return non-json string!', () => {
    beforeAll(() => {
      readSync.mockReturnValue('')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'readSync'))
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', () => {
      const received = (): void => { obtainSync('package.json') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking `readSync`!', () => {
    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { obtainSync('any.file') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', () => {
      const received = (): void => { obtainSync('package.json') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })
})
