import { TARGET_FILE } from '@/consts'

import mockedReadAsync from '@tests/mocks/readAsync'
import mockedStackTrace from '@tests/mocks/stackTrace'
import unmockReadAsync from '@tests/unmocks/readAsync'
import unmockStackTrace from '@tests/unmocks/stackTrace'

import main from './main'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('@mnrendra/read-stacked-file', () => ({
  read: jest.fn(),
  validateSkippedStacks: jest.fn()
}))

describe('Test `main` async:', () => {
  describe('By mocking `@mnrendra/stack-trace` to return an invalid value:', () => {
    beforeAll(() => {
      unmockReadAsync(mockedReadAsync)
      mockedStackTrace.mockReturnValue([
        { getFileName: () => undefined },
        { getFileName: () => null },
        { getFileName: () => '' }
      ] as NodeJS.CallSite[])
    })

    afterAll(() => {
      unmockStackTrace(mockedStackTrace)
    })

    it('Should reject with an error when unable to locate the initial path!', async () => {
      const received = main()
      const expected = Error(`Unable to locate the initial path of "${TARGET_FILE}.json".`)

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('By mocking `@mnrendra/read-stacked-file` to resolve an empty JSON string:', () => {
    beforeAll(() => {
      unmockStackTrace(mockedStackTrace)
      mockedReadAsync.mockResolvedValue('{}')
    })

    afterAll(() => {
      unmockReadAsync(mockedReadAsync)
    })

    it('Should resolve a valid value when able to obtain the file!', async () => {
      const received = await main()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })

  describe('By mocking `@mnrendra/read-stacked-file` to resolve a non-JSON string:', () => {
    beforeAll(() => {
      unmockStackTrace(mockedStackTrace)
      mockedReadAsync.mockResolvedValue('')
    })

    afterAll(() => {
      unmockReadAsync(mockedReadAsync)
    })

    it('Should reject with an error when unable to parse the file!', async () => {
      const received = main()
      const expected = Error(`"${TARGET_FILE}.json" value cannot be parsed.`)

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('Without mocking anything:', () => {
    it('Should resolve a valid value when able to obtain the file!', async () => {
      const received = await main()
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })

    it('Should resolve a valid value by adding a skipped stack!', async () => {
      const received = await main({ skippedStacks: 'any' })
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })

    it('Should resolve a valid value by adding a list of skipped stacks!', async () => {
      const received = await main({ skippedStacks: ['any'] })
      const expected = expect.any(Object)

      expect(received).toEqual(expected)
    })
  })
})
