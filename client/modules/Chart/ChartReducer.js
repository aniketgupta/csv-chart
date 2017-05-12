import { GET_CHART_DATA } from './ChartActions';

const initialState = {
  data : {}
};


const ChartReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CHART_DATA : 
     return Object.assign({}, state, { 
      data : action.data
    });

    default:
      return state;
  }
};


/* Selectors */

export const chartData  = state => state.chart;

// Export Reducer
export default ChartReducer;
