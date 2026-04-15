import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuthStore from "../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/auth";

function Navbar() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            logout();
            navigate("/");
        },
        onError: () => {
            logout();
            navigate("/");
        },
    });

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <NavLink to="/" className="logo-link">
                    Rent a Car
                </NavLink>
            </div>

            <div className="navbar__links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/vehicles"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Vehicles
                </NavLink>

                {isAuthenticated ? (
                    <>
                        <span className="nav-user">Hi, {user?.name}</span>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>

                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Profile
                        </NavLink>

                        <button
                            className="logout-btn"
                            onClick={() => logoutMutation.mutate()}
                            disabled={logoutMutation.isPending}
                        >
                            {logoutMutation.isPending ? "Logging out..." : "Logout"}
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? "nav-link active-link" : "nav-link"
                            }
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;