"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Expense {
  id: string;
  amount: number;
  category: string;
  method: string;
  date: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Fetch user expenses
        const res = await fetch("https://expense-tracker-cqf0.onrender.com", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: Expense[] = await res.json();
        setExpenses(data);

        // Fetch smart suggestions from Flask API
        const suggestionsRes = await fetch("http://localhost:5001/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const suggestionsData: string[] = await suggestionsRes.json();
        setSuggestions(suggestionsData);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Total spent
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Top category
  const categoryMap: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  const sortedCategories = Object.entries(categoryMap).sort(([, a], [, b]) => b - a);
  const topCategory = sortedCategories[0]?.[0] ?? "None";

  // Pie chart data
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // Line chart data
  const dateMap: Record<string, number> = {};
  expenses.forEach((e) => {
    const date = new Date(e.date).toLocaleDateString();
    dateMap[date] = (dateMap[date] || 0) + e.amount;
  });
  const lineData = Object.entries(dateMap).map(([date, amount]) => ({ date, amount }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📊 Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white text-gray-900 p-4 rounded shadow">Total Spent: ₹{totalSpent}</div>
        <div className="bg-white text-gray-900 p-4 rounded shadow">Top Category: {topCategory}</div>
        <div className="bg-white text-gray-900 p-4 rounded shadow">Top Payment Methods</div>
      </div>

      <div className="bg-white text-gray-900 p-6 rounded shadow h-64">
        <h3 className="text-lg font-semibold mb-2">Spending by Category</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white text-gray-900 p-6 rounded shadow h-64">
        <h3 className="text-lg font-semibold mb-2">Expenses Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-white text-gray-900 p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">💡 Smart Suggestions</h3>
        {suggestions.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>No suggestions for now!</p>
        )}
      </div>
    </div>
  );
}
