import { Link, useNavigate } from "react-router-dom"
import "./LikesIndex.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const LikesIndex = () => {
    const sessionUser = useSelector(state => state.session.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if (!sessionUser) navigate("/login");
    }, [sessionUser, navigate]);

    const likedEvents = useSelector(state => state.session.user.likes)

    return (
        <section>
            <div className="likes-content">
                <h1>Likes</h1>
                {likedEvents.map(event => {
                    return <h1>{event.title}</h1>
                })}
            </div>

        </section>
    )
}

export default LikesIndex