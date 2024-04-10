import React from "react";
import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex gap-5 w-screen max-w-[100vw]">
      <Sidebar />
      <Outlet />
    </div>
  );
}
