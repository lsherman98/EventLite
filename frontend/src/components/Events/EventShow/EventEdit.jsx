import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateEvent } from "../../../store/events"
import "./EventShowGeneric.css"

const EventEdit = ({event, setShowEdit}) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch() 
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [venue, setVenue] = useState(event.venue)
    const [city, setCity] = useState(event.city)
    const [address, setAddress] = useState(event.address)
    const [price, setPrice] = useState(event.price)
    const [date, setDate] = useState(event.date)
    const [time, setTime] = useState(event.startTime)
    const [category, setCategory] = useState(event.category)
    const [adultsOnly, setAdultsOnly] = useState(event.ageLimit)
    const sessionUser = useSelector(state => state.session.user)
    
    console.log(event.adultsOnly)

    const handleUpdate = (e) => {
        e.preventDefault()
        

        const updatedEvent = {
            id: event.id,
            user_id: sessionUser.id,
            title: title,
            description: description,
            venue: venue,
            city: city,
            address: address,
            price: price,
            date: date,
            start_time: time,
            category: category,
            age_limit: adultsOnly
        }
        setShowEdit(false)

         

       return dispatch(updateEvent(updatedEvent))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
            })
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const todaysDate = getCurrentDate();

    return (
        <div className="edit-form-container">
            <form className="edit-form">
                <div className="create-form-left">
                    <input type="text" className="form-text-input" name="title" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/>
                    <input type="text" className="form-text-input" name="venue" placeholder="Venue" onChange={e => setVenue(e.target.value)} value={venue}/>
                    <input type="text" className="form-text-input" name="description" placeholder="description" onChange={e => setDescription(e.target.value)} value={description}/>
                    <select name="city" className="form-text-select" onChange={e => setCity(e.target.value)} value={city}>
                        <option className="create-select-option" disabled selected value="Select a city...">Select a city...</option>
                        <option className="create-select-option" value="New York">New York</option>
                        <option className="create-select-option" value="Miami">Miami</option>
                        <option className="create-select-option" value="Seattle">Seattle</option>
                        <option className="create-select-option" value="Philadelphia">Philadelphia</option>
                        <option className="create-select-option" value="Los Angeles">Los Angeles</option>
                    </select>
                    <input type="text" className="form-text-input" name="address" placeholder="Address" onChange={e => setAddress(e.target.value)} value={address}/>
                    <label className="form-checkbox"><input onChange={() => setAdultsOnly(!adultsOnly)} type="checkbox" name="21+" value={adultsOnly} checked={adultsOnly} /><span>Is this event 21+ only?</span></label>
                </div>
                <div className="create-form-right">
                    <input type="number" className="form-text-input" name="price" placeholder="Price" onChange={e => setPrice(e.target.value)} value={price}/>
                    <input className="form-text-input" type="date" name="date" min={todaysDate} onChange={e => setDate(e.target.value)} value={date}/>
                    <input className="form-text-input" type="time" name="start time" onChange={e => setTime(e.target.value)} value={time}/>
                    <select name="category" className="form-text-select" onChange={e => setCategory(e.target.value)} value={category}>
                        <option className="create-select-option" disabled selected value="Select a category...">Select a category...</option>
                        <option className="create-select-option" value="Hobbies">Hobbies</option>
                        <option className="create-select-option" value="Music">Music</option>
                        <option className="create-select-option" value="Night Life">Night Life</option>
                        <option className="create-select-option" value="Performing Arts">Performing Arts</option>
                        <option className="create-select-option" value="Food">Food</option>
                    </select>
                    <h1>image upload</h1>
                    <div className="event-edit-buttons">
                        <input className="event-edit-submit-button" type="button" value="Cancel"  onClick={() => setShowEdit(false)}/>
                        <input className="event-edit-submit-button" type="button" value="Update Event" onClick={handleUpdate} />
                    </div>
                </div>
                    <div className="submit-errors create-errors">
                        {errors.map(error => <p key={error}>{error}</p>)}
                    </div>
            </form>
        </div>      
    )
}


export default EventEdit