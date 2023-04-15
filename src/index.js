import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppPath from './AppPath';
import AppLoadingScene from './AppLoadingScene';
import { Leva } from 'leva';
import Cursor from './ChristmasCard/Cursor';
import AppProduct from './ProductConfigurator/AppProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProduct />
    <Leva/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
