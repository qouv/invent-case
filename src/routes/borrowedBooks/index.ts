import { Router } from 'express'
import { borrowBook, returnBook } from './borrowedBooksController'
import { validateData } from '../../middlewares/validationMiddleware'

const router = Router()

router.post('/users/:userId/borrow/:bookId', borrowBook)
router.post('/users/:userId/return/:bookId', returnBook)



export default router