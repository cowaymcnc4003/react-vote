import { useEffect, useRef, useState } from "react";
import { useVoteStore } from "../../store/voteStore";
import VoteRegistItemForm from "./VoteRegistItemForm";
import { useFetchRegistVote, useFetchUpdateVote, useFetchVote } from "../../queries/voteQuery";
import { useNavigate, useParams } from "react-router-dom";

const VoteRegistForm = () => {

  const nav = useNavigate();
  const { voteArr } = useParams();
  const { userInfo, setSelectedDate } = useVoteStore();
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
  const [inputVote, setInputVote] = useState();
  const [scrolDownFlg, setScrolDownFlg] = useState(false);
  const voteItemsScrol = useRef();
  const voteRegistScrol = useRef();
  const { data, res, isVoteLoading, isVoteError, error, refetch } = useFetchVote({ voteId: inputVote, userSeq: userInfo.userSeq });

  useEffect(() => {
    if (voteArr) { // 전달 된 투표 세팅
      const votoArrToJson = JSON.parse(voteArr);
      if (votoArrToJson.hasOwnProperty('voteId')) { // 투표 수정 조회
        setInputVote(votoArrToJson.voteId);
      } else { // 결선 투표 생성
        onClickEasyVoteCreate(votoArrToJson);
      }
    }
  }, []);
  // 투표 수정 데이터 불러오기
  useEffect(() => {
    if (voteArr) {
      const votoArrToJson = JSON.parse(voteArr);
      if (res && votoArrToJson.hasOwnProperty('voteId')) {
        setVoteItems(res[0].voteItems);
        inputVoteName.current.value = res[0].votename;

        setStartDate(yyyymmddFormatData(res[0].startDate));
        setEndDate(yyyymmddFormatData(res[0].endDate));
      }
    }
  }, [res]);


  useEffect(() => {
    if (inputVote) { // inputVote가 있을 때만 refetch
      refetch();
    }
  }, [inputVote]); // inputVote 변경 시에 refetch 실행

  useEffect(() => {
    voteItemsScrolbottom();
  }, [scrolDownFlg]);

  const { mutate: registVote, isLoading, isError } = useFetchRegistVote();
  const { mutate: updateVote, isUpdateLoading, isUpdateError } = useFetchUpdateVote();

  const yyyymmddFormatData = (date) => {
    date = new Date(date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

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
    if (new Date(startDate) > new Date(endDate)) {
      alert('시작일이 종료일보다 클 수 없습니다.');
      return;
    }
    if (voteData.voteItems.length === 0) {
      alert('항목 추가 누락');
      return;
    }
    if (!voteData.votename || !voteData.gubun || !voteData.username || !voteData.startDate || !voteData.endDate) {
      alert('필수항목 누락');
      return;
    }
    registVote(voteData, {
      onSuccess: ({ data }) => {
        console.log("투표 생성 성공:");
        // setSelectedDate(formattedStartDate);
        const voteId = data.data.voteId;
        const navigatePath = `/voteDetail/${voteId}`;
        nav(navigatePath);
      },
      onError: (error) => {
        console.error("투표 생성 실패:", error);
      },
    });
  };

  const onClickUpdateVote = () => {

    // startDate와 endDate를 원하는 형식으로 변환
    const formattedStartDate = new Date(startDate);
    formattedStartDate.setHours(0, 0, 0, 0); // 시간 00:00:00.000으로 설정

    const formattedEndDate = new Date(endDate);
    formattedEndDate.setHours(23, 59, 59, 999); // 시간 23:59:59.999으로 설정

    console.log(new Date(startDate).getTime());

    const voteData = {
      voteId: inputVote,
      votename: inputVoteName.current.value,
      gubun: userInfo.gubun,
      username: userInfo.username,
      userSeq: userInfo.userSeq,
      startDate: formattedStartDate.toISOString(), // UTC 날짜를 ISO 문자열로 변환
      endDate: formattedEndDate.toISOString(),
      voteOption: {
        dupl: true,
      },
      voteItems: voteItemArr
    };
    if (new Date(startDate) > new Date(endDate)) {
      alert('시작일이 종료일보다 클 수 없습니다.');
      return;
    }
    if (voteData.voteItems.length === 0) {
      alert('항목 추가 누락');
      return;
    }
    if (!voteData.votename || !voteData.gubun || !voteData.username || !voteData.startDate || !voteData.endDate) {
      alert('필수항목 누락');
      return;
    }
    console.log(voteData);

    updateVote(voteData, {
      onSuccess: (data) => {
        console.log("투표 수정 성공:", data);
        nav('/voteMain');
      },
      onError: (error) => {
        console.error("투표 수정 실패:", error);
      },
    });
  };

  const onClickVoteItemTitleDelete = (deleteTitle) => {
    console.log(deleteTitle);
    setVoteItems(voteItemArr.filter((item) => item.voteName !== deleteTitle));
  };

  const onVoteTitleEdit = (oldTitle, newTitle) => {
    // oldTitle과 일치하는 항목을 찾고, 새 제목으로 교체
    const updatedItems = voteItemArr.map((item) =>
      item.voteName === oldTitle ? { ...item, voteName: newTitle } : item
    );
    // 상태 업데이트
    setVoteItems(updatedItems);
  };

  const onClickEasyVoteCreate = (voteArr) => {
    setVoteItems(voteArr.voteItem);
    inputVoteName.current.value = voteArr.voteTitle;
    setScrolDownFlg(!scrolDownFlg);
  }

  const onClickInputVoteTitle = () => {
    if (inputVoteTitle) {
      setVoteItems([...voteItemArr, { 'voteName': inputVoteTitle }]);
      setInputVoteTitle(''); // 입력 필드 초기화
      setScrolDownFlg(!scrolDownFlg);
    }
  }

  const voteItemsScrolbottom = () => {
    voteItemsScrol.current.scrollTo({
      top: voteItemsScrol.current.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  }


  return (
    <div ref={voteRegistScrol} className="w-full mx-auto mt-10 flex flex-col bg-gray-300 justify-center items-center rounded-md">
      <div className="w-full bg-gray-300 mr-1 ml-1 flex flex-wrap justify-center mb-10">
        <div className="w-[400px] mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 생성</span></div>
          <div className="bg-gray-200 mx-auto py-3 flex flex-1 flex-col">
            <div className="w-[250px] ml-4 py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>투표 타이틀</span>
                <input ref={inputVoteName} type="text" />
              </div>
            </div>
            <div className="w-[135px] mr-4 ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex-row1 font-sans'>
                <div className=''>
                  <span >시작 날짜</span>
                  <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" disabled />
                </div>
                <div className=''>
                  <span>종료 날짜</span>
                  <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" />
                </div>
              </div>
            </div>

            {/* <div className="w-[250px] ml-4  py-2 break-words">
              <div className='gap-2 ml-5 flex flex-col font-sans'>
                <span>중복 투표 <input ref={inputDupFlg} type="checkbox" /></span>
              </div>
            </div> */}
          </div>
          <div className="py-5 px-10 bg-gray-300 text-center" ><span className='font-bold'>투표 후보</span></div>
          <div ref={voteItemsScrol} className="bg-gray-200 gap-4 mx-auto py-4 flex flex-1 flex-col items-center overflow-y-auto max-h-[300px]">
            {
              voteItemArr.map((item, i) => {
                return <VoteRegistItemForm key={i} voteItemArr={voteItemArr} voteId={inputVote} voteItemTitle={item.voteName} onClickVoteItemTitleDelete={onClickVoteItemTitleDelete} onVoteTitleEdit={onVoteTitleEdit} />
              })
            }
          </div>
          <div className="pb-4 pt-4  break-words flex justify-center">
            <div className='gap-2 flex font-sans'>
              <input
                value={inputVoteTitle}
                onChange={(e) => setInputVoteTitle(e.target.value)}
                placeholder="투표 항목 추가"
                className="ml-4 w-[220px]"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onClickInputVoteTitle();
                  }
                }}
              />
              <button
                onClick={onClickInputVoteTitle}
                className='bg-blue-400 h-8 w-20 rounded-md text-white mr-4'
              >
                추가
              </button>
            </div>
          </div>
          {!inputVote &&
            <div className="px-2 py-2">
              <div className='flex font-sans'>
                <span onClick={() => onClickEasyVoteCreate(recommendRunchVoteArr)} className='bg-blue-400 rounded-md text-white'>점심 간편 세팅</span>
              </div>
            </div>
          }
          {/* <div className="mr-5 ml-5 mb-5 mt-5 bg-gray-200 border border-gray-400">
          </div> */}
        </div>

      </div>
      <div className="fixed flex bottom-2.5">
        <div className="">
          {
            inputVote ? <button onClick={onClickUpdateVote} className='bg-blue-400 h-10 w-40 rounded-md text-white'>수정</button> : <button onClick={onClickRegistVote} className='bg-blue-400 h-10 w-40 rounded-md text-white'>등록</button>}
        </div>

      </div>
    </div>
  );
};

