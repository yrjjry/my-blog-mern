import { Link } from "react-router-dom";
import "../style/Footer.css";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-glow"></div>
            <div className="footer-container">
                <div className="footer-main">
                    {/* Logo / Brand */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">R.J. Yang</Link>
                        <p className="footer-motto">Dhrtarastra · Virudhaka · Virupaksa · Vaisravana</p>
                        <p className="footer-description">
                            Sit quietly. Do nothing. Spring comes, and the grass grows by itself.
                        </p>
                    </div>
                    {/* Navigation */}
                    <div className="footer-section">
                        <h3>Explore</h3>
                        <Link to="/">Home</Link>
                        <Link to="/create">Shop</Link>
                        <Link to="/about">Sitemap</Link>
                        <Link to="/about">Buy me a coffee</Link>
                    </div>
                    {/* Connect */}
                    <div className="footer-section">
                        <h3>Connect</h3>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://youtube.com/" target="_blank"rel="noopener noreferrer" >Youtube</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>rrjjyy@outlook.com</a>
                    </div>
                </div>
                {/* Zen line */}
                <div className="footer-zen">
                    <span></span>
                    <p>贪 · 嗔 · 痴</p>
                    <span></span>
                </div>
                {/* Bottom */}
                <div className="footer-bottom">
                    <span>© 5812 R.J. Yang</span>
                    <span>Built with Mud</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;