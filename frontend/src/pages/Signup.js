import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
//import { useNavigate } from "react-router-dom"

// profile form
//import ProfileForm from '../components/ProfileForm'


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    //const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)

        // if(signup){
        //     navigate("/cp")
        // }

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