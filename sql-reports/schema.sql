CREATE TABLE IF NOT EXISTS monthly_reports (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    month DATE NOT NULL,
    total_spent NUMERIC NOT NULL,
    top_category VARCHAR(255) NOT NULL,
    overbudget_categories TEXT
);
