import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Todo />, document.getElementById('root'));
registerServiceWorker();
