import { dirname, basename, resolve, join } from 'path'
import * as utils from './utils'
import mainSync from './mainSync'

import { readAsync, readSync } from '@tests/mocks'
import { unmock } from '@tests/utils'

jest.mock('./utils/readAsync')
jest.mock('./utils/readSync')

describe('Test `utils`!', () => {
  describe('Test `initPath` util!', () => {
    it('Should return the file path in the current directory!', () => {
      const received = utils.initPath('any.file')
      const expected = resolve(resolve(__dirname, 'utils'), 'any.file')

      expect(received).toBe(expected)
    })
  })

  describe('Test `movePath` util!', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = utils.movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })

  describe('Test `obtainAsync` util!', () => {
    describe('By mocking `readAsync` to resolve empty json string!', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('{}')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, './utils/readAsync'))
      })

      it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
        const received = await utils.obtainAsync('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readAsync` to resolve non-json string!', () => {
      beforeAll(() => {
        readAsync.mockResolvedValue('')
      })

      afterAll(() => {
        unmock(readAsync, join(__dirname, './utils/readAsync'))
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
        const received = utils.obtainAsync('package.json')
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking `readAsync`!', () => {
      it('Should throw an error when unable to obtain the file!', async () => {
        const received = utils.obtainAsync('any.file')
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', async () => {
        const received = utils.obtainAsync('package.json')
        const expected = Error('Unable to obtain the file data!')

        await expect(received).rejects.toThrow(expected)
      })
    })
  })

  describe('Test `obtainSync` util!', () => {
    describe('By mocking `readSync` to return empty json string!', () => {
      beforeAll(() => {
        readSync.mockReturnValue('{}')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, './utils/readSync'))
      })

      it('Should return the file data as a `string` when able to obtain the file!', () => {
        const received = utils.obtainSync('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readSync` to return non-json string!', () => {
      beforeAll(() => {
        readSync.mockReturnValue('')
      })

      afterAll(() => {
        unmock(readSync, join(__dirname, './utils/readSync'))
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', () => {
        const received = (): void => { utils.obtainSync('package.json') }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking `readSync`!', () => {
      it('Should throw an error when unable to obtain the file!', () => {
        const received = (): void => { utils.obtainSync('any.file') }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })

      it('Should throw an error when able to obtain the file but the value is invalid!', () => {
        const received = (): void => { utils.obtainSync('package.json') }
        const expected = Error('Unable to obtain the file data!')

        expect(received).toThrow(expected)
      })
    })
  })

  describe('Test `readAsync` util!', () => {
    it('Should resolve as `undefined` when unable to read the file!', async () => {
      const received = await utils.readAsync(resolve(__dirname, 'any.file'))
      const expected = undefined

      expect(received).toBe(expected)
    })

    it('Should resolve the file data as a `string` when able to read the file!', async () => {
      const received = await utils.readAsync(__filename)
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('Test `readSync` util!', () => {
    it('Should return `undefined` when unable to read the file!', () => {
      const received = utils.readSync(resolve(__dirname, 'any.file'))
      const expected = undefined

      expect(received).toBe(expected)
    })

    it('Should return the file data as a `string` when able to read the file!', () => {
      const received = utils.readSync(__filename)
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})

describe('Test `mainSync` feature!', () => {
  describe('By mocking `readSync` to return empty json string!', () => {
    beforeAll(() => {
      readSync.mockReturnValue('{}')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, './utils/readSync'))
    })

    it('Should return the `package.json` data as a `Package` object!', () => {
      const received = mainSync()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `readSync` to return non-json string!', () => {
    beforeAll(() => {
      readSync.mockReturnValue('')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, './utils/readSync'))
    })

    it('Should throw an error when able to obtain the file but the value is invalid!', () => {
      const received = (): void => { mainSync() }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking `readSync`!', () => {
    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { mainSync() }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })
})
