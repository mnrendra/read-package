import { join, dirname, basename, resolve } from 'path'
import * as utils from './utils'
import * as index from '.'

import { unmock } from '@tests/utils'
import stackTrace from '@tests/mocks/stackTrace'
import readAsync from '@tests/mocks/readAsync'
import readSync from '@tests/mocks/readSync'

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
        const received = utils.initPath('any.file')
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
        const received = (): void => { utils.initPath('any.file') }
        const expected = Error('Unable to obtain the initial path!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should return the current directory path!', () => {
        const received = utils.initPath('any.file')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `movePath` util.', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = utils.movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })
})

describe('Test all features.', () => {
  describe('Test async feature.', () => {
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

      it('Should throw an error when unable to obtain the initial path!', async () => {
        const received = index.readPackage()
        const expected = Error('Unable to obtain the initial path!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `read` async to resolve empty json string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('{}')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, 'async/read'))
      })

      it('Should resolve the file data when able to obtain the file!', async () => {
        const received = await index.readPackage()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `read` async to resolve non-json string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, 'async/read'))
      })

      it('Should throw an error when unable to obtain the file!', async () => {
        const received = index.readPackage()
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should resolve the file data when able to obtain the file!', async () => {
        const received = await index.readPackage()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test sync feature.', () => {
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
        const received = (): void => { index.readPackageSync() }
        const expected = Error('Unable to obtain the initial path!')

        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `read` sync to return empty json string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('{}')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, 'sync/read'))
      })

      it('Should return the file data as a `string` when able to obtain the file!', () => {
        const received = index.readPackageSync()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `read` sync to return non-json string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, 'sync/read'))
      })

      it('Should throw an error when unable to obtain the file!', () => {
        const received = (): void => { index.readPackageSync() }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything.', () => {
      it('Should resolve the file data when able to obtain the file!', () => {
        const received = index.readPackageSync()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })
  })
})
