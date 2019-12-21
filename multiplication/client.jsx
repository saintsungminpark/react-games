// 설치한 react, react-dom 불러오기
// <script>로 불러오지 않고 nod(cdn)e의 module시스템을 사용하여 불러온다
const React = require('react');
const ReactDom = require('react-dom');

const Multiplication = require('./Multiplication');

ReactDom.render(<Multiplication />, document.querySelector('#root'));