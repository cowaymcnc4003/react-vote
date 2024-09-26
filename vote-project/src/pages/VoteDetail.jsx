import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import VoteDetailForm from "../components/vote/VoteDetailForm";

const VoteDetail = () => {

  const nav = useNavigate();

  const onClickBack = () => {
    nav(-1);
  }
  return (
    <>
      <VoteHeader
        title={"투표 상세"}
        leftChild={
          <button className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl" onClick={onClickBack}>
            <span>{"<"}</span>
          </button>}
      />
      <VoteDetailForm />
    </>
  );
};

export default VoteDetail;