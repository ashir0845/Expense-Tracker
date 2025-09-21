import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "Track your expenses and budgets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
