import { useEffect } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"

// components
import ProfileDetails from '../components/ProfileDetails'
import ProfileForm from '../components/ProfileForm'

const Listings = () => {
    const {profiles, dispatch} = useProfilesContext()

    useEffect(() => {
        const fetchProfiles = async () => {
            const response = await fetch('/api/profiles')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PROFILES', payload: json})
            }
        }

        fetchProfiles()
    }, [])

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