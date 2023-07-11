import jwtDecode from "jwt-decode";

export const isTokenValid = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp && decodedToken.exp > currentTime) {
            return true;
        }
    }

    return false;
};
