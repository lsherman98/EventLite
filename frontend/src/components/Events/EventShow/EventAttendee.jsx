


const EventAttendee = ({attendee, price}) => {


    return (
        <div className="attendee-item">
            <h3>{attendee.fullName.toUpperCase()}</h3>
            <p>Email: {attendee.email}</p>
            <p>Tickets: {attendee.numTickets}</p>
            <p>Order Total: ${parseInt(attendee.numTickets) * price}</p>
        </div>
    )
}

export default EventAttendee