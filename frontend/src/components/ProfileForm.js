import { useState } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"

const ProfileForm = () => {
    const { dispatch } = useProfilesContext()

    const [name, setName] = useState('')
    const [university, setUniversity] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault() // can remove this to see  instant results

        const profile = {name, university, year}

        const response = await fetch('/api/profiles', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setUniversity('')
            setYear('')
            setError(null)
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
            />

            <label>University:</label>
            <input 
            type="text" 
            onChange={(e) => setUniversity(e.target.value)}
            value={university}
            />

            <label>Year:</label>
            <input 
            type="number" 
            onChange={(e) => setYear(e.target.value)}
            value={year}
            />

            <button>Create Profile</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProfileForm