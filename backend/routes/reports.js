const express = require("express");
const { generateMonthlyReports } = require("../../sql-reports/generate-reports");

const router = express.Router();

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

module.exports = router;
