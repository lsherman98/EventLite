import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import "./navigation.css"


const Navigation = () => {

    const user = useSelector(state => state.session.user);
    const navigate = useNavigate()

    const sessionLinks = user ? (
        <ProfileButton user={user} />
        ) : (
        <div className='nav-links'>
            <NavLink className='nav-link' to="/login">Log In</NavLink>
            <NavLink className='nav-link' to="/signup">Sign Up</NavLink>
        </div>
    );

    return (
        <div className='navbar'>
            <div className='nav-container'>
                <NavLink className='nav-logo' to="/">
                    <h1>EventLite</h1>
                </NavLink>
                <div className='nav-menu'>
                    <div className='nav-links'>
                        <NavLink className='nav-link' to='/events'>Find Events</NavLink>
                        <NavLink className='nav-link' to='/create'>Create Events</NavLink>
                    </div>
                    <div className='ticket-button' onClick={() => navigate('/tickets')}>
                        <img className="ticket-icon" width="30" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a482e8390d57d916c9f4e3_ticket.png" alt="" />
                        <p className='nav-link icon-p'>Tickets</p>
                    </div>
                    <div className='like-button' onClick={() => navigate('/likes')}>
                        <img width="30" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a481cfdc1efbe190066059_heart.png" alt="" />
                        <p className='nav-link icon-p'>Likes</p>
                    </div>
                    {sessionLinks}
                </div>
            </div>
        </div>
    );

}

export default Navigation