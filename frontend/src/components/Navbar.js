import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useNewProfileContext } from '../hooks/useNewProfileContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const {newProfile, newDispatch} = useNewProfileContext()
    console.log(newProfile)

    const handleClick = async () => {
        await newDispatch({type: 'NOT_CREATED', payload: true})
        localStorage.setItem('created_profile?', JSON.stringify(false));
        logout()

    }


    return (
        <header>
            <div className="container">
                {newProfile && (
                    <Link to="/">
                        <h1>Roomer</h1>
                    </Link>
                )}
                {!newProfile && (
                    <h1>Roomer</h1>
                )}
                <nav>
                    {user && newProfile && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>


        </header>
    )
}

export default Navbar