import { Link } from "react-router-dom"

const TicketIndexItem = ({ticket}) => {

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

    const regularTime = convertToRegularTime(ticket.startTime);
    
    const formattedDate = new Date(ticket.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' , year: 'numeric'});

    return (
            <div className="tickets-component">
                <Link to={`/events/${ticket.id}`}>
                    <div className="tickets-component-details">
                        <h2>{ticket.title.toUpperCase()}</h2>
                        <h3>{`${formattedDate}, ${regularTime}`}</h3>
                        <p>Organized by <Link to={`/users/${ticket.userId}`}>{ticket.organizer}</Link></p>
                        <p>{`${ticket.venue}, ${ticket.city}`}</p>
                        <p>{`Starts at $${ticket.price}`}     |     <span>{ticket.category}</span></p> 
                    </div>
                    <div className="tickets-component-graphics">
                        <img className="tickets-component-img" src={ticket.imageUrl} alt="" />
                        <img className="tickets-component-button" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png" alt="" />
                    </div>
                </Link>
            </div>  
    )
}

export default TicketIndexItem