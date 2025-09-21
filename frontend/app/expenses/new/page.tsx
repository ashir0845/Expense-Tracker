"use client";
export default function NewExpense() {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>
      <form className="space-y-4">
        <input className="w-full border p-2 rounded" type="number" placeholder="Amount" />
        <input className="w-full border p-2 rounded" placeholder="Category" />
        <input className="w-full border p-2 rounded" type="date" />
        <input className="w-full border p-2 rounded" placeholder="Payment Method" />
        <textarea className="w-full border p-2 rounded" placeholder="Notes (optional)" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
}
