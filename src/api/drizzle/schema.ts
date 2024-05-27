import { serial, text, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id'),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const product = pgTable('product', {
  id: serial('id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})
