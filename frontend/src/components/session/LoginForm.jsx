import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from '../../store/session';
import {Link, useNavigate } from "react-router-dom"
import "./loginform.css"


const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [loggingIn, setLoggingIn] = useState(false)


    useEffect(()=>{
        if (sessionUser) navigate("/");
        window.scrollTo(0, 0)
    }, [sessionUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        setLoggingIn(true)
        return dispatch(sessionActions.login({credential, password}))
            .then((res) => {
                setLoggingIn(false)
                let data = res
                if (data?.errors) {
                    setErrors(data.errors)
                } else {
                    navigate(`/profile`)
                }
            })
            .catch(() => {
                setLoggingIn(false);
                setErrors(["An error occurred during login. Please try again."]);
        });
    }


    return (
        <div className="login-page">
            <div className="login-left">
                <div className="left-content">
                    {!loggingIn && <div>
                        <h1 className="login-heading">Log In</h1>
                    </div>}
                    <div className="login-form-container">
                        {loggingIn && 
                        <div className="index-loading-container">
                            <div className="index-loading-animation"></div>
                        </div>}
                        {!loggingIn && <form onSubmit={handleSubmit} className="login-form">
                            <div className="submit-errors">
                                    {errors.map(error => <p key={error}>{error}</p>)}
                            </div>

                            <input 
                                className="form-input"
                                placeholder="Email Address or Username"
                                maxLength="256"
                                name='Email'
                                type="text" 
                                value={credential} 
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />

                            <input 
                                className="form-input"
                                placeholder="Password"
                                maxLength="256"
                                name='Password'
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="login-buttons">
                                <input 
                                    type="submit"
                                    className="form-submit-button"
                                    value="Demo Login" 
                                    onClick={() => {
                                    setCredential('demo@user.io')
                                    setPassword('password')
                                }}
                                />

                            <input 
                                type="submit"
                                className="form-submit-button"
                                value="Login" 
                            />
                            </div>
                        </form>}
                    </div>
                    <Link to='/signup'>Sign Up</Link>
                </div>
            </div>
            <div className="login-right">

            </div>

        </div>
    )
}

export default LoginForm


