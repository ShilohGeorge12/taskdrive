import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();
export const env = cleanEnv(process.env, {
	DATABASE_URL: str(),
	// SECRET: str(),
	BASE_URL: str(),
	// NEXT_PUBLIC_GOOGLE_API_KEY: str(),
});
