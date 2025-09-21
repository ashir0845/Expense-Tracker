import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

// Add a new budget
router.post("/", async (req, res) => {
  try {
    const { user, category, limit, month, year } = req.body;
    const budget = new Budget({ user, category, limit, month, year });
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all budgets for a user
router.get("/:userId", async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.params.userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
