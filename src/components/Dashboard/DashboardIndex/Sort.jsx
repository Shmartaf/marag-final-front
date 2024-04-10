import { useState, useEffect, useRef } from "react";
import { Divider } from "@mui/material";


export default function Sort({ current, onChange }) {
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);

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
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="gap-1.5 outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.9}
                    stroke="currentColor"
                    className="w-[18px] -ml-1 mb-px -mr-0.5 scale-110"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                </svg>
                Sort
            </button>

            <ul
                ref={modalRef}
                className={`${open
                    ? `opacity-100 visible translate-y-0 scale-100`
                    : `opacity-0 invisible scale-95 -translate-y-1`
                    } absolute left-4 top-12 whitespace-nowrap min-w-[140px] bg-white border rounded-xl origin-top-left grid grid-cols-1 shadow-md shadow-black/5 gap-2 px-2.5 py-2.5 transition-all duration-200`}
            >
                <li
                    onClick={() => {
                        onChange(0);
                        setOpen(false);
                    }}
                    aria-checked={current == 0}
                    className="flex aria-checked:text-blue-500 items-center gap-1 whitespace-nowrap min-w-0 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.65}
                        stroke="currentColor"
                        className="w-[17px] translate-y-[0.5px]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                        />
                    </svg>
                    Ascending
                </li>
                <Divider orientation="horizontal" />
                <li
                    onClick={() => {
                        onChange(1);
                        setOpen(false);
                    }}
                    aria-checked={current == 1}
                    className="flex aria-checked:text-blue-500 items-center gap-1 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.65}
                        stroke="currentColor"
                        className="w-[17px] translate-y-[0.5px]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                        />
                    </svg>
                    Descending
                </li>
            </ul>
        </div>
    );
};
