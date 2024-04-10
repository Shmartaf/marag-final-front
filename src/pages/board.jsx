import React, { useEffect, useState } from "react";

import { Divider } from "@mui/material";
import Board from "../components/Dashboard/Board";
import { useParams } from "react-router-dom";
import DynamicBoard from "../components/Dashboard/DynamicBoard";

const board = {
  color: "#F59E0B",
  columns: [
    { name: "Column One", type: "text" },
    { name: "Column Two", type: "text" },
  ],
  rowsData: [["Value One", null]],

  name: "Board One",
};

export default function BoardPage() {
  const [boardData, setBoardData] = useState<any>([]);

  let { id } = useParams();

  async function getBoard() {
    const res = await fetch(`http://localhost:5005/boards/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setBoardData(await res.json());
  }

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="dashboard-viewer">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        {boardData.board_name}
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Add board&apos;s short description...
      </h6>

      <Divider sx={{ m: "20px 0" }} />

      <div>
        <DynamicBoard
          hideTitle
          board={boardData}
          onAddColumn={() => {
            setBoardData((prev) => {
              const updatedBoard = { ...prev };
              updatedBoard.columns.push({
                name: `Column ${updatedBoard.columns.length + 1}`,
                type: "text",
              });

              updatedBoard.incidents.forEach((row) => {
                row.push("");
              });

              return updatedBoard;
            });
          }}
          onColumnRemove={(index) => {
            setBoardData((prev) => {
              const updatedBoard = { ...prev };
              updatedBoard.columns.splice(index, 1);

              updatedBoard.incidents.forEach((row) => {
                row.splice(index, 1);
              });

              return updatedBoard;
            });
          }}
          onAddRow={() => {
            setBoardData((prev) => {
              const updatedBoard = { ...prev };
              const newEmptyRow = updatedBoard.columns.map(() => null);

              updatedBoard.incidents.push(newEmptyRow);

              return updatedBoard;
            });
          }}
          onUpdate={(updated) => {
            setBoardData(updated);
          }}
        />
      </div>
    </div>
  );
}
