import { Request, Response } from 'express'
import { db } from '../../db'
import { usersTable } from '../../db/usersSchema'
import { eq } from 'drizzle-orm'

export async function createUser (req: Request, res: Response) {
	try {
		const [createdUser] = await db.insert(usersTable).values(req.cleanBody).returning()

		res.status(201).json(createdUser)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function listUsers (req: Request, res: Response) {
	try {
		const users = await db.select().from(usersTable)

		res.json(users)
	} catch (e) {
		res.status(500).send(e)
	}
}

export async function getUserById (req: Request, res: Response) {
	try {
		const { id } = req.params

		const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(id)))

		if (!user) {
			res.status(404).json({ error: 'User not found' })
			return
		}

		res.json(user)
	} catch (e) {
		res.status(500).send(e)
	}
}