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

    const [loading, setLoading] = useState(false)

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
    const events = useSelector(state => state.events)

    
    
    
    useEffect(() => {
        window.scrollTo(0, 0)
        // const cachedEvents = localStorage.getItem('cachedEvents') 
        const cachedEvents = null
        setLoading(true)
        // console.log('in use effect')
        if (cachedEvents) {
            // console.log('cached events exist')
            const cachedEventsArray = JSON.parse(cachedEvents);
            fetch(cachedEventsArray[0]['imageUrl'])
                .then(() => {
                        // console.log('links are still good')
                        dispatch(addEvents(cachedEventsArray))
                        setLoading(false)
                }).catch(() => {
                        // console.log('access denied')
                        localStorage.clear()
                        dispatch(getEvents())
                            .then(() => {
                                setLoading(false)
                            })
                    }) 
        } else {
            // console.log('cached events dont exist')
            dispatch(getEvents())
                .then(() => {
                    setLoading(false)
            })
    }

        if (city) {
            setCityFilter(city)
        }
        setSearchParams({})
    }, [city, dispatch, setSearchParams])
    


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


        let header = cityFilter
        
    


    return (
        <div className="events-index-main">
            <div className="events-index-left">
                <div className="events-index-headers">
                    <h1>{header === 'all' ? 'All Events' : `Events in ${header}`}</h1>
                    <h4>Search for something you love or check out popular events in your area.</h4>
                </div>
                <div className="events-index-left-content">
                    <div className="events-index-filters">
                        <div>
                            <div>
                                <h4 className="filter-form-heading">Date</h4>
                                <form className="filter-form" onChange={(e) => setDateFilter(e.target.value)}>
                                    <label className="filter-form-label"><input defaultChecked className="filter-form-input" type="radio" name="date" value="all" /><span className="filter-label-span">Any Time</span></label>
                                    <label className="filter-form-label"><input className="filter-form-input" type="radio" name="date" value="today" /><span className="filter-label-span">Today</span></label>
                                    <label className="filter-form-label"><input className="filter-form-input" type="radio" name="date" value="tomorrow" /><span className="filter-label-span">Tomorrow</span></label>
                                    <label className="filter-form-label"><input className="filter-form-input" type="radio" name="date" value="weekend" /><span className="filter-label-span">This Weekend</span></label>
                                    {/* <label className="filter-form-label"><input className="filter-form-input" type="radio" name="date" value="date" /><span className="filter-label-span">Select Date</span></label> */}
                                </form>
                            </div>
                            <div>
                                <h4 className="filter-form-heading">Category</h4>
                                <form className="filter-form">
                                    <label className="filter-form-label"><input onChange={handleCheckAll} checked={allCategoriesChecked} className="filter-form-input" type="checkbox" name="date" value="all" /><span className="filter-label-span">All</span></label>
                                    <label className="filter-form-label"><input onChange={() => setHobbiesChecked(!hobbiesChecked)} checked={hobbiesChecked} className="filter-form-input" type="checkbox" name="date" value="Hobbies" /><span className="filter-label-span">Hobbies</span></label>
                                    <label className="filter-form-label"><input onChange={() => setNightLifeChecked(!nightLifeChecked)} checked={nightLifeChecked} className="filter-form-input" type="checkbox" name="date" value="Night Life" /><span className="filter-label-span">Night Life</span></label>
                                    <label className="filter-form-label"><input onChange={() => setMusicChecked(!musicChecked)} checked={musicChecked} className="filter-form-input" type="checkbox" name="date" value="Music" /><span className="filter-label-span">Music</span></label>
                                    <label className="filter-form-label"><input onChange={() => setFoodChecked(!foodChecked)} checked={foodChecked} className="filter-form-input" type="checkbox" name="date" value="Food" /><span className="filter-label-span">Food</span></label>
                                    <label className="filter-form-label"><input onChange={() => setPerformingArtsChecked(!performingArtsChecked)} checked={performingArtsChecked} className="filter-form-input" type="checkbox" name="date" value="Performing Arts" /><span className="filter-label-span">Performing Arts</span></label>
                                </form>
                            </div>
                            <div>
                                <h4 className="filter-form-heading">City</h4>
                                <form className="filter-form" onChange={e => setCityFilter(e.target.value)}>
                                    <label className="filter-form-label"><input defaultChecked={cityFilter === 'all'} className="filter-form-input" type="radio" name="date" value="all" /><span className="filter-label-span">All Cities</span></label>
                                    <label className="filter-form-label"><input defaultChecked={city === 'New York'} className="filter-form-input" type="radio" name="date" value="New York" /><span className="filter-label-span">New York</span></label>
                                    <label className="filter-form-label"><input defaultChecked={city === 'Miami'} className="filter-form-input" type="radio" name="date" value="Miami" /><span className="filter-label-span">Miami</span></label>
                                    <label className="filter-form-label"><input defaultChecked={city === 'Philadelphia'} className="filter-form-input" type="radio" name="date" value="Philadelphia" /><span className="filter-label-span">Philadelphia</span></label>
                                    <label className="filter-form-label"><input defaultChecked={city === 'Seattle'} className="filter-form-input" type="radio" name="date" value="Seattle" /><span className="filter-label-span">Seattle</span></label>
                                    <label className="filter-form-label"><input defaultChecked={city === 'Los Angeles'} className="filter-form-input" type="radio" name="date" value="Los Angeles" /><span className="filter-label-span">Los Angeles</span></label>
                                </form>
                            </div>
                            <div>
                                <h4 className="filter-form-heading">Price</h4>
                                <form className="filter-form" onChange={(e) => setPriceFilter(e.target.value)}>
                                    <label className="filter-form-label"><input defaultChecked className="filter-form-input" type="radio" name="price" value="all" /><span className="filter-label-span">All</span></label>
                                    <label className="filter-form-label"><input className="filter-form-input" type="radio" name="price" value="paid" /><span className="filter-label-span">Paid</span></label>
                                    <label className="filter-form-label"><input className="filter-form-input" type="radio" name="price" value="free" /><span className="filter-label-span">Free</span></label>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="events-index-list">
                        {loading && 
                        <div className="index-loading-container">
                            <div className="index-loading-animation"></div>
                        </div>}


                        {filteredEvents.map((event) => {
                            return <EventIndexListItem key={event.id} event={event} />
                        })}
                    </div>
                </div>
            </div>

            <div className="events-index-right">
                <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6b25e5853c6c1789ba125_Screenshot%202024-01-16%20at%2011.44.03%E2%80%AFAM.png" alt="" />
                <div className="overlay-text">Coming Soon...</div>
            </div>
        </div>
    )
}

export default EventsIndex