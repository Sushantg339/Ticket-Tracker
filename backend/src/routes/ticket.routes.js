import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createTicket, getMyTickets, getSingleTicket, updateTicket } from '../controllers/ticket.controller.js'
const ticketRouter = express.Router()

ticketRouter.use(authMiddleware)

ticketRouter.get('/', getMyTickets)
ticketRouter.get('/:id', getSingleTicket)
ticketRouter.post('/', createTicket)
ticketRouter.patch('/:id', updateTicket)


export default ticketRouter