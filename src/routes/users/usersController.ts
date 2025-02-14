import { Request, Response } from 'express'
import { db } from '../../db'
import { usersTable } from '../../db/usersSchema'
import { eq, inArray } from 'drizzle-orm'
import { borrowedBooksTable } from '../../db/borrowedBooksSchema'
import { booksTable } from '../../db/booksSchema'

export async function createUser(req: Request, res: Response) {
	try {
		await db.insert(usersTable).values(req.cleanBody).returning()

		res.sendStatus(201)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function listUsers(req: Request, res: Response) {
	try {
		const users = await db.select().from(usersTable)

		res.json(users)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function getUserInfoById (req: Request, res: Response) {
	try {
		const { id: userId } = req.params

		// Check if id is a number
		if (isNaN(Number(userId))) {
			res.status(400).json({ error: 'Invalid id' });
			return
		}

		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(userId)))

		if (!user) {
			res.status(404).json({ error: 'User not found' })
			return
		}

		const allBorrewedBooks = await db.select()
		.from(borrowedBooksTable)
		.where(eq(borrowedBooksTable.user_id, Number(userId)))

		const bookIds = allBorrewedBooks.map(book => book.book_id)
		const bookDetailsMap = await db.select().from(booksTable).where(inArray(booksTable.id, bookIds))

		const pastBooks = allBorrewedBooks.filter(book => book.returned_at).map(book => {
			const bookDetails = bookDetailsMap.find(b => b.id === book.book_id)
			if (bookDetails) {
				return {
					name: bookDetails.name,
					userScore: book.score
				}
			}
			return null
		})

		const presentBooks = allBorrewedBooks.filter(book => !book.returned_at).map(book => {
			const bookDetails = bookDetailsMap.find(b => b.id === book.book_id)
			if (bookDetails) {
				return {
					name: bookDetails.name
				}
			}
			return null
		})


		const userDetails = {
			id: user.id,
			name: user.name,
			books: {
				past: pastBooks,
				present: presentBooks
			}
		}

		res.json(userDetails)
	} catch (e) {
		res.status(500).send(e)
	}
}