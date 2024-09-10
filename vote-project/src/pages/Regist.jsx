import { useNavigate } from "react-router-dom";

const Regist = () => {
  const nav = useNavigate();

  const onClickHandler = () => {
    console.log('move');
  };

  const onClickBack = () => {
    nav(-1);
  }

  return (
    <div className="flex min-h-full min-w-full flex-1 flex-col justify-center">
      <header className="flex items-center border-b bg-gray-300 py-5">
        <div className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 왼쪽 영역 */}
          <div className="flex w-1/4 items-center justify-start">
            {/* 왼쪽 내용 (필요시 추가) */}
          </div>

          {/* 중앙 영역 */}
          <div className="flex w-1/2 items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900">회원 가입</h1>
          </div>

          {/* 오른쪽 영역 */}
          <div className="flex w-1/4 items-center justify-end">
            <button className="bg-gray-400 px-4 py-2 rounded text-3xl" onClick={onClickBack}>
              <span>{">"}</span>
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto mt-10 mr-10 ml-10 flex bg-gray-300 flex-row justify-center rounded-md">
        <div className="bg-white w-[350px] my-56 py-2 break-word">
          <div className='gap-1 mt-2 ml-5 mr-5 flex flex-col font-sans'>
            <span>아이디</span>
            <input type="text" className="border border-gray-300" placeholder="아이디를 입력하세요" />
          </div>
          <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
            <span>패스워드</span>
            <input type="text" className="border border-gray-300" placeholder="패스워드를 입력하세요" />
          </div>
          <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
            <span>닉네임</span>
            <input type="text" className="border border-gray-300" placeholder="닉네임을 입력하세요" />
          </div>
          <div className='gap-1 ml-5 mr-5 mt-2 flex flex-col font-sans'>
            <span>구분</span>
            <select type="" className="border border-gray-300">
              <option>mcnc</option>
            </select>
          </div>
          <div className="flex flex-col items-center px-6 py-5">
            <button className='bg-blue-400 h-10 w-40 rounded-md text-white' onClick={onClickHandler}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regist;