const RegistForm = () => {
  const onClickHandler = () => {
    console.log('move');
  };
  return (
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
  );
};

export default RegistForm;