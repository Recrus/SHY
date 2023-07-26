import { createContext, useContext, useEffect, useState } from "react";
import axiosFetch from "../plugins/axios.js";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    isMenuOpen: null,
    setIsMenuOpen: () => {},
    loading: true,
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("ACCESS_TOKEN");
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

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
