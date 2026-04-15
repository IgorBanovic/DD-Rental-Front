import { NavLink } from 'react-router-dom'

function UserMenu({ userName, isLoggingOut, onLogout }) {
  return (
    <>
      <span className="nav-user">Hi, {userName}</span>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
      >
        Profile
      </NavLink>

      <button className="logout-btn" onClick={onLogout} disabled={isLoggingOut}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </>
  )
}

export default UserMenu
