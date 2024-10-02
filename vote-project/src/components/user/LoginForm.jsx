import { useNavigate } from "react-router-dom";
import { loginVote } from "../../apis/auth";
import { useEffect, useRef, useState } from "react";
import { getAuthFromCookie, saveAuthToCookie } from "../../util/cookies";
import { useVoteStore } from "../../store/voteStore";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const LoginForm = () => {
  const { setUserInfo, setToken, userInfo } = useVoteStore();
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  useEffect(() => {
    // 상태를 설정하는 것이 올바르게 작동하는지 확인
  }, []);

  const inputId = useRef("");
  const inputPw = useRef("");
  const nav = useNavigate();

  const onClickNavigateHandler = (e) => {
    const navigatePath = e.target.getAttribute('path');
    nav(navigatePath);
  };

  const onClickVoteLogin = async (e) => {
    const navigatePath = '/voteMain';
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
      setErrorMessage("");  // 로그인 성공 시 에러 메시지 초기화
      nav(navigatePath);
    } catch (error) {
      console.error(error);

      // 서버에서 받은 에러 메시지 처리
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // 서버에서 받은 메시지 표시
      } else {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요."); // 일반 에러 메시지
      }
    }
  };

  const onClickGuestLogin = async (e) => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    console.log(result.visitorId);


    // const navigatePath = '/voteMain';
    // const loginUserData = {
    //   id: result.visitorId,
    //   password: result.visitorId
    // };
    // console.log(loginUserData);

    // try {
    //   const { data } = await loginVote(loginUserData);

    //   setUserInfo(data.result);
    //   saveAuthToCookie(data.token);
    //   setToken(data.token);
    //   setErrorMessage("");  // 로그인 성공 시 에러 메시지 초기화
    //   nav(navigatePath);
    // } catch (error) {
    //   console.error(error);

    //   // 서버에서 받은 에러 메시지 처리
    //   if (error.response && error.response.data && error.response.data.message) {
    //     setErrorMessage(error.response.data.message); // 서버에서 받은 메시지 표시
    //   } else {
    //     setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요."); // 일반 에러 메시지
    //   }
    // }
  };

  return (
    <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-row justify-center rounded-md">
      <div className="bg-white w-[350px] md:my-56 py-2 break-word">
        <div className='gap-1 mt-2 ml-5 mr-5 flex flex-col font-sans'>
          <span>아이디</span>
          <input onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClickVoteLogin();
            }
          }} ref={inputId} type="text" className="border border-gray-300" placeholder="아이디를 입력하세요" />
        </div>
        <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
          <span>패스워드</span>
          <input onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClickVoteLogin();
            }
          }}
            ref={inputPw} type="password" className="border border-gray-300" placeholder="패스워드를 입력하세요" />
        </div>

        {errorMessage && (  // 에러 메시지 표시
          <div className="text-red-500 text-center mt-2">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col items-center px-6 py-5">
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white mb-4' path="/voteMain" onClick={onClickVoteLogin}>로그인</button>
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white' path="/regist" onClick={onClickNavigateHandler} >회원가입</button>
          <button className='bg-blue-400 h-10 w-40 rounded-md text-white mb-4' path="/voteMain" onClick={onClickGuestLogin}>게스트 로그인</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
