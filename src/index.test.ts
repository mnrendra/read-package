import { dirname, basename, resolve, join } from 'path'
import * as utils from './utils'
import * as index from '.'

import { unmock } from '@tests/utils'

import readAsync from '@tests/mocks/async/read'
import readSync from '@tests/mocks/sync/read'

jest.mock('./async/read')
jest.mock('./sync/read')

describe('Test utils.', () => {
  describe('Test `initPath` util.', () => {
    it('Should return the initial path!', () => {
      const received = utils.initPath('any.file')
      const expected = resolve(resolve(__dirname, 'utils'), 'any.file')

      expect(received).toBe(expected)
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

  describe('Test `validateData` util.', () => {
    it('Should return `false` when the given value is not a stringed object!', () => {
      const received = utils.validateData('')
      const expected = false

      expect(received).toBe(expected)
    })

    it('Should return `false` when the given value is a stringed object but include `{ "name": "@mnrendra/read-package" }`!', () => {
      const received = utils.validateData('{ "name": "@mnrendra/read-package" }')
      const expected = false

      expect(received).toBe(expected)
    })

    it('Should return `true` when the given value is a stringed object and exclude `{ "name": "@mnrendra/read-package" }`!', () => {
      const received = utils.validateData('{}')
      const expected = true

      expect(received).toBe(expected)
    })
  })
})

describe('Test the root `index`.', () => {
  describe('Test async feature.', () => {
    describe('By mocking `readAsync` to resolve empty json string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('{}')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, './async/read'))
      })

      it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
        const received = await index.readPackage()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readAsync` to resolve non-json string.', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, './async/read'))
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
        const received = index.readPackage()
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking `read`.', () => {
      it('Should throw an error when unable to obtain the file!', async () => {
        const received = index.readPackage()
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })
  })

  describe('Test sync feature.', () => {
    describe('By mocking `readSync` to return empty json string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('{}')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, './sync/read'))
      })

      it('Should return the file data as a `string` when able to obtain the file!', () => {
        const received = index.readPackageSync()
        const expected = expect.any(Object)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readSync` to return non-json string.', () => {
      beforeAll(() => {
        readSync.mockReturnValue('')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, './sync/read'))
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', () => {
        const received = (): void => { index.readPackageSync() }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking `read`.', () => {
      it('Should throw an error when unable to obtain the file!', () => {
        const received = (): void => { index.readPackageSync() }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })
  })
})
