import { Router } from 'express'
import { createBook, listBooks, getBookById } from './booksController'

const router = Router()

router.post('/', createBook)
router.get('/', listBooks)
router.get('/:id', getBookById)

export default router