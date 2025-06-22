import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mazeAdminClientReducer from './mazeAdminClient.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  mazeAdminClient: mazeAdminClientReducer,
});

export default rootReducer;
