import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                    Dashboard
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;