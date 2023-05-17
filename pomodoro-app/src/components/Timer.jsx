import { useState } from 'react';
import { useEffect } from 'react';
import {useRecoilState} from 'recoil';
import { workMinuteState, workSecondState , perLoop, alarmState, isStartState} from '../atoms/atom';
import styled from "styled-components";
import Button from '@mui/material/Button';
import RestPopup from './RestPopup';

const padNumber = (num, length) => {
    return String(num).padStart(length, '0');
}

const Circle = styled.div`
    width:10px;
    height:10px;
    border-radius:50%;
    background-color:#d9d9d9;
    margin-right:5px;
`;

const Timer = () => {
    const svc = useService();

    return (
        <div>
            {svc.isOpenRestPopup ? 
                        <div style={{position:'fixed',left:'0', top:'0',width:'100%',height:'100%',zIndex:'2',backgroundColor:'rgba(0,0,0,0.5)'}}><RestPopup /></div>
                        : ''}
            <div>
                {padNumber(svc.workMinuteDisplay, 2)}:{padNumber(svc.workSecondDisplay, 2)}
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <Circle/>
                <div>{svc.loop}회</div>
            </div>
            <div>
                <Button variant="contained" onClick={() => svc.setIsStart(false)}>일시정지</Button>
                <Button variant="outlined">초기화</Button>
                <Button variant="contained" onClick={() => svc.setIsStart(true)}>시작하기</Button>
            </div>
        </div>
    )
}

const useService = () => {
    const [loop, setPerLoop] = useRecoilState(perLoop);
    const [alarm, setAlarm] = useRecoilState(alarmState);
    const [workMinute, setMinuteState] = useRecoilState(workMinuteState);
    const [workSecond, setSecondState] = useRecoilState(workSecondState);
    const [workMinuteDisplay, setWorkMinuteDisplay] = useState(workMinute);
    const [workSecondDisplay, setWorkSecondDisplay] = useState(workSecond);
    const [isStart, setIsStart] = useRecoilState(isStartState);
    const [isOpenRestPopup, setIsOpenRestPopup] = useState(false);
        
    useEffect(()=>{
        if(isStart) {
            const countdown = setInterval(() => {
                if (workSecondDisplay > 0) {
                    setWorkSecondDisplay(workSecondDisplay - 1);
                }
                if (workSecondDisplay == 0) {
                    if (workMinuteDisplay == 0) {
                        clearInterval(countdown);
                        setIsOpenRestPopup(true);
                    } else {
                        setWorkMinuteDisplay(workMinuteDisplay - 1);
                        setWorkSecondDisplay(59);
                    }
                }
            }, 1000);
            return () => {clearInterval(countdown);}
        }
    }, [isStart, workSecondDisplay]);

    return {
        loop,
        isStart,
        workMinute,
        workSecond,
        workMinuteDisplay,
        workSecondDisplay,
        setIsStart,
        isOpenRestPopup
    };
}

export default Timer;