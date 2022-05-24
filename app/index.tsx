import React from 'react';
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MultipleExample } from './assignments/paint/MultipleExample';

const renderToApp = (application:React.FC) => render(application, document.getElementById('app'));

renderToApp((
  <React.StrictMode>
    <MultipleExample amount = {4}/>
  </React.StrictMode>)
);