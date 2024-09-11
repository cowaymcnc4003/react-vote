import { useNavigate } from "react-router-dom";
import { useVoteStore } from "../../store/voteStore";
import { useEffect } from "react";

const VoteListForm = () => {
  const nav = useNavigate();
  const onClickNavigateHandler = (e) => {
    e.stopPropagation();
    const navigatePath = e.target.getAttribute('path');
    nav(navigatePath);
  };

  const { userInfo } = useVoteStore();

  const onClickBack = () => {
    nav(-1);
  };

  useEffect(() => {
    // 비동기 함수를 useEffect 내에서 정의
    console.log(userInfo);
    const fetchVotes = async () => {
      try {
        const res = await getVotes({
          "gubun": "mcnc",
          "userSeq": 0,
          "startDate": "2024-01-01T00:00:00.000+00:00",
          "endDate": "2024-12-31T23:59:59.999+00:00"
        });
        console.log('Votes fetched:', res); // 서버 응답 확인
      } catch (error) {
        console.error('Error fetching votes:', error); // 오류 처리
      }
    };
  });

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="mx-auto px-5 py-3 text-lg">
        <button className='px-3 py-3 bg-neutral-400 font-bold rounded-l-lg' >{'<'}</button>
        <button className='px-5 py-3 bg-gray-200 font-bold'> 2024.08.12 </button>
        <button className='px-3 py-3 bg-neutral-400 font-bold rounded-r-lg'>{'>'}</button>
      </div>
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 pt-4 text-center rounded-md" path="/voteDetail" onClick={onClickNavigateHandler}>
          <div className="mb-2" ><span className='font-bold'>08.01 ~ 08.02</span></div>
          <div className="mb-2 max-w-xs break-words"><span className='font-sans'>라이 짬뽕</span></div>
          <div>
            <button className='bg-blue-300 w-20 rounded-bl-lg' path="/voteRegist" onClick={onClickNavigateHandler}>수정</button>
            <button className='bg-gray-400 w-20 rounded-br-lg'>삭제</button>
          </div>
        </div>

      </div>
      <div className="mx-auto px-6 py-5">
        <button className='bg-blue-400 h-10 w-40 rounded-md text-white' path="/voteRegist" onClick={onClickNavigateHandler}>추가</button>
      </div>
    </div>
  );
};

export default VoteListForm;