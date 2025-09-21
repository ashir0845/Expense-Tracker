import Link from "next/link";

export default function Expenses() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">💸 Expenses</h2>
      <Link href="/expenses/new" className="bg-green-600 text-white px-4 py-2 rounded">+ Add Expense</Link>
      <div className="bg-white p-4 text-black rounded shadow mt-4">[Expense List Placeholder]</div>
    </div>
  );
}
