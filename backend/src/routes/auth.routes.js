import express from 'express'
import { getUser, loginController, signupController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.get('/user', authMiddleware, getUser)

export default authRouter