import { useState } from 'react'
import StatusMessage from '@/components/ui/StatusMessage'
import { useLogin } from '@/features/auth/hooks/useLogin'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const loginMutation = useLogin()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      return
    }

    loginMutation.mutate(formData)
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Sign in to manage your reservations.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            className="auth-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="auth-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            name="password"
            className="auth-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="auth-button" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>

          {loginMutation.isError ? (
            <StatusMessage tone="error">{loginMutation.error.message}</StatusMessage>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default LoginForm
