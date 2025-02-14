
import { Request, Response } from 'express'
import { db } from '../../db'
import { borrowedBooksTable } from '../../db/borrowedBooksSchema'
import { usersTable } from '../../db/usersSchema'
import { eq, and, isNull } from 'drizzle-orm'
import { booksTable } from '../../db/booksSchema'

export async function borrowBook(req: Request, res: Response) {
	try {
		let { userId, bookId } = req.params

		// Check both userId and bookId are number
		if (isNaN(Number(userId)) || isNaN(Number(bookId))) {
			res.status(400).json({ error: 'userId and bookId must be a number' })
			return
		}

		// Check if there is user with the given id
		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(userId)))
		if (!user) {
			res.status(404).json({ error: 'User with the given id not found' })
			return
		}

		// Check if there is book with the given id
		const [book] = await db.select().from(booksTable).where(eq(booksTable.id, Number(bookId)))
		if (!book) {
			res.status(404).json({ error: 'Book with the given id not found' })
			return
		}

		// Check if the book is already borrowed and not returned
		const [borrowedBook] = await db.select().from(borrowedBooksTable)
			.where(
				and(
					eq(borrowedBooksTable.book_id, Number(bookId)),
					isNull(borrowedBooksTable.returned_at),
				)
			)

		if (borrowedBook) {
			res.status(409).json({ error: 'Book is already borrowed and not returned yet' })
			return
		}

		await db.insert(borrowedBooksTable).values({
			user_id: Number(userId),
			book_id: Number(bookId),
			borrowed_at: new Date(),
		}).returning()

		res.sendStatus(204)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function returnBook(req: Request, res: Response) {
	try {
		let { userId, bookId } = req.params

		// Check both userId and bookId are number
		if (isNaN(Number(userId)) || isNaN(Number(bookId))) {
			res.status(400).json({ error: 'userId and bookId must be a number' })
			return
		}

		const { score } = req.body

		// Check if the book is borrowed by the user and not returned yet
		const [borrowedBook] = await db.select().from(borrowedBooksTable)
			.where(
				and(
					eq(borrowedBooksTable.book_id, Number(bookId)),
					eq(borrowedBooksTable.user_id, Number(userId)),
					isNull(borrowedBooksTable.returned_at),
				)
			)

		if (!borrowedBook) {
			res.status(404).json({ error: 'Borrowed book not found or already returned' })
			return
		}

		// Update the borrowed book record with the return date and score
		await db.update(borrowedBooksTable)
			.set({
				returned_at: new Date(),
				score: score,
			})
			.where(eq(borrowedBooksTable.id, borrowedBook.id))

		res.sendStatus(204)
	} catch (e) {
		res.status(500).send(e)
	}
}

