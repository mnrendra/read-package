import type originalModule from '@mnrendra/read-stacked-file'

import type mockedModule from '@tests/mocks/readSync'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('@mnrendra/read-stacked-file')
  mockedModule.mockImplementation(actualModule.readSync)
}

export default unmock
