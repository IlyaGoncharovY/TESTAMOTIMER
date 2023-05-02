import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {animateTimer, setSeconds} from "../features/timer/timerSlice";

export const Timer = () => {

    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()
    const seconds = useAppSelector(state => state.timer.seconds)


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value.replace(/\D/g, ''));
    };

    const handleStartClick = () => {
        dispatch(setSeconds(Number(inputValue)));
        dispatch(animateTimer(Number(inputValue)));
        setInputValue('');
    };

    const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);

    return (
        <div>
            <input placeholder="Seconds" type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleStartClick}>Start</button>
            <br />
            <br />
            <span>{formattedTime}</span>
        </div>
    );
};

