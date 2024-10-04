import { useRef } from "react";
import VoteHeader from "../components/common/VoteHeader";
import { useNavigate } from "react-router-dom";
import VoteUserSettingForm from "../components/vote/VoteUserSettingForm"

const VoteUserSetting = () => {
  const nav = useNavigate();
  const inputId = useRef();
  const inputpw = useRef();
  const inputNick = useRef();
  const inputGubun = useRef();

  const onClickUserUpdate = () => {

  };

  const onClickBack = () => {
    nav(-1);
  }

  return (
    <>
      <VoteHeader
        title={"회원 수정"}
        leftChild={
          <button
            className="bg-gray-400 px-4 py-2 mx-auto rounded text-3xl"
            onClick={onClickBack}
          >
            <span>{"<"}</span>
          </button>
        }
      />
      <VoteUserSettingForm />
    </>
  );
};

export default VoteUserSetting;