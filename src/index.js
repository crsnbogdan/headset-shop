import React from 'react';
import ReactDOM from 'react-dom/client';
import RouteSwitch from './Components/RouteSwitch';
import './Styles/Index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
