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
        <div style={{backgroundColor:'rgb(0,30,60)', width:'100%', height:'100vh'}}>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/setting" element={<Setting />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
