import type originalModule from '@mnrendra/read-stacked-file'

import type mockedModule from '@tests/mocks/readAsync'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('@mnrendra/read-stacked-file')
  mockedModule.mockImplementation(actualModule.read)
}

export default unmock
