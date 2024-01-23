import { useSelector } from "react-redux";
import "../Tickets/TicketsIndex.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TicketIndexItem from "../Tickets/TicketIndexItem";


const MyEvents = () => {
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
        tickets = user.events
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
                    <h1>MY UPCOMING <br />EVENTS</h1>
                    <p>Scroll down to view past events.</p>
                </div>
                <div className="tickets-container">
                  {futureTickets.map(ticket => {
                    return <TicketIndexItem key={ticket.id} ticket={ticket} />
                })}
                </div>
            </div>
            <div className="ticket-index-section">
                <div className="tickets-header">
                    <h1>MY PAST <br />EVENTS</h1>
                </div>
                <div className="tickets-container">
                  {pastTickets.map(ticket => {
                    return <TicketIndexItem key={ticket.id} ticket={ticket} />
                })}
                </div>
            </div>
        </section>
    )

}

export default MyEvents