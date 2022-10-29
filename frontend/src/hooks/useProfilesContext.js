import { ProfilesContext } from "../context/ProfileContext"
import { useContext } from "react"

export const useProfilesContext = () => {
    const context = useContext(ProfilesContext)

    if (!context) {
        throw Error('useProfilesContext must be used inside an ProfilesContextProvider')
    }

    return context
}