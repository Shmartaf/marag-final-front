import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const { login } = useAuth();
  const Navigate = useNavigate();

  const validate = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      Navigate("/dashboard");

    } catch (error) {
      alert("Login failed: " + error.message);
    }
  }

  return (
    <div className="bg-slate-100 flex items-center justify-center w-screen h-screen">
      <div className="p-7 border rounded-3xl shadow-xl shadow-black/5 bg-white w-[450px]">
        <h3 className="text-[23px] leading-7 font-bold">
          Log in to your account
        </h3>
        <p className="text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            className="text-blue-500 transition-all hover:text-indigo-500 duration-200"
            href="/register"
          >
            Sign Up
          </a>
        </p>

        <form className="mt-4" onSubmit={validate}>
          <label htmlFor="email" className="text-gray-500">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            placeholder="name@email.com"
            value={email}
            className="border-[1.5px] mt-1.5 mb-4 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-gray-500">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type={viewPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            className="border-[1.5px] mt-1.5 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full text-white font-semibold py-2 mt-4 bg-gradient-to-t from-blue-600 to-blue-500 border border-black/10"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
