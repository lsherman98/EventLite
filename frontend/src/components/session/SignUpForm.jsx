import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as sessionActions from '../../store/session';


const SignUpForm = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)


    useEffect(()=>{
        if (sessionUser) navigate("/");
    }, [sessionUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (password !== confirmPassword) {
            setErrors(['passwords do not match'])
            return
        }

        return dispatch(sessionActions.signup({username, email, firstName, lastName, password}))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
            })

    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} >
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label>Username
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                 <label>First Name
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>

                 <label>Last Name
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>

                <label>Email
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>                

                <label>Password
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <label>Confirm Password
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm