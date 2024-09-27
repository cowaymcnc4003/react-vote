import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import VoteListForm from "../components/vote/VoteListForm";
import { Suspense } from "react";
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
      nav('/');
    }
  };

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
