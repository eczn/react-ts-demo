import * as React from "react";
import './game.css';
import { calculateWinner } from "./calculateWinner";
import { Board } from "./Board";

export type GameHistory = {
    squares: string[]
}

export function Game() {
    // Init State
    const _INIT_HISTORY_ = [{ squares: Array(9).fill(null) }];

    // UseState
    const [history, setHistory] =
        React.useState(_INIT_HISTORY_ as GameHistory[]);
    
    // UseState
    const [xIsNext, setXIsNext] = React.useState(true);

    // UseState
    const [stepNumber, setStepNumber] = React.useState(0);

    // 跳转事件，这个函数不改变历史
    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
    
    // 具体每个格子点击事件，会更新所有信息
    const handleClick = (i: number) => {        
        // 走过的路径
        const $history = history.slice(0, stepNumber + 1); 

        // 当前路径
        const cur = $history[$history.length - 1]; 

        // 当前路径数值集合
        const squares = cur.squares.slice(); 

        // 如果出了winner或者该格被点过
        if ( calculateWinner(squares) || squares[i]){ 
            return;
        } else {
            // 下一步轮到谁
            squares[i] = xIsNext ? 'X' : 'O';

            // Update State 
            setHistory($history.concat({ squares }));
            setStepNumber($history.length);
            setXIsNext(!xIsNext);
        }
    }

    // 如果触发了jumpTo，当前记录的最新历史会根据jumpTo改变的stepNumber变化
    const cur = history[stepNumber]; 

    // 结出冠军
    const winner = calculateWinner(cur.squares) 

    return (
        <div className='game'>
            {/* { JSON.stringify(cur) } for debug */}
            <p>井字棋</p>

            <div className='game-board'>
                <Board
                    squares={ cur.squares }
                    onClick={ handleClick }
                />
            </div>

            <div className='game-info'>
                <div>{
                    // Winner Info
                    winner ?
                        `Winner: ${ winner }` : 
                        'Next player: ' + (xIsNext ? 'X': 'O')
                }</div>

                <ol>{
                    // History Moves 
                    history.map((s, m) => { 
                        const desc = m ? 
                            'Go to move #' + m :
                            'Go to game start';
                        return (
                            <li key={m}>
                                <button onClick={()=> jumpTo(m)}>
                                    {desc}
                                </button>
                            </li>
                        )
                    })
                }</ol>
            </div>
        </div>
    )
}

