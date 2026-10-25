const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const order = await Order.create(req.body);
        await order.save();
		return res.status(201).json(order);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 }).populate('user');
		return res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = router;
