import { createContext, useState } from "react";
import Auth from "../models/Auth";

export const AuthContext = createContext<Auth | null>(null);
export const SetAuthContext = createContext<Function | null>(null);

export default function AuthProvider({ children }: any) {
    const [auth, setAuth] = useState<Auth | null>(null);

    return (
        <AuthContext.Provider value={auth} >
            <SetAuthContext.Provider value={setAuth}>
                {children}
            </SetAuthContext.Provider>
        </AuthContext.Provider>
    );
}