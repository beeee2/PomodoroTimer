import Button from '@mui/material/Button';

const RestPopup = () => {
  return (
      <div style={{backgroundColor:'#fff', position:'absolute', top:'100px',width:'500px',left:'calc(50% - 250px)'}}>
          뽀모도로가 끝났습니다. 휴식시간을 시작하겠습니까?
          <Button variant="outlined">휴식없이 이어하기</Button>
          <Button variant="contained">휴식시작하기</Button>
      </div>
  )
}

export default RestPopup;