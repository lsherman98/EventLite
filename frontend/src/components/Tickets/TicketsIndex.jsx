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
        tickets = user.likes
    }

    const currentDate = new Date()

    const isUpcoming = (ticket) => {
        const ticketDateTime = new Date(`${ticket.date} ${ticket.start_time}`);
        return ticketDateTime > currentDate;
    };

    const isPast = (ticket) => {
        const ticketDateTime = new Date(`${ticket.date} ${ticket.startTime}`);
        return ticketDateTime < currentDate;
    };

    const futureTickets = tickets.filter(isUpcoming) 
    const pastTickets = tickets.filter(isPast)


    return (
        <section>
            <div className="ticket-index-section">
                <div className="tickets-header">
                    <h1>UPCOMING <br />EVENTS</h1>
                </div>
                <div className="tickets-container">
                  {futureTickets.map(ticket => {
                    return <TicketIndexItem key={ticket.id} ticket={ticket} />
                })}
                </div>
            </div>
            <div className="ticket-index-section">
                <div className="tickets-header">
                    <h1>PAST <br />EVENTS</h1>
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

export default TicketIndex