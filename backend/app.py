from flask import Flask, request, session , g , jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_session import Session
from flask_bcrypt import Bcrypt
from torchvision import models, transforms
from PIL import Image
import torch

import cv2
from pathlib import Path
from ultralytics import YOLO

# Load YOLO model
model = YOLO('yolov8n.pt')

dataset_dir = Path("animals")


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.secret_key = 'agirsenseisthebest'

num_classes = 10  # Assuming you have 10 classes (types of plant diseases)
model = models.resnet18(pretrained=True)
model.fc = torch.nn.Linear(model.fc.in_features, num_classes)
model.load_state_dict(torch.load('plant_disease_model_1_latest.pt', map_location=torch.device('cpu')))
model.eval()

MONGO_URI = "mongodb+srv://aswin2005:#Aswin2005@project.rddo8i4.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client.get_database("PROJECT")
collection = db.get_collection("Recieved_data")
collection1 = db.get_collection('Information')
collection2 = db.get_collection('Plant_information')


@app.route('/api/dashboard', methods=['GET'])
def data():
    if request.method == 'GET':
        device_id = 'ab01'
        if device_id:
            data = collection.find_one({"device_id": device_id})
            if data:
                return {"temperature": data["current_temperature"] ,"humidity": data["current_humidity"] , "light": data["current_light_intensity"] , "soil": data["current_soil_moisture"] , "speed": data["current_wind_speed"] , "time": data["current_time"] ,
                        "temperature1": data["previous_temperature"] ,"humidity1": data["previous_humidity"] , "light1": data["previous_light_intensity"] , "soil1": data["previous_soil_moisture"] , "speed1": data["previous_wind_speed"] , "time1": data["previous_time"] , 
                        "temperature2": data["previous1_temperature"] ,"humidity2": data["previous1_humidity"] , "light2": data["previous1_light_intensity"] , "soil2": data["previous1_soil_moisture"] , "speed2": data["previous1_wind_speed"] , "time2": data["previous1_time"] , 
                        "temperature3": data["previous2_temperature"] ,"humidity3": data["previous2_humidity"] , "light3": data["previous2_light_intensity"] , "soil3": data["previous2_soil_moisture"] , "speed3": data["previous2_wind_speed"] , "time3": data["previous2_time"] , 
                        "temperature4": data["previous3_temperature"] ,"humidity4": data["previous3_humidity"] , "light4": data["previous3_light_intensity"] , "soil4": data["previous3_soil_moisture"] , "speed4": data["previous3_wind_speed"] , "time4": data["previous3_time"] , 
                        "temperature5": data["previous4_temperature"] ,"humidity5": data["previous4_humidity"] , "light5": data["previous4_light_intensity"] , "soil5": data["previous4_soil_moisture"] , "speed5": data["previous4_wind_speed"] , "time5": data["previous4_time"] ,
                        "latitude": data["latitude"] , "longitude": data["longitude"]}
            else:
                return {"message": "data not found for this device_id"}, 404
        else:
            return {"message": "Device_id parameter is missing"}, 400
    else:
        return "Method not allowed", 405
    

@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(collection2.find())
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)



@app.route('/predict', methods=['POST'])
def predict():
    image_file = request.files['image']
    image = Image.open(image_file)
    image_tensor = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
        prediction = predicted.item()

    return jsonify({'prediction': prediction})
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)