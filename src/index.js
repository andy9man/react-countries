import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
} from 'react-router-dom';
import App from './App';
import './index.css';
import './ui-toolkit/css/nm-cx/main.css';

const Root = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));