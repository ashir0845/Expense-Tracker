"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold">💰 Finance Tracker</h1>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/expenses">Expenses</Link>
        <Link href="/budgets">Budgets</Link>
        <Link href="/reports">Reports</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
}
