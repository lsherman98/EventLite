import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { like, unLike } from "../../store/session";


const UserShowEventItem = ({event}) => {
    const sessionUser = useSelector(state => state.session.user)
    const likes = useMemo(() => sessionUser ? sessionUser.likes : null, [sessionUser]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (likes) {
            likes.forEach(like => {
                if (like.id === event.id) {
                    setLiked(true)
                    return
                }
            })
        }
    }, [likes, event.id])

    const heartLiked = "https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5cd622168466f53db2c17_heart.png"
    const heartUnliked = "https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png"

    const handleLike = (e) => {
        e.preventDefault()
         if (!sessionUser) navigate("/login")

          const likeTarget = {
                event_id: event.id,
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

    const regularTime = convertToRegularTime(event.startTime);


    const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'});

    return (
        <Link to={`/events/${event.id}`}>
            <div className="user-show-event-component">
                <img src={event.imageUrl} alt="" />
                <div className={`user-show-event-like-button ${liked ? 'event-liked' : ''}`}>
                    <img onClick={handleLike} src={liked ? heartLiked : heartUnliked} alt="" />
                </div>
                <div className="user-show-event-details">
                    <h2>{event.title.toUpperCase()}</h2>
                    <h3>{`${formattedDate}, ${regularTime}`}</h3>
                    <p>{`${event.venue}, ${event.city}`}</p>
                    <p>{`Starts at $${event.price}`}     |     <span>{event.category}</span></p>
                </div>
            </div>
        </Link>
    )
}

export default UserShowEventItem