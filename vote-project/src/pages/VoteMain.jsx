import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import VoteListForm from "../components/vote/VoteListForm";
import { Suspense, useEffect } from "react";
import ErrorBoundary from "../components/common/ErroBoundary";
import { deleteCookie } from "../util/cookies";
import { useVoteStore } from "../store/voteStore";

const VoteMain = () => {
  const nav = useNavigate();
  const onClickBack = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      deleteCookie('vote_auth');
      useVoteStore.setState({
        userInfo: {},    // userInfo 초기화
        token: ''        // token 초기화
      });
      nav('/'); // 홈으로 이동
    } else {
      // 뒤로 가기 취소 시 현재 페이지를 다시 pushState로 덮어씀
      history.pushState(null, "", window.location.href);
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      // 뒤로 가기 시의 기본 동작을 무효화
      event.preventDefault();
      history.pushState(null, "", window.location.href); // 현재 페이지 상태 덮어쓰기
      onClickBack(); // 뒤로 가기 커스텀 동작
    };

    // popstate 이벤트 리스너 추가 (뒤로 가기 버튼 눌렀을 때 발생)
    window.addEventListener("popstate", handlePopState);

    // 페이지 마운트 시에 히스토리 초기 상태 설정
    history.pushState(null, "", window.location.href);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 해제
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // 빈 배열을 의존성으로 추가하여 컴포넌트 마운트 시에만 실행


  return (
    <>
      <VoteHeader
        title={"날짜 선택"}
        leftChild={
          <button
            className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl"
            onClick={onClickBack}
          >
            <span>{"<"}</span>
          </button>
        }
      />
      {/* <ErrorBoundary> */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <VoteListForm />
      {/* </Suspense> */}
      {/* </ErrorBoundary> */}
    </>
  );
};

export default VoteMain;
