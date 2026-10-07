import { validateEnv } from './env.validation';

const URL = 'postgresql://card:card@localhost:5432/card';

describe('validateEnv', () => {
  it('accepts a valid configuration', () => {
    expect(() => validateEnv({ DATABASE_URL: URL, PORT: '3000' })).not.toThrow();
  });

  it('allows PORT to be omitted', () => {
    expect(() => validateEnv({ DATABASE_URL: URL })).not.toThrow();
  });

  it('rejects a missing DATABASE_URL', () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });

  it('rejects a non-postgres DATABASE_URL', () => {
    expect(() => validateEnv({ DATABASE_URL: 'mysql://x' })).toThrow(/DATABASE_URL/);
  });

  it('rejects an invalid PORT', () => {
    expect(() => validateEnv({ DATABASE_URL: URL, PORT: 'abc' })).toThrow(/PORT/);
    expect(() => validateEnv({ DATABASE_URL: URL, PORT: '70000' })).toThrow(/PORT/);
  });
});
