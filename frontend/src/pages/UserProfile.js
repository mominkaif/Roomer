import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"


const UserProfile = () => {
    const [userprofile, setUserprofile] = useState(null)
    const { id } = useParams()
    const {user} = useAuthContext()

    const fetchProfiles = () => {
        fetch('/api/profiles/' + id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setUserprofile(data)
        })        
    }

    fetchProfiles()

    return (
        <div className="userprofile-details">
            {userprofile && <h1>Hi I'm, {userprofile.name} insert user picture here</h1>}
            {userprofile && <h1>University: {userprofile.university}</h1>}
            {userprofile && <h1>Year: {userprofile.year}</h1>}
            {userprofile && <h1>Hobbies: {userprofile.hobbies}</h1>}
            {userprofile && <h1>Diet: {userprofile.diet}</h1>}
            {userprofile && <h1>Program: {userprofile.program}</h1>}
            {userprofile && <h1>Bio: {userprofile.bio}</h1>}
            {userprofile && <img src={userprofile.postImage.myFile} />}
        </div>
    )
}

export default UserProfile