import useAuthStore from "../store/authStore";

function Profile() {
    const { user, token } = useAuthStore();

    return (
        <section className="profile-page">
            <div className="profile-card">
                <h1 className="profile-title">My Profile</h1>
                <p className="profile-subtitle">
                    View your account information.
                </p>

                <div className="profile-info">
                    <div className="profile-row">
                        <span className="profile-label">Full Name</span>
                        <span className="profile-value">{user?.name || "Not available"}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-label">Email</span>
                        <span className="profile-value">{user?.email || "Not available"}</span>
                    </div>


                </div>

                <button className="profile-button">Edit Profile</button>
            </div>
        </section>
    );
}

export default Profile;