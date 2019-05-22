import * as React from "react";

export type SquareProps = {
    value: string;
    onClick: () => void;
}

export function Square(props: SquareProps){ // 每一个小方格
    return (
        <button className='square' onClick={ props.onClick }>
            { props.value }
        </button>
    )
}
