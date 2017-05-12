import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const SAVE_CHART_DATA = 'SAVE_CHART_DATA';
export const SAVE_CHART_DATA_FAILED = 'SAVE_CHART_DATA_FAILED';


export function saveChartDataRequest (data) {
  return (dispatch) => {
    return callApi('save-chart-data', 'post', {
    	chartData: data
    }).then(res => dispatch(saveChartDataStatus(res)));
  };
}

export function saveChartDataStatus (response) {
  if(response.status) {
    return {
      type: SAVE_CHART_DATA,
      status: response.status,
      error : [],
      message : response.message
    };
  } else if(response.error) {
    return{
      type: SAVE_CHART_DATA_FAILED,
      status: response.status,
      error : [response.error],
      message : ''
    };

  } else {
    return{
      type: SAVE_CHART_DATA_FAILED,
      status: response.status,
      error : ['Internal server error'],
      message : ''
    };
	}
}