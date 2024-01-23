import { Link } from "react-router-dom";




const EventIndexListItem = ({ event }) => {


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
        <Link to={`/events/${event.id}`}>
            <div className="events-index-list-item">
                <img className="events-index-item-banner" src={event.imageUrl} alt="" />
                <div className="events-index-item-details">
                    <h2>{event.title.toUpperCase()}</h2>
                    <h3>{`${formattedDate}, ${regularTime}`}</h3>
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

