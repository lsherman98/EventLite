import { Link } from "react-router-dom";


const UserShowEventItem = ({event}) => {

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'});

    return (
        <Link to={`/events/${event.id}`}>
            <div className="user-show-event-component">
                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                <div className="user-show-event-like-button">
                    <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                </div>
                <div className="user-show-event-details">
                    <h2>{event.title.toUpperCase()}</h2>
                    <h3>{`${formattedDate}, ${event.start_time}`}</h3>
                    <p>{`${event.venue}, ${event.city}`}</p>
                    <p>{`Starts at $${event.price}`}     |     <span>{event.category}</span></p>
                </div>
            </div>
        </Link>
    )
}

export default UserShowEventItem