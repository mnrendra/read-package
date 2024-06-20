import * as originalModule from '@mnrendra/read-stacked-file'

const { readSync } = originalModule as jest.Mocked<typeof originalModule>

export default readSync
