import * as originalModule from '@mnrendra/read-stacked-file'

const { read } = originalModule as jest.Mocked<typeof originalModule>

export default read
