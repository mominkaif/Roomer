import { useEffect } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProfileDetails from '../components/ProfileDetails'
import ProfileForm from '../components/ProfileForm'

const Listings = () => {
    const {profiles, dispatch} = useProfilesContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchProfiles = async () => {
            const response = await fetch('/api/profiles', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PROFILES', payload: json})
            }
        }

        if(user){
            fetchProfiles()
        }
    }, [dispatch, user])

    return (
        <div className="listings">
            <div className="profiles">
                {profiles && profiles.map((profile) => (
                    <ProfileDetails key={profile._id} profile={profile} />
                ))}
            </div>
            <ProfileForm />
        </div>
    )
}

export default Listings