import { useEffect, useState } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProfileDetails from '../components/ProfileDetails'
import Filter from "../components/Filter"
import Pagination from "../components/Pagination"

const Listings = () => {
    const {profiles, dispatch} = useProfilesContext()
    const {user} = useAuthContext()

    // state for filter value
    let [filterTextValue, setFilterText] = useState("All")

    // state for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)

    function componentDidUpdate() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
          window.history.pushState(null, document.title, window.location.href);
        });
      }

    componentDidUpdate()

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

    // for pagination
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = filteredProfileList.slice(firstPostIndex, lastPostIndex)
    return (
            <div className="listings">
                <div className="profiles">
                {profiles && <Filter filterValueSelected={onFilterValueSelected}></Filter>}
                    {filteredProfileList && currentPosts.map((profile) => (
                        <ProfileDetails key={profile._id} profile={profile} />
                    ))}
                <Pagination 
                    totalPosts={filteredProfileList.length} 
                    postsPerPage={postsPerPage} 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage}
                />
                </div>
            </div>
    )
}

export default Listings