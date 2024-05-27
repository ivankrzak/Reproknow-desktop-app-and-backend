import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const queryClient = postgres('postgresql://postgres:postgres@localhost:5432/drizzle-test')
export const DatabaseClient = drizzle(queryClient)
