import { useState } from 'react';
import { useEffect } from 'react';
import {useRecoilState} from 'recoil';
import { workMinuteState,isStartState,workSecondDisplayState} from '../atoms/atom';

const TimerDisplay = () => {
    const svc = useService();

    return (
        <div>
            <div style={{ background: `conic-gradient(#f44 0% ${svc.percent}%, #f2f2f2 100% 100%)`,width:'500px',height:'500px',borderRadius:'50%' }} className="graph"></div>
        </div>
    )
}

export const useService = () => {
    const [workMinute, setMinuteState] = useRecoilState(workMinuteState);
    const [workSecondDisplay, setWorkSecondDisplay] = useRecoilState(workSecondDisplayState);
    const [isStart, setIsStart] = useRecoilState(isStartState);
    const [count, setCount] = useState(-1);
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        setPercent((count/(workMinute* 60)) * 100);
        setCount(count + 1);
    }, [isStart, workSecondDisplay]);

    return {
        percent,
        setPercent,
    };
}

export default TimerDisplay;