import { useNavigate } from "react-router-dom";
import { loginVote } from "../../apis/auth";
import { useEffect, useRef } from "react";
import { getAuthFromCookie, saveAuthToCookie } from "../../util/cookies";
import { useVoteStore } from "../../store/voteStore";

const LoginForm = () => {

  const { setUserInfo, setToken, userInfo } = useVoteStore();

  useEffect(() => {
    // 상태를 설정하는 것이 올바르게 작동하는지 확인

  }, []); // 의존성 배열에 setUserInfo를 포함

  const inputId = useRef("");
  const inputPw = useRef("");
  const nav = useNavigate();
  const onClickNavigateHandler = (e) => {
    const navigatePath = e.target.getAttribute('path');
    nav(navigatePath);
  };

  const onClickVoteLogin = async (e) => {
    const navigatePath = e.target.getAttribute('path');
    const loginUserData = {
      id: inputId.current.value,
      password: inputPw.current.value
    };
    console.log(loginUserData);
    try {
      const { data } = await loginVote(loginUserData);
      setUserInfo(data.result);
      saveAuthToCookie(data.token);
      setToken(data.token);
      nav(navigatePath);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-row justify-center rounded-md">
      <div className="bg-white w-[350px] my-56 py-2 break-word">
        <div className='gap-1 mt-2 ml-5 mr-5 flex flex-col font-sans'>
          <span>아이디</span>
          <input ref={inputId} type="text" className="border border-gray-300" placeholder="아이디를 입력하세요" />
        </div>
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>패스워드</span>
          <input ref={inputPw} type="password" className="border border-gray-300" placeholder="패스워드를 입력하세요" />
        </div>
        <div className="flex flex-col items-center px-6 py-5">
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white mb-4' path="/voteMain" onClick={onClickVoteLogin}>로그인</button>
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white' path="/regist" onClick={onClickNavigateHandler} >회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;