import { useRef, useState } from "react";
import { useVoteStore } from "../../store/voteStore";
import VoteRegistItemForm from "./VoteRegistItemForm";


const VoteRegistForm = () => {

  const { userInfo } = useVoteStore();
  console.log(userInfo);
  const today = new Date().toISOString().split('T')[0];
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + 1);
  // nextDate.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(nextDate.toISOString().split('T')[0]);
  const inputVoteName = useRef("");
  const inputDupFlg = useRef(false);
  const [voteItemArr, setVoteItems] = useState([]);
  const [inputVoteTitle, setInputVoteTitle] = useState("");

  const onClickRegistVote = () => {


    console.log(new Date(startDate).getTime());

    const voteData = {
      votename: inputVoteName.current.value,
      gubun: userInfo.gubun,
      username: userInfo.username,
      userSeq: userInfo.userSeq,
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      voteOption: {
        dupl: inputDupFlg.current.checked,
      },
      voteItems: []
    };
    console.log(voteData);
  };


  // {
  //   "votename": "2024 파티",
  //     "gubun": "mcnc",
  //       "username": "이명한",
  //         "userSeq": 0,
  //           "startDate": "2024-09-08T00:00:00.000+00:00",
  //             "endDate": "2024-09-21T23:59:59.999+00:00",
  //               "voteOption": {
  //     "dupl": false,
  //       "randomize": false
  //   },
  //   "voteItems": [
  //     {
  //       "voteName": "팬션"
  //     },
  //     {
  //       "voteName": "노래방"
  //     },
  //     {
  //       "voteName": "집"
  //     }
  //   ]
  // }
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 항목</span></div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            {
              voteItemArr.map((item, i) => {
                return <VoteRegistItemForm key={i} voteItemTitle={item} />
              })
            }
          </div>
          <div className="pb-4 break-words flex justify-center">
            <div className='gap-2  flex font-sans'>
              <input value={inputVoteTitle} placeholder="투표 항목 추가" className="w-[220px]" type="text" /><button onChange={(e) => { setVoteItems([...voteItemArr, inputVoteTitle]) }} className='bg-blue-400 h-8 w-20 rounded-md text-white'>추가</button>
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
            <div className="w-[250px] ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>중복 투표 <input ref={inputDupFlg} type="checkbox" /></span>
              </div>
            </div>
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