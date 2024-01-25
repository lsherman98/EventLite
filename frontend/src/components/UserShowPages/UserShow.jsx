import { useEffect, useState } from "react"
import { fetchUser } from "../../store/user"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./UserShow.css"
import UserShowEventItem from "./UserShowEventItem"




const UserShow = () => {

    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    const user = useSelector(state => state.profile.user) 

    const [showPast, setShowPast] = useState(false)
    const [showUpcoming, setShowUpcoming] = useState(true)
    

    let loading = true
    let events = []
    if (user) {
        loading = false
        events = user.events
    }
    

    const currentDate = new Date()

    const isUpcoming = (event) => {
        const eventDateTime = new Date(`${event.date}`);
        return eventDateTime > currentDate;
    };

    const isPast = (event) => {
        const eventDateTime = new Date(`${event.date}`);
        return eventDateTime < currentDate;
    };

    const futureEvents = events.filter(isUpcoming) 
    const pastEvents = events.filter(isPast)

    console.log(user.bio)

    if (loading) {
        return <h1></h1>
    } else {
        return (
            <>
                <section className="user-show-banner-main">
                    <div className="banner-image">
                        <img src={user.imageUrl} alt="" />
                    </div>
                    <div className="info-modal">
                        <div className="info-modal-content-parent">
                            <div className="info-modal-content">
                                <div className="info-modal-logo">
                                    <img src={user.imageUrl} alt="" />
                                </div>
                                <h1 className="info-modal-header">{user.fullName.toUpperCase()}</h1>
                                <div className="info-modal-contact-button">
                                    <Link to="">Contact</Link>
                                </div>
                                <div className="info-modal-total-events">
                                    <p><span>{user.totalEvents}</span><br/>Total Events</p>
                                </div>
                                <div className="info-modal-bio">
                                    <p>{user.bio}</p>
                                    <div className="social-media-icons">
                                        <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f9b4dab4f4c3ed66f_instagram.png" alt="" />
                                        <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f6a22911ef5bf43e0_world-wide-web.png" alt="" />
                                        <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f769713f93a03886d_facebook.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="user-show-events-main">
                    <div className="user-events-content">
                        <div className="user-events-header">
                            <h1>Events</h1>
                            <Link className={`user-events-button ${showUpcoming ? 'fill-blue' : '' }`} onClick={() => {
                                setShowUpcoming(true)
                                setShowPast(false)
                            }}>Upcoming</Link>
                            <Link className={`user-events-button ${!showUpcoming ? 'fill-blue' : '' }`} onClick={() => {
                                setShowUpcoming(false)
                                setShowPast(true)
                            }}>Past</Link>
                        </div>
                        <div className="user-events">
                            {showUpcoming ? futureEvents.map(event => {
                                return <UserShowEventItem key={event.id} event={event} />
                            }) : pastEvents.map(event => {
                                return <UserShowEventItem key={event.id} event={event} />
                            })}
                            {showUpcoming && !futureEvents.length > 0 ? <div className="user-show-no-events">
                                <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                                <h1>{`${user.fullName} has no upcoming events`}</h1>
                                </div> : ""}
                            {showPast && !pastEvents.length > 0 ? <div className="user-show-no-events">
                                <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                                <h1>{`${user.fullName} has no past events`}</h1>
                                </div> : ""}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default UserShow