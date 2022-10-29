const ProfileDetails = ({ profile }) => {
    return (
        <div className="profile-details">
            <h4>{profile.name}</h4>
            <p><strong>University: </strong> {profile.university}</p>
            <p><strong>Year: </strong> {profile.year}</p> 
            <p>{profile.createdAt}</p> 
        </div>
    )
}

export default ProfileDetails