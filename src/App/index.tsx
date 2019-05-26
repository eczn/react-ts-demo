import * as React from "react";
import './App.css';

import { Game } from '../Game';
import { Addcount } from '../Addcount';
import { Hello } from '../Hello';
import { Todo } from '../Todo';

export function App() {
    return (
        <div id="app">
            <Hello />

            <Game />

            <br />

            <br />
            
            <Addcount initCount={ 10 } />

            <br />

            <br />

            <Todo />
        </div>
    )
}
