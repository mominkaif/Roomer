import { Link, Navigate } from 'react-router-dom'

const Navbar = () => {
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Roomer</h1>
                </Link>
                <Link to="/Listings">
                    <h1>Listings</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar