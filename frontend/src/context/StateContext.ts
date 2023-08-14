import { createContext, useContext } from "react";
import { StateContextType } from "../../types/types";

export const StateContext = createContext<StateContextType>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    isMenuOpen: false,
    setIsMenuOpen: () => {},
    loading: true,
});

export const useStateContext = (): StateContextType => useContext(StateContext);
