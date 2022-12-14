import { useState } from "react"
import { useProfilesContext } from "../hooks/useProfilesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { useNewProfileContext } from "../hooks/useNewProfileContext"

const ProfileForm = () => {
    const { dispatch } = useProfilesContext()
    const { newDispatch } = useNewProfileContext()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [university, setUniversity] = useState('')
    const [year, setYear] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [diet, setDiet] = useState('')
    const [program, setProgram] = useState('')
    const [bio, setBio] = useState('')
    const [postImage, setPostImage] = useState({ myFile : ""})
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    function componentDidUpdate() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
          window.history.pushState(null, document.title, window.location.href);
        });
      }

    componentDidUpdate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in")
            return
        }
        console.log(user)
        const profile = {name, university, year, hobbies, diet, program, bio, postImage}

        const response = await fetch('/api/profiles', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (response.status == 413){
            setError("Image size too large")
        }
        
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setUniversity('')
            setYear('')
            setHobbies('')
            setDiet('')
            setBio('')
            setPostImage({ myFile : ""})
            setError(null)
            setEmptyFields([])
            console.log('profile created', json)
            await dispatch({type: 'CREATE_PROFILE', payload: json})
            await newDispatch({type: 'CREATED_PROFILE', payload: true})
            localStorage.setItem('created_profile?', JSON.stringify(true))
            navigate('/')
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setPostImage({ ...postImage, myFile : base64})
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a Profile</h3>

            <label>Name:</label>
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

            <label>Program:</label>
            <input 
            type="text" 
            onChange={(e) => setProgram(e.target.value)}
            value={program}
            className={emptyFields.includes('program') ? 'error' : ''}
            />

            <label>Hobbies:</label>
            <input 
            type="text" 
            onChange={(e) => setHobbies(e.target.value)}
            value={hobbies}
            className={emptyFields.includes('hobbies') ? 'error' : ''}
            />

            <label>Dietary Restrictions:</label>
            <input 
            type="text" 
            onChange={(e) => setDiet(e.target.value)}
            value={diet}
            className={emptyFields.includes('diet') ? 'error' : ''}
            />

            <label>Bio:</label>
            <input 
            type="text" 
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className={emptyFields.includes('bio') ? 'error' : ''}
            />
            
            <label htmlFor="file-upload">Profile Picture</label>
            <input 
            type="file" 
            label="image" 
            name="myFile" 
            accept=".jpeg, .jpg, .png" 
            onChange={(e) => handleFileUpload(e)}
            className={emptyFields.includes('postImage') ? 'error' : ''}
            />

            <button>Create Profile</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ProfileForm

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file) 
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}