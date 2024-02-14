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


    if (loading) {
        return(
             <div className="index-loading-container">
                <div className="index-loading-animation"></div>
            </div>
            )
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
                                        <a href="https://www.linkedin.com/in/lsherman98/" target="_none"><i className="fa-brands fa-linkedin linkedin"></i></a>
                                        <a href="" target="_none"><i className="fa-solid fa-link website"></i></a>
                                        <a href="https://github.com/lsherman98" target="_none"><i className="fa-brands fa-github github"></i></a>
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