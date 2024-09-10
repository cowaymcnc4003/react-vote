import { Routes, Route } from 'react-router-dom';
import './App.css';
import VoteLogin from './pages/VoteLogin';
import NotPound from './pages/NotPound';
import Regist from './pages/Regist';
import VoteDetail from './pages/VoteDetail';
import VoteRegist from './pages/VoteRegist';
import VoteMain from './pages/VoteMain';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = '투표';  // 브라우저 탭 타이틀 변경
  }, []);  // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행
  return (
    <>
      <Routes>
        <Route path="/" element={<VoteLogin />} />
        <Route path="/login" element={<VoteLogin />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/voteMain" element={<VoteMain />} />
        <Route path="/votedetail" element={<VoteDetail />} />
        <Route path="/voteRegist" element={<VoteRegist />} />
        <Route path="*" element={<NotPound />} />
      </Routes>
    </>
  );
}

export default App;
