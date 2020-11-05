const TEST_USER = {
  login: 'test',
  password: 'test',
};

// eslint-disable-next-line import/prefer-default-export
export const UserService = {
  getList: jest.fn(),
  getByIds: jest.fn(),
  getByName: (name: string) => (name === 'test' ? TEST_USER : null),
  getById: jest.fn((id) => (id === 'test' ? id : null)),
  create: jest.fn(),
  update: jest.fn((id, body) => (id === 'test' ? { id, ...body } : null)),
  delete: jest.fn((id) => (id === 'test' ? id : null)),
};

export const GroupService = {
  getById: jest.fn(),
  getList: jest.fn(),
  create: jest.fn(),
  update: jest.fn((id, body) => (id === 'test' ? { id, ...body } : null)),
  delete: jest.fn((id) => (id === 'test' ? id : null)),
  addUsersToGroup: jest.fn((id) => (id === 'test' ? id : null)),
};
