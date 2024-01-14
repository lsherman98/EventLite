import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";



const UserProfile = () => {

    const sessionUser = useSelector(state => state.session.user) || null
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionUser) {
            navigate("/")
        }
    }, [sessionUser, navigate])

    return (
        <>
            <h1>Profile page</h1>
            <p>{sessionUser ? sessionUser.username : ''}</p>
        </>
    )

}

export default UserProfile