import { basename, dirname, resolve } from 'path'
import * as index from '.'

import stackTrace from '@tests/mocks/stackTrace'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

describe('Test `index` utils.', () => {
  describe('Test `initPath` util.', () => {
    describe('By mocking `stackTrace` to return mocked `getFileName` with positive conditions.', () => {
      beforeAll(() => {
        stackTrace.mockReturnValue([
          { getFileName: () => undefined },
          { getFileName: () => null },
          { getFileName: () => '' },
          { getFileName: () => resolve(__dirname, 'any.file') }
        ] as NodeJS.CallSite[])
      })

      afterAll(() => {
        const originalModule = jest.requireActual('@mnrendra/stack-trace')
        stackTrace.mockImplementation(originalModule.stackTrace)
      })

      it('Should return the current directory path!', () => {
        const received = index.initPath('any.file')
        const expected = resolve(__dirname, 'any.file')

        expect(received).toBe(expected)
      })
    })

    describe('By mocking `stackTrace` to return mocked `getFileName` with negative conditions.', () => {
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
        const received = (): void => { index.initPath('any.file') }
        const expected = Error('Unable to obtain the initial path!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should return the current directory path!', () => {
        const received = index.initPath('any.file')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `movePath` util.', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = index.movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })
})
