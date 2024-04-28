import React from 'react'
import Navbar from '../Components/Navbar'
import '../Dashboard/Dashboard.css'
import { useState, useEffect } from 'react';
import Footer from '../Components/Footer';

function Dashboard() {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/dashboard', { method: 'GET' });
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const difftemperature = (Number(sensorData.temperature) - Number(sensorData.temperature1));
  const diffhumidity = (Number(sensorData.humidity) - Number(sensorData.humidity1));
  const difflight = (Number(sensorData.light) - Number(sensorData.light1));
  const diffspeed = (Number(sensorData.speed) - Number(sensorData.speed1));

  const starttemperature = (Math.round(sensorData.temperature) - 3)
  const endtemperature = (Math.round(sensorData.temperature) + 3)

  const startspeed = (Math.round(sensorData.speed) - 3)
  const endspeed = (Math.round(sensorData.speed) + 3)

  const soil = (Number(sensorData.soil) / 1023) * 100
  const soil1 = (Number(sensorData.soil1) / 1023) * 100
  const soil2 = (Number(sensorData.soil2) / 1023) * 100
  const soil3 = (Number(sensorData.soil3) / 1023) * 100
  const soil4 = (Number(sensorData.soil4) / 1023) * 100
  const soil5 = (Number(sensorData.soil5) / 1023) * 100


  const diffsoil = (Number(soil) - Number(soil1));
  return (
    <div>
      <Navbar />

      <div className='dash1'>
        <h2>Dashboard</h2>
        <p>Real-time monitoring of your fields</p>
        <div className='dash2'>
          <div className='dash3'>
            <p>Temperature</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{sensorData.temperature} {'\u00B0'}C</p>
            {difftemperature >= 0 ? <p style={{ color: 'green' }}>+{difftemperature}%</p> : <p style={{ color: 'red' }}>{difftemperature}%</p>}
          </div>

          <div className='dash3'>
            <p>Humidity</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{sensorData.humidity} %</p>
            {diffhumidity >= 0 ? <p style={{ color: 'green' }}>+{diffhumidity}%</p> : <p style={{ color: 'red' }}>{diffhumidity}%</p>}
          </div>

          <div className='dash3'>
            <p>Light Intensity</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{sensorData.light} Lux</p>
            {difflight >= 0 ? <p style={{ color: 'green' }}>+{difflight}%</p> : <p style={{ color: 'red' }}>{difflight}%</p>}
          </div>

          <div className='dash3'>
            <p>Soil Moisture</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{soil} %</p>
            {diffsoil >= 0 ? <p style={{ color: 'green' }}>+{diffsoil}%</p> : <p style={{ color: 'red' }}>{diffsoil}%</p>}
          </div>

          <div className='dash3'>
            <p >Wind Speed</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{sensorData.speed} MPH</p>
            {diffspeed >= 0 ? <p style={{ color: 'green' }}>+{diffspeed}%</p> : <p style={{ color: 'red' }}>{diffspeed}%</p>}
          </div>
        </div>
      </div>


      <div className='dash4'>
        <h2>Current Location</h2>
        <p>Real-time location of your fields</p>
        <div className='dash5'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1333.0024694876488!2d77.69008893312672!3d12.938855184988514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1714217822268!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <div className='dash6'>
        <h2>Detailed Weather Report</h2>
        <p>Comprehensive weather information and forecasts</p>
        <div className='dash7'>
          <div className='dash8'>
            <p>Temperature Over Time</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{starttemperature}{'\u00B0'}C - {endtemperature}{'\u00B0'}C</p>
            <p style={{ color: '#4F7D96' }}>24 Hours</p>
          </div>
          <div className='dash8'>
            <p>Precipitation Over Time</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>0.5mm - 5mm</p>
            <p style={{ color: '#4F7D96' }}>24 Hours</p>
          </div>
          <div className='dash8'>
            <p>Wind Speed Over Time</p>
            <p style={{ fontSize: '20px', fontWeight: 'bolder' }}>{startspeed}MPH - {endspeed}MPH</p>
            <p style={{ color: '#4F7D96' }}>24 Hours</p>
          </div>

        </div>
      </div>



      <div className='dash9'>
        <div className='dash10'>
          <h2>Historical Data</h2>
          <div className='dash11'>
            <table className="historical-table">
              <tbody>
                <tr id="dash12">
                  <td>Date</td>
                  <td>Temperature</td>
                  <td>Humidity</td>
                  <td>Light Intensity</td>
                  <td>Soil Moisture</td>
                  <td>Wind Speed</td>
                </tr>

                <tr>
                  <td>{sensorData.time1}</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.temperature1} {'\u00B0'}C</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.humidity1} %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.light1}  Lux</td>
                  <td style={{ color: '#4F7D96' }}>{soil1}  %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.speed1} MPH</td>
                </tr>
                <tr>
                  <td>{sensorData.time2}</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.temperature2} {'\u00B0'}C</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.humidity2}  %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.light2}  Lux</td>
                  <td style={{ color: '#4F7D96' }}>{soil2} %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.speed2} MPH</td>
                </tr>
                <tr>
                  <td>{sensorData.time3}</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.temperature3} {'\u00B0'}C</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.humidity3}  %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.light3}  Lux</td>
                  <td style={{ color: '#4F7D96' }}>{soil3} %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.speed3} MPH</td>
                </tr>
                <tr>
                  <td>{sensorData.time4}</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.temperature4} {'\u00B0'}C</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.humidity4}  %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.light4}  Lux</td>
                  <td style={{ color: '#4F7D96' }}>{soil4} %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.speed4} MPH</td>
                </tr>
                <tr>
                  <td>{sensorData.time5}</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.temperature5} {'\u00B0'}C</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.humidity5}  %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.light5}  Lux</td>
                  <td style={{ color: '#4F7D96' }}>{soil5} %</td>
                  <td style={{ color: '#4F7D96' }}>{sensorData.speed5} MPH</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Dashboard