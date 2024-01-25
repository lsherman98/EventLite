import "./Footer.css"
import { Link } from "react-router-dom"



const Footer = () => {


    return (
        <section className="footer">
            <div className="footer-section">
                <h2 className="footer-heading">Navigation</h2>
                <Link to="/">Home</Link>
                <Link to="/events">Events</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="footer-section">
                <h2 className="footer-heading">Categories</h2>
                <Link to="/events/?category=Hobbies">Hobbies</Link>
                <Link to="/events/?category=Night+Life">Night Life</Link>
                <Link to="/events/?category=Music">Music</Link>
                <Link to="/events/?category=Food">Food</Link>
                <Link to="/events/?category=Performing+Arts">Performing Arts</Link>
            </div>
            <div className="footer-section">
                <h2 className="footer-heading">Cities</h2>
                <Link to="/events/?city=New+York">New York</Link>
                <Link to="/events/?city=Miami">Miami</Link>
                <Link to="/events/?city=Seattle">Seattle</Link>
                <Link to="/events/?city=Philadelphia">Philadelphia</Link>
                <Link to="/events/?city=Los+Angeles">Los Angeles</Link>
            </div>
            <div className="footer-section">
                <h2 className="footer-heading">Contact</h2>
                <a href="mailto:levisherman98@gmail.com">Email</a>
                <a href="https://github.com/lsherman98">GitHub</a>
                <a href="">LinkedIn</a>
            </div>


        </section>
    )
}


export default Footer