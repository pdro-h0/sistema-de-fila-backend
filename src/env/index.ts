import "dotenv/config"
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["test", "development", "production"]).default("development"),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
});
export const env = envSchema.parse(process.env);
