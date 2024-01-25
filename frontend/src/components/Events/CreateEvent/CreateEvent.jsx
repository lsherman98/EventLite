import { useEffect, useState } from "react"
import "./CreateEvent.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createEvent } from "../../../store/events"


const CreateEvent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [venue, setVenue] = useState('')
    const [city, setCity] = useState()
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [category, setCategory] = useState()
    const [adultsOnly, setAdultsOnly] = useState(false)
    const [photoFile, setPhotoFile] = useState(null)

    const [errors, setErrors] = useState([])

    const sessionUser = useSelector(state => state.session.user)
    useEffect(()=>{
        if (!sessionUser) navigate("/login");
        window.scrollTo(0, 0)
    }, [sessionUser, navigate]);

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const todaysDate = getCurrentDate();

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newEvent = new FormData()

        newEvent.append('event[user_id]', sessionUser.id);
        newEvent.append('event[title]', title);
        newEvent.append('event[description]', description);
        newEvent.append('event[venue]', venue);
        newEvent.append('event[city]', city);
        newEvent.append('event[address]', address);
        newEvent.append('event[price]', price);
        newEvent.append('event[date]', date);
        newEvent.append('event[start_time]', time);
        newEvent.append('event[category]', category);
        newEvent.append('event[age_limit]', adultsOnly);

        if (photoFile) {
            newEvent.append('event[photo]', photoFile);
        }


       dispatch(createEvent(newEvent))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                // else setErrors([res.statusText])
                return data
            })
            .then((data) => {
                if (data) {
                    setPhotoFile(null)
                    navigate(`/events/${data.id}`)
                    navigate(`/profile`)
                }
            })
    }

    return (
        <section className="create-main-section">
            <div className="create-headers">
                <h1>Create an Event</h1>
                <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
            </div>
            <div className="create-form-container">

                <form className="create-event-form">
                    <div className="create-form-left">
                        <input type="text" className="form-text-input" name="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                        <input type="text" className="form-text-input" name="venue" placeholder="Venue" onChange={e => setVenue(e.target.value)}/>
                        <input type="text" className="form-text-input" name="description" placeholder="description" onChange={e => setDescription(e.target.value)} />
                        <select name="city" className="form-text-select" onChange={e => setCity(e.target.value)}>
                            <option className="create-select-option" disabled selected value="Select a city...">Select a city...</option>
                            <option className="create-select-option" value="New York">New York</option>
                            <option className="create-select-option" value="Miami">Miami</option>
                            <option className="create-select-option" value="Seattle">Seattle</option>
                            <option className="create-select-option" value="Philadelphia">Philadelphia</option>
                            <option className="create-select-option" value="Los Angeles">Los Angeles</option>
                        </select>
                        <input type="text" className="form-text-input" name="address" placeholder="Address" onChange={e => setAddress(e.target.value)}/>
                        <label className="form-checkbox"><input onChange={() => setAdultsOnly(!adultsOnly)} type="checkbox" name="21+"/><span>Is this event 21+ only?</span></label>
                    </div>
                    <div className="create-form-right">
                        <input type="number" className="form-text-input" name="price" placeholder="Price" onChange={e => setPrice(e.target.value)}/>
                        <input className="form-text-input" type="date" name="date" min={todaysDate} onChange={e => setDate(e.target.value)}/>
                        <input className="form-text-input" type="time" name="start time" onChange={e => setTime(e.target.value)}/>
                        <select name="category" className="form-text-select" onChange={e => setCategory(e.target.value)}>
                            <option className="create-select-option" disabled selected value="Select a category...">Select a category...</option>
                            <option className="create-select-option" value="Hobbies">Hobbies</option>
                            <option className="create-select-option" value="Music">Music</option>
                            <option className="create-select-option" value="Night Life">Night Life</option>
                            <option className="create-select-option" value="Performing Arts">Performing Arts</option>
                            <option className="create-select-option" value="Food">Food</option>
                        </select>
                        <label > Upload an event photo: <br />
                            <input type="file" onChange={handleFile}/>
                        </label>
                        <input className="event-create-submit-button" type="button" value="Create Your Event" onClick={handleSubmit}/>
                    </div>
                        <div className="submit-errors create-errors">
                            {errors.map((error, i) => <p key={i}>{error}</p>)}
                        </div>
                </form>
            </div>
        </section>
    )
}

export default CreateEvent