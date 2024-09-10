import { useNavigate } from "react-router-dom";
import VoteHeader from "../components/common/VoteHeader";
import RegistForm from "../components/user/RegistForm";

const Regist = () => {
  const nav = useNavigate();
  const onClickBack = () => {
    nav(-1);
  }

  return (
    <>
      <VoteHeader
        title={"회원 가입"}
        leftChild={
          <button className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl" onClick={onClickBack}>
            <span>{"<"}</span>
          </button>}
      />
      <RegistForm />
    </>
  );
};

export default Regist;