import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import VoteRegistForm from "../components/vote/VoteRegistForm";

const VoteRegist = () => {
  const nav = useNavigate();

  const onClickBack = () => {
    nav(-1);
  }
  return (
    <>
      <VoteHeader
        title={"투표 등록"}
        leftChild={
          <button className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl" onClick={onClickBack}>
            <span>{"<"}</span>
          </button>}
      />
      <VoteRegistForm />
    </>
  );
};

export default VoteRegist;