/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/Logo_boards.png";
import "./App.css";
import DynamicTable from "./components/tableTickets";
import DynamicForm from "./components/DynamicForm";
import ExampleBoard from "./board.json";
import DynamicBoardForm from "./components/DynamicBoardForm";
import anotherExample from "./anotherBoardFromDb.json";
import MessageBlock from "./components/MessageBlock";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardIndex from "./pages/dashboardIndex";
import Login from "./pages/login";
import Register from "./pages/register";
import BoardPage from "./pages/board";
import SettingsPage from "./pages/settings";
import NotificationsPage from "./pages/notifications";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardIndex />} />
          <Route path="board/:id" element={<BoardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
