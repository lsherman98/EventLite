import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateEvent } from "../../../store/events"
import "./EventShowGeneric.css"

const EventEdit = ({event, setShowEdit}) => {
    window.scrollTo(0, 0)

    const dispatch = useDispatch() 
    const [errors, setErrors] = useState([])
    const [photoFile, setPhotoFile] = useState(null)

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
    
    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file)
    }

    const handleUpdate = (e) => {
        e.preventDefault()


        const updatedEvent = new FormData()

        updatedEvent.append('id', event.id)
        updatedEvent.append('event[user_id]', sessionUser.id);
        updatedEvent.append('event[title]', title);
        updatedEvent.append('event[description]', description);
        updatedEvent.append('event[venue]', venue);
        updatedEvent.append('event[city]', city);
        updatedEvent.append('event[address]', address);
        updatedEvent.append('event[price]', price);
        updatedEvent.append('event[date]', date);
        updatedEvent.append('event[start_time]', time);
        updatedEvent.append('event[category]', category);
        updatedEvent.append('event[age_limit]', adultsOnly);

        if (photoFile) {
            updatedEvent.append('event[photo]', photoFile);
        }

        
        return dispatch(updateEvent(updatedEvent))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                return data
            })
            .then((data) => {
                if (data) {
                    setPhotoFile(null)
                    setShowEdit(false)
                }
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
                     <label > Update your event photo: <br />
                        <input type="file" onChange={handleFile}/>
                    </label>
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