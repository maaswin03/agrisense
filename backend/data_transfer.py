from flask_cors import CORS
from flask import Flask, request, session , g , jsonify
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


MONGO_URI = "mongodb+srv://aswin2005:#Aswin2005@project.rddo8i4.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client.get_database("PROJECT")
collection = db.get_collection("Recieved_data")


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    device_id = data.get('device_id')
    temperature = data.get('temperature')
    humidity = data.get('humidity')
    light_intensity = data.get('light_intensity')
    soil_moisture = data.get('soil_moisture')
    wind_speed = data.get('wind_speed')
    current_time = "12-01-2024"
    latitude = "11.0182575"
    longitude = "77.118899"

    previous_data = collection.find_one({'device_id': device_id})

    new_data = {
        'device_id': device_id,
        'latitude' : latitude,
        'longitude' : longitude
    }

    if previous_data:
        new_data['previous_temperature'] = previous_data.get('current_temperature')
        new_data['previous_humidity'] = previous_data.get('current_humidity')
        new_data['previous_light_intensity'] = previous_data.get('current_light_intensity')
        new_data['previous_soil_moisture'] = previous_data.get('current_soil_moisture')
        new_data['previous_wind_speed'] = previous_data.get('current_wind_speed')
        new_data['previous_time'] = previous_data.get('current_time')

        new_data['previous1_temperature'] = previous_data.get('previous_temperature')
        new_data['previous1_humidity'] = previous_data.get('previous_humidity')
        new_data['previous1_light_intensity'] = previous_data.get('previous_light_intensity')
        new_data['previous1_soil_moisture'] = previous_data.get('previous_soil_moisture')
        new_data['previous1_wind_speed'] = previous_data.get('previous_wind_speed')
        new_data['previous1_time'] = previous_data.get('previous_time')
        
        new_data['previous2_temperature'] = previous_data.get('previous1_temperature')
        new_data['previous2_humidity'] = previous_data.get('previous1_humidity')
        new_data['previous2_light_intensity'] = previous_data.get('previous1_light_intensity')
        new_data['previous2_soil_moisture'] = previous_data.get('previous1_soil_moisture')
        new_data['previous2_wind_speed'] = previous_data.get('previous1_wind_speed')
        new_data['previous2_time'] = previous_data.get('previous1_time')

        new_data['previous3_temperature'] = previous_data.get('previous2_temperature')
        new_data['previous3_humidity'] = previous_data.get('previous2_humidity')
        new_data['previous3_light_intensity'] = previous_data.get('previous2_light_intensity')
        new_data['previous3_soil_moisture'] = previous_data.get('previous2_soil_moisture')
        new_data['previous3_wind_speed'] = previous_data.get('previous2_wind_speed')
        new_data['previous3_time'] = previous_data.get('previous2_time')

        new_data['previous4_temperature'] = previous_data.get('previous3_temperature')
        new_data['previous4_humidity'] = previous_data.get('previous3_humidity')
        new_data['previous4_light_intensity'] = previous_data.get('previous3_light_intensity')
        new_data['previous4_soil_moisture'] = previous_data.get('previous3_soil_moisture')
        new_data['previous4_wind_speed'] = previous_data.get('previous3_wind_speed')
        new_data['previous4_time'] = previous_data.get('previous3_time')

    new_data['current_temperature'] = temperature
    new_data['current_humidity'] = humidity
    new_data['current_light_intensity'] = light_intensity
    new_data['current_soil_moisture'] = soil_moisture
    new_data['current_wind_speed'] = wind_speed
    new_data['current_time'] = current_time

    result = collection.update_one({'device_id': device_id}, {'$set': new_data}, upsert=True)

    if result.acknowledged:
        if result.upserted_id:
            print(f"Document inserted with ID: {result.upserted_id}")
            return f"Document inserted with ID: {result.upserted_id}"
        else:
            print(f"Document updated for device ID: {device_id}")
            return f"Document updated for device ID: {device_id}"
    else:
        print("Failed to insert or update document")
        return "Failed to insert or update document"
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5600, debug=True)



