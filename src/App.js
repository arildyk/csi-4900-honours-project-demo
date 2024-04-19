import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [predictionType, setPredictionType] = useState('url'); // 'url' ou 'email'

  const setPredictionAndClearInput = (type) => {
    setPredictionType(type);
    setInput(''); // Réinitialiser l'input lorsque le type de prédiction change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = predictionType === 'url' ? 'predict' : 'predict-email';
    const dataKey = predictionType === 'url' ? 'url' : 'text';

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [dataKey]: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <video autoPlay loop muted className="background-video">
        <source src="/vecteezy_artificiel-intelligence-cerveau-reseau-ai-ligne-circuit-la_21723029 .mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <header className="App-header">
          <h1>{predictionType.toUpperCase()} Prediction</h1>
          <div className="button-group">
            <button onClick={() => setPredictionAndClearInput('url')}>URL Prediction</button>
            <button onClick={() => setPredictionAndClearInput('email')}>Email Prediction</button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter ${predictionType}`}
            />
            <button type="submit" disabled={isLoading}>
              Predict
            </button>
          </form>
          {isLoading && <p>Loading...</p>}
          {prediction && <p>Prediction: {prediction}</p>}
          {error && <p>Error: {error}</p>}
        </header>
      </div>
    </div>
  );
}

export default App;
