import { useEffect, useRef, useState } from "react";
import { MenuItem, Select } from "@mui/material";


export default function Search({ current, onChange }) {
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
                    strokeWidth={2.2}
                    stroke="currentColor"
                    className="w-4 -ml-0.5 mb-px"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                Search
            </button>

            <ul
                ref={modalRef}
                className={`${open
                    ? `opacity-100 visible translate-y-0 scale-100`
                    : `opacity-0 invisible scale-95 -translate-y-1`
                    } absolute left-4 top-12 whitespace-nowrap min-w-[230px] bg-white border rounded-xl origin-top-left grid grid-cols-1 shadow-lg shadow-black/[0.07] gap-2 px-2.5 py-2.5 transition-all duration-200`}
            >
                <input
                    value={current}
                    onChange={(e) => onChange(e.target.value)}
                    className="px-1 outline-none"
                    placeholder="Search..."
                />
            </ul>
        </div>
    );
};