import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./EventShowGeneric.css"
import { getEvent } from "../../../store/events"
import { register, registrationRefund, registrationUpdate } from "../../../store/session"
import EventAdminShow from "./EventAdminShow"


const EventGenericShow = () => {

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { eventId } = useParams()
    
    
    const [showPurchase, setShowPurchase] = useState(false)
    
    const [loginMessage, setLoginMessage] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [updated, setUpdated] = useState(false)


    const sessionUser = useSelector(state => state.session.user)
    const [registrationId, setRegistrationId] = useState(null)
    
    const [firstName, setFirstName] = useState(sessionUser ? sessionUser.firstName : '')
    const [lastName, setLastName] = useState(sessionUser ? sessionUser.lastName : '')
    const [email, setEmail] = useState(sessionUser ? sessionUser.email : '')
    const [quantity, setQuantity] = useState(1)


    
    
    const event = useSelector(state => state.events.event) 
    

    useEffect(() => {
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


    useEffect(() => {
        dispatch(getEvent(eventId))
            .then((res) => {
                if (!res.ok) {
                    navigate('/events')
                }
            })
    }, [dispatch, eventId, navigate])
    

 
    
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
                        <div className="event-show-total-likes"><span>{event.totalLikes}</span>Likes</div>
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




             

     