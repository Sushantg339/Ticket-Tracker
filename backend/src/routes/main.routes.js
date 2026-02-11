import express from 'express'
import authRouter from './auth.routes.js'
import ticketRouter from './ticket.routes.js'

const mainRouter = express.Router()


mainRouter.use('/auth', authRouter)
mainRouter.use('/ticket', ticketRouter)

export default mainRouter