const React = require('react');
const { useState } = require('react');

const WordRelay = () => {
    const [word, setWord] = useState('박성민');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = React.useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('정답');
            setWord(value);
            setValue('');
            inputEl.current.focus();
        } else {
            setResult('오답');
            setValue('');
            inputEl.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.currentTarget.value)
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label id="label" htmlFor="wordInput">글자를 입력하세요</label>
                <input id="wordInput" className="wordInput" ref={inputEl} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );
};
module.exports = WordRelay;