import { join, dirname, basename, resolve } from 'path'

import stackTrace from '@tests/mocks/stackTrace'
import readAsync from '@tests/mocks/readAsync'
import readSync from '@tests/mocks/readSync'
import { unmock } from '@tests/utils'
import { validSkippedStacks } from '@tests/stubs'

import { validateSkippedStacks, movePath, initPath } from './utils'

import { readPackage, readPackageSync } from '.'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./async/read')

jest.mock('./sync/read')

describe('Test utils.', () => {
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

describe('Test all features.', () => {
  describe('Test `async` feature.', () => {
    describe('By mocking `initPath` to reject with an error.', () => {
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

      it('Should reject with an error when unable to obtain the initial path!', async () => {
        const received = readPackage()
        const expected = Error('Unable to obtain the initial path!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `read` async to resolve an empty JSON string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('{}')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, 'async/read'))
      })

      it('Should resolve the file data when able to obtain the file!', async () => {
        const received = await readPackage()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `read` async to resolve a non-JSON string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, 'async/read'))
      })

      it('Should reject with an error when unable to obtain the file!', async () => {
        const received = readPackage()
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should resolve the file data when able to obtain the file!', async () => {
        const received = await readPackage()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })

      it('Should resolve the file data by adding a skipped stack!', async () => {
        const received = await readPackage({ skippedStacks: 'any' })
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })

      it('Should resolve the file data by adding a list of skipped stacks!', async () => {
        const received = await readPackage({ skippedStacks: ['any'] })
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `sync` feature.', () => {
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
        const received = (): void => { readPackageSync() }
        const expected = Error('Unable to obtain the initial path!')

        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `read` sync to return an empty JSON string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('{}')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, 'sync/read'))
      })

      it('Should return the file data as a `string` when able to obtain the file!', () => {
        const received = readPackageSync()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `read` sync to return a non-JSON string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, 'sync/read'))
      })

      it('Should throw an error when unable to obtain the file!', () => {
        const received = (): void => { readPackageSync() }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should return the file data when able to obtain the file!', () => {
        const received = readPackageSync()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })

      it('Should return the file data by adding a skipped stack!', () => {
        const received = readPackageSync({ skippedStacks: 'any' })
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })

      it('Should return the file data by adding a list of skipped stacks!', () => {
        const received = readPackageSync({ skippedStacks: ['any'] })
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })
  })
})
