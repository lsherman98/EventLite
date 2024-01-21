import { useEffect, useState } from "react"
import "./EventsIndex.css"
import { useDispatch, useSelector } from "react-redux"
import { addEvents, getEvents } from "../../../store/events"
import EventIndexListItem from "./EventIndexListItem"
import { useSearchParams } from "react-router-dom"


const EventsIndex = () => {
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const city = searchParams.get('city')

    const [dateFilter, setDateFilter] = useState('all')
    const [priceFilter, setPriceFilter] = useState('all')
    const [cityFilter, setCityFilter] = useState('all')

    const [allCategoriesChecked, setAllCategoriesChecked] = useState(true)
    const [hobbiesChecked, setHobbiesChecked] = useState(category === 'Hobbies' || false)
    const [nightLifeChecked, setNightLifeChecked] = useState(category === 'Night Life' || false)
    const [musicChecked, setMusicChecked] = useState(category === 'Music' || false)
    const [foodChecked, setFoodChecked] = useState(category === 'Food' || false)
    const [performingArtsChecked, setPerformingArtsChecked] = useState(category === 'Performing Arts' || false)

    const handleCheckAll = () => {
        if (allCategoriesChecked) {
            setAllCategoriesChecked(false)
        } else {
            setAllCategoriesChecked(true)
            setHobbiesChecked(false)
            setNightLifeChecked(false)
            setMusicChecked(false)
            setFoodChecked(false)
            setPerformingArtsChecked(false)
        }
    }

    if (!hobbiesChecked && !nightLifeChecked && !musicChecked && !foodChecked && !performingArtsChecked) {
         if (!allCategoriesChecked) {
            setAllCategoriesChecked(true)
         } 
    } else {
        if (allCategoriesChecked) {
            setAllCategoriesChecked(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        const cachedEvents = localStorage.getItem('cachedEvents') 
        if (cachedEvents) {
            const parsedEvents = JSON.parse(cachedEvents);
            dispatch(addEvents(parsedEvents));
        } else {
            dispatch(getEvents())
        }

        if (city) {
            setCityFilter(city)
        }
        setSearchParams({})
    }, [dispatch, city, setSearchParams])
    


    const events = useSelector(state => state.events)
    let filteredEvents = []
    if (events) {
         filteredEvents = Object.values(events)
            .filter((event) => {
                if (event.price > 0 && priceFilter === 'paid') {
                    return event
                } else if (event.price === 0 && priceFilter === 'free') {
                    return event
                } else if (priceFilter === 'all'){
                    return event
                }
            })
            .filter((event) => {
                if (allCategoriesChecked) {
                    return event
                } else if (event.category === 'Hobbies' && hobbiesChecked) {
                    return event
                } else if (event.category === 'Night Life' && nightLifeChecked) {
                    return event
                } else if (event.category === 'Music' && musicChecked) {
                    return event
                } else if (event.category === 'Food' && foodChecked) {
                    return event
                } else if (event.category === 'Performing arts' && performingArtsChecked) {
                    return event
                }
            })
            .filter((event) => {
                if (event.city === cityFilter || cityFilter === 'all') {
                    return event
                } 
            })
            .filter((event) => {
                const currentDate = new Date()
                const eventDate = new Date(event.date)

                switch (dateFilter) {
                    case 'today':
                        return eventDate.toDateString() === currentDate.toDateString()
                    case 'tomorrow': {
                        const tomorrow = new Date();
                        tomorrow.setDate(currentDate.getDate() + 1);
                        return eventDate.toDateString() === tomorrow.toDateString();
                    }
                    case 'weekend': {
                        const dayOfWeek = currentDate.getDay();
                        const daysUntilWeekend = dayOfWeek === 6 ? 0 : 6 - dayOfWeek;
                        const weekendStartDate = new Date(currentDate);
                        weekendStartDate.setDate(currentDate.getDate() + daysUntilWeekend);
                        const weekendEndDate = new Date(weekendStartDate);
                        weekendEndDate.setDate(weekendStartDate.getDate() + 1);
                        return (
                            eventDate >= weekendStartDate && eventDate < weekendEndDate
                        );
                    }
                    default: 
                        return event
                }
            })
        }
    


    return (
        <div className="events-index-main">
            <div className="events-index-left">
                <div className="events-index-headers">
                    <h1>Events in New York</h1>
                    <h4>Search for something you love or check out popular events in your area.</h4>
                </div>
                <div className="events-index-left-content">
                    <div className="events-index-filters">
                        <div>
                            <div>
                                <h4 className="form-heading">Date</h4>
                                <form className="filter-form" onChange={(e) => setDateFilter(e.target.value)}>
                                    <label className="form-label"><input defaultChecked className="form-input" type="radio" name="date" value="all" /><span className="label-span">Any Time</span></label>
                                    <label className="form-label"><input className="form-input" type="radio" name="date" value="today" /><span className="label-span">Today</span></label>
                                    <label className="form-label"><input className="form-input" type="radio" name="date" value="tomorrow" /><span className="label-span">Tomorrow</span></label>
                                    <label className="form-label"><input className="form-input" type="radio" name="date" value="weekend" /><span className="label-span">This Weekend</span></label>
                                    {/* <label className="form-label"><input className="form-input" type="radio" name="date" value="date" /><span className="label-span">Select Date</span></label> */}
                                </form>
                            </div>
                            <div>
                                <h4 className="form-heading">Category</h4>
                                <form className="filter-form">
                                    <label className="form-label"><input onChange={handleCheckAll} checked={allCategoriesChecked} className="form-input" type="checkbox" name="date" value="all" /><span className="label-span">All</span></label>
                                    <label className="form-label"><input onChange={() => setHobbiesChecked(!hobbiesChecked)} checked={hobbiesChecked} className="form-input" type="checkbox" name="date" value="Hobbies" /><span className="label-span">Hobbies</span></label>
                                    <label className="form-label"><input onChange={() => setNightLifeChecked(!nightLifeChecked)} checked={nightLifeChecked} className="form-input" type="checkbox" name="date" value="Night Life" /><span className="label-span">Night Life</span></label>
                                    <label className="form-label"><input onChange={() => setMusicChecked(!musicChecked)} checked={musicChecked} className="form-input" type="checkbox" name="date" value="Music" /><span className="label-span">Music</span></label>
                                    <label className="form-label"><input onChange={() => setFoodChecked(!foodChecked)} checked={foodChecked} className="form-input" type="checkbox" name="date" value="Food" /><span className="label-span">Food</span></label>
                                    <label className="form-label"><input onChange={() => setPerformingArtsChecked(!performingArtsChecked)} checked={performingArtsChecked} className="form-input" type="checkbox" name="date" value="Performing Arts" /><span className="label-span">Performing Arts</span></label>
                                </form>
                            </div>
                            <div>
                                <h4 className="form-heading">City</h4>
                                <form className="filter-form" onChange={e => setCityFilter(e.target.value)}>
                                    <label className="form-label"><input defaultChecked={cityFilter === 'all'} className="form-input" type="radio" name="date" value="all" /><span className="label-span">All Cities</span></label>
                                    <label className="form-label"><input defaultChecked={city === 'New York'} className="form-input" type="radio" name="date" value="New York" /><span className="label-span">New York</span></label>
                                    <label className="form-label"><input defaultChecked={city === 'Miami'} className="form-input" type="radio" name="date" value="Miami" /><span className="label-span">Miami</span></label>
                                    <label className="form-label"><input defaultChecked={city === 'Philadelphia'} className="form-input" type="radio" name="date" value="Philadelphia" /><span className="label-span">Philadelphia</span></label>
                                    <label className="form-label"><input defaultChecked={city === 'Seattle'} className="form-input" type="radio" name="date" value="Seattle" /><span className="label-span">Seattle</span></label>
                                    <label className="form-label"><input defaultChecked={city === 'Los Angeles'} className="form-input" type="radio" name="date" value="Los Angeles" /><span className="label-span">Los Angeles</span></label>
                                </form>
                            </div>
                            <div>
                                <h4 className="form-heading">Price</h4>
                                <form className="filter-form" onChange={(e) => setPriceFilter(e.target.value)}>
                                    <label className="form-label"><input defaultChecked className="form-input" type="radio" name="price" value="all" /><span className="label-span">All</span></label>
                                    <label className="form-label"><input className="form-input" type="radio" name="price" value="paid" /><span className="label-span">Paid</span></label>
                                    <label className="form-label"><input className="form-input" type="radio" name="price" value="free" /><span className="label-span">Free</span></label>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="events-index-list">
                        {filteredEvents.map((event) => {
                            return <EventIndexListItem key={event.id} event={event} />
                        })}
                    </div>
                </div>
            </div>

            <div className="events-index-right">
                <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6b25e5853c6c1789ba125_Screenshot%202024-01-16%20at%2011.44.03%E2%80%AFAM.png" alt="" />
            </div>
        </div>
    )
}

export default EventsIndex