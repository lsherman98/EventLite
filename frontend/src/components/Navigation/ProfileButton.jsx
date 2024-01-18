import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {logout} from "../../store/session"
import { Link } from "react-router-dom";


const ProfileButton = ({ user }) => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const dropdownRef = useRef(null);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
      <div className="dropdown-container" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
        <div className="profile-button"  >
          <img width="29" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a48746508d4d48e9f838d8_profile_12382840.png" alt="" />
          <div className="profile-button-text">{user.email}</div>
          <img width="33" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a48248987628aaabcd73cf_down.png" alt="" />
        </div>
        {showMenu && (
        <ul className="profile-dropdown" ref={dropdownRef}>
          <li className="dropdown-item">
            <Link to={`/profile`}>Go to Profile</Link>
          </li>
          <li className="dropdown-item">
            <p onClick={handleLogout}>Log Out</p>
          </li>
        </ul>
        )}
      </div>
  );
}

export default ProfileButton



