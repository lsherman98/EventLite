import "./homepage.css"
import {Link} from "react-router-dom"

const HomePage = () => {


    return (
        <div className="homepage">
            <img className="homepage-banner" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a04606f21bc0db02004a5d_Screenshot%202024-01-11%20at%202.48.03%E2%80%AFPM.png" alt="" />
            <h2 className="section-header">Explore Events by <span>Category</span></h2>
            <section className="category-links">
                <Link className="category-link-block" to='/events/?category=Hobbies'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a0458c5a70b7652739aa1d_joystick.png" alt="" />
                    <h3 className="category-link-heading">Hobbies</h3>
                </Link>
                <Link className="category-link-block" to='/events/?category=Night+Life'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a0458d00f472627a8da358_nightlife.png" alt="" />
                    <h3 className="category-link-heading">Night Life</h3>
                </Link>
                <Link className="category-link-block" to='/events/?category=Music'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a0458c91634306116a0b07_live-music.png" alt="" />
                    <h3 className="category-link-heading">Music</h3>
                </Link>
                <Link className="category-link-block" to='/events/?category=Food'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a0458c10036c2f9c565ea1_cooking.png" alt="" />
                    <h3 className="category-link-heading">Food</h3>
                </Link>
                <Link className="category-link-block" to='/events/?category=Performing+Arts'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a0458c7d3a4133751c3498_theatre.png" alt="" />
                    <h3 className="category-link-heading">Performing Arts</h3>
                </Link>
            </section>

            <h2 className="section-header">Explore Events by <span>City</span></h2>
            <section className="category-links">
                <Link className="category-link-block" to='/events/?city=New+York'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a46f493dc6f80f3604c17c_statue-of-liberty.png" alt="" />
                    <h3 className="category-link-heading">New York City</h3>
                </Link>
                <Link className="category-link-block" to='/events/?city=Miami'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a46f493dc6f80f3604c173_miami.png" alt="" />
                    <h3 className="category-link-heading">Miami</h3>
                </Link>
                <Link className="category-link-block" to='/events/?city=Seattle'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a46f49b60ce8ccb4a67ea6_seattle.png" alt="" />
                    <h3 className="category-link-heading">Seattle</h3>
                </Link>
                <Link className="category-link-block" to='/events/?city=Philadelphia'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a46f499a5e22222e4ef93f_philly.png" alt="" />
                    <h3 className="category-link-heading">Philadelphia</h3>
                </Link>
                <Link className="category-link-block" to='/events/?city=Los+Angeles'>
                    <img className="category-link-image" src="https://assets-global.website-files.com/65972da33a848ad8e00a649c/65a46f49fc7fdb5d37dd60e7_la.png" alt="" />
                    <h3 className="category-link-heading">Los Angeles</h3>
                </Link>
            </section>
        </div>
    )
}

export default HomePage