export function validateEnv(config: Record<string, unknown>) {
  const databaseUrl = config.DATABASE_URL;
  if (typeof databaseUrl !== 'string' || !/^postgres(ql)?:\/\//.test(databaseUrl)) {
    throw new Error('DATABASE_URL is required and must be a postgresql:// connection string');
  }

  if (config.PORT !== undefined) {
    const port = Number(config.PORT);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error(`PORT must be an integer between 1 and 65535, got "${String(config.PORT)}"`);
    }
  }

  return config;
}
