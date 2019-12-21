import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        // setTimeout안에 변수 생성하여야 하는데 setTimeout밖의 let사용시 클로져 문제 안생긴다 ES6에서 새로 생겼다
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        // 리액트에서 state배열에 값을 삽입시 배열에 바로 push()하면 안되고 해당처럼 표현하여야 한다(예전스테이트를 사용하여 삽입)
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); // 6개의 공을 1초씩 마다 화면에 보여지게 한다
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000) // 위 6개의 당첨공이 매초마다 보여진 후 7초째 보너스공 화면에 보여진다
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    // 메모리 누수문제 해결을 위해 사용해 주어야 한다
    // setTimeout() 같은경우 한번 실행되고 종료되지만 setInterval() 같은경우 메모리상에 계속 반복되므로 꼭 componentWillUnmount()를 사용해 주어야 한다
    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    // 초기화
    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state; // 구조분해할당
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}

export default Lotto;