import { useRef, useState } from "react";
import { useVoteStore } from "../../store/voteStore";
import VoteRegistItemForm from "./VoteRegistItemForm";
import { useFetchRegistVote } from "../../queries/voteQuery";
import { useNavigate } from "react-router-dom";


const VoteRegistForm = () => {

  const nav = useNavigate();

  const { userInfo } = useVoteStore();
  const today = new Date().toISOString().split('T')[0];
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + 1);
  // nextDate.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  // const [endDate, setEndDate] = useState(nextDate.toISOString().split('T')[0]);
  const inputVoteName = useRef("");
  const inputDupFlg = useRef(false);
  const [voteItemArr, setVoteItems] = useState([]);
  const [inputVoteTitle, setInputVoteTitle] = useState("");

  const { mutate: registVote, isLoading, isError } = useFetchRegistVote();

  const onClickRegistVote = () => {

    // startDate와 endDate를 원하는 형식으로 변환
    const formattedStartDate = new Date(startDate);
    formattedStartDate.setHours(0, 0, 0, 0); // 시간 00:00:00.000으로 설정

    const formattedEndDate = new Date(endDate);
    formattedEndDate.setHours(23, 59, 59, 999); // 시간 23:59:59.999으로 설정

    console.log(new Date(startDate).getTime());

    const voteData = {
      votename: inputVoteName.current.value,
      gubun: userInfo.gubun,
      username: userInfo.username,
      userSeq: userInfo.userSeq,
      startDate: formattedStartDate.toISOString(),
      endDate: formattedEndDate.toISOString(),
      voteOption: {
        dupl: true,
      },
      voteItems: voteItemArr
    };
    console.log(voteData);
    if (voteData.voteItems.length === 0) {
      alert('항목 추가 누락');
      return;
    }
    if (!voteData.votename || !voteData.gubun || !voteData.username || !voteData.startDate || !voteData.endDate) {
      alert('필수항목 누락');
      return;
    }
    registVote(voteData, {
      onSuccess: (data) => {
        console.log("투표 생성 성공:", data);
        nav(-1);
      },
      onError: (error) => {
        console.error("투표 생성 실패:", error);
      },
    });
  };

  const onClickVoteItemTitleDelete = (deleteTitle) => {
    // console.log(deleteTitle);
    setVoteItems(voteItemArr.filter((item) => item.voteName !== deleteTitle));
  };
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 항목</span></div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            {
              voteItemArr.map((item, i) => {
                return <VoteRegistItemForm key={i} voteItemTitle={item.voteName} onClickVoteItemTitleDelete={onClickVoteItemTitleDelete} />
              })
            }
          </div>
          <div className="pb-4 break-words flex justify-center">
            <div className='gap-2 flex font-sans'>
              <input
                value={inputVoteTitle}
                onChange={(e) => setInputVoteTitle(e.target.value)}
                placeholder="투표 항목 추가"
                className="w-[220px]"
                type="text"
              />
              <button
                onClick={() => {
                  if (inputVoteTitle) {
                    setVoteItems([...voteItemArr, { 'voteName': inputVoteTitle }]);
                    setInputVoteTitle(''); // 입력 필드 초기화
                  }
                }}
                className='bg-blue-400 h-8 w-20 rounded-md text-white'
              >
                추가
              </button>
            </div>
          </div>
        </div>
        <div className="w-[400px] mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          {/* <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 추가</span></div> */}
          <div className="bg-gray-200 gap-4 mx-auto py-5 flex flex-1 flex-col">
            <div className="w-[135px] mr-4 ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>시작 날짜</span>
                <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" />
                <span>종료 날짜</span>
                <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
              </div>
            </div>
            <div className="w-[250px] ml-4 py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>제목</span>
                <input ref={inputVoteName} type="text" />
              </div>
            </div>
            {/* <div className="w-[250px] ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>중복 투표 <input ref={inputDupFlg} type="checkbox" /></span>
              </div>
            </div> */}
          </div>
        </div>

      </div>
      <div className="mx-auto px-6 py-5">
        <button onClick={onClickRegistVote} className='bg-blue-400 h-10 w-40 rounded-md text-white'>등록</button>
      </div>
    </div>
  );
};

export default VoteRegistForm;