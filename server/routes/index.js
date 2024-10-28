import express from 'express'
import { registerUser } from '../controller/resgisterUser.js';
import { existingUser } from '../controller/existingUser.js';
import { verifyPassword } from '../controller/verifyPassword.js';
import { userDetails } from '../controller/userDetails.js';
import { logout } from '../controller/logout.js';
import { updateUser } from '../controller/updateUser.js';

const router = express.Router()

router.post('/register', registerUser)

router.post('/email', existingUser)

router.post('/password', verifyPassword)

router.get('/user-details', userDetails)

router.post('/update-user', updateUser)

router.get('/logout', logout)

export default router