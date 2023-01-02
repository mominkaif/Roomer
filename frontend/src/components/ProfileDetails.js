import { Link } from 'react-router-dom'

const ProfileDetails = ({ profile }) => {
    return (
        <div className="profile-details">
            <Link to={profile._id.toString()}>
                <h4>{profile.name}</h4>
            </Link>
            <p><strong>University: </strong> {profile.university}</p>
            <p><strong>Year: </strong> {profile.year}</p> 
            <p><strong>Bio: </strong> {profile.bio}</p>
            <p>{profile.createdAt}</p> 
        </div>
    )
}

export default ProfileDetails