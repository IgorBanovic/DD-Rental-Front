import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            console.log("Registered user:", data);
        },
        onError: (error) => {
            alert(error.message || "Something went wrong");
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

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        mutation.mutate({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
        });
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Register</h1>
                <p className="auth-subtitle">Create your account to book vehicles.</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        className="auth-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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

                    <label className="auth-label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="auth-input"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button type="submit"
                        className="auth-button"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Registering..." : "Register"}
                    </button>
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

export default Register;