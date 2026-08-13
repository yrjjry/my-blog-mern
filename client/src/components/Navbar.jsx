import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../style/Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-mark">Y</span>
                    <span className="logo-text">R.J. Yang</span>
                </Link>
                {/* Navigation */}
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/board" className="nav-link">Board</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    {user ? (
                        <>
                            {/* Only admin can see Create */}
                            {user.role === "admin" && (
                                <Link to="/create" className="nav-link">Create</Link>)}
                            <span className="welcome">Welcome, {user.username}</span>
                            <button type="button" className="logout-button" onClick={logout}>Logout</button>
                        </>
                    ) : (<>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-register">Register</Link>
                    </>
                    )}
                     <button
                    type="button"
                    className="theme-toggle"
                    onClick={toggleTheme}
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;