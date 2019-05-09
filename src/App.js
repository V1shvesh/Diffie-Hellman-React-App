import React, { useState } from 'react';
import './App.css';

function sanitizeInput(input) {
  return parseInt(input, 10);
}

function isPrime(num) {
  if(num % 2 === 0) return false;

  for(let i=3; i <= Math.sqrt(num); i+=2) {
    if(num%i===0) {
      return false;
    }
  }

  return true;
}

function App() {
  const [numA, setNumA] = useState(NaN);
  const [numB, setNumB] = useState(NaN);
  const [error, setError] = useState({
    hasOccured: false,
    message: '',
  });
  const [result, setResult] = useState({
    hasComputed: false,
    xa: 0,
    xb: 0,
    ya: 0,
    yb: 0,
    ha: 0,
    hb: 0,
  });

  const generateSharedKeys = (a, b) => {
    setResult({
      hasComputed: false,
      xa: 0,
      xb: 0,
      ya: 0,
      yb: 0,
      ha: 0,
      hb: 0,
    });
    setError({
      hasOccured: false,
      message: false,
    });
    try {
      if(!isPrime(a))
        throw Error('Num A is not a prime!');
      if(!isPrime(b))
        throw Error('Num B is not a prime!');
      
      const xa = Math.floor(Math.random()*b + 1);
      const xb = Math.floor(Math.random()*b + 1);

      const ya = Math.pow(a, xa) % b;
      const yb = Math.pow(a, xb) % b;

      const ha = Math.pow(yb, xa) % b;
      const hb = Math.pow(ya, xb) % b;

      setResult({
        hasComputed: true,
        xa,
        xb,
        ya,
        yb,
        ha,
        hb,
      });

    } catch (error) {
      setError({
        hasOccured: true,
        message: error.message,
      });
    }
  }

  return (
    <div className="App">
      <form id="form-input">
        <h1>Diffie Hellman <br/> Key Exchange</h1>
        <label htmlFor="input-num-1"> Num A
          <input
            id="input-num-a"
            type='text'
            value={isNaN(numA)?'':numA}
            onChange={(e) => setNumA(sanitizeInput(e.target.value))}
            placeholder={0}
          />
        </label>
        <label htmlFor="input-num-1"> Num B
          <input
            id="input-num-2"
            type='text'
            value={isNaN(numB)?'':numB}
            onChange={(e) => setNumB(sanitizeInput(e.target.value))}
            placeholder={0}
          />
        </label>
        <button
          className="btn btn-get-key"
          onClick={(e) => {
            e.preventDefault();
            generateSharedKeys(numA, numB);
          }}
        >
          Get Key
        </button>
      </form>
      {
        error.hasOccured && (
          <div className="error-box">
            {error.message}
          </div>
        )
      }
      {
        result.hasComputed && (
          <div className="result-box">
          <pre>{`Result\n\nha: ${result.ha}\nhb: ${result.hb}`}</pre>
          </div>
        )
      }
      <footer>Made by Rishav Chaudhary & Kabir Bhal</footer>
    </div>
  );
}

export default App;
