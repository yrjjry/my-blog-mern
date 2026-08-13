import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function AdminRoute({ children }) {
    const {user,loading} = useContext(AuthContext);
    // Wait for AuthContext
    // to restore the user from JWT
    if (loading) {
        return (
            <div><p>Loading...</p></div>);
    }

    // Not logged in
    if (!user) {
        return (
            <Navigate to="/login" replace/>
                );
    }

    // Logged in but not admin
    if (user.role !== "admin") {
        return (<Navigate to="/"replace/>
                );
    }
    // Admin
    return children;
}

export default AdminRoute;