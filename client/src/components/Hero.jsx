import { Link } from "react-router-dom";

function Hero(){
    return(
        <section className="hero">
            <h1>Welcome to Yang's Site!</h1>
            <p>
                Just.........
                    Dig......
                        It...
            </p>
            <Link to="/board">
                <button className="hero-button">Leave a message</button>
            </Link>
        </section>
    )
}

export default Hero;