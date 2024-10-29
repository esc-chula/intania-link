import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        NOCODB_API_ENDPOINT: z.string().url(),
        NOCODB_API_TOKEN: z.string(),
        NOCODB_TABLE_ID: z.string(),
    },
    client: {
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string(),
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        NOCODB_API_ENDPOINT: process.env.NOCODB_API_ENDPOINT,
        NOCODB_API_TOKEN: process.env.NOCODB_API_TOKEN,
        NOCODB_TABLE_ID: process.env.NOCODB_TABLE_ID,
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
