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

                <nav>
                    {user && newProfile && (
                        <div className='nav-items-container'>
                            <Link to="/">
                                <img className="nav-img" src={require("../Images/logo.png")} alt="logo" />
                            </Link>
                            <div className='user-details'>
                                <span>{user.email}</span>
                                <button onClick={handleClick}>Log out</button>
                            </div>
                        </div>
                    )}
                </nav>
        </header>
    )
}

export default Navbar