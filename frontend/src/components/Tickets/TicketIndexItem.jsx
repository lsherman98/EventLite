import { Link } from "react-router-dom"

const TicketIndexItem = ({ticket}) => {

    
    const formattedDate = new Date(ticket.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
            <div className="tickets-component">
                <Link>
                    <div className="tickets-component-details">
                        <h2>{ticket.title.toUpperCase()}</h2>
                        <h3>{`${formattedDate}, ${ticket.start_time}`}</h3>
                        <p>{`${ticket.venue}, ${ticket.city}`}</p>
                        <p className="price">{`$${ticket.price}`}</p> 
                    </div>
                    <div className="tickets-component-graphics">
                        <img className="tickets-component-img" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                        <img className="tickets-component-button" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png" alt="" />
                    </div>
                </Link>
            </div>  
    )
}

export default TicketIndexItem