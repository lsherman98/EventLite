import { Link } from "react-router-dom"



const LikesIndexItem = ({event}) => {

    
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="likes-event-component">
            <Link>
                <div className="likes-event-component-details">
                    <h2>{event.title.toUpperCase()}</h2>
                    <h3>{`${formattedDate}, ${event.start_time}`}</h3>
                    <p>{`${event.venue}, ${event.city}`}</p>
                    <p className="price">{`$${event.price}`}</p> 
                </div>
                <div className="likes-event-component-graphics">
                    <img className="likes-event-component-img" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                    <img className="likes-event-component-button" src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png" alt="" />
                </div>
            </Link>
        </div>  
    )
}

export default LikesIndexItem