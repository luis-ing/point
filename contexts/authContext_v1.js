"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export const AuthContext = createContext({
    login: (authTokens) => {},
    logout: () => {},
    isLoggedIn: false,
    authTokens: null,
});

const AuthContextProvider = ({ children }) => {
    const authTokensInLocalStorage = localStorage.getItem(AUTH_TOKENS_KEY);
    const [authTokens, setAuthTokens] = useState(
        authTokensInLocalStorage === null
            ? null
            : JSON.parse(authTokensInLocalStorage)
    );

    const login = useCallback((authTokens) => {
        localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(authTokens))
        setAuthTokens(authTokens);
    }, []);
    
    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKENS_KEY)
        setAuthTokens(null);
    }, []);
    
    const value = useMemo(
        () => ({
            login,
            logout,
            authTokens,
            isLoggedIn: authTokens !== null,
        }),
        [authTokens, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export default AuthContextProvider;
