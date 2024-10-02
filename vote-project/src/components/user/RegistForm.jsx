import { useRef, useState } from "react";
import { registVote } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

const RegistForm = () => {
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const nav = useNavigate();

  const inputId = useRef("");
  const inputpw = useRef("");
  const inputNick = useRef("");
  const inputGubun = useRef("");

  const onClickRegist = async () => {
    try {
      const registData = {
        "id": inputId.current.value,
        "password": inputpw.current.value,
        "username": inputNick.current.value,
        "gubun": inputGubun.current.value,
      };
      console.log(registData);

      const { data } = await registVote(registData);
      setErrorMessage(""); // 성공 시 에러 메시지 초기화
      nav('/login');
    } catch (error) {
      console.error(error);

      // 서버로부터 에러 응답이 있는지 확인하고, 그렇지 않으면 기본 메시지 설정
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // 서버의 에러 메시지
      } else {
        setErrorMessage("회원 가입에 실패했습니다. 다시 시도해주세요."); // 기본 에러 메시지
      }
    }
  };

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-row justify-center rounded-md">
      <div className="bg-white w-[350px] md:my-56 py-2 break-word">
        <div className='gap-1 mt-2 ml-5 mr-5 flex flex-col font-sans'>
          <span>아이디</span>
          <input ref={inputId} type="text" className="border border-gray-300" placeholder="아이디를 입력하세요" />
        </div>
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>패스워드</span>
          <input ref={inputpw} type="text" className="border border-gray-300" placeholder="패스워드를 입력하세요" />
        </div>
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>닉네임</span>
          <input ref={inputNick} type="text" className="border border-gray-300" placeholder="닉네임을 입력하세요" />
        </div>
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>구분</span>
          <select ref={inputGubun} className="border border-gray-300">
            <option>mcnc</option>
            <option>mcncLunch</option>
          </select>
        </div>

        {errorMessage && ( // 에러 메시지 출력
          <div className="text-red-500 text-center mt-2">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col items-center px-6 py-5">
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white' onClick={onClickRegist}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default RegistForm;
