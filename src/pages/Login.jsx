import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        alert("Login submitted");
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

                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Login;