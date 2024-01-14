import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import "./navigation.css"


const Navigation = () => {

    const user = useSelector(state => state.session.user);

    const sessionLinks = user ? (
            <ProfileButton user={user} />
        ) : (
        <>
            <NavLink className='nav-link' to="/login">Log In</NavLink>
            <NavLink className='nav-link' to="/signup">Sign Up</NavLink>
        </>
    );

    return (
        <div className='navbar'>
            <div className='nav-container'>
                <NavLink className='nav-logo' to="/">
                    <h1>eventlite</h1>
                </NavLink>
                <div className='nav-menu'>
                    <NavLink className='nav-link' to='/'>Home</NavLink>
                    {sessionLinks}
                </div>
            </div>
        </div>
    );

}

export default Navigation