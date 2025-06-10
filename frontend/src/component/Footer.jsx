import React from "react";
import "./Footer.css";
import { FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
      <div className="footer-container">
        <div className="footer-left">
          <h3>RS Enterprises Ro System</h3>
          <p>
            Shop No. 16/17 Rooprajat Park, Bldg. No. 3 Sector No. 1 Near HDFC
            Bank Opp. Tata Housing Boisar (E) Palghar - 401501
          </p>
        </div>

        <div className="footer-middle">
          <h4>Branches</h4>
          <p>Mira Road / Boisar / Palghar</p>
          <h4>GST IN: 27DMIPM7249N1Z7</h4>
          <h4>Director</h4>
          <p>Shani Maurya</p>
        </div>

        <div className="footer-right">
          <div className="contact-item">
            <FaPhoneAlt className="footer-icon" />
            <p>+91 9702398437</p>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="footer-icon" />
            <p>+91 8652352328</p>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="footer-icon" />
            <p>+91 8369472977</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="footer-icon" />
            <p>rs.enterprisesrosystem2014@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaInstagram className="footer-icon" />
            <p>@rs_enterprises15</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 RS Enterprises Ro System. All Rights Reserved.</p>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
