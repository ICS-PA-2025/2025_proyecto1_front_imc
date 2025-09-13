import {User} from "./user.dto.ts";

export interface AuthContextType {
    user: User;
    login: (email: string, password: string) => boolean;
    register: (email: string, password: string) => boolean;
    logout: () => void;
}