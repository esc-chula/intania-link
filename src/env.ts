import { createEnv } from '@t3-oss/env-nextjs';
import { env as runtimeEnv } from 'next-runtime-env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: runtimeEnv(
      'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
    ),
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
  emptyStringAsUndefined: true,
});
