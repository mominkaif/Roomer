import { Link } from 'react-router-dom'

const ProfileDetails = ({ profile }) => {
    return (
        <div className="profile-details">
            <div className="text-elements">
                <Link to={profile._id.toString()}>
                    <h4>{profile.name}</h4>
                </Link>
                <p><strong>University: </strong> {profile.university}</p>
                <p><strong>Year: </strong> {profile.year}</p> 
                <p><strong>Bio: </strong> {profile.bio}</p>
            </div>
            <div className="profile-picture-container">
                <img src={profile.postImage.myFile} alt="profile picture" />
            </div>
        </div>
    )
}

export default ProfileDetails