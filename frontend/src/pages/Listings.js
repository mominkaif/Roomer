import { useEffect, useState } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProfileDetails from '../components/ProfileDetails'
import Filter from "../components/Filter"

const Listings = () => {
    const {profiles, dispatch} = useProfilesContext()
    const {user} = useAuthContext()

    // state for filter value
    let [filterTextValue, setFilterText] = useState("All")

    let filteredProfileList = profiles.filter((profile) => {
        if (filterTextValue === 'Guelph') {
            return profile.university === 'Guelph'
        } else if (filterTextValue === 'Laurier') {
            return profile.university === 'Laurier'
        } else if (filterTextValue === 'Western') {
            return profile.university === 'Western'
        } else if (filterTextValue === 'Waterloo') {
            return profile.university === 'Waterloo'
        } else if (filterTextValue === 'Mac') {
            return profile.university === 'Mac'
        } else {
            return profile
        }
    })

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

    function onFilterValueSelected (filterValue) {
        setFilterText(filterValue)
    }

    return (
        <div className="listings">
            <div className="profiles">
            {profiles && <Filter filterValueSelected={onFilterValueSelected}></Filter>}
                {filteredProfileList && filteredProfileList.map((profile) => (
                    <ProfileDetails key={profile._id} profile={profile} />
                ))}
            </div>
        </div>
    )
}

export default Listings