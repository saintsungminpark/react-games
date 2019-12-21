import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import BullsAndCows from './BullsAndCows';

const Hot = hot(BullsAndCows);

ReactDOM.render(<Hot />, document.querySelector('#root'));