import React, { useEffect, useState } from "react";
import axiosFetch from "../plugins/axios";
import { UserData, ContextProviderProps } from "../../types/types";
import { StateContext } from "./StateContext";

export const ContextProvider: React.FC<ContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken: string | null =
                    localStorage.getItem("ACCESS_TOKEN");
                if (accessToken) {
                    axiosFetch.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${accessToken}`;
                    const response = await axiosFetch.get("/auth/user-profile");
                    setUser(response.data);
                } else {
                    console.log("ACCESS_TOKEN not found in local storage.");
                }
            } catch (error) {
                setUser(null);
                setToken(null);
                console.error(error);
            } finally {
                // for prevent flash of loading
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchData();
    }, [token]);

    const setToken = (newToken: string | null) => {
        _setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                isMenuOpen,
                setIsMenuOpen,
                loading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
