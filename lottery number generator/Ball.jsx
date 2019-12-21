 // 아래는 hooks가 아닌 함수 컴포넌트이다
 // hooks는 useState, useRef등이 들어간다
import React from 'react'; // memo: 함수컴포넌트를 클래스컴포넌트때 사용하였던 purecomponent와 같이 만들어준다

const Ball = React.memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'blue';
  } else {
    background = 'green';
  }

  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;