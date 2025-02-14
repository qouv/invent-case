import { Router } from 'express'
import { createBook, listBooks, getBookInfoById } from './booksController'
import { validateData } from '../../middlewares/validationMiddleware'
import { createBookSchema } from '../../db/booksSchema'

const router = Router()

router.post('/', validateData(createBookSchema), createBook)
router.get('/', listBooks)
router.get('/:id', getBookInfoById)

export default router