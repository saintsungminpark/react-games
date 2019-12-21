const React = require('react');
const { useState, useRef } = React;

const Multiplication = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); // 아래 focus()사용하기 위함

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (Number(value) === first * second) {
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            setResult('정답: ' + value);
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('오답' + value);
            inputRef.current.focus() // current를 붙여줘야한다
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>multiplication</div>
            <div>{first} X {second} = ?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value} />
            </form>
            <div id="result">{result}</div>
        </>
    );
};

module.exports = Multiplication;