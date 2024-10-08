import { useEffect, useRef } from "react";
import { useVoteStore } from "../../store/voteStore";
import { useNavigate } from "react-router-dom";

const VoteUserSettingForm = () => {
  const inputId = useRef("");
  const inputpw = useRef("");
  const inputNick = useRef("");
  const inputGubun = useRef("");
  const { userInfo, setUserInfo } = useVoteStore();
  const nav = useNavigate();
  useEffect(() => {

    inputNick.current.value = userInfo.username;

  }, []);
  const onClickUserUpdate = () => {
    const userInfoData = { ...userInfo, username: inputNick.current.value };
    setUserInfo(userInfoData);
    nav(-1);
  };
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-row justify-center rounded-md">
      <div className="bg-white w-[350px] md:my-56 py-2 break-word">
        {/* <div className='gap-1 mt-2 ml-5 mr-5 flex flex-col font-sans'>
          <span>아이디</span>
          <span ref={inputId}>{userInfo.id}</span>
        </div> */}
        {/* <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>패스워드</span>
          <input ref={inputpw} type="text" className="border border-gray-300" placeholder="패스워드를 입력하세요" />
        </div> */}
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>닉네임</span>
          <input onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClickUserUpdate();
            }
          }} ref={inputNick} type="text" className="border border-gray-300" placeholder="닉네임을 입력하세요" />
        </div>
        {/* <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>구분</span>
          <select ref={inputGubun} className="border border-gray-300">
            <option>mcnc</option>
            <option>mcncLunch</option>
          </select>
        </div> */}

        {/* {errorMessage && ( // 에러 메시지 출력
          <div className="text-red-500 text-center mt-2">
            {errorMessage}
          </div>
        )} */}

        <div className="flex flex-col items-center px-6 py-5">
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white' onClick={onClickUserUpdate}>수정</button>
        </div>
      </div>
    </div>
  );
};

export default VoteUserSettingForm;