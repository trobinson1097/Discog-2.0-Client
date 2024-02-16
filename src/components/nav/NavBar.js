import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link to="/" className="navbar-item">Discog 2.0</Link>
            </li>
            <li className="navbar__item">
            <Link to="/discogs/new" className="navbar-item">New Discog</Link>
            </li>
            <li className="navbar__item">
            <Link to="/discusers" className="navbar-item">Users</Link>
            </li>
            <li className="navbar__item">
            <Link to="/userdiscogs" className="navbar-item">My Collection</Link>
            </li>
            {/* <li className="navbar__item">
            <Link to="/events" className="navbar-item">Events</Link>
            </li>
            <li className="games/new">
                Navigation link
            </li> */}
            {
                (localStorage.getItem("disc_token") !== null) ?
                    <ul className="nav-item">
                        <button className="nav-button fakeLink"
                            onClick={() => {
                                localStorage.removeItem("disc_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </ul> :
                    <>
                        <ul className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </ul>
                        <ul className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </ul>
                    </>
            }        </ul>
    )
}
