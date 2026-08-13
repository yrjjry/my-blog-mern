import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import "../style/Auth.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear previous error
        setError("");
        try {
            const response = await api.post("/auth/login",
                { email, password }
            );
            login(response.data.token);
            navigate(location.state?.from || "/");
            console.log(response.data);
        } catch (error) {
            console.error("Login failed:", error);
            const message = error.response?.data?.message || "Login failed.";
            setError(message);
        }
    };
    return (
        <main className="auth-page">
            <div className="auth-container">
                <header className="auth-header">
                    <p className="auth-eyebrow">WELCOME BACK</p>
                    <h1>Login</h1>
                    <p className="auth-intro">
                        Return to your quiet corner.
                    </p>
                </header>
                <form className="auth-form"
                    onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>
                    {error && (
                        <p className="auth-error">❌ {error}</p>
                    )}
                    <button type="submit"
                        className="auth-submit"
                    >Login</button>
                    <div className="google-login">
                        <div className="google-divider">
                            <span>or</span>
                        </div>
                        <GoogleLogin onSuccess={async (credentialResponse) => {
                            console.log("GOOGLE SUCCESS CALLBACK");
                            try {
                                console.log("ABOUT TO SEND GOOGLE LOGIN REQUEST");
                                const response = await api.post("/auth/google",
                                    { credential: credentialResponse.credential }
                                );
                                console.log("GOOGLE LOGIN:", response.data);
                                login(response.data.token);
                                navigate(location.state?.from || "/");
                            } catch (error) {
                                console.error("Google login failed:", error);
                                const message = error.response?.data?.message ||
                                    "Google login failed.";
                                setError(message);
                            }
                        }}
                            onError={() => {
                                console.error("Google Login Failed");
                                setError("Google login failed.");
                            }}
                        />
                    </div>
                </form>
                <div className="auth-footer">
                    <span>Don't have an account?</span>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </main>
    );
}

export default Login;

