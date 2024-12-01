import React from 'react';
import './css/Footer.css'

const Footer = () => {
    return (
        <>
        <footer>
            <div className="quick_links footr">
                <p>Quick Links</p>
                <a href="#">About us</a>
                <a href="#">Privacy Policy</a>
            </div>

            <div className="Social footr">
                <p>Follow Us</p>
                <a href="#">Youtube</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
            </div>

            <div className="Contact footr">
                <p>Contact Us</p>
                <a href="#">con@gmail.com</a>
                <a href="#">1234567890</a>
            </div>
        </footer>
        </>
    );
}

export default Footer;