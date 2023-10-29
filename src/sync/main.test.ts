import { join } from 'path'
import main from './main'

import { unmock } from '@tests/utils'
import stackTrace from '@tests/mocks/stackTrace'
import readSync from '@tests/mocks/readSync'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./read')

describe('Test `main` sync.', () => {
  describe('By mocking `initPath` to throw an error.', () => {
    beforeAll(() => {
      stackTrace.mockReturnValue([
        { getFileName: () => undefined },
        { getFileName: () => null },
        { getFileName: () => '' }
      ] as NodeJS.CallSite[])
    })

    afterAll(() => {
      const originalModule = jest.requireActual('@mnrendra/stack-trace')
      stackTrace.mockImplementation(originalModule.stackTrace)
    })

    it('Should throw an error when unable to obtain the initial path!', () => {
      const received = (): void => { main() }
      const expected = Error('Unable to obtain the initial path!')

      expect(received).toThrow(expected)
    })
  })

  describe('By mocking `read` sync to return empty json string.', () => {
    beforeAll(() => {
      readSync.mockReturnValue('{}')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'read'))
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = main()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `read` sync to return non-json string.', () => {
    beforeAll(() => {
      readSync.mockReturnValue('')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'read'))
    })

    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { main() }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking anything.', () => {
    it('Should resolve the file data when able to obtain the file!', () => {
      const received = main()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })
})
