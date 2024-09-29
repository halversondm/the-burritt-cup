import "typeface-lora";
import "typeface-open-sans";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';

//import * as serviceWorker from "./service-worker.js";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<BrowserRouter><App/></BrowserRouter>);

//serviceWorker.register({});
