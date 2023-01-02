import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
<<<<<<< HEAD
import {useNavigate} from 'react-router-dom';
=======
//import { useNavigate } from "react-router-dom"

// profile form
//import ProfileForm from '../components/ProfileForm'
>>>>>>> 612a3768af89f5a933324cd85fcf5430cd348e93


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
<<<<<<< HEAD
    const navigate = useNavigate()
=======
    //const navigate = useNavigate()
>>>>>>> 612a3768af89f5a933324cd85fcf5430cd348e93

    const handleSubmit = async (e) => {
        e.preventDefault()

<<<<<<< HEAD
        await signup(email, password);
        navigate('/profile')
=======
        await signup(email, password)

        // if(signup){
        //     navigate("/cp")
        // }
>>>>>>> 612a3768af89f5a933324cd85fcf5430cd348e93

    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
        
        

    )
}

export default Signup

// <ProfileForm />