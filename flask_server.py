from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your Joblib model
model = load('urlmodel.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    url = data['url']  
    prediction = model.predict([url]) 
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)