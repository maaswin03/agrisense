import React, { useEffect, useState } from 'react'
import '../CropAi/CropAi.css'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
// import potato from '../image/Home/Contactus/potato.jpeg'

function CropAi() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div>
            <Navbar />
            <div className='crop6'>
                <div className='crop7'>
                    <h1>Crop Assistant</h1>
                    <p>Empowering your farming decisions.</p>
                </div>
            </div>
            
            <div className='crop8'>
                <div className='crop9'>
                    <p>Filter</p>
                    <div className='crop10'>
                        <a href="">All</a>
                        <a href="">Vegetables</a>
                        <a href="">Fruits</a>
                        <a href="">Herbs</a>
                        <a href="">Flowers</a>
                        <a href="">Trees</a>
                        <a href="">Cacti</a>
                        <a href="">Succulents</a>
                        <a href="">Microgreens</a>
                    </div>
                </div>
            </div>

            <div className='crop1'>
                <div className='crop2'>
                    {data.map(item => (
                        <div className='crop3' key={item._id}>
                            <h2>{item.plant}</h2>
                            {/* <div className='crop5'>
                                <img src={potato} width='100%' />
                            </div> */}
                            <div className='crop4'>
                                <span style={{ fontWeight: '600' }}>Temperature: </span><span style={{ marginLeft: '5%' }}>{item.temprature} C</span><br></br>
                                <span style={{ fontWeight: '600' }}>Humidity: </span><span style={{ marginLeft: '5%' }}>{item.humidity} %</span><br></br>
                                <span style={{ fontWeight: '600' }}>Soil Moisture: </span><span style={{ marginLeft: '5%' }}>{item.soilmoisture} %</span><br></br>
                                <span style={{ fontWeight: '600' }}>Average Life Span: </span><span style={{ marginLeft: '5%' }}>{item.avglifespan} Months</span><br></br>
                                <p style={{textAlign:'justify'}}>{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div >
    )
}

export default CropAi