import { Router } from "express";
import { generateMonthlyReports } from "../../sql-reports/generate-reports.ts";

const router = Router();

// GET /api/reports/:userId
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const reports = await generateMonthlyReports(userId); // call your SQL report function
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

export default router;
