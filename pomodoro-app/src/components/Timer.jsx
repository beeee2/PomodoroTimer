import { useState } from 'react';
import { useEffect } from 'react';
import {useRecoilState} from 'recoil';
import { workMinuteState, workSecondState , perLoop, alarmState, isStartState, openRestPopup, workMinuteDisplayState, workSecondDisplayState, restState, restMinuteState, restSecondState, restMinuteDisplayState, restSecondDisplayState} from '../atoms/atom';
import styled from "styled-components";
import Button from '@mui/material/Button';
import axios from 'axios';


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

const RestPopup = () => {
    const svc = useService();

    return (
        <div style={{backgroundColor:'#fff', position:'absolute', top:'100px',width:'250px',left:'calc(50% - 125px)',padding:'20px'}}>
            {svc.isRestState ? 
                '휴식이 끝났습니다. 뽀모도로를 시작하겠습니까?'
                :
                '뽀모도로가 끝났습니다. 휴식시간을 시작하겠습니까?'
            }
            <div>
                {svc.isRestState ?
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => {
                                svc.setRestState(false);
                                svc.setIsStart(true);
                                svc.setIsOpenRestPopup(false);
                                svc.setWorkMinuteDisplay(svc.workMinute);
                                svc.setWorkSecondDisplay(svc.workSecond);
                            }}
                        >
                            타이머 시작
                        </Button>
                    </div>
                    :
                    <div>
                        <Button 
                            variant="outlined"
                            onClick={() => {
                                console.log("휴식없이 이어하기");
                                svc.setIsStart(true);
                                svc.setIsOpenRestPopup(false);
                                svc.setWorkMinuteDisplay(svc.workMinute);
                                svc.setWorkSecondDisplay(svc.workSecond);
                            }}
                        >
                            휴식없이 이어하기</Button>
                        <Button 
                            variant="contained"
                            
                            onClick={() => {
                                console.log("휴식하기");
                                svc.setRestState(true);
                                svc.setIsStart(false);
                                svc.setIsOpenRestPopup(false);
                                svc.setRestMinuteDisplayState(svc.restMinute);
                                svc.setRestSecondDisplayState(svc.restSecond);
                            }}
                        >휴식시작하기</Button>
                    </div>
                }
            </div>
        </div>
    )
  }

  

const Timer = () => {
    const svc = useService();

    return (
        <div>
            {svc.isOpenRestPopup ? 
                <div style={{position:'fixed',left:'0', top:'0',width:'100%',height:'100%',zIndex:'2',backgroundColor:'rgba(0,0,0,0.5)'}}><RestPopup /></div>
                : ''}
            <div>
                {svc.isRestState ? 
                    <div>
                        {padNumber(svc.restMinuteDisplay, 2)}:{padNumber(svc.restSecondDisplay, 2)}
                    </div>: 
                    <div>
                        {padNumber(svc.workMinuteDisplay, 2)}:{padNumber(svc.workSecondDisplay, 2)}
                    </div>
                }
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <Circle/>
                <div>{svc.loop}회</div>
            </div>
            <div>
                {svc.saying}
            </div>
            <div>
                {svc.isRestState ? '': <Button variant="contained" onClick={() => svc.setIsStart(false)}>일시정지</Button>}
                <Button variant="outlined"
                    onClick={() => {
                        svc.setMinuteState(0);
                        svc.setSecondState(0);
                        svc.setWorkMinuteDisplay(0);
                        svc.setWorkSecondDisplay(0);
                        svc.setRestMinuteState(0);
                        svc.setRestSecondState(0);
                        svc.setRestMinuteDisplayState(0);
                        svc.setRestSecondDisplayState(0);
                    }}
                >초기화</Button>
                {svc.isRestState ? '': <Button variant="contained" onClick={() => svc.setIsStart(true)}>시작하기</Button>}
            </div>
        </div>
    )
}

export const useService = () => {
    const [loop, setPerLoop] = useRecoilState(perLoop);
    const [alarm, setAlarm] = useRecoilState(alarmState);
    const [workMinute, setMinuteState] = useRecoilState(workMinuteState);
    const [workSecond, setSecondState] = useRecoilState(workSecondState);
    const [workMinuteDisplay, setWorkMinuteDisplay] = useRecoilState(workMinuteDisplayState);
    const [workSecondDisplay, setWorkSecondDisplay] = useRecoilState(workSecondDisplayState);
    const [restMinute, setRestMinuteState] = useRecoilState(restMinuteState);
    const [restSecond, setRestSecondState] = useRecoilState(restSecondState);
    const [restMinuteDisplay, setRestMinuteDisplayState] = useRecoilState(restMinuteDisplayState);
    const [restSecondDisplay, setRestSecondDisplayState] = useRecoilState(restSecondDisplayState);
    const [isRestState, setRestState] = useRecoilState(restState);
    const [isStart, setIsStart] = useRecoilState(isStartState);
    const [isOpenRestPopup, setIsOpenRestPopup] = useRecoilState(openRestPopup);
    const [saying, setSaying] = useState('');

    useEffect(()=>{
        if(isStart) {
            const countdown = setInterval(() => {
                if (workSecondDisplay > 0) {
                    setWorkSecondDisplay(workSecondDisplay - 1);
                }
                if (workSecondDisplay == 0) {
                    if (workMinuteDisplay == 0) {
                        if(loop == 0) {
                            return () => {clearInterval(countdown);}
                        }
                        clearInterval(countdown);
                        setIsOpenRestPopup(true);
                        setPerLoop(loop - 1);
                    } else {
                        setWorkMinuteDisplay(workMinuteDisplay - 1);
                        setWorkSecondDisplay(59);
                    }
                }
            }, 1000);
            return () => {clearInterval(countdown);}
        }
    }, [isStart, workSecondDisplay]);

    useEffect(()=>{
        if(isRestState) {
            const countdown2 = setInterval(() => {
                if (restSecondDisplay > 0) {
                    setRestSecondDisplayState(restSecondDisplay - 1);
                }
                if (restSecondDisplay == 0) {
                    if (restMinuteDisplay == 0) {
                        clearInterval(countdown2);
                        setIsOpenRestPopup(true);
                    } else {
                        setRestMinuteDisplayState(restMinuteDisplay - 1);
                        setRestSecondDisplayState(59);
                    }
                }
            }, 1000);
            return () => {clearInterval(countdown2);}
        }
    }, [isRestState, restSecondDisplay]);

    useEffect(()=> {
        axios.get('https://api.adviceslip.com/advice')
            .then((Response)=>{setSaying(Response.data.slip.advice)})
            .catch((Error)=>{console.log(Error)})
    }, [])

    return {
        saying,
        setSaying,
        setRestMinuteState,
        setRestSecondState,
        setRestMinuteDisplayState,
        setRestSecondDisplayState,
        restMinute,
        restSecond,
        restMinuteDisplay,
        restSecondDisplay,
        isRestState,
        setWorkMinuteDisplay,
        setWorkSecondDisplay,
        setMinuteState,
        setSecondState,
        loop,
        isStart,
        workMinute,
        workSecond,
        workMinuteDisplay,
        workSecondDisplay,
        setIsStart,
        isOpenRestPopup,
        setIsOpenRestPopup,
        setRestState
    };
}

export default Timer;