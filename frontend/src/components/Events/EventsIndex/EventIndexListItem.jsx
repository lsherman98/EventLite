



const EventIndexListItem = ({ event }) => {

    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="events-index-list-item">
            <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6b8425853c6c178a1ea62_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
            <div>
                <h4>{event.title.toUpperCase()}</h4>
                <p>{`${formattedDate}, ${event.startTime}`}</p>
                <p>{`${event.venue}, ${event.city}`}</p>
                <p>{`Category: ${event.category}`}</p>
                <p>{`Starts at $${event.price}`}</p>
            </div>
        </div>
    )
}

export default EventIndexListItem

