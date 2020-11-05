import AuthService from '../auth';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'token'),
}));
jest.mock('src/services/index');

describe('AuthService', () => {
  describe('login', () => {
    test('should create token', async () => {
      const result = await AuthService.login('test', 'test');

      expect(result).toEqual({
        token: 'token',
      });
    });

    test('should check missing user', async () => {
      const result = await AuthService.login('testUser', 'testPass');

      expect(result).toEqual(null);
    });
  });
});
