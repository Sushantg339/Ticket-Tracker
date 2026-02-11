import {z} from "zod";
import ticketModel from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
    try {
        const requiredBody = z.object({
            title: z.string(),
            description : z.string(),
            priority: z.enum(['low', 'medium', 'high'])
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            return res.status(400).json({
                message : "Invalid Input"
            })
        }
        const { title, description, priority } = parsed.data;

        const ticket = await ticketModel.create({
            title,
            description,
            priority,
            userId: req.userId
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find({ userId: req.userId })
        .sort({ createdAt: -1 });

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getSingleTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await ticketModel.findOne({
            _id: id,
            userId: req.userId
        });

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        console.error("Get Single Ticket Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const requiredBody = z.object({
            status : z.enum(['open', 'in-progress', 'closed']).optional(),
            priority: z.enum(['low', 'medium', 'high']).optional(),
            title : z.string().optional(),
            description : z.string().optional()
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            return res.status(400).json({
                message : "Invalid Input"
            })
        }

        const ticket = await ticketModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            parsed.data,
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};