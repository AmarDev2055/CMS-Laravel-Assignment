import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import { login as loginApi } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("Invalid credentials");
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError("");
        try {

            const response = await loginApi({
                email,
                password,
            });

            login(
                response.data.token,
                response.data.user
            );

            navigate("/dashboard");

        } catch (err) {

            if (err.response?.status === 422) {

                setError("Invalid email or password.");

            } else {

                setError("Something went wrong.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white shadow-lg rounded-lg w-96 p-8">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    CMS Login
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;