import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <footer>
      <p className="text-center font-bold font-Montserrat text-xs text-gray-400 pb-4">Created by <a href="https://github.com/mirkeishon" target='_blank' rel="noreferrer" className="text-gray-300 hover:text-gray-400">mirkeishon</a> - devChallenges.io</p>
    </footer>
  </React.StrictMode>,
  document.getElementById('root')
);