import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { get, post } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [teams, setTeams] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const Navigate = useNavigate();
  const { signUp } = useAuth();


  useEffect(() => {
    fetchTeams();
    fetchAccounts();
  }, []);

  const fetchTeams = async () => {
    const response = await get("teams");
    setTeams(response);
  };

  const fetchAccounts = async () => {

    const response = await get("accounts");
    setAccounts(response);
  };

  const SignUp = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const userType = e.target.userType.value;
    const teams = e.target.team.value;
    const accounts = e.target.account.value;
    const res = await signUp({
      email,
      password,
      data: { full_name: name, email: email, userType: userType, team: teams, account: accounts },
    });

    const new_member = await post(`teams/${teams}/user/${res.data.user.id}`);
    Navigate("/login");
    alert("Check your email for the confirmation link");
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center w-screen h-screen">
      <div className="p-7 border rounded-3xl shadow-xl shadow-black/5 bg-white w-[450px]">
        <h3 className="text-[23px] leading-7 font-bold tracking-[-0.01em]">
          Create Account
        </h3>
        <p className="text-gray-500">
          Already have an account?{" "}
          <a
            className="text-blue-500 transition-all hover:text-indigo-500 duration-200"
            href="/"
          >
            Login
          </a>
        </p>

        <form className="mt-4" onSubmit={SignUp}>
          <label htmlFor="name" className="text-gray-500">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            placeholder="Enter your full name"
            value={name}
            className="border-[1.5px] mt-1.5 mb-4 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
            onChange={(e) => setName(e.target.value)}
          />
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
            className="border-[1.5px] mt-1.5 mb-3 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="userType" className="text-gray-500 mt-4">
            User Type <span className="text-red-500">*</span>
          </label>
          <select
            id="userType"
            className="border-[1.5px] mt-1.5 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="teamMember">Team Member</option>
          </select>

          <label htmlFor="team" className="text-gray-500">
            Team
          </label>
          <select
            id="team"
            className="border-[1.5px] mt-1.5 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.team_name}
              </option>
            ))}
          </select>

          <label htmlFor="account" className="text-gray-500">
            Account
          </label>
          <select
            id="account"
            className="border-[1.5px] mt-1.5 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.account_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full text-white font-semibold py-2 mt-4 bg-gradient-to-t from-blue-600 to-blue-500 border border-black/10"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
