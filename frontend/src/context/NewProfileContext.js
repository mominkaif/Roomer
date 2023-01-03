import { createContext, useReducer } from 'react'

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

    console.log("newprofile context state: ", state)

    return  (
        <NewProfileContext.Provider value={{...state, newDispatch}}>
            { children }
        </NewProfileContext.Provider>
    )
}