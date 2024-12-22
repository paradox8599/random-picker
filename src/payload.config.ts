import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { buildConfig, getPayload as originalGetPayload } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { Users } from './payload/collections/users';
import { createS3Storage } from './payload/config/s3-storage';
import { payloadInit } from './payload/config/init';
import { email } from '@/payload/config/email';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  typescript: { outputFile: path.resolve(dirname, 'payload.d.ts') },
  secret: process.env.PAYLOAD_SECRET || '',
  onInit: payloadInit,

  editor: lexicalEditor(),
  email,
  sharp,
  plugins: [...createS3Storage()],

  collections: [Users],

  admin: {
    user: Users.slug,
    routes: { login: '/..' },

    importMap: { baseDir: path.resolve(dirname) },
    autoLogin:
      process.env.NODE_ENV !== 'development'
        ? undefined
        : {
          email: 'admin@me.com',
          password: 'admin@me.com',
          username: 'admin@me.com',
          prefillOnly: true,
        },
  },

  db: vercelPostgresAdapter({
    idType: 'uuid',
    transactionOptions: { isolationLevel: undefined },
    pool: { connectionString: process.env.DATABASE_URI || undefined },
  }),
});

export async function getPayload() {
  return await originalGetPayload({ config: payloadConfig });
}

export default payloadConfig;
