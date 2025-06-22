import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import socketMiddleware from './middleware/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import RootReducer from './reducers/rootReducer';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import MazeAdminClient from './containers/mazeAdminClient';
import { syncHistoryWithStore } from 'react-router-redux';
import browserHistory from 'history/lib/createBrowserHistory';
import { Router, Route } from 'react-router';
import './styles/main.scss';

const composeEnhancers =
   process.env.NODE_ENV !== 'production' &&
   typeof window === 'object' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
     }) : compose;
const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware))
);

const routerHistory = useRouterHistory(browserHistory)({ basename: '/' });
const history = syncHistoryWithStore(routerHistory, store);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={ history }>
        <Route path="/" component={MazeAdminClient} />
        <Route path="MazeAdminClient/" component={MazeAdminClient} />
      </Router>
    </Provider>,
    document.getElementById('content'));
};

const runApp = () => {
  renderApp();
};

runApp();
