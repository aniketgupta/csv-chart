import { SAVE_CHART_DATA } from './HomeActions';

const initialState = {
  status : {}
};


const HomeReducer = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_CHART_DATA : 
     return Object.assign({}, state, { 
      status : action.status
    });

    default:
      return state;
  }
};


/* Selectors */

export const homeData  = state => state.home;

// Export Reducer
export default HomeReducer;
