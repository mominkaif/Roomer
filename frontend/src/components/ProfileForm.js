import { useState } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ProfileForm = () => {
    const { dispatch } = useProfilesContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [university, setUniversity] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() // can remove this to see  instant results

        if(!user){
            setError("You must be logged in")
            return
        }

        const profile = {name, university, year}

        const response = await fetch('/api/profiles', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setUniversity('')
            setYear('')
            setError(null)
            setEmptyFields([])
            console.log('profile created', json)
            dispatch({type: 'CREATE_PROFILE', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a Profile</h3>

            <label>Student Name:</label>
            <input 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''} // if title is in the empty fields, it gives it a class of error
            />

            <label>University:</label>
            <input name="unis" placeholder="Type here..." list="unisList" onChange={(e) => setUniversity(e.target.value)} 
            value={university} 
            className={emptyFields.includes('university') ? 'error' : ''} />
                <datalist id="unisList">
                    <option value="Guelph"/>
                    <option value="Laurier"/>
                    <option value="Western"/>
                    <option value="Waterloo"/>
                    <option value="Mac"/>
                </datalist>

            <label>Year:</label>
            <input 
            type="number" 
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className={emptyFields.includes('year') ? 'error' : ''}
            />

            <button>Create Profile</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProfileForm