import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { get } from "../api";
export default function Sidebar() {
  const { logout} = useAuth();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!userData && sessionStorage.getItem("authState") !== null) {
      const test = JSON.parse(sessionStorage.getItem("authState"));

      setUserData(test);
    }
  }, [userData]);
  const userName = userData?.user?.user_metadata?.full_name || "Guest";


  
  const fetchUserData = async () => {
    try {
      if (sessionStorage.getItem("authState")) {
        const user = JSON.parse(sessionStorage.getItem("authState"));
        const userAccount = await get(`accounts/users/${user.user.id}`);
        user.userAccount = userAccount;
        setUserData(user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  let accountNames = '';
  if (userData && userData.userAccount) {
    accountNames = userData.userAccount.map(account => account.account_name).join(', ');
  }

  return (
    <div className="bg-slate-50/40 min-w-[280px] h-screen border-r shadow-sm sticky top-0 left-0 bottom-0">
      <div className="sidebar-wrap">
        <div className="flex items-center justify-between px-2.5 mb-3">
          <div className="flex items-center gap-2">
            <img
              src={`https://i.pravatar.cc/100?img=52`}
              className="w-12 rounded-full border-2 shadow-md border-white"
            />
            <div>
              <p className="font-semibold">{userName}</p>
              <p className="font-medium text-sm -mt-[3px] text-gray-500">{accountNames}</p>
            </div>
          </div>
        </div>
        <a href="/dashboard" className="sidebar-button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                stroke="currentColor"
                strokeWidth="1.85"
              ></path>
              <path
                d="M15 18H9"
                stroke="currentColor"
                strokeWidth="1.85"
                strokeLinecap="round"
              ></path>
            </g>
          </svg>
          Home
        </a>

        <a href="/dashboard/notifications" className="sidebar-button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                stroke="currentColor"
                strokeWidth="1.85"
              ></path>
              <path
                d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                stroke="currentColor"
                strokeWidth="1.85"
                strokeLinecap="round"
              ></path>
            </g>
          </svg>
          Notifications
        </a>

        <a href="/dashboard/settings" className="sidebar-button">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.85"
              ></circle>{" "}
              <path
                d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                stroke="currentColor"
                strokeWidth="1.85"
              ></path>{" "}
            </g>
          </svg>
          Settings
        </a>
        <a href="/login" className="sidebar-button" onClick={handleLogout}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                d="M11 20H6a2 2 0 01-2-2V6a2 2 0 012-2h5M20 12l-4-4m4 4l-4 4m4-4H10"
                stroke="currentColor"
                strokeWidth="1.85"
              ></path>{" "}
            </g>
          </svg>
          Logout
        </a>
      </div>

      <div className="divider" />

      <div className="sidebar-wrap">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#9B63CB]">
            <span className="font-fig font-bold mt-px text-white">W</span>
          </div>
          <p className="font-fig font-semibold tracking-[-0.01em] text-[17px]">
            Workspace Board
          </p>
        </div>

      </div>
    </div>
  );
}
