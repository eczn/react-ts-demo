import * as React from 'react';
const useState = React.useState;

export type AddCountProps = {
    initCount: number
}

export function Addcount(props: AddCountProps) {
    const [count, setCount] = useState(props.initCount);

    const countInc = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <p>You Click { count } times </p>
            <button onClick={ countInc }>Click Me !</button>
        </div>
    )
}

