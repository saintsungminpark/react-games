// react hooks
import React, { useState, useRef, memo } from 'react';
import Try from './Try';

const getNumbers = () => { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

// memo(memorization): hooks에서의 PureComponent
const BullsAndCows = memo(() => {
    const [tries, setTries] = useState([]);
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const inputEl = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (value === answer.join('')) {
            setTries((t) => ([...t, { try: value, result: '홈런', }]));
            setResult('홈런');
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputEl.current.focus();
            } else {
                console.log('답은', answer.join(''));
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries(t => ([...t, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`,}]));
                setValue('');
                inputEl.current.focus();
            }
        }
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={inputEl} maxLength={4} value={value} onChange={(e) => setValue(e.target.value)} />
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
                    );
                })}
            </ul>
        </>
    );
});

export default BullsAndCows; // import BullsAndCows;