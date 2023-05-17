import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const svc = useService();

    return (
        <div>
            <HomeIcon style={{cursor:'pointer'}} onClick={() => svc.navi(`/`)}/>
            <SettingsIcon style={{cursor:'pointer'}} onClick={() => svc.navi(`/setting`)}/>
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