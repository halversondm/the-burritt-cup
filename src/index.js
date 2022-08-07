import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-lora";
import "typeface-open-sans";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , document.getElementById('root'));
serviceWorker.register();
