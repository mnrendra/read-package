import { dirname, basename, resolve } from 'path'
import * as index from '.'

describe('Test `index` utils!', () => {
  describe('Test `initPath` util!', () => {
    it('Should return the file path in the current directory!', () => {
      const received = index.initPath('any.file')
      const expected = resolve(__dirname, 'any.file')

      expect(received).toBe(expected)
    })
  })

  describe('Test `movePath` util!', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = index.movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })

  describe('Test `readAsync` util!', () => {
    it('Should resolve as `undefined` when unable to read the file!', async () => {
      const received = await index.readAsync(resolve(__dirname, 'any.file'))
      const expected = undefined

      expect(received).toBe(expected)
    })

    it('Should resolve the file data as a `string` when able to read the file!', async () => {
      const received = await index.readAsync(__filename)
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('Test `readSync` util!', () => {
    it('Should return `undefined` when unable to read the file!', () => {
      const received = index.readSync(resolve(__dirname, 'any.file'))
      const expected = undefined

      expect(received).toBe(expected)
    })

    it('Should return the file data as a `string` when able to read the file!', () => {
      const received = index.readSync(__filename)
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('Test `obtainAsync` util!', () => {
    it('Should throw an error when unable to obtain the file!', async () => {
      const received = index.obtainAsync('any.file')
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })

    it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
      const received = await index.obtainAsync('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })

  describe('Test `obtainSync` util!', () => {
    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { index.obtainSync('any.file') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = index.obtainSync('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})
