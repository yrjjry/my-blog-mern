
import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Auth.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post(
                "/auth/register",
                {username,email,password,}
            );
            alert("Register successful");
            navigate("/login");
        } catch (error) {
            console.error(
                "Register failed:",
                error
            );
            const message =
                error.response?.data?.message ||
                "Registration failed.";
            setError(message);
        }
    };


    return (
        <main className="auth-page">
            <div className="auth-container">
                <header className="auth-header">
                    <p className="auth-eyebrow">
                        BEGIN HERE
                    </p>
                    <h1>Register</h1>
                    <p className="auth-intro">
                        Create an account and leave your mark.
                    </p>
                </header>
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <div className="auth-field">
                        <label htmlFor="register-username">
                            Username
                        </label>
                        <input
                            id="register-username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="register-email">
                            Email
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label htmlFor="register-password">
                            Password
                        </label>
                        <input
                            id="register-password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>
                    {error && (
                        <p className="auth-error">
                            ❌ {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="auth-submit"
                    >Create Account</button>
                </form>
                <div className="auth-footer">
                    <span>Already have an account?</span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;
