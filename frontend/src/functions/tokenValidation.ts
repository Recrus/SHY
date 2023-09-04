import jwtDecode from "jwt-decode";
import { Token, DecodedToken } from "../../types/types";

export const isTokenValid = (token: Token): boolean => {
    if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
            return true;
        }
    }

    return false;
};
