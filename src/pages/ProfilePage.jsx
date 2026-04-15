import { ProfileCard, useProfile } from '@/features/profile'

function ProfilePage() {
  const { user } = useProfile()

  return <ProfileCard user={user} />
}

export default ProfilePage
