import { createContext, useEffect,useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] =useState(null);
    const [loading, setLoading] = useState(true);
    
        console.log("AUTH USER:", user);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
             try {const decodedUser = jwtDecode(token);
                console.log("DECODED JWT:", decodedUser);
             setUser({...decodedUser, token});
        } catch (error) {
             console.error("Invalid token:", error);
             localStorage.removeItem("token");
             setUser(null);
        }} setLoading(false);},[])

    const login = (token) => {
        localStorage.setItem("token", token);
        const decodedUser = jwtDecode(token);
        setUser({...decodedUser, token});
    }
    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    }
    return(
        <AuthContext.Provider value={{user,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;