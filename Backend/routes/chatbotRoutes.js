
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Ticket = require("../models/Ticket");
const User = require("../models/User");


router.post("/start", async (req, res) => {
    try {
        const { name, email, phone } = req.body;


        let customer = await Customer.findOne({ email });

        if (!customer) {

            customer = await Customer.create({ name, email, phone });


            const superAdmin = await User.findOne({ role: "Super Admin" });
            if (!superAdmin) {
                return res.status(500).json({ message: "Super Admin not found." });
            }


            const ticket = await Ticket.create({
                customer: customer._id,
                assignedTo: superAdmin._id,
                messages: []
            });

            return res.status(201).json({
                message: "New customer registered and ticket created.",
                ticketId: ticket._id,
                assignedTo: superAdmin.name,
                messages: []
            });
        } else {

            let ticket = await Ticket.findOne({ customer: customer._id }).populate("assignedTo");

            if (ticket) {
                return res.status(200).json({
                    message: "Existing customer found.",
                    ticketId: ticket._id,
                    assignedTo: ticket.assignedTo.name,
                    messages: ticket.messages
                });
            } else {

                const superAdmin = await User.findOne({ role: "Super Admin" });
                const ticket = await Ticket.create({
                    customer: customer._id,
                    assignedTo: superAdmin._id,
                    messages: []
                });

                return res.status(201).json({
                    message: "Ticket created for existing customer.",
                    ticketId: ticket._id,
                    assignedTo: superAdmin.name,
                    messages: []
                });
            }
        }

    } catch (error) {
        console.error("Chatbot start error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
