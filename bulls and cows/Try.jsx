import React, { PureComponent, memo } from 'react';

// PureComponent: 일반 컴포넌트사용시 state가 바뀌지 않은 부분도 랜더링이 된다. 이는 불필요한 리소스를 생기고(성능하락) 이를 방지하고자 상태가 바뀐 부분만 랜더링 하는 방법
// class형 PureComponent 사용법
// class Try extends PureComponent {
//     render() {
//         const { tryInfo } = this. props;
//         return (
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         );
//     }
// }

// memo(memorization): hooks에서의 PureComponent
const Try = memo(({ tryInfo }) => { // (props 자리, props로 표현하지않고 tryInfo와 같이 구조분해로 써로 된다)
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});

export default Try;