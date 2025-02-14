import { Request, Response } from 'express'
import { db } from '../../db'

export async function createUser (req: Request, res: Response) {
	res.send('Create user')
}

export function listUsers (req: Request, res: Response) {
	res.send('List users')
}

export function getUserById (req: Request, res: Response) {
	res.send('Get user by id')
}