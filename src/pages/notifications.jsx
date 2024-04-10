import React, { useState } from "react";

import {
  Autocomplete,
  Avatar,
  Divider,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import StyledDialog from "../assets/StyledDialog";
import InputBase from "@mui/material/InputBase";

const demoNotifications = [
  {
    name: "Member Name",
    message:
      "Ut pharetra, lectus a imperdiet aliquam, magna orci euismod mauris, at mattis enim est eu mi. Aliquam ac elementum elit, in convallis sem",
  },
  {
    name: "Member Name",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper lacus aliquam sapien.",
  },
  {
    name: "Member Name",
    message:
      "Pellentesque in ante vel quam cursus vestibulum volutpat iaculis augue. Phasellus tristique sem in metus porta, at sodales sapien consectetur",
  },
];

const demoTeam = [
  {
    name: "Member Name",
    isYou: false,
    role: "Super Admin",
  },
  {
    name: "Member Name",
    isYou: true,
    role: "Team Member",
  },
  {
    name: "Member Name",
    isYou: false,
    role: "Team Admin",
  },
];

export default function NotificationsPage() {
  return (
    <div className="dashboard-viewer">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Notifications
      </h3>
      <Divider sx={{ m: "20px 0" }} />
      <div>
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold tracking-[-0.01em] flex items-center gap-4">
            Inbox (23)
          </h5>

          <StyledDialog
            onClose={() => {}}
            button={
              <button className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:text-blue-500 hover:shadow-black/[0.05] active:scale-[0.975] shadow-sm flex items-center gap-1.5 py-1.5 px-3 text-[14.5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 -ml-0.5 -translate-y-[0.5]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
                Send Message
              </button>
            }
            model={
              <div className="mt-4 mb-4 w-full">
                <div className="">
                  <textarea
                    placeholder="Message"
                    rows={3}
                    className="border mt-1.5 border-gray-300 text-[15px] px-3.5 py-2 rounded-lg shadow-sm w-full"
                  />

                  <Autocomplete
                    multiple
                    className="mt-2 shadow-sm"
                    id="tags-outlined"
                    options={demoTeam}
                    getOptionLabel={(member) => member.name}
                    defaultValue={[]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Recipient"
                        placeholder="Recipient"
                      />
                    )}
                  />
                </div>
              </div>
            }
            title={"Send Message"}
            closeTrigger={
              <button className="text-white font-medium py-[7px] mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10 text-[15px]">
                Send Message
              </button>
            }
          />
        </div>

        <div className="mt-3 border rounded-xl shadow-sm bg-white overflow-hidden">
          <div className="px-3 py-1.5 bg-gray-100 grid grid-cols-3">
            <p className="font-medium text-[14px]">Sender</p>
            <p className="font-medium text-[14px]">Message</p>
          </div>
          {demoNotifications.map((notification, i) => (
            <div key={i} className="p-3 grid grid-cols-3 border-t items-start">
              <div className="flex items-center gap-2.5">
                <Avatar sx={{ height: 30, width: 30 }} />

                <p className="font-medium">{notification.name} </p>
              </div>

              <div className="col-span-2 flex items-center justify-between">
                <p className="font-medium mt-[2px]">
                  {notification.message.length > 80
                    ? notification.message.slice(0, 79) + "..."
                    : notification.message}
                </p>

                <StyledDialog
                  onClose={() => {}}
                  button={
                    <button className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:text-blue-500 hover:shadow-black/[0.05] active:scale-[0.975] shadow-sm flex items-center gap-1.5 py-1.5 px-3 text-[14.5px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-4 -ml-0.5 -translate-y-[0.5]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      View Message
                    </button>
                  }
                  model={
                    <div className="mt-4 mb-4 w-full">
                      <div className="flex gap-2.5">
                        <Avatar sx={{ height: 35, width: 35 }} />

                        <div>
                          <p className="font-semibold">{notification.name} </p>
                          <p className="text-[15.5px] mt-1">
                            {notification.message}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  }
                  title={"Message"}
                  closeTrigger={<></>}
                />
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
}
