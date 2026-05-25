export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,

  accessExpiresIn: "1h" as const,
  refreshExpiresIn: "7d" as const,
};