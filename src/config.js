import "dotenv/config";

export const { PORT = 3000, SECRET_JWT_KEY, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
