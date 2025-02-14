import { Request, Response } from 'express'

export function createBook (req: Request, res: Response) {
	res.send('Create user')
}

export function listBooks (req: Request, res: Response) {
	res.send('List users')
}

export function getBookById (req: Request, res: Response) {
	res.send('Get user by id')
}

export function borrowBook (req: Request, res: Response) {
	res.send('Borrow book')
}

export function returnBook (req: Request, res: Response) {
	res.send('Return book')
}

