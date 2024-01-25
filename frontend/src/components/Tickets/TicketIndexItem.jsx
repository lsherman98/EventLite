import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { like, unLike } from "../../store/session"

const TicketIndexItem = ({ticket}) => {
    const sessionUser = useSelector(state => state.session.user)
    const likes = sessionUser.likes
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        likes.forEach(like => {
            if (like.id === ticket.id) {
                setLiked(true)
                return
            }
        })
    }, [likes, ticket.id])

    const heartLiked = "https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png"
    const heartUnliked = "https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png"

    const handleLike = (e) => {
        e.preventDefault()
         if (!sessionUser) navigate("/")

          const likeTarget = {
                event_id: ticket.id,
                user_id: sessionUser.id
            }

         if (!liked) {
            dispatch(like(likeTarget))
            .then(data => {
                if (data) {
                    setLiked(true)
                }
            })
         } else {
            dispatch(unLike(likeTarget))
                .then(res => {
                    if (res.ok) {
                        setLiked(false)
                    }
                })
         }
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
                        <img onClick={handleLike} className={`tickets-component-button ${liked ? 'event-liked' : ''}` } src={liked ? heartLiked : heartUnliked} alt="" />
                    </div>
                </Link>
            </div>  
    )
}

export default TicketIndexItem