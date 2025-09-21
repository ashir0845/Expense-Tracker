import pkg from "pg";
const { Pool } = pkg;

// Configure PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance",
  password: "password", // your DB password
  port: 5432,
});

// Function to generate last 3 months reports for a user
export async function generateMonthlyReports(userId) {
  const query = `
    SELECT month, total_spent, top_category, overbudget_categories
    FROM monthly_reports
    WHERE user_id = $1
    ORDER BY month DESC
    LIMIT 3
  `;
  const { rows } = await pool.query(query, [userId]);

  // If overbudget_categories is stored as comma-separated string in DB, split it into array
  return rows.map((row) => ({
    month: row.month,
    total_spent: row.total_spent,
    top_category: row.top_category,
    overbudget_categories: row.overbudget_categories
      ? row.overbudget_categories.split(",")
      : [],
  }));
}
