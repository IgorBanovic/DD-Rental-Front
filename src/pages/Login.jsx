import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { loginUser } from "../api/auth";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            login(data.user, data.token);
            navigate("/dashboard");
        },
        onError: (error) => {
            alert(error.message || "Login failed");
        },
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please fill in all fields.");
            return;
        }

        mutation.mutate({
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Login</h1>
                <p className="auth-subtitle">Sign in to manage your reservations.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="auth-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label className="auth-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="auth-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Logging in..." : "Login"}
                    </button>

                    <p className="auth-subtitle">Forgot your password? Click Here!</p>


                    {mutation.isError && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            {mutation.error.message}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Login;