// webpack 용도: 모든 js, jsx파일들을 하나로 합쳐준다
// 합쳐준 후 index.html에서 <script src="./dist/app.js"> 부분에 사용
const path = require('path'); // path 불러오기: node에서 경로 쉽게 조작하기 위한 모듈

module.exports = {
    name: 'word-relay-dev',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    // 전체 흐름: 입력파일들을 모듈로 적용한 후 아웃풋 한다
    // 입력: 합치기 원하는 js, jsx, css, json등의 파일 
    entry: {
        // './WordRelay.jsx'는 입력하지않아도 된다: client.jsx에서 이미 해당 파일을 불러오게 코드입력을 했으므로 해당 경로를 입력하지않아도 웹팩이 알아서 빌드해준다
        // const WordRelay = require('./WordRelay')
        // 즉, 아래 배열에 './client.jsx'만 입력해줘도 './WordRelay.jsx'도 불어오게 된다
        // 물론 './client.jsx'에 입력한 코드대로 react와 react-dom도 같이 불러온다
        // 참고로 해당 파일의 확장자를 입력하고 싶지 않을경우(파일이 많아질때) 위의 module.exports 객체안의 resolve:{}를 사용한다
        app: ['./client.jsx', './WordRelay.jsx'],
    },

    // 입력받은 파일에 모듈을 적용
    // 아래 주석 4줄은 package.json 안의 내용이다
    // "@babel/core": 기본 바벨(최신문법으로 바꿔준다)
    // "@babel/preset-env": 브라우저 환경에 맞게 알아서 바꿔준다
    // "@babel/preset-react": 리액트(jsx)를 바꿔준다
    // "babel-loader": 바벨과 웹팩을 연결해준다
    module: {
        rules: [{ // 여러개의 규칙들을 적용할 수 있기 때문에 배열사용
            test: /\.jsx?$/, // 정규표현식 js파일, jsx파일에 아래의 룰을 적용하겠다라는 의미
            loader: 'babel-loader', // js, jsx 파일에 바벨을 적용하여 최신문법을 예전 브라우저에서도 돌아가게하겠다라는 의미(룰)
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'], // browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ],

            }
        }],
    },

    // 출력
    output: {
        path: path.join(__dirname, 'dist'), // 현재폴더안에 해당경로를 찾아준다: (해당절대경로폴더, 원하는폴더)
        filename: 'App.js', // 원하는 출력 파일이름
        publicPath: '/dist/',    
    },
};