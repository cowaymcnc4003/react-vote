import React, { useCallback, useEffect, useState } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };
  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <div>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return (
    <button onClick={onClick}>Click me</button>
  );
}

export default ExampleComponent;