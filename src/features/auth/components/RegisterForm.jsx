import { useState } from 'react'
import StatusMessage from '@/components/ui/StatusMessage'
import { useRegister } from '@/features/auth/hooks/useRegister'

const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function RegisterForm() {
  const [formData, setFormData] = useState(initialFormState)
  const registerMutation = useRegister()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return
    }

    if (formData.password !== formData.confirmPassword) {
      return
    }

    registerMutation.mutate(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      },
      {
        onSuccess: () => {
          setFormData(initialFormState)
        },
      }
    )
  }

  const passwordsDoNotMatch =
    formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        <p className="auth-subtitle">Create your account to book vehicles.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="register-name">
            Full Name
          </label>
          <input
            id="register-name"
            type="text"
            name="name"
            className="auth-input"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="auth-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            name="email"
            className="auth-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="auth-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            name="password"
            className="auth-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <label className="auth-label" htmlFor="register-confirm-password">
            Confirm Password
          </label>
          <input
            id="register-confirm-password"
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="auth-button" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </button>

          {passwordsDoNotMatch ? (
            <StatusMessage tone="error">Passwords do not match.</StatusMessage>
          ) : null}

          {registerMutation.isError ? (
            <StatusMessage tone="error">{registerMutation.error.message}</StatusMessage>
          ) : null}

          {registerMutation.isSuccess ? (
            <StatusMessage>Registration completed successfully.</StatusMessage>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default RegisterForm
