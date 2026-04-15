import { useEffect, useState } from 'react'
import StatusMessage from '@/components/ui/StatusMessage'
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile'

function ProfileCard({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
  })
  const updateProfileMutation = useUpdateProfile()

  useEffect(() => {
    setFormData({
      name: user?.name || '',
    })
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!user?.id || !formData.name) {
      return
    }

    const payload = {}

    if (formData.name !== (user?.name || '')) {
      payload.name = formData.name
    }

    if (Object.keys(payload).length === 0) {
      setIsEditing(false)
      return
    }

    updateProfileMutation.mutate(
      payload,
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      }
    )
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">View your account information.</p>

        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-label">Full Name</span>
            <span className="profile-value">{user?.name || 'Not available'}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email || 'Not available'}</span>
          </div>
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="profile-name">
              Full Name
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              className="auth-input"
              value={formData.name}
              onChange={handleChange}
            />

            <div className="profile-form__actions">
              <button
                className="profile-form__button profile-form__button--secondary"
                type="button"
                onClick={() => {
                  setFormData({
                    name: user?.name || '',
                  })
                  setIsEditing(false)
                }}
              >
                Cancel
              </button>
              <button className="profile-form__button" type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {updateProfileMutation.isError ? (
              <StatusMessage tone="error">{updateProfileMutation.error.message}</StatusMessage>
            ) : null}
          </form>
        ) : null}

        {updateProfileMutation.isSuccess ? (
          <StatusMessage>Profile updated successfully.</StatusMessage>
        ) : null}

        {!isEditing ? (
          <button
            className="profile-button"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default ProfileCard
