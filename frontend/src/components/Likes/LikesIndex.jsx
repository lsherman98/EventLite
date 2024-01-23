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
        window.scrollTo(0, 0)
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
                {user && likedEvents.length > 0 ? likedEvents.map(event => {
                    return <LikesIndexItem key={event.id} event={event} />
                }) : <div className="no-likes-content">
                        <img src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a6a575f06c0b43840dd30e_ticket%20(1).png" alt="" />
                        <h1>You havent liked anything!</h1>
                    </div>}
            </div>

        </section>
    )
}

export default LikesIndex