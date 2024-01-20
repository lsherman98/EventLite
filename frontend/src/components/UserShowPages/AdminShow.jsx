import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminShow.css"



const AdminShow = () => {

    const sessionUser = useSelector(state => state.session.user) || null
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionUser) {
            navigate("/")
        }
    }, [sessionUser, navigate])

    return (
        <section className="admin-show-main">
            <div className="profile-details-header">
                <div className="profile-photo">
                    <img width="60" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a2d8bbc25e810c66f601_profile.png" alt="" />
                </div>
                <div className="profile-details-text">
                    <h1>User Name</h1>
                    <p>num orders | num likes</p>
                </div>
            </div>
            <div className="profile-content-container">
                <div className="profile-module">
                    <h1>Tickets</h1>
                    <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No upcoming orders</h1>
                        <Link to="">See past orders</Link>
                    </div>
                </div>
                <div className="profile-module">
                    <h1>Likes</h1>
                    <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No upcoming orders</h1>
                        <Link to="">See past orders</Link>
                    </div>
                </div>
                <div className="profile-module">
                    <h1>My Events</h1>
                    <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No upcoming orders</h1>
                        <Link to="">See past orders</Link>
                    </div>
                </div>

            </div>
        </section>
    )

}

export default AdminShow