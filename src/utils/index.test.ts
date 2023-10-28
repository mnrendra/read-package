import { dirname, basename, resolve } from 'path'
import * as index from '.'

describe('Test `index` utils.', () => {
  describe('Test `initPath` util.', () => {
    it('Should return the initial path!', () => {
      const received = index.initPath('any.file')
      const expected = resolve(__dirname, 'any.file')

      expect(received).toBe(expected)
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

  describe('Test `validateData` util.', () => {
    it('Should return `false` when the given value is not a stringed object!', () => {
      const received = index.validateData('')
      const expected = false

      expect(received).toBe(expected)
    })

    it('Should return `false` when the given value is a stringed object but include `{ "name": "@mnrendra/read-package" }`!', () => {
      const received = index.validateData('{ "name": "@mnrendra/read-package" }')
      const expected = false

      expect(received).toBe(expected)
    })

    it('Should return `true` when the given value is a stringed object and exclude `{ "name": "@mnrendra/read-package" }`!', () => {
      const received = index.validateData('{}')
      const expected = true

      expect(received).toBe(expected)
    })
  })
})
