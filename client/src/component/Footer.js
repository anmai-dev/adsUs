import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>24H-FB </h3>
                    <p>The world's leading sports information channel</p>
                </div>

                <div className="footer-section">
                    <h4>Contact information</h4>
                    <div className="contact-info">
                        <p><strong>Executive:</strong> </p>
                        <p><strong>Advertising contact:</strong> <a href="tel:0839592579"></a></p>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Follow us</h4>
                    <div className="social-links">
                        <a href="#" className="social-link">Facebook</a>
                        <a href="#" className="social-link">Youtube</a>
                        <a href="#" className="social-link">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 THETHAO24H. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 