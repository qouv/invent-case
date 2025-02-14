import { Router } from 'express'
import { createUser, listUsers, getUserById } from './usersController'
import { validateData } from '../../middlewares/validationMiddleware'
import { createUserSchema } from '../../db/usersSchema'

const router = Router()

router.post('/', validateData(createUserSchema), createUser)
router.get('/', listUsers)
router.get('/:id', validateData(), getUserById)


export default router