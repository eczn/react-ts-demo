import * as React from "react";

export type GetInputWhenClickProps = React.PropsWithChildren<{
    className?: string;
    type?: string;
    onInput: (text: string) => void;
}>

export function GetInputWhenClick(props: GetInputWhenClickProps) {
    const $inputDom = React.createRef<HTMLInputElement>();

    const [showInput, setShowInput] = React.useState(false);

    const emitOnInput = () => {
        if ($inputDom.current) {
            props.onInput($inputDom.current.value);
            setShowInput(false);
        }
    }

    React.useEffect(() => {
        if (!$inputDom.current) return;
        const $input = $inputDom.current;

        console.log('$inputDom Created.');

        const whenBlur = () => {
            console.log('on blur');
            emitOnInput();
        }
        
        $input.addEventListener('blur', whenBlur);

        $input.focus();

        return () => {
            $input.removeEventListener('blur', whenBlur)
        }
    }, [ $inputDom ]);

    

    const input = (
        <div onClick={e => {
            e.stopPropagation();
        }} className={
            ['get-input', props.className || ''].join(' ')
        }>
            <input ref={ $inputDom }
                type={ props.type || 'text' } />

            <button onClick={ emitOnInput }>保存</button>
        </div>
    );
    
    return (
        <div className="get-input-main" onClick={e => {
            if (!showInput) setShowInput(true);
        }}>
            { showInput ? input : props.children }
        </div>
    )
}
