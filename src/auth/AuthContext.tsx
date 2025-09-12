import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {authService} from "../services/authService";
import {imcService} from "../services/imcService";

type User = {
    id?: string;
    email: string;
} | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize user from localStorage on app start
        const storedUser = localStorage.getItem("user");
        const token = authService.getToken();

        if (storedUser && authService.isAuthenticated() && token) {
            try {
                setUser(JSON.parse(storedUser));
                // Set token for imcService
                imcService.setToken(token);
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
                authService.logout();
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await authService.login(email, password);
            if (response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));

                // Set token for imcService
                const token = authService.getToken();
                if (token) {
                    imcService.setToken(token);
                }

                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const register = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await authService.register(email, password);
            if (response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));

                // Set token for imcService
                const token = authService.getToken();
                if (token) {
                    imcService.setToken(token);
                }

                return true;
            }
            return false;
        } catch (error) {
            console.error("Register error:", error);
            // Re-throw the error so it can be caught by the Register component
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        imcService.clearToken();
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
            <AuthContext.Provider value={{user, login, register, logout, isLoading}}>
                {children}
            </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe estar dentro de AuthProvider");
    return context;
}
