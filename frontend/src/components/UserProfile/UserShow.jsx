import { useEffect } from "react"
import { fetchUser } from "../../store/user"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"




const UserShow = () => {

    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    const user = useSelector(state => state.profile.user)


    return (
        <>
            <h1>User Show Page</h1>
            <p>{user ? user.username : "loading"}</p>
        </>
    )
}

export default UserShow