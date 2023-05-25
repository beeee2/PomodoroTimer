import { workMinuteState, restMinuteState, perLoop, alarmState, workMinuteDisplayState, workSecondDisplayState, restMinuteDisplayState, restSecondDisplayState} from '../atoms/atom.js';
import {
    useRecoilState
  } from 'recoil';
const Setting = () => {
    const svc = useService();

    return (
        <div>
            뽀모도로 작업시간 
            <input onChange={svc.onWorkMinuteChange} value={svc.workMinute}/>
            뽀모도로 휴식시간 
            <input onChange={svc.onRestMinuteChange} value={svc.restMinute}/>
            뽀모도로 반복횟수
            <input onChange={svc.onPerLoopChange} value={svc.loop}/>
            {/* 뽀모도로 알람 
            <label htmlFor='inactiveAlarm'>무음</label>
            <input 
                type="radio" 
                id='inactiveAlarm'
                name='alramState'
                value='inactive'
                checked={svc.alarm === 'inactive'? true : false}
                onChange={svc.onAlarmChange}
            />
            <label htmlFor='inactiveAlarm'>소리</label>
            <input 
                type="radio" 
                id='inactiveAlarm'
                name='alramState'
                value='active'
                checked={svc.alarm === 'active'? true : false}
                onChange={svc.onAlarmChange}
            /> */}
        </div>
    )
}

const useService = () => {
    const [workMinute, setWorkMinute] = useRecoilState(workMinuteState);
    console.log(workMinute);
    const [restMinute, setRestMinute] = useRecoilState(restMinuteState);
    const [workMinuteDisplay, setWorkMinuteDisplay] = useRecoilState(workMinuteDisplayState);
    const [workSecondDisplay, setWorkSecondDisplay] = useRecoilState(workSecondDisplayState);
    const [restMinuteDisplay, setRestMinuteDisplayState] = useRecoilState(restMinuteDisplayState);
    const [restSecondDisplay, setRestSecondDisplayState] = useRecoilState(restSecondDisplayState);
    const [loop, setPerLoop] = useRecoilState(perLoop);
    const [alarm, setAlarm] = useRecoilState(alarmState);

    const onWorkMinuteChange = (e) => {
        setWorkMinute(e.target.value);
        setWorkMinuteDisplay(e.target.value);
        setWorkSecondDisplay(0);
    }
    const onRestMinuteChange = (e) => {
        setRestMinute(e.target.value);
        setRestMinuteDisplayState(e.target.value);
        setRestSecondDisplayState(0);
    }
    const onPerLoopChange = (e) => {
        setPerLoop(e.target.value);
    }
    const onAlarmChange = (e) => {
        setAlarm(e.target.value);
    }

    return {
        workMinute,
        restMinute,
        loop,
        alarm,
        onWorkMinuteChange,
        onRestMinuteChange,
        onPerLoopChange,
        onAlarmChange
    }
}

export default Setting;