export default VoteRegistForm;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

const recommendRunchVoteArr = {
  voteTitle: "점심 식사 " + formatDate(new Date()),
  voteItem:
    [
      { 'voteName': "(1) 제비파스타 (파스타)" },
      { 'voteName': "(2) 백년불고기 (소불고기정식)" },
      { 'voteName': "(3) 마부마라탕(마라탕/샹궈)" },
      { 'voteName': "(4) 호산반점 (중식)" },
      { 'voteName': "(5) 여수식당 (한식)" },
      { 'voteName': "(6) 드렁킨타이 (태국 쌀국수}, 팟타이}, 카레)" },
      { 'voteName': "(7) 얼큰한뼈해장국백년집 (뼈해장국)" },
      { 'voteName': "(8) 동남집 (곰탕) 갈비탕)" },
      { 'voteName': "(10) 술찬식탁 (즉석떡볶이)" },
      { 'voteName': "(11) 두루정 (두루치기) 짜글이)" },
      { 'voteName': "(13) 타이두 (쌀국수)" },
      { 'voteName': "(14) 킹콩부대찌개 (부대)" },
      { 'voteName': "(15) 인생맛껍 (삼겹살정식)" },
      { 'voteName': "(16) 수왕초장집 (점심회정식)" },
      { 'voteName': "(17) 어촌마을생선구이굴밥코다리 (생선구이정식)" },
      { 'voteName': "(18) 1층 묵묵김치찜 (김치찜)" },
      { 'voteName': "(19) 1층 삼백집 (콩나물국밥)" },
      { 'voteName': "(20) 1층 나주곰탕 (곰탕)" },
      { 'voteName': "(21) 1층 천미미 (중식)" },
      { 'voteName': "(22) 1층 순대실록 (순대국)" },
      { 'voteName': "(24) 1층 찌개랑덮밥이랑 (찌개}, 덮밥)" },
      { 'voteName': "(25) 1층 베트남노상식당 (베트남 쌀국수}, 볶음밥)" },
      { 'voteName': "(26) 1층 마라공방 (마라)" },
      { 'voteName': "(27) 1층 마마된장 (된장찌개정식)" },
      { 'voteName': "(28) 1층 본우리반상 (한식정식)" },
      { 'voteName': "(29) 종가대박집 (대패삼겹살}, 왕돈까스}, 왕냉면)" },
      { 'voteName': "(30) 청년다방 (즉떡)" },
      { 'voteName': "(31) 인생쌈밥 (제육/소불고기/쭈꾸미/닭갈비 쌈밥)" },
      { 'voteName': "(32) 성공관 (소고기무국}, 육회비빔밥}, 된장찌개)" },
      { 'voteName': "(33) 낭만부대찌개 (부대)" },
      { 'voteName': "(34) 금성관 (나주곰탕)" },
      { 'voteName': "(35) 런치투게더 (구내식당)" },
      { 'voteName': "(36) 맥도날드/맘스터치/버거킹/kfc (버거)" },
      { 'voteName': "(37) 무한자금성(중식뷔페)" },
      { 'voteName': "(38) 홍매 (중식)" },
      { 'voteName': "(39) 백화돈 (김치찌재}, 된장찌개)" },
      { 'voteName': "(40) 선선어가 (초밥)" },
      { 'voteName': "(41) 흑백집 (주물럭)" },
      { 'voteName': "(42) 모락모락칼국수 (칼국수)" },
      { 'voteName': "(44) 안동김밥 (분식)" },
      { 'voteName': "(45) 편의점 또는 뚜레쥬르" },
    ]
};