import { useParams } from "react-router-dom";
import { useFetchVote, useFetchVoting } from "../../queries/voteQuery";
import { useState } from "react";
import { useVoteStore } from "../../store/voteStore";

const VoteDetailForm = () => {
  const { voteId } = useParams();
  const [voteCheckedItems, setVoteCheckedItems] = useState([]);
  const { userInfo } = useVoteStore();

  // 훅 호출을 최상위에서
  const { data, res, isLoading, isError, error } = useFetchVote({ voteId });
  const { mutate: registerVote, isLoading: isVoting, isError: votingError } = useFetchVoting();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!res || res.length === 0) return <div>No vote data available.</div>;

  const dateToStartData = new Date(res[0].startDate);
  const dateToEndData = new Date(res[0].endDate);
  const startDataFormat = `${dateToStartData.getFullYear()}.${String(dateToStartData.getMonth() + 1).padStart(2, '0')}.${String(dateToStartData.getDate()).padStart(2, '0')}`;
  const endDataFormat = `${dateToEndData.getFullYear()}.${String(dateToEndData.getMonth() + 1).padStart(2, '0')}.${String(dateToEndData.getDate()).padStart(2, '0')}`;

  const voteItemList = (items, duplicated) => {
    const maxVoteCount = Math.max(...items.map(item => item.voteCount));
    return items.map((item, idx) => {
      const isTopVote = item.voteCount === maxVoteCount;
      if (!duplicated) {
        return (
          <div key={idx} className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
            <input className="ml-5" type="checkbox" onChange={(e) => voteItemCheckClick(item.voteItemSeq, e.target.checked)} />
            <span className='ml-5 font-sans'>{item.voteName}</span>
          </div>
        );
      } else {
        return (
          <div key={idx} className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
            <span className='ml-5 font-sans'>{item.voteName}</span>
            <span>({item.voteCount}표)</span>
            {isTopVote && <span className="ml-2">🌠 최고 득표!</span>}
          </div>
        );
      }
    });
  };

  const onClickVoting = () => {
    const voteData = {
      voteId,
      userSeq: userInfo.userSeq,
      gubun: userInfo.gubun,
      voteItems: voteCheckedItems
    };

    registerVote(voteData, {
      onSuccess: (data) => {
        console.log('투표 성공:', data);
        setVoteCheckedItems([]); // 투표 후 체크박스 초기화
      },
      onError: (error) => {
        console.error('투표 실패:', error);
      },
    });
  };

  const voteItemCheckClick = (voteItemSeq, checked) => {
    setVoteCheckedItems((prevVoteItem) => {
      if (checked) {
        return [...prevVoteItem, { voteItemSeq }];
      } else {
        return prevVoteItem.filter((item) => item.voteItemSeq !== voteItemSeq);
      }
    });
  };

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center">
            <span className='font-bold'>{res[0].votename}</span>
          </div>
          <div className="pt-3 px-5 flex justify-between">
            <span>작성자 : {res[0].username}</span>
            <span>투표기간 : {`${startDataFormat} ~ ${endDataFormat}`}</span>
          </div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            {voteItemList(res[0].voteItems, res[0].duplicated)}
          </div>
          {votingError && <div className="text-red-500 mt-2">투표 중 오류 발생: {votingError.message}</div>}
        </div>
      </div>
      <div className="mx-auto px-6 py-5">
        <button className='bg-blue-400 h-10 w-40 rounded-md text-white' onClick={onClickVoting} disabled={isVoting}>
          {isVoting ? '로딩 중...' : (res[0].duplicated ? '확인' : '등록')}
        </button>
      </div>
    </div>
  );
};

export default VoteDetailForm;
