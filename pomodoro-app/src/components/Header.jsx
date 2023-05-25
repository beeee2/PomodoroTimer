import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const svc = useService();

    return (
        <div style={{padding:'40px'}}>
            <HomeIcon style={{cursor:'pointer', color:'#fff', marginRight:'10px'}} onClick={() => svc.navi(`/`)}/>
            <SettingsIcon style={{cursor:'pointer', color:'#fff'}} onClick={() => svc.navi(`/setting`)}/>
        </div>
    )
}

const useService = () => {
    const navi = useNavigate();

    return {
        navi
    }
}

export default Header;