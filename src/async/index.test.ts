import { join } from 'path'
import index from '.'

import { read } from '@tests/mocks/async'
import { unmock } from '@tests/utils'

jest.mock('./read')

describe('Test `index` async.', () => {
  describe('By mocking `read` to resolve empty json string.', () => {
    beforeAll(() => {
      read.mockResolvedValue('{}')
    })

    afterAll(() => {
      unmock(read, join(__dirname, 'read'))
    })

    it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
      const received = await index()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `read` to resolve non-json string.', () => {
    beforeAll(() => {
      read.mockResolvedValue('')
    })

    afterAll(() => {
      unmock(read, join(__dirname, 'read'))
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
      const received = index()
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('Without mocking `read`.', () => {
    it('Should throw an error when unable to obtain the file!', async () => {
      const received = index()
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })
  })
})
