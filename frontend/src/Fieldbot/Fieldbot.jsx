import React from 'react'
import '../Fieldbot/Fieldbot.css'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import image1 from '../Image/feildbot1.avif'

function Fieldbot() {
    return (
        <div>
            <Navbar />


            <div className='field1'>
                <div className='field2'>
                    <div className='field3' >
                        <div className='field4'>
                            <h1>Welcome to <span style={{ color: 'rgb(234,80,73)' }}>Field Bot</span></h1>
                            <p>Field Bot is your digital assistant for all things agriculture. Whether you're a seasoned farmer or just starting out, Field Bot is here to help you optimize your farming practices and maximize your yields.</p>
                            <button>Explore</button>
                        </div>
                    </div>
                    <div className='field3' style={{ justifyContent: 'end' }}>
                        <img src={image1} alt='farmer' />
                    </div>
                </div>
            </div>

            <div className='field6'>
                <div className='field5'>
                    <h2>Focusing on a future that’s better</h2>
                    <p>Focusing on a future that's better, AgriSense is at the forefront of revolutionizing agriculture. By harnessing advanced technologies, including AI-driven crop monitoring, disease detection, and yield optimization, we envision a sustainable tomorrow. Our goal is to empower farmers to make informed decisions, boost productivity, and play a vital role in ensuring global food security.</p>
                </div>
            </div>


            <div className='field7'>
                <h3>Field Bot: <span style={{ color: 'rgb(234,80,73)' }}>Your Smart</span> Agriculture <span style={{ color: 'rgb(46, 141, 78)' }}>Partner</span></h3>
                <div className='field8'>
                    <div className='field9' style={{ marginTop: '5%' }}>
                        <h2>Irrigation</h2>
                        <p>Last Irrigation : Yes</p>
                        <button type="submit">Check Irrigation</button>
                    </div>

                    <div className='field9' style={{ marginTop: '5%' }}>
                        <h2>Fire Detection</h2>
                        <p>Fire Check : Yes</p>
                        <button type="submit">Check Fire</button>
                    </div>

                    <div className='field9'>
                        <h2>Gas </h2>
                        <p>Gas Check : Yes</p>
                        <button type="submit">Check Gas</button>
                    </div>

                    <div className='field9'>
                        <h2>PH Value</h2>
                        <p>PH Value : 6.5</p>
                        <button type="submit">Check Ph Value</button>
                    </div>
                </div>
            </div>


            <div className='field10'>
                <div className='field11'>
                    <h2>How It Works</h2>
                    <p>Field Bot uses a network of sensors placed throughout your farm to collect real-time data. This data is then analyzed by Field Bot's intelligent algorithms, which provide you with actionable insights and alerts via a user-friendly dashboard.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Fieldbot