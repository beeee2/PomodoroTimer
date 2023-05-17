import MainPage from "./pages/MainPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil';
import Header from "./components/Header";
import Setting from "./components/Setting";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/setting" element={<Setting />}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
