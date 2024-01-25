import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminShow.css"
import TicketIndexItem from "../Tickets/TicketIndexItem"
import { updateUser } from "../../store/session";



const AdminShow = () => {

    const user = useSelector(state => state.session.user) || null
    const tickets = user.tickets 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showProfileEdit, setShowProfileEdit] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)

    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [bio, setBio] = useState(user.bio || '')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (password !== confirmPassword) {
            setErrors(['passwords do not match'])
            return
        }

        const updatedUser = new FormData()
        updatedUser.append('id', user.id);
        updatedUser.append('user[username]', username);
        updatedUser.append('user[email]', email);
        updatedUser.append('user[bio]', bio);
        updatedUser.append('user[firstName]', firstName);
        updatedUser.append('user[lastName]', lastName);
        updatedUser.append('user[password]', password);


        if (photoFile) {
            updatedUser.append('user[photo]', photoFile);
        }


       return dispatch(updateUser(updatedUser))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                // else if (data) setErrors([data])
                return data
            })
            .then((data) => {
                if (data) {
                    setPhotoFile(null)
                    setShowProfileEdit(false)
                    
                }
            })
    }

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file)
    }

    const currentDate = new Date()

    const isUpcoming = (event) => {
        const eventDateTime = new Date(`${event.date}`);
        return eventDateTime > currentDate;
    };

    const futureEvents = tickets.filter(isUpcoming).slice(0, 3)
    const likes = user.likes.slice(0, 3)
    const events = user.events.slice(0, 3)


    return (
        <section className="admin-show-main">
            <div className="profile-details-header">
                <div className="profile-photo">
                    <img src={user.imageUrl} alt="" />
                </div>
                <div className="profile-details-text">
                    <h1>{user.username}</h1>
                    <p>{user.email}</p>
                   {user.bio &&  <p>{`"${user.bio}"`}</p>}
                    <button onClick={() => setShowProfileEdit(!showProfileEdit)}>Edit Profile</button>
                </div>
            </div>
            {showProfileEdit && <div className="edit-profile-form-div">
                <form className="edit-profile-form">
                    <input type="text" placeholder="First Name" value={firstName} onInput={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onInput={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder="Username" value={username} onInput={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onInput={(e) => setEmail(e.target.value)} />
                    <textarea placeholder="Bio" value={bio} onInput={(e) => setBio(e.target.value)} />
                    <input type="password" placeholder="New Password" onInput={(e) => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" onInput={(e) => setConfirmPassword(e.target.value)}/>
                     <label > Change your profile photo: <br />
                        <input type="file" onChange={handleFile}/>
                    </label>
                    <button type="submit" onClick={handleSubmit} >Update Profile</button>
                    <button type="submit" onClick={() => setShowProfileEdit(false)}>Cancel</button>
                </form>
                <div className="submit-errors">
                    {errors.map(error => <p key={error}>{error}</p>)}
                </div>
            </div>}
            <div className="profile-content-container">
                <div className="profile-module">
                    <Link to='/tickets'><h1>Tickets</h1></Link>
                    {!tickets && <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No upcoming orders</h1>
                        <Link to="/tickets">See Past Orders</Link>
                    </div>}
                    {tickets && <div>
                            {futureEvents.map(ticket => {
                                return <TicketIndexItem key={ticket.id} ticket={ticket}/>
                            })}
                            <Link to="/tickets">Show All Tickets</Link>
                        </div>}
                </div>
                <div className="profile-module">
                    <Link to='/likes'><h1>Likes</h1></Link>
                   { !likes && <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>You havent liked anything!</h1>
                    </div>}
                    {likes && <div>
                        {likes.map(ticket => {
                                return <TicketIndexItem key={ticket.id} ticket={ticket}/>
                            })}
                        <Link to="/likes">See All Your Likes</Link>
                    </div>}
                </div>
                <div className="profile-module">
                    <Link to='/myevents'><h1>My Events</h1></Link>
                   { !events && <div>
                        <img width="105" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>You havent created any events!</h1>
                    </div>}
                    {events && <div>
                        {events.map(ticket => {
                                return <TicketIndexItem key={ticket.id} ticket={ticket}/>
                            })}
                        <Link to="/events">Show All Events</Link> 
                    </div>}
                </div>

            </div>
        </section>
    )

}

export default AdminShow