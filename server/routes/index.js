import express from 'express'
import { registerUser } from '../controller/resgisterUser.js';
import { existingUser } from '../controller/existingUser.js';
import { verifyPassword } from '../controller/verifyPassword.js';

const router = express.Router()

router.post('/register', registerUser)

router.post('/email', existingUser)

router.post('/password', verifyPassword)

export default router