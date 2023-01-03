import { createContext, useReducer, useEffect } from 'react'
import { useNewProfileContext } from '../hooks/useNewProfileContext'

export const NewProfileContext = createContext()

export const newProfileReducer = (state, action) => {
    switch (action.type) {
        case 'CREATED_PROFILE':
            console.log("created")
            console.log(action.payload)
            return {newProfile: action.payload}
        case 'NOT_CREATED':
            return {newProfile: false}
        default:
            return state
    }
}

export const NewProfileContextProvider = ({ children }) => {
    const [state, newDispatch] = useReducer(newProfileReducer, {
        newProfile: false
    })

    useEffect(() => {
        const newProfile = JSON.parse(localStorage.getItem('created_profile?'))
        console.log(newProfile, "HI")

        if (newProfile) {
            console.log("HERE")
            newDispatch({ type: 'CREATED_PROFILE', payload: true })
        }
    }, [])

    console.log("newprofile context state: ", state)

    return  (
        <NewProfileContext.Provider value={{...state, newDispatch}}>
            { children }
        </NewProfileContext.Provider>
    )
}