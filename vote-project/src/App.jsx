import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import VoteLogin from './pages/VoteLogin';
import NotPound from './pages/NotPound';
import Regist from './pages/Regist';
import VoteDetail from './pages/VoteDetail';
import VoteRegist from './pages/VoteRegist';
import VoteMain from './pages/VoteMain';
import { useEffect } from 'react';
import ExampleComponent from './pages/ExampleComponent';
import { useVoteStore } from './store/voteStore';

function App() {
  const { token, userInfo } = useVoteStore();
  const nav = useNavigate();
  useEffect(() => {
    document.title = '투표';  // 브라우저 탭 타이틀 변경
    console.log('최초 확인');
    if (!userInfo.userSeq) {
      nav('/');
    }
  }, []);  // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행
  return (
    <>
      <div className="flex min-h-full min-w-full flex-1 flex-col justify-center">
        <Routes>
          <Route path="/" element={<VoteLogin />} />
          <Route path="/login" element={<VoteLogin />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/voteMain" element={<VoteMain />} />
          <Route path="/voteDetail/:voteId" element={<VoteDetail />} />
          <Route path="/voteRegist" element={<VoteRegist />} />
          <Route path="/testPage" element={<ExampleComponent />} />
          <Route path="*" element={<NotPound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
