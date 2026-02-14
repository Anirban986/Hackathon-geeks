import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='footer'>
        <div className='footer-top'>
            <div className='footer-col'>
                <h1>Simpligal</h1>
                <p className='footer-p'>Committed to upholding justice and serving the nation with integrity, transparency, and dedication.</p>
            </div>
            <div className="footer-col">
                <h1>Services</h1>
                <p>Case Status</p>
                <p>Document simplification</p>
                <p>Legal Resorces</p>
                <p>Admin Dashboard</p>
            </div>
             <div className="footer-col">
                <h1>Legal</h1>
                <p>Privacy policy</p>
                <p>Disclaimer</p>
                <p>Accessibility</p>
                <p>Disclaimer</p>
            </div>
            <div className="footer-col">
                <h1>Contact us</h1>
                <p>Linkedin</p>
                <p>Email</p>
                <p>Call us</p>
                <p>Twitter(X)</p>
            </div>
        </div>
        <hr  />
        <div className='footer-bottom'>
            <p>© 2026 Simpligal. Designed for equal justice</p>
        </div>
    </div>
  )
}

export default Footer