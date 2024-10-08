import { useNavigate, useParams } from "react-router-dom";
import { useFetchRunoffVoting, useFetchVote, useFetchVoteClose, useFetchVoting } from "../../queries/voteQuery";
import { useEffect, useState } from "react";
import { useVoteStore } from "../../store/voteStore";
import tapStar from '../../assets/img/tapStar.png';
import match from '../../assets/img/match.png';

const VoteDetailForm = () => {
  const { voteId } = useParams();
  const { userInfo } = useVoteStore();
  const [voteItemArr, setVoteItemArr] = useState([]);
  const [voteCheckedItems, setVoteCheckedItems] = useState([]);
  const [voteMode, setVoteMode] = useState(false); // voteMode false 등록 true 수정
  const [isClosed, setIsClosed] = useState(false);
  const [runoffVotingItem, setRunoffVotingItem] = useState({
    voteTitle: "",
    voteItem:
      [
        // { 'voteName': "(1) 제비파스타 (파스타)" },
      ]
  });
  const nav = useNavigate();
  const { data, res, isLoading, isError, error, refetch } = useFetchVote({ voteId, userSeq: userInfo.userSeq });

  const { mutate: registerVote, isLoading: isVoting, isError: votingError } = useFetchVoting();

  const { mutate: runoffVoting, isLoading: isRunoffVoting, isError: runoffVotingError } = useFetchRunoffVoting();

  const { mutate: voteClose, isLoading: isVoteClose, isError: voteCloseError } = useFetchVoteClose();

  useEffect(() => {
    if (res?.[0]) {
      const isClosed = res[0].isClosed;
      setIsClosed(isClosed);
      setVoteMode(res[0].duplicated || isClosed ? true : false);
      const initialCheckedItems = res[0].voteItems
        .filter(item => item.isVoted)
        .map(item => (item));
      setVoteCheckedItems(initialCheckedItems);

      // 결선 투표 arr 얻기
      const maxVoteCount = Math.max(...res[0].voteItems.map(item => item.voteCount));
      const runoffVotingArr = res[0].voteItems.filter((item) => {
        return item.voteCount === maxVoteCount;
      });

      if (isClosed) {
        setVoteItemArr(runoffVotingArr);
      } else {
        setVoteItemArr(res[0].voteItems);
      }

      setRunoffVotingItem({
        voteTitle: res[0].votename.split("(결선 투표)")[0] + "(결선 투표)",
        voteItem: runoffVotingArr
      })
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

      if (isClosed) {

        return (
          <div key={idx}>
            {
              items.length > 1 ?
                (<div className="flex flex-col items-center" key={idx} >
                  {idx === 0 &&
                    (
                      <div className="flex flex-col items-center pb-3">
                        <div className="h-32">
                          <img src={match} alt="description" className="w-full h-full object-cover" />
                        </div>
                        <div>득표 : {maxVoteCount}</div>
                      </div>
                    )
                  }
                  <div>
                    <span>{item.voteName}</span>
                  </div>
                </div>)
                :
                (<div className="flex flex-col items-center" key={idx} >
                  <div className="h-32 pb-4">
                    <img src={tapStar} alt="description" className="w-full h-full object-cover" />
                  </div>
                  <span>{item.voteName}({item.voteCount}표)</span>
                </div>)
            }
          </div >
        )
      } else {
        return (
          <div onClick={() => voteItemCheckClick(item.voteItemSeq, !isChecked)} key={idx} className={`w-[310px] md:w-[400px] mr-4 ml-4 py-2 break-words ${res[0].duplicated && isTopVote && item.voteCount > 0 ? 'border-2 border-yellow-500' : 'bg-gray-300'}`} >
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
                {isTopVote && <span className="ml-2">🌠</span>}
              </>
            )}
          </div>
        );
      }
    }
    );
  };
  const onClickVoting = () => {
    const voteData = {
      voteId,
      userSeq: userInfo.userSeq,
      gubun: userInfo.gubun,
      voteItems: voteCheckedItems,
    };

    if (!res[0].duplicated && voteData.voteItems.length === 0) {
      alert("한개 이상 투표하세요.");
      return;
    }

    registerVote(voteData, {
      onSuccess: async (data) => {
        console.log("투표 성공:", data);
        await refetch();
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

  const onClickVoteClose = () => {
    if (window.confirm("투표를 종료를 진행합니까?")) {
      voteClose({
        voteId
      }, {
        onSuccess: async (data) => {
          console.log("투표 종료 성공:", data);
          await refetch();
          // setVoteMode(true);
        },
        onError: (error) => {
          console.error("투표 종료 실패:", error);
        },
      });
    }
  }

  const onClickRunoffVoting = (type) => {
    console.log(type);
    console.log(runoffVotingItem);
    if (type === 'update') { // 결선 투표 업데이트
      if (window.confirm("결선 투표를 진행합니까? 기존 투표는 초기화 됩니다.")) {
        const runoffVotingData =
        {
          "votename": runoffVotingItem.voteTitle,
          "voteId": voteId,
          "voteItems": runoffVotingItem.voteItem
        };
        runoffVoting(runoffVotingData, {
          onSuccess: async (data) => {
            console.log("투표 성공:", data);
            await refetch();
            setVoteMode(true);
          },
          onError: (error) => {
            console.error("투표 실패:", error);
          },
        });
      }
    } else { // 결선 투표 생성
      const path = `/voteRegist/${JSON.stringify(runoffVotingItem)}`;
      nav(path);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col bg-gray-300 justify-center items-center rounded-md">
      <div className="w-full bg-gray-300 mr-1 ml-1 flex flex-wrap justify-center mb-10">
        <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center">
            <span className="font-bold">{res[0].votename}</span>
          </div>
          <div className="pt-3 px-5">
            <div>작성자 : {res[0].username}</div>
            <div>투표기간 : {`${startDataFormat} ~ ${endDataFormat}`}</div>
            <div>상태 : {isClosed ? '종료' : '진행중'}</div>
          </div>
          <div className="bg-gray-200 gap-2 mx-auto py-4 flex flex-1 flex-col items-center overflow-y-auto max-h-[550px]">
            {voteItemList(voteItemArr)}
          </div>
          {votingError && <div className="text-red-500 mt-2">투표 중 오류 발생: {votingError.message}</div>}
        </div>
      </div>
      <div className="fixed flex bottom-2.5">
        {isVoting ? (
          "로딩 중..."
        ) : !isClosed ? (
          <div className="">
            <button
              className="bg-blue-400 h-10 w-20 rounded-md text-white"
              onClick={voteMode ? onClickUpDateMode : onClickVoting}
              disabled={isVoting}
            >
              {voteMode ? "투표수정" : "투표등록"}
            </button>

          </div>
        ) : null}
        {
          (res[0].userSeq === userInfo.userSeq && voteMode && runoffVotingItem.voteItem.length > 1) &&
          <div className="">
            {/* <button
            className="bg-orange-400 h-10 w-40 rounded-md text-white"
            onClick={() => { onClickRunoffVoting('create') }}
            disabled={isVoting}
          >
            결선 투표 생성
          </button> */}
            <button
              className="bg-orange-400 h-10 w-20 rounded-md ml-2 text-white"
              onClick={() => { onClickRunoffVoting('update') }}
              disabled={isVoting}
            >
              결선 투표
            </button>
          </div>
        }
        {(res[0].userSeq === userInfo.userSeq && voteMode && !isClosed) &&
          <div className="">
            {/* <button
            className="bg-orange-400 h-10 w-40 rounded-md text-white"
            onClick={() => { onClickRunoffVoting('create') }}
            disabled={isVoting}
          >
            결선 투표 생성
          </button> */}
            <button
              className="bg-orange-400 h-10 w-20 rounded-md ml-2 text-white"
              onClick={() => { onClickVoteClose() }}
              disabled={isVoting}
            >
              투표 종료
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default VoteDetailForm;
