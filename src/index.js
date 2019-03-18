import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-lora";
import "typeface-open-sans";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as $ from 'jquery';
import * as magnificPopup from 'magnific-popup';
import 'magnific-popup/dist/magnific-popup.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

$(document).ready(function($) {
    if (typeof $().magnificPopup === 'function') {
        // Initialize and Configure Magnific Popup Lightbox Plugin
        $('.location-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: 'title'
                }
            });
        });
    }
});
