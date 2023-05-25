import TimerDisplay from '../components/TimerDisplay';
import Timer from '../components/Timer';

const MainPage = () => {
    return (
        <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
            <TimerDisplay />
            <Timer />
        </div>
    )
};

export default MainPage;