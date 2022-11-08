import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
        logout()

        navigate("/")
    }


    return (
        <header>
            {user && (
                <div className="container">
                <Link to="/">
                    <h1>Roomer</h1>
                </Link>
                <Link to="/Listings">
                    <h1>Listings</h1>
                </Link>

                <nav>
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                </nav>
            </div>
            )}

            {!user && (
                <div className="container">
                    <Link to="/">
                        <h1>Roomer</h1>
                    </Link>

                    <nav>
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar