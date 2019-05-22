import * as React from 'react';
import './App.css';

import { Game } from '../Game';
import { Addcount } from '../Addcount';
import { Hello } from 'src/Hello';

export function App() {
    return (
        <div id="app">
            <Hello />

            <Game />

            <br />

            <br />
            
            <Addcount initCount={ 10 } />
        </div>
    )
}
