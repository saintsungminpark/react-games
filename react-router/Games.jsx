import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom'
import GameMatcher from './GameMatcher';
// BrouserRouter: 기본 라우터이다, SEO 검색이 된다(서버쪽 세팅이 완료된 후)
// HashRouter: 주소창에 #이 추가로 붙는다, 새로고침해도 잘된다, , SEO가 안된다(프론트엔드 즉, 브라우저에서만 동작, 그래서 실무에서는 잘 안쓴다(SEO가 필요없는 관리자 페이지등에만 사용))

const Games = () => {
    return (
        // Link로 표기하지만 브라우저 상에서는 a태그로 나타난다
        <BrowserRouter>

            <div>
                <Link to="/game/bulls and cows">bulls and cows</Link>
                &nbsp; {/* 한칸씩 띄워주기 */}
                <Link to="/game/rock paper scissors">rock paper scissors</Link>
                &nbsp;
                <Link to="/game/lottery number generator">lottery number generator</Link>
                &nbsp;
            </div>
            <div>
                {/* 동적 라우트 매칭: 아래와 같이 라우트 패스가 많아질 때 줄이는 법 */}
                {/* :? 을 params라고 하며 뒤의 이름이 무엇이던간에 불러온다 */}
                {/* Switch: 동시에 라우트가 여러개 뜨는것을 방지하기 위함 즉, 스위치 사이에 코딩 한 라우트 여러개 중 한가지를 선택하고자 할 때 사용한다*/}
                {/* exact를(정밀한) 붙여주면 해당 위치(/)가 정확히 일치할 때를 말한다(위치 경로가 / 만 있을때, 예를들어 /test는 인식하지 않는다, 뒤에 test가 붙었기 때문에) */}
                <Switch>
                    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                </Switch>
                {/* 
                <Route path="/bulls and cows" component={BullsAndCows} />
                <Route path="/rock paper scissors" component={RSP} />
                <Route path="/lottery number generator" component={Lotto} />
                */}
            </div>
        </BrowserRouter>
    );
};

export default Games;