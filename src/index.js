import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Container from './components/container.jsx';
import { createStore } from 'redux';
import { lists } from './store/lists.js';

const store = createStore(lists);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>
, document.getElementById('root'));
