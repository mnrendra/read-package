import { basename, dirname, resolve } from 'path'

import stackTrace from '@tests/mocks/stackTrace'
import { validSkippedStacks } from '@tests/stubs'

import { initPath, movePath, validateSkippedStacks } from '.'

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
        const received = initPath('any.file')
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
        const received = (): void => { initPath('any.file') }
        const expected = Error('Unable to obtain the initial path!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should return the current directory path!', () => {
        const received = initPath('any.file')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the current directory path by adding a skipped stack!', () => {
        const received = initPath('any.file', 'any')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the current directory path by adding a list of skipped stacks!', () => {
        const received = initPath('any.file', ['any'])
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `movePath` util.', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })

  describe('Test `validateSkippedStacks` util.', () => {
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
})
