import { Link, useNavigate } from "react-router-dom";
import "./EventShowGeneric.css"
import EventAttendee from "./EventAttendee";
import { useEffect, useState } from "react";
import EventEdit from "./EventEdit";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../../store/events";

const EventAdminShow = ({event}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showEdit, setShowEdit] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleDelete = async () => {
        dispatch(deleteEvent(event.id))
         .then(() => {
            navigate('/profile')
          }
            )
        // localStorage.removeItem('cachedEvents')
    }

    function convertToRegularTime(time24) {
        const [hour, minute] = time24.split(':');
        const parsedHour = parseInt(hour, 10);
        let period = 'AM';
        let regularHour = parsedHour;
        if (parsedHour >= 12) {
            period = 'PM';
            if (parsedHour > 12) {
            regularHour = parsedHour - 12;
            }
        }
        return `${regularHour}:${minute} ${period}`;
    }

    const regularTime = convertToRegularTime(event.startTime);


    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <>
        <section className={`event-show-main-section ${showEdit ? 'blur' : ''}`}>
             <div className="event-show-left">
                <img src={event.imageUrl} alt="" />
                <h1>{event.title.toUpperCase()}</h1>
                <h2>{`${formattedDate}, ${regularTime}`}     |     <span className="event-show-category">{event.category}</span></h2>
                <h3>Organized by <Link to={`/users/${event.userId}`}>{event.organizer}</Link><span className="adults-only"><span className="divider">     |     </span>{event.ageLimit ? "This event is 21+" : ""}</span></h3>
                <div className="event-admin-show-total-likes"><span>{event.totalLikes}</span>Likes</div>
                <div className="admin-buttons">
                    <div className="admin-button" onClick={handleDelete}>Delete Event</div>
                    <div className="admin-button" onClick={() => setShowEdit(true)}>Edit Event</div>
                </div>
                <h4 className="location-heading">Location</h4>
                <p className="location-text">{`${event.venue}`}</p>
                <p className="location-text">{`${event.address}, ${event.city}`}</p>
                <h4 className="location-heading">About this event</h4>
                <p className="description-text">{event.description}</p>
            </div>
            <div className="admin-event-show-right">
                <div className="event-analytics">
                    <h1>Admin View</h1>
                    <p>TICKETS SOLD: {event.ticketsSold}</p>
                    <p>REVENUE: ${event.price * event.ticketsSold}</p>
                </div>
                <div className="attendees-list">
                    <h1>Orders</h1>
                    {event.attendees.map((user, i )=> {
                        return <EventAttendee key={i}  attendee={user} price={event.price}/>
                    })}
                </div>
            </div>
        </section>
        {showEdit &&  <EventEdit event={event} setShowEdit={setShowEdit} /> }
    </>
)   
}

export default EventAdminShow



