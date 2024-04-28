import React from 'react'
import '../Components/Footer.css'

function Footer() {
    return (
        <div>

            <div className='footer1'>

                <div className='footer2'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.180272162816!2d77.12239414566679!3d11.025097503934836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba855ca15937393%3A0xe2ac6fe418d48178!2ssulur!5e0!3m2!1sen!2sin!4v1711888718226!5m2!1sen!2sin"
                        width="100%" height="400"></iframe>
                </div>

                <div className='footer3'>
                    <div className='footer4'>
                        <h2>Contact Info</h2>
                        <p>For more information about RuralCare Hospital's services, please contact us at </p>
                        <div className='footer5'>
                            <span><i className="fa fa-phone" style={{ fontSize: '12px' }}></i></span><span style={{ marginLeft: '3%' }}><a href='tel:9876543210'>+91 98765 43210</a></span>
                        </div>
                        <div className='footer5'>
                            <span><i className="fa fa-envelope" style={{ fontSize: '10px' }}></i></span><span style={{ marginLeft: '3%' }}><a href='mailto:agrisense@gmai.com'>agrisense@gmail.com</a></span>
                        </div>
                    </div>

                    <div className='footer4'>
                        <h2 style={{ marginBottom: '3%' }}>Opening Hours</h2>
                        <p>Monday - Friday 06:00 AM - 10:00 PM</p>
                        <p>Saturday 09:00 AM - 08:00 PM</p>
                        <p>Sunday Closed</p>

                        <div className='footer6'>
                            <i className="fa fa-instagram" style={{fontSize:'24px'}}></i>
                            <i className="fa fa-facebook" style={{fontSize:'24px'}}></i>
                            <i className="fa fa-twitter" style={{fontSize:'24px'}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer