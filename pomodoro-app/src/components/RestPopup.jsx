// import Button from '@mui/material/Button';
// import { useRecoilState } from 'recoil';
// import { isStartState, openRestPopup } from '../atoms/atom';

// const RestPopup = () => {
//   const svc = useService();

//   return (
//       <div style={{backgroundColor:'#fff', position:'absolute', top:'100px',width:'250px',left:'calc(50% - 125px)',padding:'20px'}}>
//           뽀모도로가 끝났습니다. <br/>휴식시간을 시작하겠습니까?
//           <div>
//             <Button 
//               variant="outlined"
//               onClick={() => {
//                 console.log("휴식없이 이어하기");
//                 svc.setIsStart(true);
//                 svc.setIsOpenRestPopup(false);}}
//             >휴식없이 이어하기</Button>
//             <Button variant="contained">휴식시작하기</Button>
//           </div>
//       </div>
//   )
// }

// const useService = () => {
//   const [isOpenRestPopup, setIsOpenRestPopup] = useRecoilState(openRestPopup);
//   const [isStart, setIsStart] = useRecoilState(isStartState);

//   return {
//     setIsOpenRestPopup,
//     setIsStart
//   }
// }


// export default RestPopup;