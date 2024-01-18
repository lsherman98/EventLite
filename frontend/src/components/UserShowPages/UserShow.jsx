import { useEffect } from "react"
import { fetchUser } from "../../store/user"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./UserShow.css"




const UserShow = () => {

    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [userId, dispatch])

    // const user = useSelector(state => state.profile.user)


    return (
        <>
            <section className="user-show-banner-main">
                <div className="banner-image">
                    <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5d09b804eeac962c5b687_https___cdn.evbuc.com_images_501367279_1440127062743_1_original.jpeg" alt="" />
                </div>
                <div className="info-modal">
                    <div className="info-modal-content-parent">
                        <div className="info-modal-content">
                            <div className="info-modal-logo">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5d09b804eeac962c5b687_https___cdn.evbuc.com_images_501367279_1440127062743_1_original.jpeg" alt="" />
                            </div>
                            <h1 className="info-modal-header">Expired Milk Comedy</h1>
                            <div className="info-modal-contact-button">
                                <Link to="">Contact</Link>
                            </div>
                            <div className="info-modal-total-events">
                                <p><span>12</span><br/>Total Events</p>
                            </div>
                            <div className="info-modal-bio">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
                                <div className="social-media-icons">
                                    <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f9b4dab4f4c3ed66f_instagram.png" alt="" />
                                    <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f6a22911ef5bf43e0_world-wide-web.png" alt="" />
                                    <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5f63f769713f93a03886d_facebook.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="user-show-events-main">
                <div className="user-events-content">
                    <div className="user-events-header">
                        <h1>Events</h1>
                        <Link className="user-events-button">Upcoming</Link>
                        <Link className="user-events-button">Past</Link>
                    </div>
                    <div className="user-events">
                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>

                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>


                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>


                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>




                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>



                        <div className="user-show-event-component">
                            <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a5fef5e8b13697aa53ee78_https___cdn.evbuc.com_images_646054859_1440127062743_1_original.jpeg" alt="" />
                            <div className="user-show-event-like-button">
                                <img src="https://assets-global.website-files.com/65a5cd622168466f53db2c04/65a69902acca43a0a41a7448_heart%20(1).png" alt="" />
                            </div>
                            <div className="user-show-event-details">
                                <h3>EXPIRED MILK COMEDY SHOW</h3>
                                <p>Thursday <strong>·</strong> 7:00 PM</p>
                                <p>Room52</p>
                                <p><strong>From $20.00</strong></p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default UserShow