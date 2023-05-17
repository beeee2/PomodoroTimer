import { useState } from 'react';
import { useEffect } from 'react';
import {useRecoilState} from 'recoil';
import { workMinuteState, workSecondState } from '../atoms/atom';

const padNumber = (num, length) => {
    return String(num).padStart(length, '0');
}

const circle = () => {}

const Timer = () => {
    const [minute, setMinuteState] = useRecoilState(workMinuteState);
    const [second, setSecondState] = useRecoilState(workSecondState);

    useEffect(()=>{
        const countdown = setInterval(() => {
            if (second > 0) {
                setSecondState(second - 1);
            }
            if (second === 0) {
                if (minute === 0) {
                    clearInterval(countdown);
                } else {
                    setMinuteState(minute - 1);
                    setSecondState(59);
                }
            }
        }, 1000);
        return () => {clearInterval(countdown);}
    }, [minute, second]);

    return (
        <div>
            <div>
                {padNumber(minute, 2)}:{padNumber(second, 2)}
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )
}

export default Timer;