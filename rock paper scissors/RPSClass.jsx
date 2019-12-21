import React, { Component } from 'react';

// 리액트 라이프 사이클
// 클래스의 경우 client.jsx에서 랜더링 되는 순간 만들어 논 컴포넌트 들이 해당 클래스에 붙고 다 붙으면 처음으로 랜더링을 한다. 혹시 ref가 있다면 ref까지 처리한다
// 첫번째 랜더링이 끝난 후 componentDidMount가 실행된다.(이제 화면에 보인다) 이 후의 앞으로의 랜더링시에는 즉, 리랜더링시에는 shouldComponentUpdate가 실행된다.(true인 경우)
// 리랜더링 후 에는 comoponentDidUpdate가 된다
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 자식을 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위: '-20px',
  가위: '-436px',
  보: '-228px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
  };

  interval;

  componentDidMount() { // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 해요
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 해요
    clearInterval(this.interval);
  }

  changeHand = () => {
    const {imgCoord} = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computerImg" style={{ background: `url(./rock-paper-scissors.png) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}
export default RSP;