import { Request, Response } from 'express'
import { db } from '../../db'
import { booksTable } from '../../db/booksSchema'
import { borrowedBooksTable } from '../../db/borrowedBooksSchema'
import { eq } from 'drizzle-orm'

export async function createBook (req: Request, res: Response) {
	try {
		const [createdBook] = await db.insert(booksTable).values(req.cleanBody).returning()

		res.status(201).json(createdBook)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function listBooks (req: Request, res: Response) {
	try {
		const books = await db.select().from(booksTable)

		res.json(books)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function getBookInfoById (req: Request, res: Response) {
	try {
		const { id } = req.params

		// Check if id is a number
		if (isNaN(Number(id))) {
			res.status(400).json({ error: 'Invalid id' });
			return
		}

		const [book] = await db.select().from(booksTable).where(eq(booksTable.id, Number(id)))

		if (!book) {
			res.status(404).json({ error: 'Book not found' })
			return
		}

		const borrowedBooks = await db.select().from(borrowedBooksTable).where(eq(borrowedBooksTable.book_id, Number(id)))
		const score = borrowedBooks.length ? borrowedBooks.reduce((acc, curr) => acc + (curr.score ?? 0), 0) / borrowedBooks.length : -1

		res.json({ id: book.id, name: book.name, score })
	} catch (e) {
		res.status(500).send(e)
	}
}