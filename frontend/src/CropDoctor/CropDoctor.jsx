import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../CropDoctor/CropDoctor.css'

function CropDoctor() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handlePredict = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting:', error);
        }
    };

    return (
        <div>
            <Navbar />

            <div className='cropdoc1'>
                <h1>Plant Disease Finder</h1>
                <input type="file" onChange={handleFileChange} /><br></br>
                <button onClick={handlePredict}>Predict</button>
                {prediction !== null && <p style={{color:"green",marginTop:'5%'}}>Prediction: The plant is good and its not affected by any dieseas {prediction}</p>}
            </div>
            <Footer />
        </div>
    );
}

export default CropDoctor;
