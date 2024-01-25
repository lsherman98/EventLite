import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./EventShowGeneric.css"
import { getEvent } from "../../../store/events"
import { like, register, registrationRefund, registrationUpdate, unLike } from "../../../store/session"
import EventAdminShow from "./EventAdminShow"


const EventGenericShow = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    
    
    const [showPurchase, setShowPurchase] = useState(false)
    const event = useSelector(state => state.events.event) || null
    
    const [loginMessage, setLoginMessage] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [updated, setUpdated] = useState(false)


    const sessionUser = useSelector(state => state.session.user)
    const likes = useMemo(() => sessionUser ? sessionUser.likes : null, [sessionUser]);
    const [registrationId, setRegistrationId] = useState(null)
    const [liked, setLiked] = useState(false)
    const [numLiked, setNumLiked] = useState()
    
    const [firstName, setFirstName] = useState(sessionUser ? sessionUser.firstName : '')
    const [lastName, setLastName] = useState(sessionUser ? sessionUser.lastName : '')
    const [email, setEmail] = useState(sessionUser ? sessionUser.email : '')
    const [quantity, setQuantity] = useState(1)
    
    useEffect(() => {
        dispatch(getEvent(eventId))
        .then((res) => {
            if (!res.ok) {
                navigate('/events')
            }
        })
    }, [dispatch, eventId, navigate])
    
    
    useEffect(() => {
        if (likes && event) {
            likes.forEach(like => {
                if (like.id === event.id) {
                    setLiked(true)
                    return
                }
            })
        }
    }, [likes, sessionUser, event])

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
                    setNumLiked(numLiked + 1)
                }
            })
         } else {
            dispatch(unLike(likeTarget))
                .then(res => {
                    if (res.ok) {
                        setLiked(false)
                        setNumLiked(numLiked - 1)
                    }
                })
         }
    }
    
    
    

    useEffect(() => {
        if (event) {
            setNumLiked(event.totalLikes)
        }
        if (event && sessionUser) {
            sessionUser.tickets.forEach (ticket => {
                if (ticket.id === event.id) {
                    setRegistered(true)
                    setRegistrationId(ticket.registrationId)
                    setQuantity(ticket.ticketAmount)
                    return
                }
            }) 
        } 
    }, [sessionUser, event])



    

 
    
    const handleCheckout = (e) => {
        e.preventDefault()

        setShowPurchase(false)
        
        const userId = sessionUser.id
        
        const registration = {
            user_id: userId,
            event_id: eventId,
            quantity: quantity
        }
        
        dispatch(register(registration))
        setRegistered(true)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        setShowPurchase(false)
        
        const userId = sessionUser.id
        
        const registration = {
            user_id: userId,
            event_id: eventId,
            quantity: quantity,
            id: registrationId
        }
        
        dispatch(registrationUpdate(registration))
        setUpdated(true)
    }

    const handleRefund = () => {
        dispatch(registrationRefund(registrationId))
        setRegistered(false)
        setRegistrationId(null)
        setQuantity(1)
        setShowPurchase(false)
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

 
    

    
    if (event) {
        const regularTime = convertToRegularTime(event.startTime);
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (sessionUser && event.userId === sessionUser.id) {
            return (
                <EventAdminShow event={event}/>
            )
        }
        return (
            <>
                <section className="event-show-main-section">
                    <div className="event-show-left">
                        <img src={event.imageUrl} alt="" />
                        <h1>{event.title.toUpperCase()}</h1>
                        <h2>{`${formattedDate}, ${regularTime}`}     |     <span className="event-show-category">{event.category}</span></h2>
                        <h3>Organized by <Link to={`/users/${event.userId}`}>{event.organizer}</Link><span className="adults-only"><span className="divider">     |     </span>{!event.ageLimit ? "This event is 21+" : ""}</span></h3>
                        <div className="event-show-total-likes"><img onClick={handleLike} className={`event-show-like-button ${liked ? 'event-liked' : ''}` } src={liked ? heartLiked : heartUnliked} alt="" /><span>{numLiked}</span></div>
                        <h4 className="location-heading">Location</h4>
                        <p className="location-text">{`${event.venue}`}</p>
                        <p className="location-text">{`${event.address}, ${event.city}`}</p>
                        <h4 className="location-heading">About this event</h4>
                        <p className="description-text">{event.description}</p>
                    </div>
                    <div className="event-show-right">
                        {registered && !updated && <h3 className="success-message">Visit your profile to see your tickets!</h3>}
                        {updated && <h3 className="success-message">Your order has been updated.</h3>}
                        {!showPurchase && <div className="purchase-div">
                            <h1>${event.price}</h1>
                            <div className="purchase-button" onClick={() => {
                                if (!sessionUser) {
                                    setLoginMessage(true)
                                } else {
                                    setShowPurchase(!showPurchase)
                                }
                                }}>{registered ? "Update Order" : "Tickets"}</div>
                           
                            {loginMessage && <p>Login to purchase tickets.</p>}
                            </div>
                        }
                        {showPurchase && (
                            <form className="purchase-form" onSubmit={registered ? handleUpdate : handleCheckout}>
                                <input required onInput={(e) => setFirstName(e.target.value)} className="purchase-form-input" type="text" placeholder="First Name" value={firstName}/>
                                <input required onInput={(e) => setLastName(e.target.value)} className="purchase-form-input" type="text" placeholder="Last Name" value={lastName}/>
                                <input required onInput={(e) => setEmail(e.target.value)} className="purchase-form-input" type="email" placeholder="Email" value={email}/>
                                <input required onChange={(e) => setQuantity(e.target.value)} className="purchase-form-input" type="number" value={quantity}  min='1' />
                                <p className="ticket-total">Total: ${event.price * quantity}</p>
                                <div className="purchase-buttons">
                                    <button type="submit" className="purchase-button" >{registered ? 'Update' : 'Checkout'}</button>
                                    <button className="purchase-button" onClick={() => {
                                        setShowPurchase(!showPurchase)
                                    }}>Cancel</button>
                                </div>
                                {registered && <div onClick={handleRefund} className="refund-button" >{"Request a Refund"}</div>}
                            </form>
                        )}
                    </div>
                </section>
            </>
        )
    }
}

export default EventGenericShow




             

     