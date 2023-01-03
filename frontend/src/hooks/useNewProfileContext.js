import { NewProfileContext } from "../context/NewProfileContext"
import { useContext } from "react"

export const useNewProfileContext = () => {
    const context = useContext(NewProfileContext)

    if (!context) {
        throw Error('useNewProfileContext must be used inside an NewProfileContextProvider')
    }

    return context
}