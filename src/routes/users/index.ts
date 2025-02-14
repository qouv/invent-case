import { Router } from 'express'
import { createUser, listUsers, getUserById } from './usersController'

const router = Router()

router.post('/', createUser)
router.get('/', listUsers)
router.get('/:id', getUserById)

export default router