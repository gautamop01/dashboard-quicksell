import React from 'react';
import ReactDOM from 'react-dom/client'; // using the client version of ReactDOM
import App from './App';
import "./Styles/main.css";

// here we are using the new experimental React feature called Concurrent Mode
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

