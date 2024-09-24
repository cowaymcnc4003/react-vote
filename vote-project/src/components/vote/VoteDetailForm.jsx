import { useParams } from "react-router-dom";
import { useFetchVote, useFetchVoting } from "../../queries/voteQuery";
import { useEffect, useState } from "react";
import { useVoteStore } from "../../store/voteStore";

const VoteDetailForm = () => {
  const { voteId } = useParams();
  const { userInfo } = useVoteStore();
  const [voteCheckedItems, setVoteCheckedItems] = useState([]);
  const [voteMode, setVoteMode] = useState(false);

  const { data, res, isLoading, isError, error, refetch } = useFetchVote({ voteId });
  const { mutate: registerVote, isLoading: isVoting, isError: votingError } = useFetchVoting();

  useEffect(() => {
    if (res?.[0]) {
      setVoteMode(res[0].duplicated);
      const initialCheckedItems = res[0].voteItems
        .filter(item => item.isVoted)
        .map(item => ({ voteItemSeq: item.voteItemSeq }));
      setVoteCheckedItems(initialCheckedItems);
    }
  }, [res]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!res?.length) return <div>No vote data available.</div>;

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  const startDataFormat = formatDate(res[0].startDate);
  const endDataFormat = formatDate(res[0].endDate);

  const voteItemList = (items) => {
    const maxVoteCount = Math.max(...items.map(item => item.voteCount));

    return items.map((item, idx) => {
      const isTopVote = item.voteCount === maxVoteCount;
      const isChecked = voteCheckedItems.some(checkedItem => checkedItem.voteItemSeq === item.voteItemSeq);

      return (
        <div key={idx} className="w-[400px] mr-4 ml-4 bg-gray-300 py-2 break-words">
          {!voteMode ? (
            <>
              <input
                className="ml-5"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => voteItemCheckClick(item.voteItemSeq, e.target.checked)}
              />
              <span className="ml-5 font-sans">{item.voteName}</span>
            </>
          ) : (
            <>
              <span className="ml-5 font-sans">{item.voteName}</span>
              <span>({item.voteCount}표)</span>
              {isTopVote && <span className="ml-2">🌠 최고 득표!</span>}
            </>
          )}
        </div>
      );
    });
  };

  const onClickVoting = () => {
    const voteData = {
      voteId,
      userSeq: userInfo.userSeq,
      gubun: userInfo.gubun,
      voteItems: voteCheckedItems,
    };

    registerVote(voteData, {
      onSuccess: (data) => {
        console.log("투표 성공:", data);
        refetch();
        setVoteMode(true);
      },
      onError: (error) => {
        console.error("투표 실패:", error);
      },
    });
  };

  const voteItemCheckClick = (voteItemSeq, checked) => {
    setVoteCheckedItems(prevVoteItems =>
      checked
        ? [...prevVoteItems, { voteItemSeq }]
        : prevVoteItems.filter(item => item.voteItemSeq !== voteItemSeq)
    );
  };

  const onClickUpDateMode = () => {
    refetch();
    setVoteMode(false);
  };

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-col justify-center rounded-md">
      <div className="bg-gray-300 mr-10 ml-10 flex flex-wrap justify-center">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center">
            <span className="font-bold">{res[0].votename}</span>
          </div>
          <div className="pt-3 px-5 flex justify-between">
            <span>작성자 : {res[0].username}</span>
            <span>투표기간 : {`${startDataFormat} ~ ${endDataFormat}`}</span>
          </div>
          <div className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center">
            {voteItemList(res[0].voteItems)}
          </div>
          {votingError && <div className="text-red-500 mt-2">투표 중 오류 발생: {votingError.message}</div>}
        </div>
      </div>
      <div className="mx-auto px-6 py-5">
        {isVoting ? (
          "로딩 중..."
        ) : (
          <button
            className="bg-blue-400 h-10 w-40 rounded-md text-white"
            onClick={voteMode ? onClickUpDateMode : onClickVoting}
            disabled={isVoting}
          >
            {voteMode ? "수정" : "등록"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VoteDetailForm;
