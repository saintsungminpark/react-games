import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';
// useReducer 사용이유(효과): 많은 state들을 하나로 관리해 주기 위해
// useReducer 전체 흐름(redux와 비슷하다)
// (브라우저에서 이벤트 발생 시)
// state= { 객체 } 를 직접 바꿀 수 없다
// 따라서 dispatch({action}) 만들고 state에 dispatch(보내다)한다
// 실제로 state를 처리하는 행위는 reducer에서 관리 한다

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};

// export: 모듈로 만든다
// 이유: 모듈로 만들어 원하는 파일에서 부른다(td.jsx에서 사용하기 떄문에)
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
     // 아래의 dispatch({})에 작성한것을 reducer에서 실제로 바꾸어준다(실행한다)
    // dispatch({action})을 실행 할 때 마다(action을 dispatch할 때 마다) reducer가 실행된다
    // 즉, 이 안에서 state를 어떻게 바꿀지 작성한다
  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 와 같이 직접적으로 state 수정이 불가능하다
      return {
        ...state, // sprite 문법
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 기존의 tableData를 얉은 복사 해준다
      // td.jsx파일의 dispatch({ action })
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  // useReducer 사용이유(효과): 많은 state들을 하나로 관리
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  const onClickTable = useCallback(() => { // 컴포넌트에 넣는 함수들은 useCallback를 사용한다(useCallback이 함수 자체를 기억하기 때문에)
    // dispatch({ }): 안에 들어가는 객체를 action이라고 한다
    dispatch({ type: SET_WINNER, winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};
export default TicTacToe;