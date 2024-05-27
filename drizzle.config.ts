import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/api/drizzle/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  verbose: true,
  strict: false,
  dbCredentials: {
    url: 'postgresql://postgres:postgres@localhost:5432/drizzle-test',
  },
})
