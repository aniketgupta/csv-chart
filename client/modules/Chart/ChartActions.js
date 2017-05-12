import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const GET_CHART_DATA = 'GET_CHART_DATA';
export const GET_CHART_DATA_FAILED = 'GET_CHART_DATA_FAILED';


export function getChartDataRequest () {
  return (dispatch) => {
    return callApi('get-chart-data', 'get').then(res => dispatch(getChartDataStatus(res)));
  };
}

export function getChartDataStatus (response) {
  if(response.status) {
    return {
      type: GET_CHART_DATA,
      data: response.data,
      error : [],
    };
  } else if(response.error) {
    return{
      type: GET_CHART_DATA_FAILED,
      error : [response.error],
    };

  } else {
    return{
      type: GET_CHART_DATA_FAILED,
      error : ['Internal server error'],
    };
	}
}