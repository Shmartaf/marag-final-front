/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import StyledTooltip from "../assets/StyledTooltip";
import DynamicBoard from "../components/Dashboard/DynamicBoard";
import Search from "../components/Dashboard/DashboardIndex/Search";
import Sort from "../components/Dashboard/DashboardIndex/Sort";
import { get, post, put, deleteRequest, BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function DashboardIndex() {
  const [teamsData, setTeamsData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(0);
  const { user } = useAuth();
  const [boardsData, setBoardsData] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  async function fetchBoards() {
    if (!userData) {
      return;
    }

    const data = await get(`boards/user/${userData.user.id}`);
    setBoardsData(data);
    setLoading(false);
  }

  async function fetchTeams() {
    if (!user) {
      return;
    }
    const data = await get(`teams/users/${userData.user.id}`);
    setTeams(data);
    setLoading(false);
  }

  const onUpdate = (updatedBoard) => {

    setBoardsData(updatedBoard);
  };

  useEffect(() => {
    if (boardsData.length > 0 && userData) {
      const filteredBoards = boardsData
        .filter((board) => {
          const boardName = board.board_name.toLowerCase();
          const searchQuery = search.toLowerCase();
          return boardName.includes(searchQuery);
        })
        .sort((a, b) => {
          if (sort === 1) {
            return a.board_name.localeCompare(b.board_name);
          } else {
            return b.board_name.localeCompare(a.board_name);
          }
        });
      setFilteredBoards(filteredBoards);
    }
  }, [boardsData, search, sort, userData]); 

  useEffect(() => {
    if (!userData && sessionStorage.getItem("authState") !== null) {
      const test = JSON.parse(sessionStorage.getItem("authState"));
      setUserData(test);
    }
  }, [userData]); 

  useEffect(() => {
    if (userData) {
      fetchBoards();
      fetchTeams();
    }
  }, [userData]);

  async function createBoard() {

    await fetchTeams();



    const newBoard = {
      board_name: "New Board",
      team: teams,
      incidents: [
        {
          complete: true,
          data: [null],
        },
      ],
      color: "#3B82F6",
      columns: [
        {
          name: "New Column",
          type: "text",
        },
        {
          name: "Date",
          type: "Date",
        },
        {
          name: "number",
          type: "number",
        },
      ],
    };
    const res = await post("boards", newBoard);
    setBoardsData([...boardsData, newBoard]);    
  }

  return user ? (
    <div className="dashboard-viewer overflow-hidden overscroll-none">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Boards List
        <StyledTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </StyledTooltip>
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Welcome back, {user.name} |{" "}
        {new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
        })}
      </h6>

      <Divider sx={{ m: "20px 0" }} />

      <div className="dashboard-nav-menu">
        <button
          onClick={() => {
            createBoard();
          }}
          className="bg-gradient-to-t from-blue-600 to-blue-500 text-white gap-1.5 font-[550] mr-5 group"
        >
          Create Board
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-4 -mr-1 transition-all duration-[400ms] group-hover:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <Divider orientation="vertical" flexItem sx={{ m: "5px 0" }} />

        <Search current={search} onChange={(value) => setSearch(value)} />

        <Sort current={sort} onChange={(value) => setSort(value)} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-14">
        {filteredBoards.map((board, i) => (
          <DynamicBoard board={board} key={i} updateFunction={onUpdate} />
        ))}

        {filteredBoards.length === 0 && (
          <div className="text-xl">No boards found.</div>
        )}
      </div>
    </div>
  ) : null;
}
