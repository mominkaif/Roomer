import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        let userCreated = await signup(email, password);

        if (userCreated) {
            navigate('/profile')
        }
    }

    return (
        <div className="form">
            <form className="signup" onSubmit={handleSubmit}>
                <h1>Roomer</h1>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Sign up</button>
                <p>
                    Already have an account: <a href="/login">login</a> here
                </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>

    )
}

export default Signup