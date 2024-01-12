import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as sessionActions from '../../store/session';
import {useNavigate } from "react-router-dom"


const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])


    useEffect(()=>{
        if (sessionUser) navigate("/");
    }, [sessionUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        return dispatch(sessionActions.login({credential, password}))
            .then(async (res) => {
                let data = res
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data])
                else setErrors([res.statusText])
            })
    }


    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul >
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <label >Username or Email
                    <input 
                        type="text" 
                        value={credential} 
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>

                <label >Password
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button  type="submit">Log In</button>
            </form>
        </div>
    )
}

export default LoginForm