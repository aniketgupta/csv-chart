import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { saveChartDataRequest} from '../../HomeActions';
import { homeData } from '../../HomeReducer';
import FontAwesome from 'react-fontawesome';
import styles from './HomePage.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var _ = require('lodash');


class HomePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: false
		}
	}

	handleUploadCSV = (e) => {
		var file = e.target.files[0];
		var self = this;
		Papa.parse(file, {
			skipEmptyLines: true,
			complete: function(results, file) {
				if(results != undefined) {
					var finalArr = []
  				var uniqueSeriesName = ''
  				var uniqueSeriesData = ''
				  for(var i=0; i< results.data.length; i++) {
				    var dataArr = []
				    // console.log((new Set(results.data[i])).size !== results.data[i].length ) // For unique data within one series
				    var dataWithoutSeriesName = _.without(results.data[i], results.data[i][0])
						if(_.isEqual(uniqueSeriesData, dataWithoutSeriesName)) {
						  self.refs.home_container.error('Each series should be unique');
						  self.setState({
		      			error: true
		      		}) 
						} else {
							uniqueSeriesData = dataWithoutSeriesName
					    for(var j=0; j< results.data[i].length; j++) {
					      if(results.data[i][j].indexOf("|") > -1) {
					        var score = results.data[i][j].substring(results.data[i][j].indexOf("|") + 1)
					        var year = results.data[i][j].substring(0, results.data[i][j].indexOf("|"))
					        dataArr.push({
					          y: score,
					          x: year
					        })        
					      } else {
					      	if(uniqueSeriesName == results.data[i][j]) {
					      		self.refs.home_container.error("Series name should be unique");
					      		self.setState({
					      			error: true
					      		})
					      	} else {
						        finalArr.push({
						          name: results.data[i][j],
						          data: dataArr
						        }) 
						        uniqueSeriesName = results.data[i][j]
					        } 
					      }
					    }
					  }
				  }
				  if(self.state.error == false) {
						self.props.dispatch(saveChartDataRequest(finalArr)).then(res => self.uploadData(res));
					}
				}
			}
		})
		self.setState({
			error: false
		})
  }

  uploadData(res) {
  	if(res.status) {
  		this.refs.home_container.success(res.message);
  	}
  }

  handleChart() {
  	browserHistory.push('/chart')
  }

  render() {
  	let uploadIcon = {
			marginTop: '8px'
		}
		let uploadText = {
			padding: '0 0 8px 0',
    	margin: '0'
		}
    return (
    	<div>
				<ToastContainer
	        toastMessageFactory={ToastMessageFactory}
	        ref="home_container"
	        className="toast-top-right"
	       />
	      <div className={styles.uploadBtnBlock}>
		      <div className={styles.uploadBtn}>
		        <input type="file" accept=".csv" onChange={this.handleUploadCSV.bind(this)} value={''}/>
		        <FontAwesome name="upload" style={uploadIcon}></FontAwesome>
		      </div>
		      <p style={uploadText}>Upload CSV</p>
		    </div>
		    <div >
		      <button onClick={this.handleChart.bind(this)} value={''}> View Chart </button>
		    </div>
		  </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    homeData: homeData(state),
  };
}

export default connect(mapStateToProps)(HomePage);