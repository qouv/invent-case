import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { usersTable } from './usersSchema'
import { booksTable } from './booksSchema'

export const borrowedBooksTable = pgTable('borrowed_books', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	user_id: integer().references(() => usersTable.id).notNull(),
	book_id: integer().references(() => booksTable.id).notNull(),
	borrowed_at: timestamp('borrowed_at').notNull(),
	returned_at: timestamp('returned_at'),
	score: integer(),
})

export const createBorrowedBookSchema = createInsertSchema(borrowedBooksTable)