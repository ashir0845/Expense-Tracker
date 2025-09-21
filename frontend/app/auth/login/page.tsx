"use client";
import { useState } from "react";
import api from "../../lib/api"; 

export default function Login() {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
 return (
  <div className="max-w-md mx-auto bg-white text-black p-6 rounded shadow mt-10">
    <h2 className="text-xl font-bold mb-4">Login</h2>
    {error && <p className="text-red-500">{error}</p>}
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        className="w-full border p-2 rounded text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded text-black"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  </div>
);

}
