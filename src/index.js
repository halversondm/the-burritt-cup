import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-lora";
import "typeface-open-sans";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
