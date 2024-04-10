import React, { useEffect, useState } from "react";
import { Avatar, Divider, MenuItem, Select, styled } from "@mui/material";
import StyledDialog from "../assets/StyledDialog";
import InputBase from "@mui/material/InputBase";
import { useAuth } from "../context/AuthContext";
import BootstrapInput from "../components/BootstrapInput";
import { get } from "../api";

export default function SettingsPage() {
  const [updateRole, setUpdateRole] = useState(0);
  const [invitedMember, setInviteMember] = useState({
    name: "",
    email: "",
    role: 0,
  });
  const [userData, setUserData] = useState(null);
  const { fetchUser, updateUser, inviteMember, signUp } = useAuth();

  const handleInviteMemberClick = () => {
    inviteMember("barakk123@gmail.com");

  };

  const fetchUserInfo = async (userId) => {
    try {
      const user = await fetchUser(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const inviteMemberToTeam = async () => {
    try {
      if (invitedMember.email && invitedMember.name && invitedMember.role) {
        const response = await signUp(invitedMember.email, invitedMember.name, invitedMember.role);
      }
      const new_user = signUp(invitedMember.email, "123456", { full_name: invitedMember.name, userType: invitedMember.role });
      const assignToTeam = await post(`teams/${userData.userTeams[0].id}/users/${new_user.id}`);
    }
    catch (error) {
      console.error("Error inviting member:", error);

    }
  }

  const fetchUserData = async () => {
    try {
      if (sessionStorage.getItem("authState")) {
        const user = JSON.parse(sessionStorage.getItem("authState"));
        const userAccount = await get(`accounts/users/${user.user.id}`);
        const userTeams = await get(`teams/users/${user.user.id}`);

        user.userAccount = userAccount;
        user.userTeams = userTeams;
        user.usersData = [];
        for (const team of userTeams) {
          for (const member of team.users) {
            const userData = await fetchUserInfo(member);
            user.usersData.push(userData);
          }
        }

        setUserData(user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="dashboard-viewer">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Settings
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Manage your account & team&apos;s settings
      </h6>

      <Divider sx={{ m: "20px 0" }} />

      <div>
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold tracking-[-0.01em] flex items-center gap-4">
            Your Team
          </h5>

          <StyledDialog
            onClose={() => setInviteMember({ name: "", email: "", role: 0 })}
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Team Member
              </button>
            }
            model={
              <div className="mt-2 w-full">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      value={inviteMember.name}
                      onChange={(e) =>
                        setInviteMember({
                          ...inviteMember,
                          name: e.target.value,
                        })
                      }
                      placeholder="Member's Name"
                      className="border mt-1.5 border-gray-300 text-[15px] px-3.5 py-2 rounded-lg shadow-sm w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={inviteMember.email}
                      onChange={(e) =>
                        setInviteMember({
                          ...inviteMember,
                          email: e.target.value,
                        })
                      }
                      id="email"
                      placeholder="name@email.com "
                      className="border mt-1.5 border-gray-300 text-[15px] px-3.5 py-2 rounded-lg shadow-sm w-full"
                    />
                  </div>
                </div>
                <Select
                  className="w-full mb-2.5 mt-3"
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={inviteMember.role}
                  onChange={(e) =>
                    setInviteMember({
                      ...inviteMember,
                      role: Number(e.target.value),
                    })
                  }
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>Select Role</MenuItem>
                  <MenuItem value={1}>Super Admin</MenuItem>
                  <MenuItem value={2}>Team Admin</MenuItem>
                  <MenuItem value={3}>Team Member</MenuItem>
                </Select>
              </div>
            }
            title={"Invite Team Member"}
            closeTrigger={
              <button
                onClick={handleInviteMemberClick}
                className="text-white font-medium py-[7px] mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10 text-[15px]"
              >
                Invite Member
              </button>
            }
          />
        </div>

        <div className="mt-3 border rounded-xl shadow-sm bg-white overflow-hidden">
          <div className="px-3 py-1.5 bg-gray-100 grid grid-cols-3">
            <p className="font-medium text-[14px]">Member</p>
            <p className="font-medium text-[14px]">Role</p>
            <p className="font-medium text-[14px]">Actions</p>
          </div>
          {userData &&
            userData.usersData &&
            userData.usersData.map((member, i) => (
              <div key={i} className="p-3 grid grid-cols-3 border-t">
                <div className="flex items-center gap-2.5">
                  <Avatar sx={{ height: 30, width: 30 }} />
                  <p className="font-medium">
                    {member.raw_user_meta_data.full_name}{" "}
                    {member.id === userData.user.id ?
                      <span className="font-normal">(You)</span>
                      : null
                    }
                  </p>
                  
                </div>

                <p className="font-medium mt-1">{member.raw_user_meta_data.userType}</p>

                <div className="flex items-center gap-2.5">
                  <StyledDialog
                    onClose={() => setUpdateRole(0)}
                    button={
                      <button className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-black/[0.07] active:scale-[0.975] hover:text-blue-600 shadow-sm flex items-center gap-2 py-[5px] px-3 text-[14px]">
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
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Change Role
                      </button>
                    }
                    model={
                      <div className="mt-2 w-full">
                        <Select
                          className="w-full mb-2.5 mt-1"
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={updateRole}
                          onChange={(e) =>
                            setUpdateRole(Number(e.target.value))
                          }
                          input={<BootstrapInput />}
                        >
                          <MenuItem value={0}>Super Admin</MenuItem>
                          <MenuItem value={1}>Team Admin</MenuItem>
                          <MenuItem value={2}>Team Member</MenuItem>
                        </Select>
                      </div>
                    }
                    title={"Change Role"}
                    closeTrigger={
                      <button
                        onClick={async () => {
                          let roleLabel = "";
                          const roles = [
                            { value: 0, label: "Super Admin" },
                            { value: 1, label: "Team Admin" },
                            { value: 2, label: "Team Member" },
                          ];
                            
                          const selectedRole = roles.find(role => role.value === updateRole);
                          if (selectedRole) roleLabel = selectedRole.label;
                            
                            member.raw_user_meta_data.userType = roleLabel;
                            const memberData = {
                              userType: member.raw_user_meta_data.userType
                            }
                        }}
                        className="text-white font-medium py-[7px] mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10 text-[15px]"
                      >
                        Update Role
                      </button>

                    }
                  />

                  <button className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-black/[0.07] active:scale-[0.975] hover:text-red-600 shadow-sm flex items-center gap-2 py-[5px] px-3 text-[14px]">
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
                    Remove Member
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
