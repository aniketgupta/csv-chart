/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import chart from './modules/Chart/ChartReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  chart
});
