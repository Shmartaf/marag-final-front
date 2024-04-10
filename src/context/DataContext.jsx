import React, { createContext, useContext, useEffect, useState } from "react";
import { get } from "../api";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [boards, setBoards] = useState([]);
    const [teams, setTeams] = useState([]);

    const fetchData = async () => {
        try {
            if (!user) {
                return;
            }
            const boardsRes = await get(`boards/user/${user.id}`);
            const teamsRes = await get(`teams/users/${user.id}`);
            setBoards(boardsRes);
            setTeams(teamsRes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchBoards = async () => {
        try {
            if (!user) {
                return;
            }
            const boardsRes = await get(`boards/user/${user.id}`);
            return boardsRes;
        } catch (error) {
            console.error("Error fetching boards:", error);
        }
    }



    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <DataContext.Provider value={{ boards, teams, fetchData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
