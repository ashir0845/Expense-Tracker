import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Add a new expense
router.post("/", async (req, res) => {
  try {
    const { user, category, amount, date } = req.body;
    const expense = new Expense({ user, category, amount, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses for a user
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
