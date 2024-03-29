import { useSelector } from "react-redux";
import "./TicketsIndex.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TicketIndexItem from "./TicketIndexItem";


const TicketIndex = () => {
    const sessionUser = useSelector(state => state.session.user) 
    const navigate = useNavigate()


    useEffect(()=>{
        if (!sessionUser) navigate("/login");
        window.scrollTo(0, 0)
    }, [sessionUser, navigate]);

    const user = useSelector(state => {
        if (state.session) {
            return state.session.user
        } else {
            return null
        }
    })

    let tickets = []
    if (user) {
        tickets = user.tickets
    }

    const currentDate = new Date()

    const isUpcoming = (ticket) => {
        const ticketDateTime = new Date(ticket.date);
        return ticketDateTime > currentDate;
    };

    const isPast = (ticket) => {
        const ticketDateTime = new Date(ticket.date);
        return ticketDateTime < currentDate;
    };

    const futureTickets = tickets.filter(ticket => isUpcoming(ticket)) 
    const pastTickets = tickets.filter(ticket => isPast(ticket))




    return (
        <section>
            <div className="ticket-index-section">
                <div className="tickets-header">
                    <h1>UPCOMING <br />EVENTS</h1>
                    <p>Scroll down to view past events.</p>
                </div>
                <div className="tickets-container">
                  {futureTickets.length > 0 ? futureTickets.map(ticket => {
                    return <TicketIndexItem key={ticket.id} ticket={ticket} />
                }) : <div className="no-likes-content">
                        <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No Upcoming Events</h1>
                    </div>}
                </div>
            </div>
            <div className="ticket-index-section">
                <div className="tickets-header">
                    <h1>PAST <br />EVENTS</h1>
                </div>
                <div className="tickets-container">
                  {pastTickets.length > 0 ? pastTickets.map(ticket => {
                    return <TicketIndexItem key={ticket.id} ticket={ticket} />
                }) : <div className="no-likes-content">
                        <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>No Past Events</h1>
                    </div>}
                </div>
            </div>
        </section>
    )

}

export default TicketIndex