import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNewProfileContext } from '../hooks/useNewProfileContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const { newDispatch } = useNewProfileContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let userCreated = await login(email, password)
        if (userCreated) {
            await newDispatch({ type: 'CREATED_PROFILE', payload: true })
            localStorage.setItem('created_profile?', JSON.stringify(true))
        }
    }

    return (
        <div className="form">
            <form className="login" onSubmit={handleSubmit}>
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

                <button disabled={isLoading}>Log in</button>
                <p>
                    Don't have an account: <a href="/signup">signup</a> here
                </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>



    )
}

export default Login