export function mockStore(loadingValue = false) {
  return ({
    getState: () => ({
      loading: {
        value: loadingValue,
      },
    }),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  });
}
