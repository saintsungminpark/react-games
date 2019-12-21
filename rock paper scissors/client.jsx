import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import RPS from './RPS.jsx';

const Hot = hot(RPS);

ReactDOM.render(<Hot />, document.querySelector('#root'));