import { join } from 'path'
import index from '.'

import { read } from '@tests/mocks/sync'
import { unmock } from '@tests/utils'

jest.mock('./read')

describe('Test `index` sync.', () => {
  describe('By mocking `read` to return empty json string.', () => {
    beforeAll(() => {
      read.mockReturnValue('{}')
    })

    afterAll(() => {
      unmock(read, join(__dirname, 'read'))
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = index()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `read` to return non-json string.', () => {
    beforeAll(() => {
      read.mockReturnValue('')
    })

    afterAll(() => {
      unmock(read, join(__dirname, 'read'))
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', () => {
      const received = (): void => { index() }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking `read`.', () => {
    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { index() }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })
})
