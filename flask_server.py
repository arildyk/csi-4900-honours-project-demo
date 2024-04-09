from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your Joblib model for url
model = load('urlmodel.joblib')
model_email = load('physhing.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    url = data['url']  
    prediction = model.predict([url]) 
    return jsonify({'prediction': prediction.tolist()})

@app.route('/predict-email', methods=['POST'])  # Nouveau point d'accès pour les textes
def predict_email():
    data = request.json
    text = data['text']  
    prediction = model_email.predict([text]) 
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)