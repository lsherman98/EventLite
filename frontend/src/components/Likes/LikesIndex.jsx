import { useNavigate } from "react-router-dom"
import "./LikesIndex.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import LikesIndexItem from "./LikesIndexItem"

const LikesIndex = () => {
    const sessionUser = useSelector(state => state.session.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if (!sessionUser) navigate("/login");
    }, [sessionUser, navigate]);

    // let likedEvents = []
    // if (sessionUser) {
    //     likedEvents = useSelector(state => state.session.user.likes)
    // }

    const user = useSelector(state => {
        if (state.session) {
            return state.session.user
        } else {
            return null
        }
    })

    let likedEvents = []
    if (user) {
        likedEvents = user.likes
    }

    return (
        <section>
            <div className="likes-content">
                <h1>Likes</h1>
                {user && likedEvents.map(event => {
                    return <LikesIndexItem key={event.id} event={event} />
                })}
            </div>

        </section>
    )
}

export default LikesIndex