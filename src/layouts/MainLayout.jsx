import { NavLink, Outlet } from 'react-router-dom'
import { useAuth, UserMenu, useLogout } from '@/features/auth'

function MainLayout() {
  const { user, isAuthenticated } = useAuth()
  const logoutMutation = useLogout()

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <NavLink to="/" className="logo-link">
            Rent a Car
          </NavLink>
        </div>

        <div className="navbar__links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
          >
            Home
          </NavLink>

          <NavLink
            to="/vehicles"
            className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
          >
            Vehicles
          </NavLink>

          {isAuthenticated ? (
            <UserMenu
              userName={user?.name}
              isLoggingOut={logoutMutation.isPending}
              onLogout={() => logoutMutation.mutate()}
            />
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>

      <main className="page-shell">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
