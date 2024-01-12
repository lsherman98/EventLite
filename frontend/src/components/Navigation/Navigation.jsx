import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';


const Navigation = () => {

    const user = useSelector(state => state.session.user);

    const sessionLinks = user ? (
        <>
            <li>
                <ProfileButton user={user} />
            </li>
        </>
        ) : (
        <>
            <li>
                <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </>
    );

    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {sessionLinks}
            </ul>
        </div>
    );

}

export default Navigation