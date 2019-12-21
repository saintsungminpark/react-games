// 설치한 react, react-dom 불러오기
// <script>로 불러오지 않고 node의(cdn) 모듈 시스템을 사용하여 불러온다
const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');
const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay);

ReactDom.render(<Hot />, document.querySelector('#root'));