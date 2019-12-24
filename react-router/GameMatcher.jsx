import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import BullsAndCows from '../bulls and cows/BullsAndCowsClass'
import RSP from '../rock paper scissors/RPSClass'
import Lotto from '../lottery number generator/LottoClass'

class GameMatcher extends Component {
    render() {
        console.log(this.props);
        // 쿼리스트링
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('hello'));

        if (this.props.match.params.name === 'bulls and cows') {
            return <BullsAndCows />
        } else if (this.props.match.params.name === 'rock paper scissors') {
            return <RSP />
        } else if (this.props.match.params.name === 'lottery number generator') {
            return <Lotto />
        }
    };
}

// HOC 컴포넌트(High Order Component)
// 리엑트의 라우트의 API인(this.props) history, location, match을 생성되게 하기 위함(접근시 this.props.history, this.props.location, this.props.match)
// export default withRouter(GameMatcher);
export default GameMatcher;