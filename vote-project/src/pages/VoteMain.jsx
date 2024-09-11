import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import VoteListForm from "../components/vote/VoteListForm";
import { Suspense } from "react";

const VoteMain = () => {
  const nav = useNavigate();

  const onClickBack = () => {
    nav(-1);
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
      <Suspense fallback={<div>Loading...</div>}>
        <VoteListForm />
      </Suspense>
    </>
  );
};

export default VoteMain;
