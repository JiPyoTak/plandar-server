import { Response } from 'express';

const TOKEN_STUB =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ.NdmXS9NOiE6j8T1wcPMR_75r5FLrGmjdSoPZN-smTsU';

const RESPONSE_STUB = {
  cookie: jest.fn().mockReturnThis(),
  clearCookie: jest.fn().mockReturnThis(),
} as unknown as Response;

class MockConfigService {
  JWT_SECRET_KEY: 'test';
  ACCESS_HEADER: 'access';
  REFRESH_HEADER: 'refresh';
  ACCESS_EXPIRES: '1h';
  REFRESH_EXPIRES: '14d';
  COOKIE_MAX_AGE: 100;

  get(key: string) {
    return this[key];
  }
}
const MOCK_CONFIG_SERVICE = {
  JWT_SECRET_KEY: 'test',
  ACCESS_HEADER: 'access',
  REFRESH_HEADER: 'refresh',
  ACCESS_EXPIRES: '1h',
  REFRESH_EXPIRES: '14d',
  COOKIE_MAX_AGE: 100,
};

export { TOKEN_STUB, RESPONSE_STUB, MOCK_CONFIG_SERVICE, MockConfigService };
