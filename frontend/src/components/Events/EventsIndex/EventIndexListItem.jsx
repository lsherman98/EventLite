import { Link } from "react-router-dom";




const EventIndexListItem = ({ event }) => {

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <Link to={`/events/${event.id}`}>
            <div className="events-index-list-item">
                <img className="events-index-item-banner" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6b8425853c6c178a1ea62_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                <div className="events-index-item-details">
                    <h2>{event.title.toUpperCase()}</h2>
                    <h3>{`${formattedDate}, ${event.startTime}`}</h3>
                    <p>Organized by <Link to={`/users/${event.userId}`}>{event.organizer}</Link></p>
                    <p>{`${event.venue}, ${event.city}`}</p>
                    <p>{`Starts at $${event.price}`}     |     <span>{event.category}</span></p>
                </div>
                <img className="event-index-like-button" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png" alt="" />
            </div>
        </Link>
    )
}

export default EventIndexListItem

