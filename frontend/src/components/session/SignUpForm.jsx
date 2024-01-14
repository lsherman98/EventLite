import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as sessionActions from '../../store/session';
import { Link } from "react-router-dom";


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
         <div className="login-page">
            <div className="signup-left">
                <div className="left-content">
                    <div className="login-headers">
                        <h3 className="login-logo">eventlite</h3>
                        <h1 className="login-heading">Sign Up</h1>
                    </div>
                    <div className="login-form-container">
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="submit-errors">
                                    {errors.map(error => <p key={error}>{error}</p>)}
                            </div>

                            <input 
                                className="form-input"
                                placeholder="Username"
                                maxLength="256"
                                name='username'
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="First Name"
                                maxLength="256"
                                name='first name'
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="Last Name"
                                maxLength="256"
                                name='last name'
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="Email Address"
                                maxLength="256"
                                name='email'
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="Password"
                                maxLength="256"
                                name='password'
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="Confirm Password"
                                maxLength="256"
                                name='confirm password'
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <div className="login-buttons">
                                <input 
                                    type="submit"
                                    className="signup-submit-button"
                                    value="Sign Up" 
                                />
                            </div>
                        </form>
                    </div>
                    <Link to='/login'>Log in</Link>
                </div>
            </div>
            <div className="login-right">

            </div>

        </div>
    )
}

export default SignUpForm



