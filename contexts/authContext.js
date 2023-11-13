"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
    login: (authTokens) => { },
    logout: () => { },
    // darkMode: false,
});

const DarkMode = "darkMode";

const AuthContextProvider = ({ children }) => {
    // const darkModeName = localStorage.getItem(DarkMode);
    // const [darkMode, setDarkMode] = useState(
    //     darkModeName === null
    //         ? false
    //         : darkModeName
    // );

    const login = useCallback((authTokens) => {
        Cookies.set("authTokens", JSON.stringify(authTokens));
        // Consultar la configuración en bd del tema
        localStorage.setItem(DarkMode, "false");
        console.log('localStorage.getItem(DarkMode) ', !Boolean(localStorage.getItem(DarkMode)), localStorage.getItem(DarkMode));
        // setDarkMode(false);
    }, []);

    const logout = useCallback(() => {
        Cookies.remove("authTokens");
        localStorage.removeItem(DarkMode);
        // setDarkMode(false);
    }, []);

    const value = useMemo(
        () => ({
            login,
            logout,
            // darkMode,
        }),
        [login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthContextProvider;
