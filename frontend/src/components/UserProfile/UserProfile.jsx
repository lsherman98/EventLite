import { useSelector } from "react-redux"



const UserProfile = () => {

    const user = useSelector(state => state.session.user)

    return (
        <>
            <h1>Profile page</h1>
            <p>{user.username}</p>
        </>
    )

}

export default UserProfile