import MainPage from "./pages/MainPage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <MainPage />
    </RecoilRoot>
  );
}

export default App;
