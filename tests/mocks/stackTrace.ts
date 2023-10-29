import * as originalModule from '@mnrendra/stack-trace'

const { stackTrace } = originalModule as jest.Mocked<typeof originalModule>

export default stackTrace
