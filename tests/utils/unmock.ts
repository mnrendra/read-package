const unmock = <T extends jest.Mock>(
  mockedModule: jest.Mock<T>,
  moduleName: string = mockedModule.getMockName()
): void => {
  const originalModule = jest.requireActual(moduleName)
  mockedModule.mockImplementation(originalModule.default)
  mockedModule.mockName(moduleName)
}

export default unmock
