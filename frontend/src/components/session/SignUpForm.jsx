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
    const [photoFile, setPhotoFile] = useState(null)

    useEffect(()=>{
        if (sessionUser) navigate("/");
        window.scrollTo(0, 0)
    }, [sessionUser, navigate]);

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        if (password !== confirmPassword) {
            setErrors(['passwords do not match'])
            return
        }

        const newUser = new FormData()
        newUser.append('user[username]', username);
        newUser.append('user[email]', email);
        newUser.append('user[firstName]', firstName);
        newUser.append('user[lastName]', lastName);
        newUser.append('user[password]', password);

        if (photoFile) {
            newUser.append('user[photo]', photoFile);
        }

        return dispatch(sessionActions.signup(newUser))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
                return data
            })
            .then((data) => {
                if (data) {
                    setPhotoFile(null)
                    navigate(`/users/${data.user.id}`)
                }
            })

    }

    return (
         <div className="login-page">
            <div className="signup-left">
                <div className="left-content">
                    <div className="signup-headers">
                        {/* <h3 className="login-logo">eventlite</h3> */}
                        <h1 className="signup-heading">Sign Up</h1>
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

                            <label > Upload a profile photo: <br />
                                <input type="file" onChange={handleFile} className="image-upload"/>
                            </label>

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
            <div className="signup-right">

            </div>

        </div>
    )
}

export default SignUpForm



