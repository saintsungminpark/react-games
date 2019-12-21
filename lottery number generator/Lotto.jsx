import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

// useRef: 일반 값을 기억, 화면에 보여지지 않는 대상 예를들어 input의 focus()시 사용
// useMemo: 복잡한 함수 결과값(즉, return값)을 기억, 리랜더링시 메모리 누수 방지를 위해 사용
// useCallback: 함수 자체를 기억
const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // useEffect, useCallback과 같이 두번째 인자인 배열이 바뀌지 않는 한 다시 실행되지 않는다
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {  // componentDidMount 자리(두번쨰 인자의 배열이 있고 그 배열상태가 바뀌면 componentDidUpdate 자리)
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                // 리액트에서 state배열에 값을 삽입시 배열에 바로 push()하면 안되고 해당처럼 표현하여야 한다(예전스테이트를 사용하여 삽입)
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000); // 6개의 공을 1초씩 마다 화면에 보여지게 한다
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000); // 위 6개의 당첨공이 매초마다 보여진 후 7초째 보너스공이 화면에 보여진다
        return () => { // componentWillUnmount 자리
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 인풋이 빈 배열이면 componentDidMount와 같다 // useEffect의 두번째 인자인 []가 바뀔때마다 useEffect가 계속 실행된다
    // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행한다

    useEffect(() => {
        console.log('로또 숫자 생성');
    }, [winNumbers]);

    // 초기화
    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {/* onClick={onClickRedo}에서와 같이 자식컴포넌트에 함수를 넘길때 useCallback을 사용해 주어야한다, 함수자체는 바뀐게 없는데 자식 컴포넌트에서 불필요하게 매번 함수가 실행되는것을 방지하기 위해 */}
            {bonus && <Ball number={bonus} onClick={onClickRedo} />}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};
export default Lotto;