import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Genya from './routes';

function App () {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Genya />
            </BrowserRouter>

        </React.StrictMode>
    );
}

export default App;
