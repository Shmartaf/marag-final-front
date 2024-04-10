import { Checkbox, Divider, MenuItem, Select, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import StyledCheckbox from "../../assets/StyledCheckbox";
import StyledTooltip from "../../assets/StyledTooltip";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledDialog from "../../assets/StyledDialog";
import InputBase from "@mui/material/InputBase";

export default function Board({
  board,
  hideTitle,
  onUpdate,
  onColumnRemove,
  onAddColumn,
  onAddRow,
  onDelete,
}) {
  const [selected, setSelected] = useState([]);

  return (
    <div className="">
      <div className="flex items-center justify-between h-[34px] w-full">
        <div
          style={{ color: board.color }}
          className="flex items-center gap-1.5"
        >


          <h3 className="font-semibold text-2xl">{board.name}</h3>
        </div>

        <div className="flex items-center gap-2 relative">
          {selected.length > 0 && (
            <div>
              <button
                onClick={() => {
                  const Rows = [...board.rows];

                  selected.forEach((i) => {
                    Rows.splice(i, 1);
                  });

                  onUpdate({ ...board, rows: Rows });

                  setSelected([]);
                }}
                className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.05] active:scale-[0.975] text-red-600 shadow-sm flex items-center gap-2 py-1.5 px-3 text-[14px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 -ml-px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete Rows
              </button>
            </div>
          )}
          <BoardDropdown
            onRemove={() => {
              if (onDelete) onDelete();
            }}
            onNameChange={(newName) => {
              onUpdate({ ...board, name: newName });
            }}
            onColorChange={(newColor) => {
              onUpdate({ ...board, color: newColor });
            }}
          />
        </div>
      </div>
      <div
        className="mt-4 border-l-4 border rounded-md shadow-md shadow-black/[0.06] w-full min-w-full overflow-x-auto no-scrollbar"
        style={{ borderLeftColor: board.color }}
      >
        <div className=" w-full min-w-full rounded-r-md">
          <table className="board-table">
            <thead>
              <tr className="board-header">
                <th>
                  <StyledCheckbox disabled />
                </th>
                {Array.isArray(board.columns) &&
                  board.columns.map((col, i) => (
                    <th className="group relative" key={i}>
                      {col.name}{" "}
                      <span className="absolute hover:delay-200 inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end">
                        <ColumnDropdown
                          onRemove={() => {
                            onColumnRemove(i);
                          }}
                          onChange={(newName) => {
                            const updatedColumns = [...board.columns];

                            updatedColumns[i].name = newName;
                            onUpdate({ ...board, columns: updatedColumns });
                          }}
                          key={i}
                        />
                      </span>
                    </th>
                  ))}

                <th>Complete</th>

                <th
                  className="cursor-pointer"
                  onClick={() => {
                    onAddColumn();
                  }}
                >
                  <StyledTooltip title="Add new column">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 scale-110 stroke-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </StyledTooltip>
                </th>
              </tr>
            </thead>

            <tbody>
              {board.rows.map((row, i) => (
                <tr key={i} className="board-row border-t">
                  <td>
                    <StyledCheckbox
                      checked={selected.includes(i)}
                      onChange={(e) => {
                        if (selected.includes(i)) {
                          setSelected(selected.filter((value) => value !== i));
                        } else {
                          setSelected([...selected, i]);
                        }
                      }}
                    />
                  </td>
                  {row.data.map((col, ic) => (
                    <td key={ic} className="px-1">
                      <input
                        onChange={(e) => {
                          const updatedBoard = { ...board };
                          updatedBoard.rows[i].data[ic] = e.target.value;
                          onUpdate(updatedBoard);
                        }}
                        value={col}
                        placeholder="Empty"
                        className="text-center w-auto h-[36px]"
                      />
                    </td>
                  ))}
                  <td
                    onClick={() => {
                      const updatedBoard = { ...board };
                      updatedBoard.rows[i].complete =
                        !updatedBoard.rows[i].complete;
                      onUpdate(updatedBoard);
                    }}
                    aria-checked={row.complete}
                    className="aria-checked:bg-green-500 bg-red-500 text-white capitalize cursor-pointer transition-all duration-200 active:scale-90"
                  >
                    {row.complete.toLocaleString()}
                  </td>
                  <td></td>
                </tr>
              ))}
              <tr className="board-row border-t">
                <span className="px-3 py-1.5 block">
                  <svg
                    onClick={onAddRow}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 stroke-gray-400 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ColumnDropdown = (onRemove, onChange) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef < HTMLUListElement > null;

  useEffect(() => {
    if (open !== false) {
      const handleClickOutside = (event) => {
        if (!modalRef.current?.contains(event.target)) setOpen(false);
      };

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open, modalRef]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-0 pr-1.5 pb-0.5 outline-none"
      >
        <MoreVertIcon sx={{ height: 20, color: "#6B7280" }} />
      </button>

      <ul
        ref={modalRef}
        className={`${open
            ? `opacity-100 visible translate-y-0 scale-100`
            : `opacity-0 invisible scale-95 -translate-y-1`
          } ul-modal absolute right-0 top-10 bg-white border rounded-xl origin-top-right flex items-center shadow-lg gap-2 px-2.5 py-1.5 transition-all duration-200`}
      >
        <li
          onClick={() => {
            onRemove();
            setOpen(false);
          }}
          className="flex items-center gap-1 text-sm cursor-pointer hover:text-red-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-4 -translate-y-px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Remove
        </li>

        <Divider orientation="vertical" flexItem />

        <StyledDialog
          onClose={() => { }}
          button={
            <li className="flex items-center gap-1 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="w-4 -translate-y-px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Rename
            </li>
          }
          model={
            <div className="mt-2">
              <input
                id="col-name"
                placeholder="Column's name"
                className="border-[1.5px] mt-1.5 mb-4 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
              />
            </div>
          }
          title={"Change Name"}
          closeTrigger={
            <button
              onClick={(e) => {
                const inputElement = document.getElementById("col-name");
                if (inputElement instanceof HTMLInputElement) {
                  if (inputElement.value.length == 0) {
                    e.stopPropagation();
                    e.preventDefault();
                  } else onChange(inputElement.value);
                }
              }}
              className="text-white font-medium py-[7px] mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10 text-[15px]"
            >
              Update Name
            </button>
          }
        />
      </ul>
    </>
  );
};

const BoardDropdown = ({ onRemove, onNameChange, onColorChange }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef < HTMLUListElement > null;

  const [color, setColor] = useState("#3B82F6");

  useEffect(() => {
    if (open !== false) {
      const handleClickOutside = (event) => {
        if (!modalRef.current?.contains(event.target)) setOpen(false);
      };

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open, modalRef]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-0 pr-1.5 pb-0.5 outline-none"
      >
        <MoreVertIcon sx={{ height: 20, color: "#6B7280" }} />
      </button>

      <ul
        ref={modalRef}
        className={`${open
            ? `opacity-100 visible translate-y-0 scale-100`
            : `opacity-0 invisible scale-95 -translate-y-1`
          } absolute right-0 top-12 bg-white border rounded-xl origin-top-right flex flex-col whitespace-nowrap shadow-lg gap-2 px-2.5 divide-y py-2.5 transition-all duration-200`}
      >
        <li
          onClick={() => {
            onRemove();
            setOpen(false);
          }}
          className="flex items-center gap-1 text-[15px] cursor-pointer hover:text-red-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-4 -translate-y-px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete Board
        </li>

        <Divider orientation="vertical" flexItem />

        <StyledDialog
          onClose={() => { }}
          button={
            <li className="flex items-center gap-1 text-[15px] cursor-pointer hover:text-blue-500 transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="w-4 -translate-y-px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Rename Board
            </li>
          }
          model={
            <div className="mt-2">
              <input
                id="board-name"
                placeholder="Board's name"
                className="border mt-1.5 mb-4 border-gray-300  px-3.5 py-2 rounded-lg shadow-sm w-full"
              />
            </div>
          }
          title={"Change Board's Name"}
          closeTrigger={
            <button
              onClick={(e) => {
                const inputElement = document.getElementById("board-name");
                if (inputElement instanceof HTMLInputElement) {
                  if (inputElement.value.length == 0) {
                    e.stopPropagation();
                    e.preventDefault();
                  } else onNameChange(inputElement.value);
                }
              }}
              className="text-white font-semibold py-2 mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10"
            >
              Update Name
            </button>
          }
        />
        <Divider orientation="vertical" flexItem />

        <StyledDialog
          onClose={() => {
            setColor("#3B82F6");
          }}
          button={
            <li className="flex items-center gap-1 text-[15px] cursor-pointer hover:text-blue-500 transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 -translate-y-px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                />
              </svg>
              Change Color
            </li>
          }
          model={
            <div className="mt-1">
              <Select
                className="w-full mb-2.5 mt-3"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                input={<BootstrapInput />}
              >
                <MenuItem value={"#3B82F6"}>Blue</MenuItem>
                <MenuItem value={"#22C55E"}>Green</MenuItem>
                <MenuItem value={"#F97316"}>Orange</MenuItem>
                <MenuItem value={"#A855F7"}>Purple</MenuItem>
                <MenuItem value={"#EF4444"}>Red</MenuItem>
                <MenuItem value={"#EAB308"}>Yellow </MenuItem>
                <MenuItem value={"#6366F1"}>Indigo </MenuItem>
              </Select>
            </div>
          }
          title={"Change Color"}
          closeTrigger={
            <button
              onClick={(e) => {
                onColorChange(color);

                setColor("#3B82F6");
              }}
              className="text-white font-semibold py-2 mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10"
            >
              Update Color
            </button>
          }
        />
      </ul>
    </>
  );
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 8,
    fontFamily: "Figtree",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 15,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 8,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
